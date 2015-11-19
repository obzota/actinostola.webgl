var TreeManager = {

	maxDepth: 14,
	root: null,

	build: function(root) {
		var origin = vec3.create();
		var white = vec3.create(); vec3.set(white, 1.0, 1.0, 1.0);
		// creating and binding the cloud
		var cloud = PointGenerator.generateCloud(origin, 0.3, white, root.Files, root.depth);
		cloud.name = root.name;
		// Scene.clouds.push(cloud);
		root.cloud = cloud;
		// creating a sphere
		var sphere = Builder.build(sphereObj, origin, 0.1, white);
		Scene.meshes.push(sphere);
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

		root.parent = null;
	},

	recBuild: function(parent, center, node, color) {
		// if (node.depth > this.maxDepth) {this.maxDepth = node.depth};
		// creating the cloud
		var cloud = PointGenerator.generateCloud(center, 0.3, color, node.Files, node.depth);
		cloud.name = node.name;
		// Scene.clouds.push(cloud);
		// creating a sphere
		var sphere = Builder.build(sphereObj, center, 0.1, color);
		Scene.meshes.push(sphere);
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

	renderClouds: function(root, time) {
		CloudDrawer.draw(root.cloud, time);
		for (var i = 0; i < root.Folders.length; i++) {
			this.renderClouds(root.Folders[i], time);
		};
	},

	renderLinks: function(root) {
		for (var i = 0; i < root.links.length; i++) {
			LineDrawer.draw(root.links[i]);
		};
		for (var i = 0; i < root.Folders.length; i++) {
			this.renderLinks(root.Folders[i]);
		};
	},

	randomiseColors: function(root) {

	}

}