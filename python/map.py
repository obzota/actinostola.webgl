from os import system
import sys
system("python python/listfiles.py " + sys.argv[1] + " > js/main/data.js")
system("open main.html")