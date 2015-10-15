# Convert center locations to latitude/longitude and add info to mongo db 

import time
import json
from pymongo import MongoClient
from bson.objectid import ObjectId

# DB info 
host = 'localhost'
port = 27017
db_name = 'dirac'
collection_name = 'devices'

# Grab all of the centers 
client = MongoClient(host, port)
collection = client[db_name][collection_name]
devices = collection.find()

# Save all geocoordinates to file
def mongo_to_file():
	out = open('center-geocoordinates.tsv', 'w')
	for device in devices:
		did = str(device.get('_id'))
		latitude = str(device.get('latitude'))
		longitude = str(device.get('longitude'))
		out.write('\t'.join([did, latitude, longitude]) + '\n')
	out.close()

# Insert geocoordinates from file to mongo
def file_to_mongo():
	f = open('center-geocoordinates.tsv').read().splitlines()
	for line in f:
		did, latitude, longitude = line.split('\t')
		if latitude != 'None' and longitude != 'None':
			collection.update({"_id": did}, {"$set": {"latitude": float(latitude), "longitude": float(longitude)}})

# Use geopy to calculate the coordinates for each center and directly add to mongo
def calculate_geocoords():
	from geopy.geocoders import Nominatim
	from geopy.exc import GeocoderTimedOut, GeocoderServiceError

	# To convert address to lat/long 
	geolocator = Nominatim()

	# Number of centers that can't be geolocated
	num_incomplete = 0

	# Number of centers that can't be geolocated due to timeout issue
	num_timeouts = 0

	# Store ids of centers that couldn't be geolocated
	missing = open('geolocated-centers-missing.txt', 'a')

	i = 0
	total = 6379.0

	# Update each center with long/lat 
	for device in devices:
		i += 1

		# If this device already has a lat/long, skip it 
		if device.get('latitude') and device.get('longitude'):
			print (i / total) * 100
			continue

		did = device.get('_id')
		try:
			address = device['Address']
			location = geolocator.geocode(address)
			if location:
				collection.update({"_id": did}, {"$set": {"latitude": location.latitude, "longitude": location.longitude}})
				print location.address, location.latitude, location.longitude, (i / total) * 100
			else:
				raise KeyError
		except KeyError:
			# State or city unavailable
		    num_incomplete += 1
		    missing.write(str(did) + '\n')
		except GeocoderTimedOut:
			# Timeout error
			num_timeouts += 1
			missing.write(str(did) + '\n')

	missing.close()

	print 'Could not find long/lat for', num_incomplete, 'centers'
	print 'Lat/long conversion timed out for', num_timeouts, 'centers'

# Output the centers as a GeoJSON file 
def centers_to_geojson():
	coordinates = set()

	geo_json = {
		"type": "FeatureCollection",
		"features": []
	}

	for device in devices:
		lat = device.get("latitude")
		lng = device.get("longitude")

		if lat and lng: 
			# We don't want duplicate centers 
			if (lat, lng) not in coordinates: 
				
				device_json = {
					"type": "Feature",
					"geometry": {"type": "Point", "coordinates": [lat, lng]},
					"properties": {
						"name": device.get("OperatorName"),
						"status": device.get("Operator Status"),
						"use": device.get("Patient Treatment"),
						"source": device.get("SourceType"),
						"type": device.get("DeviceType"),
						"state": device.get("State"),
						"city": device.get("City")
					}
				}

				geo_json["features"].append(device_json)

	json.dump(geo_json, open("center-geocoordinates.geo.json", 'w'))



centers_to_geojson()

