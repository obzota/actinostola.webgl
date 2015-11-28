var TreeManager = function (scene, root) {

	this.scene = scene;
	this.gl = scene.gl;
	this.maxDepth = 0;
	this.root = root;
	this.focus = this.root;

	this.build();

};

/**
 * Recursively construct every objects of the scene by exploring
 * the folder structure described from 'root' the entry point set
 * in the initialisation function.
 *
 * It will instanciate for each folder, a sphere representing the location
 * a cloud of files, and links to the sub-folders
 *
 * @method     build
 */
TreeManager.prototype.build = function() {
	console.log(this.root);
	var root = this.root;
	var origin = vec3.create();
	var white = vec3.create(); vec3.set(white, 1.0, 1.0, 1.0);

	// creating objects
	var cloud = PointGenerator.generateCloud(this.gl, origin, 0.3, white, root.files, root.depth);
	var sphere = Builder.build(this.gl, sphereObj, origin, 0.1, white);
	this.scene.clouds.push(cloud);
	this.scene.meshes.push(sphere);
	root.links = [];

	// recursively creating children
	for (var i = 0; i < root.folders.length; i++) {
		var color = Colors.getRandomColor(white);
		var center = PointGenerator.sphericalPoint(2.0 * Math.pow(2.0, root.depth));
		this.recBuild(root, center, root.folders[i], color);
		root.folders[i].index = i;
		var bez = BezierGenerator.rootBezier(this.gl, center, white, color);
		root.links.push(bez);
		this.scene.lines.push(bez);
		bez.depth = Number(root.depth)+1;
	};

	// settings objects
	root.cloud = cloud;
	root.sphere = sphere;
	sphere.depth = root.depth;
	root.parent = null;
	this.root = root;
};
TreeManager.prototype.recBuild = function(parent, center, node, color) {
	if (node.depth > this.maxDepth) this.maxDepth = node.depth;
	node.color = Colors.toHexString(color);
	// creating the cloud
	var cloud = PointGenerator.generateCloud(this.gl, center, 0.3, color, node.files, node.depth);
	cloud.name = node.name;
	this.scene.clouds.push(cloud);
	// creating a sphere
	var sphere = Builder.build(this.gl, sphereObj, center, 0.1, color);
	this.scene.meshes.push(sphere);
	// rec
	node.links = [];
	for (var i = 0; i < node.folders.length; i++) {
		var nextColor = Colors.getRandomColor(color);
		var nextCenter = PointGenerator.sphericalPointWithinRange(center, 2.0 * Math.pow(2.0, node.depth));
		this.recBuild(node, nextCenter, node.folders[i], nextColor);
		node.folders[i].index = i;
		var link = BezierGenerator.complexLinkBezier(this.gl, center, nextCenter, color, nextColor);
		// Scene.lines.push(link);
		node.links.push(link);
		this.scene.lines.push(link);
		link.depth = Number(node.depth) + 1;
	};

	sphere.depth = node.depth;
	node.sphere = sphere;
	node.cloud = cloud;
	node.parent = parent;
};

/**
 * Randomise the color of each node in the structure.
 * Change color of the spheres, the links and the clouds.
 *
 * @method     randomiseColors
 */
TreeManager.prototype.randomiseColors = function() {
	this._recRandomiseColors(this.root, Colors.white);
};

/**
 * Recursive utility for randomiseColors
 *
 * @method     _recRandomiseColors
 * @param      {number}  root    { description }
 * @param      {vec3}  color   { description }
 */
TreeManager.prototype._recRandomiseColors = function(root, color) {
	console.log(root);
	root.color = Colors.toHexString(color);
	root.cloud.color = color;
	root.sphere.color = color;
	for (var i = 0; i < root.folders.length; i++) {
		var newcolor = Colors.getRandomColor(color);
		root.links[i].color0 = color;
		root.links[i].color1 = newcolor;
		this._recRandomiseColors(root.folders[i], newcolor);
	};
};

/**
 * Give the structure a grayscale color depending on the depth of the nodes.
 * Starting from white at the root to darkgray for the most far node
 *
 * @method     setGrayscaleColor
 * @param      {number}  root    starting node of the grayscale
 * @param      {vec3}  color   herited color from the parent
 */
TreeManager.prototype.setGrayscaleColor = function(root, color) {
	if (!root) {
		root = this.root;
		color = Colors.white;
	}
	root.color = Colors.toHexString(color);
	root.sphere.color = color;
	root.cloud.color = color;
	for (var i = 0; i < root.folders.length; i++) {
		var newcolor = Colors.getGray(root.depth, this.maxDepth);
		root.links[i].color0 = color;
		root.links[i].color1 = newcolor;
		this.setGrayscaleColor(root.folders[i], newcolor);
	};
};

/**
 * Decorate the tree with colors that
 * seems to be herited from the parent node
 * Root remains white and the first nodes
 * after are initialised with random colors
 *
 * Recursive method follows.
 *
 * @method     setInheritedColor
 */
TreeManager.prototype.setInheritedColor = function () {
	root = this.root;
	color = Colors.white;

	root.color = Colors.toHexString(color);
	root.sphere.color = color;
	root.cloud.color = color;
	for (var i = 0; i < root.folders.length; i++) {
		var newcolor = Colors.getRandomColor(color);
		root.links[i].color0 = color;
		root.links[i].color1 = newcolor;
		this._recSetInheritedColor(root.folders[i], newcolor);
	};
};
/**
 * recursive utility for setInheritedColor
 *
 * @method     _recSetInheritedColor
 * @param      {number}  root    { description }
 * @param      {<type>}  color   { description }
 */
TreeManager.prototype._recSetInheritedColor = function (root, color) {
	root.color = Colors.toHexString(color);
	root.sphere.color = color;
	root.cloud.color = color;
	for (var i = 0; i < root.folders.length; i++) {
		var newcolor = Colors.getInheritedColor(color);
		root.links[i].color0 = color;
		root.links[i].color1 = newcolor;
		this._recSetInheritedColor(root.folders[i], newcolor);
	};
};

/**
 * change the cloud 'focus' property on each cloud
 * of the structure.
 * This toggle the display of the file size.
 *
 * @method     setCloudFocus
 * @param      {boolean}  value   true for displaying sizes
 * @param      {number}  root    node to start applying the method
 */
TreeManager.prototype.setCloudFocus = function(value, root) {
	if (!root) root = this.root;
	root.cloud.focus = value;
	for (var i = 0; i < root.folders.length; i++) {
		this.setCloudFocus(value, root.folders[i]);
	};
};

/**
 * Change the color of every node in a sub-structure for a unique color
 * if no color is specified white is choosen
 * if no root is specified, all nodes will be affected
 *
 * @method     setColorAll
 * @param      {<type>}  color   { description }
 * @param      {number}  root    { description }
 */
TreeManager.prototype.setColorAll = function (color, root) {
	if(!root) root = this.root;
	if(!color) color = Colors.white;

	root.color = Colors.toHexString(color);
	root.cloud.color = color;
	root.sphere.color = color;

	for (var i = 0; i < root.folders.length; i++) {
		root.links[i].color0 = color;
		root.links[i].color1 = color;
		this.setColorAll(color, root.folders[i]);
	};
};

/**
 * show the path of folders from root till the current focus
 * and also all its descendance in the same color
 *
 * @method     showPath
 * @param      {<type>}  focus   { description }
 */
TreeManager.prototype.showPath = function (focus) {
	this.setColorAll();
	if (!focus) focus = this.focus;
	var color = Colors.getRandomColor();
	this._showAscendingPath(focus, color);
	this._showDescendance(focus, color);
};

TreeManager.prototype._showAscendingPath = function(node, color, index) {
	if (node == null) return;
	node.color = Colors.toHexString(color);
	node.cloud.color = color;
	node.sphere.color = color;
	if (index || index == 0) {
		node.links[index].color0 = color;
		node.links[index].color1 = color;
	};
	this._showAscendingPath(node.parent, color, node.index);
};

TreeManager.prototype._showDescendance = function (node, color) {
	node.color = Colors.toHexString(color);
	node.cloud.color = color;
	node.sphere.color = color;
	var newcolor = Colors.getInheritedColor(color);
	for (var i = 0; i < node.folders.length; i++) {
		node.links[i].color0 = color;
		node.links[i].color1 = newcolor;
		this._showDescendance(node.folders[i], newcolor);
	};
}

// var tree = angular.module('tree', []);

// tree.factory('datatree', function() {
// 	var archi = JSON.parse(data);
// 	return archi;
// });

// tree.factory('treemanager', function(datatree) {
// 	var tm = new TreeManager();
// 	tm.build(datatree);
// 	return tm;
// });
