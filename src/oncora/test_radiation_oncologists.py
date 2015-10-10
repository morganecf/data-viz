''' Some basic tests to make sure all the scraping methods are working as expected '''

from scrape_radiation_oncologists import *

def test_doctor_info():
	james = 'http://health.usnews.com/doctors/james-bonner-3533'
	martin = 'http://health.usnews.com/doctors/martin-ojong-ntui-566908'
	astrid = 'http://health.usnews.com/doctors/astrid-peterson-378854'
	joseph = 'http://health.usnews.com/doctors/joseph-cirrone-133783'
	sun = 'http://health.usnews.com/doctors/sun-gim-642976'
	nevine = 'http://health.usnews.com/doctors/nevine-hanna-911764'
	afshin = 'http://health.usnews.com/doctors/afshin-forouzannia-893402'
	marvin = 'http://health.usnews.com/doctors/marvin-kantor-904486'

	regiane = 'http://health.usnews.com/doctors/regiane-de-andrade-890623'
	vijay = 'http://health.usnews.com/doctors/vijaykumar-kini-172897'
	young = 'http://health.usnews.com/doctors/young-lee-150527'
	dechen = 'http://health.usnews.com/doctors/dechen-dolkar-220401'
	nevine  = 'http://health.usnews.com/doctors/nevine-hanna-911764'
	parima = 'http://health.usnews.com/doctors/parima-daroui-618795'
	james = 'http://health.usnews.com/doctors/james-fitzgerald-867688'
	william = 'http://health.usnews.com/doctors/william-kurohara-578627'
	jeffrey = 'http://health.usnews.com/doctors/jeffrey-yuen-579950'
	daljit = 'http://health.usnews.com/doctors/daljit-soni-64481'

	def test(url):
		doctor = url.split('/')[-1].split('-')[0].capitalize()
		print "==================" + doctor + "=================="
		doctor_content(None, None, url)
		print 

	test(james)
	test(martin)
	# test(astrid)
	# test(joseph)
	# test(sun)
	# test(nevine)
	# test(afshin)
	# test(marvin)
	# test(regiane)
	# test(vijay)
	# test(young)


def test_state_cities():
	nh = "New Hampshire"
	ca = "California"
	montana = "Montana"
	ny = "New York"

	def test(state, abbrev):
		print "==================" + state + "=================="
		scrape_state(state, abbrev)
		print 

	test(nh, 'NH')
	test(ca, 'CA')
	test(montana, 'MT')
	test(ny, 'NY')



def test_city_pages():
	portsmouth = 'http://health.usnews.com/doctors/radiation-oncologists/new-hampshire/portsmouth'	# NH - 4
	alamitos = 'http://health.usnews.com/doctors/radiation-oncologists/california/los-alamitos'		# CA - 97
	sidney = 'http://health.usnews.com/doctors/radiation-oncologists/montana/sidney'				# Montana - 1
	victor = 'http://health.usnews.com/doctors/radiation-oncologists/new-york/victor'				# New York - 21
	pomona = 'http://health.usnews.com/doctors/radiation-oncologists/new-york/pomona'				# New York - 43

	def test(city, state, url, n):
		print "==================" + city + "," + state + "=================="
		scrape_city_doctors(state, city, url, n)
		print 

	test('Portsmouth', 'New Hampshire', 'NH', portsmouth, 4)
	test('Los Alamitos', 'California', 'CA', alamitos, 97)
	test('Sidney', 'Montana', 'MT', sidney, 1)
	test('Victor', 'New York', 'NY', victor, 21)
	test('Pomona', 'New York', 'NY', pomona, 43)


test_doctor_info()