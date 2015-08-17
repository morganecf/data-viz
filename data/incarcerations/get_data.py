import sys

f = sys.argv[1]
lines = open(f).read().splitlines()

d = []
for line in lines:
	d.append(int(line.split(',')[-1]))

print d
