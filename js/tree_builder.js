var TreeManager = {

	maxDepth: 14,

	build: function(root) {
		var origin = vec3.create();
		var white = vec3.create(); vec3.set(white, 1.0, 1.0, 1.0);
		// creating and binding the cloud
		var cloud = PointGenerator.generateCloud(origin, 0.3, white, root.Files, root.depth);
		Scene.clouds.push(cloud);
		// recursively creating children
		for (var i = 0; i < root.Folders.length; i++) {
			var color = Colors.getRandomColor(white);
			var center = PointGenerator.sphericalPoint(2.0 * Math.pow(2.0, root.depth));
			this.recBuild(center, root.Folders[i], color);
			Scene.lines.push(BezierGenerator.rootBezier(center, white, color));
		};
	},

	recBuild: function(center, node, color) {
		// if (node.depth > this.maxDepth) {this.maxDepth = node.depth};
		// creating the cloud
		var cloud = PointGenerator.generateCloud(center, 0.3, color, node.Files, node.depth);
		Scene.clouds.push(cloud);
		// rec
		for (var i = 0; i < node.Folders.length; i++) {
			var nextColor = Colors.getRandomColor(color);
			var nextCenter = PointGenerator.sphericalPointWithinRange(center, 2.0 * Math.pow(2.0, node.depth));
			this.recBuild(nextCenter, node.Folders[i], nextColor);
			var link = BezierGenerator.complexLinkBezier(center, nextCenter, color, nextColor);
			Scene.lines.push(link);
		};
	}

}