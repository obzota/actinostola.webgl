from os import system
import sys
system("python python/listfiles.py " + sys.argv[1] + " > app/data/data.js")
system("open explorer.html")