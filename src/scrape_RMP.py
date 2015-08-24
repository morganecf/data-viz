''' Methods to scrape Rate My Prof website '''

import time
import random
import requests
from bs4 import BeautifulSoup

base_url = "http://www.ratemyprofessors.com/"
prof_query_str = "/search.jsp?query=*&queryoption=HEADER&stateselect=&country=&dept=&queryBy=teacherName&facetSearch=true&schoolName=&offset="
max_offset = 75144

def scrape_prof_id_page(url, fp):
	req = requests.get(url)
	soup = BeautifulSoup(req.text)
	prof_divs = soup.find(id="searchResultsBox").find_all(class_="listing PROFESSOR")

	print len(prof_divs)

	for pd in prof_divs:
		pid = pd.find("a").get("href").split("=")[-1]
		name = pd.find(class_="listing-name").find_all("span")[0].text
		school = pd.find(class_="listing-name").find_all("span")[1].text

		print '\t', name, '\t', school, '\t', pid
		fp.write(pid + '\t' + name + '\t' + school + '\n')

# Can resume scraping where last left off 
def scrape_prof_ids(try_again=False):
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



scrape_prof_ids()

