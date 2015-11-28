import os
import re
import sys

root = sys.argv[1]
def incrHeader(header):
	return header + "    "

def printAddString(string):
	string = string.replace("\\\'", "\'")
	string = string.replace("\'", "\\\'")
	string = string.replace("\n", "")
	string = "+ \'" + string + "\'"
	print string

def printAttrib(field, value, last):
	value = value.replace("\'", "\\'")
	res = "\"" + field + "\" : \"" + value + "\""
	if not last:
		res += ","
	printAddString(res)

def printFile(filename, last):
	printAddString("{")
	printAttrib("filename", filename, False)
	printAttrib("shortname", os.path.basename(filename), False)
	try:
		size = str(os.path.getsize(filename))
	except Exception, e:
		size = "0"
	printAttrib("size", size, True)
	if last:
		printAddString("}")
	else:
		printAddString("},")

def explore(root):

	print "var data = \"\""
	# printAddString("[{\"null\":[")
	folder = []
	files = []
	lastDepth = -1
	startDepth = root.count('/')
	for current, subfolders, filenames in os.walk(root):
 		depth = current.count('/')
 		d = lastDepth - depth
 		# print"===> d : " + str(d)
 		for x in xrange(1,d+2):
 			printAddString("]")
 			printAddString("}")
 		if d >= 0:
 			printAddString(",")
 		lastDepth = depth
		printAddString("{")
		printAddString("\"name\" : \"" + current + "\",")
		printAddString("\"shortname\" : \"" + os.path.basename(current) + "\",")
		printAddString("\"depth\" : \"" + str(depth - startDepth) + "\",")
		printAddString("\"files\" : [")
		for name in range(len(filenames)-2):
			absName = os.path.join(current, filenames[name])
			printFile(absName, False)
		if filenames:
			absName = os.path.join(current, filenames[len(filenames)-1])
			printFile(absName, True)
		printAddString("],")
		printAddString("\"folders\" : [")
	for x in xrange(1,lastDepth - startDepth +2):
		printAddString("]")
		printAddString("}")
	# printAddString("]")

explore(root)