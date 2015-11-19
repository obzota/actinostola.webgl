var TreeManager = {

	maxDepth: 14,

	build: function(root) {
		var origin = vec3.create();
		var white = vec3.create(); vec3.set(white, 1.0, 1.0, 1.0);
		var cloud = PointGenerator.generateCloud(origin, 0.3, white, root.Files, root.depth);
		Scene.clouds.push(cloud);
		for (var i = 0; i < root.Folders.length; i++) {
			var center = PointGenerator.sphericalPoint(2.0 * Math.pow(2.0, root.depth));
			this.recBuild(center, root.Folders[i], center);
			Scene.lines.push(BezierGenerator.rootBezier(center, white, center));
		};
	},

	recBuild: function(center, node, color) {
		if (node.depth > this.maxDepth) {this.maxDepth = node.depth};
		var cloud = PointGenerator.generateCloud(center, 0.3, color, node.Files, node.depth);
		Scene.clouds.push(cloud);
		for (var i = 0; i < node.Folders.length; i++) {
			var nextCenter = PointGenerator.sphericalPointWithinRange(center, 2.0 * Math.pow(2.0, node.depth));
			this.recBuild(nextCenter, node.Folders[i], nextCenter);
			var nextColor = vec3.create(); vec3.sub(nextColor, nextCenter, center);
			var link = BezierGenerator.complexLinkBezier(center, nextCenter, color, nextColor);
			Scene.lines.push(link);
		};
	}

}