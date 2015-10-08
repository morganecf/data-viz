''' Script to scrape health.usnews.com for their radiation oncology data '''

import re
import math
import json
import time
import random
import urllib2
import requests
from bs4 import BeautifulSoup


''' Global variables ''' 

# List of states 
states = open('states.txt').read().splitlines()

# List of state abbreviations
abbreviations = open('state-abbreviations.txt').read().splitlines()

# Regex for link to a doctor's info
doctor_link_regex = re.compile(r'^/doctors/[\w\d-]+$')

# Hardcode urls for hawaii and washington dc since they only have one associated city
hardcoded = {
	'hawaii': 'http://health.usnews.com/doctors/radiation-oncologists/honolulu-hi',
	'district-of-colombia': 'http://health.usnews.com/doctors/radiation-oncologists/washington-dc'
}

# Save the data 
out = open('radiation-oncologists.txt', 'a')

# Save the urls that couldn't be scraped here 
missing = open('missing-urls.txt', 'a')

# Record any new data that we haven't encountered yet
new_data = open('new-data.tsv', 'a')


''' URL/text formatting methods ''' 

def state_url(state):
	return "http://health.usnews.com/doctors/city-index/" + state + "/radiation-oncologists"

def city_url(city_part):
	return "http://health.usnews.com" + city_part

def doctor_page_url(city, state, abbreviation, page):
	city_hyphen = '-'.join(city.lower().split())
	city_plus = '+'.join(city.split())
	url = "http://health.usnews.com/doctors/radiation-oncologists/"
	url += state + "/" + city_hyphen
	url += "?sort=name&city=" + city_plus + "&loc=" + city_plus + "%2C+" 
	url += abbreviation + "&specialty=radiation-oncologists&state=" + abbreviation
	url += "&page=" + str(page)
	return url

def doctor_url(dr_part):
	return "http://health.usnews.com" + dr_part

def clean(elem):
	return ' '.join(elem.text.split())



''' Helper functions to grab doctor-related content from a doctor's page '''

# Helper function for doctors_hospital_affiliations
def doctors_hospital_affiliation(hospital_div):
	hospital = {}
	
	# If there isn't a link to the hospital just get the hospital name
	hlink = hospital_div.find("a")
	if hlink is None:
		hospital['name'] = clean(hospital_div)
		return hospital

	# Hospital name and link 
	hospital['name'] = clean(hlink)
	hospital['url'] = hlink.get('href')

	# Hospital's awards 
	awards = []
	titles = hospital_div.findAll('h6')
	details = hospital_div.findAll('p')
	for i, h6 in enumerate(titles):
		award = {}
		award['title'] = clean(h6)

		# There may be multiple descriptions for this award, separated by <br/>
		try:
			detail_strings = ' '.join(str(details[i]).split()).split('<br/>')
			award['details'] = map(lambda d: clean(BeautifulSoup(d)), detail_strings)
		except IndexError:
			award['details'] = []

		awards.append(award)

	hospital['awards'] = awards
	return hospital

# Helper function for doctors_education
def doctors_school(ed_div):
	school = clean(ed_div.find(class_="t-strong"))
	description = ' '.join(map(clean, ed_div.findAll(class_="t-dim")))
	return {'school': school, 'description': description}

# Helper function for doctors_licenses
def doctors_license(div):
	license = clean(div.find(class_="t-strong"))
	description = clean(div.find(class_="t-dim"))
	return {'name': license, 'description': description}

# Helper function for doctors_procedures
def doctors_procedure(div, headings):
	procedure = {}
	tds = div.findAll("td")
	for i, heading in enumerate(headings):
		procedure[heading] = clean(tds[i])
	return procedure


''' Functions to grab doctor-related content from each section of the doctor's page ''' 

# Publications and link to more publications
def doctors_publications(div):
	publications = map(lambda p: clean(p), div.findAll(class_="block-close"))
	doximity_link = div.findAll('a')[-1].get('href')
	if doximity_link == 'javascript:void(0);':
		doximity_link = None
	return {'publications': publications, 'doximity-link': doximity_link}

# Awards, honors and recognitions
def doctors_awards(div):
	awards = map(lambda p: clean(p), div.findAll(class_="block-taut"))
	return {'awards': awards}

# Insurances accepted by doctor 
def doctors_insurances(div):
	insurances = map(lambda li: clean(li), div.findAll("li"))
	return {'insurances': insurances}

# Certifications, licenses/licensures 
def doctors_licenses(div):
	cert_divs = div.findAll("p")
	licenses = map(doctors_license, cert_divs)
	return {'licenses': licenses}

# Education and medical training 
def doctors_education(div):
	school_divs = div.findAll("p")
	education = map(doctors_school, school_divs)
	return {'education': education}

# Doctor potentially speaks other languages besides english 
def doctors_languages(div):
	languages = map(lambda l: clean(l), div.findAll("li"))
	return {'languages': languages}

# Procedures doctor performs
def doctors_procedures(div):
	headings = map(lambda th: '-'.join(clean(th).split()), div.find("thead").findAll('th'))
	procedures = map(lambda tr: doctors_procedure(tr, headings), div.find(class_="procedure-data").findAll('tr'))
	return {'procedures': procedures}

# Hospitals doctor is affiliated with 
def doctors_hospital_affiliations(div):
	hospital_divs = div.findAll(class_="block-slack sep")
	hospitals = map(doctors_hospital_affiliation, hospital_divs)
	return {'hospitals': hospitals}

# Specialties and qualifications - we only care about subspecialties, since these are all radiation oncologists
def doctors_specialties(div):
	subspecialties = clean(div.findAll(class_="block-taut")[1]).replace('Subspecialties: ', '')
	return {'subspecialties': subspecialties}

# Contact information includes address, phone, sometimes fax 
def doctors_contact(div):
	contact = div.findAll("p")
	try:
		address = clean(contact[0])
	except IndexError:
		address = None
	try:
		phone = clean(contact[1]).replace('Phone:', '').strip()
	except IndexError:
		phone = None
	return {'address': address, 'phone': phone}

# Overview - textual summary of all of doctor's information
def doctors_overview(div):
	return {'overview': clean(div.find("p"))}


# Mapping of section header to appropriate scraping function
scraping_functions = {
	'overview': doctors_overview,
	'office': doctors_contact,
	'location': doctors_contact,
	'contact': doctors_contact,
	'specialties': doctors_specialties,
	'qualifications': doctors_specialties,
	'hospital': doctors_hospital_affiliations,
	'affiliation': doctors_hospital_affiliations,
	'affiliations': doctors_hospital_affiliations,
	'certifications': doctors_licenses,
	'licenses': doctors_licenses,
	'licensure': doctors_licenses,
	'insurance': doctors_insurances,
	'insurances': doctors_insurances,
	'publications': doctors_publications,
	'presentations': doctors_publications,
	'education': doctors_education,
	'training': doctors_education,
	'awards': doctors_awards,
	'honors': doctors_awards,
	'recognition': doctors_awards,
	'languages': doctors_languages,
	'spoken': doctors_languages,
	'procedures': doctors_procedures,
	'performs': doctors_procedures
}

# See if access was denied for a link
def access_denied(soup):
	return clean(soup.find("title")) == 'Access Denied'


''' Scrape a doctor's information ''' 
def doctor_content(dr_url):
	data = {}

	dr_req = requests.get(dr_url)
	dr_soup = BeautifulSoup(dr_req.text)

	if access_denied(dr_soup):
		missing.write(dr_url + '\n')
		return

	# Now gather the doctor's data - all contained in these divs. Some may be missing 
	content_panels = dr_soup.findAll(class_="separated-solid")

 	# Name and location 
	header = content_panels[0].find(class_="content")
	data['name'] = clean(header.find("h4"))
	data['location'] = clean(header.find(class_='t-subdued'))

	print '\t\t\t', data['name'], data['location']
	print '\t\t\t', dr_url

	for cp in content_panels[1:]:
		# Find which section this is 
		sections = clean(cp.find("h2")).lower().split()

		# Find the appropriate function to call to parse this section
		functions = filter(lambda s: scraping_functions.get(s) is not None, sections)
		if len(functions) > 0:
			function = scraping_functions[functions[0]]

			# Add results to data obj
			result = function(cp)
			for k, v in result.iteritems():
				data[k] = v
		# We've encountered previously unseen data 
		else:
			print 'NO FUNCTION FOUND FOR:', cp.find("h2")
			new_data.write(dr_url + '\t' + ' '.join(sections) + '\n')

	# Save json 
	out.write(json.dumps(data) + '\n')


''' Scrape all doctors from a city  ''' 
def scrape_city_doctors(state, city, abbreviation, city_url, num_doctors):
	# 10 doctors are displayed per page 
	num_pages = int(math.ceil(num_doctors / 10.0))

	# We will visit num_doctors number of pages to get all of the doctors for this city
	for page in range(1, num_pages + 1):
		print '\t\tPage', page 

		url = doctor_page_url(city, state, abbreviation, page)
		req = requests.get(url)
		soup = BeautifulSoup(req.text)

		# Find all the links to doctors' info 
		dr_url_divs = soup.find("tbody").findAll('a', href=doctor_link_regex)

		# Some of the urls appear multiple times, don't want to scrape same one again
		seen = set()
		for dr_url_div in dr_url_divs:
			dr_url = doctor_url(dr_url_div.get('href'))
			if dr_url not in seen:
				seen.add(dr_url)

				try:
					doctor_content(dr_url)
				except:
					print 'PROBLEM WITH:', dr_url
					missing.write(dr_url + '\n')

		# Introduce some random lag...I think this is rate-limited 
		time.sleep(random.random() * 4)


''' Scrape all doctors from a state ''' 
def scrape_state(state):
	abbreviation = abbreviations[states.index(state)]
	state = '-'.join(state.lower().split())

	if state in hardcoded:
		scrape_city_doctors(hardcoded[city])
	else:
		# Fetch all city links for this state 
		req = requests.get(state_url(state))
		soup = BeautifulSoup(req.text)

		# Regex for link to city info 
		city_regex = re.compile(r'^/doctors/radiation-oncologists/' + state + '/.')

		# Find only the city links 
		city_urls = soup.findAll('a', href=city_regex)

		for atag in city_urls:
			url = city_url(atag.get('href'))
			city = atag.text.split('(')[0].strip()
			num_doctors = int(atag.text.split('(')[1].replace(')', '').strip())

			print '\t', city, '\t', num_doctors

			scrape_city_doctors(state, city, abbreviation, url, num_doctors)


''' Scrape everything ''' 
def scrape():
	for state in states:
		print state
		scrape_state(state)	

	out.close()
	missing.close()
	new_data.close()

	print 'Done!'


scrape()