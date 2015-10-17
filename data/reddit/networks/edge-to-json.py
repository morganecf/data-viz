# Script to convert edge list to json/js file 
# Usage: python edge-to-json.py <edgelist> <result.json>

import sys
import json 

f = open(sys.argv[1]).read().splitlines()

graph = {}

for line in f:
	s1, s2, c = line.split('\t')
	if s1 in graph:
		graph[s1][s2] = {'count': int(c)}
	else:
		graph[s1] = {s2: {'count': int(c)}}

	if s2 in graph:
		graph[s2][s1] = {'count': int(c)}
	else:
		graph[s2] = {s1: {'count': int(c)}}

json.dump(graph, open(sys.argv[2], 'w'))
