# actinostola.webgl

Actinostola is a webgl based project. The aim is to visualize a folder architecture. It is named after a sea anemone because of the visual aspect of the arborescence.

Visit the website !!!
http://obzota.github.io/actinostola.webgl/


## Quick Start

The main application is build in the page explorer.html, the presentation of the project relies on index.html. Just open them in the browser to start.

## Using the app

Actinostola is manipulated through the lovely interface on the left. You can toggle 3 different menus. The first allows you to change display and colors. The second to navigate between folders and the fird to get infos about the files of the current folder.

## Generating your own tree

If you want to generate your own file tree, you can run the python script listfiles.py we the following command line :

```
python python/listfiles.py /way/to/my/folder/ > app/data/data.js
```

This script will create a json string representing your folders and save it as a javascript object. The app will then load the structure from the json when you launch explorer.html.

