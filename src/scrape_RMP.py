''' Methods to scrape Rate My Prof website '''

import re
import time
import random
import requests
from bs4 import BeautifulSoup

base_url = "http://www.ratemyprofessors.com/"

''' 
	Scrapes an individual page for profs' ids/names/schools,
	and saves this information to a given file. 
''' 
def scrape_prof_id_page(url, fp):
	req = requests.get(url)
	soup = BeautifulSoup(req.text)
	prof_divs = soup.find(id="searchResultsBox").find_all(class_="listing PROFESSOR")

	for pd in prof_divs:
		pid = pd.find("a").get("href").split("=")[-1]
		name = pd.find(class_="listing-name").find_all("span")[0].text
		school = pd.find(class_="listing-name").find_all("span")[1].text

		s = pid + '\t' + name + '\t' + school
		print '\t', s
		fp.write(s.encode('utf-8') + '\n')

'''
	Goes through all of the urls in the show all professors listing
	and scrapes professors' ids, names, and schools, saving to file. 
'''
def scrape_prof_ids(try_again=False):
	prof_query_str = "/search.jsp?query=*&queryoption=HEADER&stateselect=&country=&dept=&queryBy=teacherName&facetSearch=true&schoolName=&offset="
	max_offset = 75144

	# File for professor ids/names/universities 
	fp = open('../data/prof_ids.tsv', 'a')

	# File to let us know the last page/prof we were on
	try:
		pages = open('../data/prof_pages.txt').read().split(',')
		start_page = pages[-1] or 0
		start_page = int(start_page)
	except IOError:
		start_page = 0

	fpg = open('../data/prof_pages.txt', 'a')

	# Log file of pages that failed 
	log = open('../data/prof_err_log.txt', 'a')

	# Go through all urls containing prof listings in groups of 20
	for x in range(start_page, max_offset + 1, 20):
		print 'Scraping page #' + str(x) + " ==> " + str(((x/20.0) / max_offset)*100) + '% done'

		# Construct the url 
		url = base_url + prof_query_str + str(x)
		print url

		# Get the professor listings
		try:
			scrape_prof_id_page(url, fp)

		except requests.HTTPError:
			# Some kind of http error
			log.write(str(x) + ',')

		# Save the last page we scraped 
		fpg.write(str(x) + ',')

		# Sleep a random amount of time so as to throw off our scent
		time.sleep(random.random() * 10)

	log.close()

	# If try again was specified, go through all of the pages that 
	# failed and try scraping these again 
	if try_again: 
		logr = open('../data/prof_err_log.txt').read().split(',')
		# Wipe out old log data 
		log = open('../data/prof_err_log.txt', 'w')
		for page in logr:
			url = base_url + prof_query_str + page 
			try:
				scrape_prof_id_page(url, fp)
			except requests.HTTPError:
				log.write(page + ',')

		log.close()


	fp.close()
	fpg.close()

''' 
	Regexes to help extract department and location from a professor's information 
	Ex: Professor in the Mathematics department at Abilene Christian University, Abilene, TX
'''
prof_info_regex = re.compile(r'Professor in the (.+) at (.+), (.+), (.+)')


''' 
	Scrapes an individual professor's detailed information. 
	Meta data for main details (tab separated): 
		pid,name,uni,dept,location,quality,avg grade,hotness,helpfulness,clarity,easiness,tag:#
'''
def scrape_prof_details(url, pid, fp):
	# Create the request and load the html
	req = requests.get(url)
	soup = BeautifulSoup(req.text)

	print "Querying:", url

	# There could be no ratings for this professor yet
	if soup.find(class_="dosanddonts"):
		print "\tNo info!"
		return False

	# The professor's information
	results = soup.find(class_="result-info")
	name = ' '.join(map(lambda s: s.text.strip(), results.find(class_="result-name").find_all("span")))
	titles = ' '.join(soup.find(class_="result-title").text.split())
	department, university, city, state = re.search(prof_info_regex, titles).groups()
	location = city.strip() + ',' + state.strip()

	print '\tName:', name 
	print '\tDept:', department
	print '\tUni:', university
	print '\tLocation:', location

	# The aggregate grades 
	grades = soup.find_all(class_="grade")
	quality = grades[0].text											# the average numerical score (quality)
	avg_grade = grades[1].text											# the average letter grade
	avg_hotness = grades[2].find("img").get("src").split("/")[-1]		# the average hotness image 

	print '\tQuality:', quality
	print '\tGrade:', avg_grade
	print '\tHotness:', avg_hotness

	# # The aggregate qualifiers
	qualifiers = soup.find_all(class_="rating-slider")
	helpfulness = qualifiers[0].find(class_="rating").text
	clarity = qualifiers[1].find(class_="rating").text
	easiness = qualifiers[2].find(class_="rating").text

	print '\tHelpfulness:', helpfulness
	print '\tClarity:', clarity
	print '\tEasiness:', easiness

	# The tags 
	tag_spans = soup.find_all(class_="tag-box-choosetags")
	tags = []
	for tag in tag_spans:
		description, num = tag.text.split('(')
		tags.append(description.strip().lower() + ':' + num[:-1].strip())
	tag_str = ','.join(tags)

	print "\tTags:", tag_str

	print

	# Save everything 
	data = [pid, name, university.strip(), department.strip(), location, quality, avg_grade, avg_hotness, helpfulness, clarity, easiness, tag_str]
	data_str = '\t'.join(data)

	fp.write(data_str + '\n')

	return True


'''
	Scrapes all professors' detailed information. 
'''
def scrape_all_prof_details():
	# The base url for accessing a single professor
	base_prof_url = base_url + "ShowRatings.jsp?tid=" 

	# Error log - records prof ids that didn't get scraped or that have no info
	log = open('../data/prof_detail_err_log.txt', 'a')

	# Data file - records all prof information (aggregate)
	fp = open('../data/prof_details.txt', 'a')

	# Get the list of professor ids 
	profs = open('../data/prof_ids.tsv').read().splitlines()
	for i, prof in enumerate(profs):
		pid = prof.split('\t')[0]
		url = base_prof_url + pid

		try:
			scraped = scrape_prof_details(url, pid, fp)
		except:
			log.write(pid + ',')

		# Occasionally sleep 
		if i % 750 == 0:
			time.sleep(random.random() * 10)

	# Done 
	fp.close()
	log.close()

'''
	Scrapes an individual professor's ratings. 
	Meta data for student ratings (tab separated):
		pid,date,class,rating,helpfulness,clarity,easiness,comment,for-credit,attendance,
			textbook-use,rater-interest,grade-received,#useful,#notuseful,tag:#
'''
def scrape_prof_ratings():

	# First get the table containing all the ratings
	

	#### Make sure remove tabs
	pass 

'''
	Scrapes all professors' ratings.  
'''
def scrape_all_prof_ratings():
	# Error log - records prof ids that didn't get scraped or that have no info
	log = open('../data/prof_ratings_err_log.txt', 'a')
	# Data file - records all rating information 
	fpr = open('../data/prof_ratings.txt', 'a')
	pass



scrape_all_prof_details()

