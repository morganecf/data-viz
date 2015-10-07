''' Script to scrape health.usnews.com for their radiation oncology data '''

import requests
from bs4 import BeautifulSoup

# List of states 
states = open('states.txt').read().splitlines()

def state_url(state):
	return "http://health.usnews.com/doctors/city-index/" + state + "/radiation-oncologists"

def city_url(city_part):
	return "http://health.usnews.com" + city_part

def doctor_url(dr_part):
	return "http://health.usnews.com" + dr_part

def clean(elem):
	return ' '.join(elem.text.split())

def hospital_content(hospital_url):
	pass

# Grab all the hospital affiliation information from a doctor's page 
def doctors_hospital_affiliation(hospital_div):
	hospital = {}

	# Hospital name and link 
	hlink = hospital_div.find("a")
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

# Grab a doctor's education credentials from the doctor's page
def doctors_education(ed_div):
	school = clean(ed_div.find(class_="t-strong"))
	description = ' '.join(map(clean, ed_div.findAll(class_="t-dim")))
	return {'school': school, 'description': description}

# Grab a doctor's certifications/licenses from the doctor's page
def doctors_license(div):
	license = clean(div.find(class_="t-strong"))
	description = clean(div.find(class_="t-dim"))
	return {'name': license, 'description': description}

# Segregate for ease of testing 
def doctor_content(dr_url):
	dr_req = requests.get(dr_url)
	dr_soup = BeautifulSoup(dr_req.text)

	# Now gather the doctor's data - all contained in these 9 divs 
	content_panels = dr_soup.findAll(class_="separated-solid")

	# The current panel we're scraping from
	p = 0

	# Name and location 
	header = content_panels[p].find(class_="content")
	name = clean(header.find("h4"))
	location = clean(header.find(class_='t-subdued'))

	print 'Name:', name
	print 'Location:', location

	p += 1

	# Overview
	overview = clean(content_panels[p].find("p"))

	print '\nOverview:', overview

	p += 1

	# Contact information
	contact = content_panels[p].findAll("p")
	address = clean(contact[0])
	phone = clean(contact[1]).replace('Phone:', '').strip()

	print '\nAddress:', address 
	print 'Phone:', phone

	p += 1

	# Specialties and qualifications - we only care about subspecialties, since these are all radiation oncologists
	subspecialties = clean(content_panels[p].findAll(class_="block-taut")[1]).replace('Subspecialties: ', '')

	print '\nSubspecialties:', subspecialties

	p += 1

	# Hospital affiliations
	hospital_divs = content_panels[p].findAll(class_="block-slack sep")
	hospitals = map(doctors_hospital_affiliation, hospital_divs)

	print '\nHospital affiliations:'
	if len(hospitals) > 0:
		for hospital in hospitals:
			print '\t', hospital['name']
			print '\t', hospital['url']
			print '\t', 'Awards:'
			if len(hospital['awards']) > 0:
				for award in hospital['awards']:
					print '\t\t', award['title'], '\t', '\t'.join(award['details'])
			else:
				print '\t\tNone'
			print
	else:
		print '\tNone'

	p += 1

	# Potentially! Other languages spoken
	language_div = content_panels[p]
	if language_div.find(id="other-languages-spoken"):
		languages = map(lambda l: clean(l), language_div.findAll("li"))
		p += 1
	else:
		languages = []

	print '\nLanguages:'
	if len(languages) > 0:
		for language in languages:
			print '\t', language 
			print
	else:
		print '\tNone'

	# Education and medical training
	school_divs = content_panels[p].findAll("p")
	education = map(doctors_education, school_divs)

	print '\nEducation:'
	for ed in education:
		print '\tSchool:', ed['school']
		print '\tDescription:', ed['description']
		print

	p += 1

	# Certifications and licenses
	cert_divs = content_panels[p].findAll("p")
	licenses = map(doctors_license, cert_divs)

	print '\nLicenses/certifications:'
	if len(licenses) > 0:
		for license in licenses:
			print '\tName:', license['name']
			print '\tDescription:', license['description']
			print
	else:
		print '\tNone'

	p += 1 

	# Insurance accepted 
	insurance_div = content_panels[p]
	if insurance_div.find(id="insurances-accepted"):
		insurances = map(lambda li: clean(li), insurance_div.findAll("li"))
		p += 1
	else:
		insurances = []

	print '\nInsurance:'
	if len(insurances) > 0:
		for insurance in insurances:
			print '\t', insurance 
	else:
		print '\tNone'

	# Awards, honors, recognition 
	try:
		award_div = content_panels[p]
		if clean(award_div.find("h2")) == 'Awards, Honors & Recognition': 
			awards = map(lambda p: clean(p), award_div.findAll(class_="block-taut"))
			p += 1
		else:
			awards = []
	except IndexError:
		awards = []

	print '\nAwards:'
	if len(awards) > 0:
		for award in awards:
			print '\t', award 
	else:
		print '\tNone'

	# Publications 
	try:
		publication_div = content_panels[p]
		if clean(publication_div.find("h2")) == 'Publications & Presentations':
			publications = map(lambda p: clean(p), content_panels[p].findAll(class_="block-close"))
			doximity_link = content_panels[p].findAll('a')[-1].get('href')	# Where the rest of the publications are 
			if doximity_link == 'javascript:void(0);':
				doximity_link = None
			p += 1
		else:
			publications = []
			doximity_link = None 
	except IndexError:
		publications = []
		doximity_link = None

	print '\nPublications:'
	if len(publications) > 0:
		for publication in publications:
			print '\t', publication 
			print
	else:
		print '\tNone'
	print 'Doximity link to more publications:', doximity_link

	# Save all the data 
	data = {
		'name': name,
		'location': location,
		'overview': overview,
		'address': address,
		'phone': phone,
		'subspecialties': subspecialties,
		'hospitals': hospitals,
		'languages': languages,
		'education': education,
		'certifications': licenses,
		'insurances': insurances,
		'awards': awards,
		'publications': publications,
		'doximity_link': doximity_link,
		'url': dr_url
	}

	return data

def scrape():
	for state in states:
		state = state.lower()

		# Fetch all city links for this state 
		req = requests.get(state_url(state))
		soup = BeautifulSoup(req.text)

		# Regex for link to city info 
		city_regex = re.compile(r'^/doctors/radiation-oncologists/' + state + '/.')

		# Find only the city links 
		city_urls = soup.findAll('a', href=city_regex)

		for atag in city_urls:
			city_req = requests.get(city_url(atag.get('href')))
			city_soup = BeautifulSoup(city_req.text)

			# Find all the links to doctors' info 
			dr_urls = soup.findAll('a', href=re.compile(r'^/doctors/.'))

			for dr_url in dr_urls:
				doctor_content(doctor_url(dr_url))


''' Some basic tests '''

def test_doctor_info():
	james = 'http://health.usnews.com/doctors/james-bonner-3533'
	martin = 'http://health.usnews.com/doctors/martin-ojong-ntui-566908'
	astrid = 'http://health.usnews.com/doctors/astrid-peterson-378854'
	joseph = 'http://health.usnews.com/doctors/joseph-cirrone-133783'
	sun = 'http://health.usnews.com/doctors/sun-gim-642976'

	print '==================James=================='
	doctor_content(james)
	print

	print '==================Martin=================='
	doctor_content(martin)
	print

	print '==================Astrid=================='
	doctor_content(astrid)
	print

	print '==================Joseph=================='
	doctor_content(joseph)
	print

	print '==================Sun=================='
	doctor_content(sun)
	print

test_doctor_info()

