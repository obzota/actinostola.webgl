var TreeManager = {

	maxDepth: 0,
	root: null,

	build: function(root) {
		var origin = vec3.create();
		var white = vec3.create(); vec3.set(white, 1.0, 1.0, 1.0);

		// creating objects
		var cloud = PointGenerator.generateCloud(origin, 0.3, white, root.Files, root.depth);
		var sphere = Builder.build(sphereObj, origin, 0.1, white);
		root.links = [];

		// recursively creating children
		for (var i = 0; i < root.Folders.length; i++) {
			var color = Colors.getRandomColor(white);
			var center = PointGenerator.sphericalPoint(2.0 * Math.pow(2.0, root.depth));
			this.recBuild(root, center, root.Folders[i], color);
			var bez = BezierGenerator.rootBezier(center, white, color);
			// Scene.lines.push(bez);
			root.links.push(bez);
		};

		// settings objects
		root.cloud = cloud;
		root.sphere = sphere;
		root.parent = null;
		this.root = root;
	},

	recBuild: function(parent, center, node, color) {
		if (node.depth > this.maxDepth) {this.maxDepth = node.depth};
		// creating the cloud
		var cloud = PointGenerator.generateCloud(center, 0.3, color, node.Files, node.depth);
		cloud.name = node.name;
		// Scene.clouds.push(cloud);
		// creating a sphere
		var sphere = Builder.build(sphereObj, center, 0.1, color);
		// rec
		node.links = [];
		for (var i = 0; i < node.Folders.length; i++) {
			var nextColor = Colors.getRandomColor(color);
			var nextCenter = PointGenerator.sphericalPointWithinRange(center, 2.0 * Math.pow(2.0, node.depth));
			this.recBuild(node, nextCenter, node.Folders[i], nextColor);
			var link = BezierGenerator.complexLinkBezier(center, nextCenter, color, nextColor);
			// Scene.lines.push(link);
			node.links.push(link);
		};

		node.cloud = cloud;
		node.parent = parent;
	},

	renderClouds: function(time) {
		this.recRenderClouds(this.root, time);
	},

	recRenderClouds: function(root, time) {
		CloudDrawer.draw(root.cloud, time);
		for (var i = 0; i < root.Folders.length; i++) {
			this.recRenderClouds(root.Folders[i], time);
		};
	},

	renderLinks: function() {
		this.recRenderLinks(this.root);
	},

	recRenderLinks: function(root) {
		for (var i = 0; i < root.links.length; i++) {
			LineDrawer.draw(root.links[i]);
		};
		for (var i = 0; i < root.Folders.length; i++) {
			this.recRenderLinks(root.Folders[i]);
		};
	},

	randomiseColors: function() {
		this.recRandomiseColors(this.root, Colors.white);
	},

	recRandomiseColors: function(root, color) {
		for (var i = 0; i < root.Folders.length; i++) {
			var newcolor = Colors.getRandomColor(color);
			root.links[i].color0 = color;
			root.links[i].color1 = newcolor;
			this.recRandomiseColors(root.Folders[i], newcolor);
		};
	},

	setGrayscaleColor: function(root, color) {
		if (!root) {
			root = this.root;
			color = Colors.white;
		}

		for (var i = 0; i < root.Folders.length; i++) {
			var newcolor = Colors.getGray(root.depth, this.maxDepth);
			root.links[i].color0 = color;
			root.links[i].color1 = newcolor;
			this.setGrayscaleColor(root.Folders[i], newcolor);
		};
	},

	setCloudFocus: function(value, root) {
		if (!root) {root = this.root;};
		root.cloud.focus = value;
		for (var i = 0; i < root.Folders.length; i++) {
			this.setCloudFocus(value, root.Folders[i]);
		};
	},

	createRangeSpheres: function() {
		this.spheres = [];
		var origin = vec3.create();
		var radius = 2;
		for (var i = 1; i <= this.maxDepth; i++) {
			radius *= 2;
			this.spheres[i-1] = Builder.build(sphereObj, origin, radius, Colors.white);
		};
	},

	drawRangeSpheres: function() {
		for (var i = 0; i < this.spheres.length; i++) {
			Drawer.drawObject(this.spheres[i]);
		};
	}

	// rejuvenate: function(root, center) {
	// 	var isRoot = false;
	// 	if (!root) {root = this.root; isRoot = true;};
	// 	if (!center) {center = root.cloud.center};

	// 	for (var i = 0; i < root.Folders.length; i++) {
	// 		var nextCenter = PointGenerator.sphericalPointWithinRange(center, 2.0 * Math.pow(2.0, root.depth));
	// 		var color0 = root.links[i].color0;
	// 		var color1 = root.links[i].color1;
	// 		if (isRoot) {
	// 			root.links[i] = BezierGenerator.complexLinkBezier(center, nextCenter, color0, color1);
	// 		} else {
	// 			root.links[i] = BezierGenerator.rootBezier(nextCenter, color0, color1);
	// 		}
	// 		rejuvenate(root.Folders[i], nextCenter);
	// 	};
	// }

}