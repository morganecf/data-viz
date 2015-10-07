# Script to scrape health.usnews.com for their radiation oncology data

def state_url(state):
	return "http://health.usnews.com/doctors/city-index/" + state + "/radiation-oncologists"

states = open('states.txt').read().splitlines()

for state in states:
	url = state_url(state)
	
