var Colors = (function () {
	var white = vec3.create(); vec3.set(white, 1.0, 1.0, 1.0);
	var blue = vec3.create(); vec3.set(blue, 0.0, 0.0, 1.0);
	var green = vec3.create(); vec3.set(green, 0.0, 1.0, 0.0);
	var red = vec3.create(); vec3.set(red, 1.0, 0.0, 0.0);
	var sweetGreen = vec3.create(); vec3.set(sweetGreen, 1.0, 1.0, 1.0);
	var black = vec3.create();
	return {
		white: white,
		blue: blue,
		green: green,
		red: red,
		sweetGreen: sweetGreen,
		black: black,

		getRandomColor: function() {
			var color = vec3.create();
			var x = Math.random();
			var y = Math.random();
			var z = Math.random();
			vec3.set(color, x, y, z);
			vec3.normalize(color, color);
			return color;
		},

		extendColor: function(color) {
			var newColor = PointGenerator.sphericalPoint(0.4);
			vec3.add(newColor, color, newColor);
			this.resizeColor(newColor);
			return vec3.normalize(newColor, newColor);
		},

		diminishColor: function(color) {
			var newColor = PointGenerator.sphericalPoint(0.4);
			if (newColor[0]<0) {newColor[0]=-newColor[0]};
			if (newColor[1]<0) {newColor[1]=-newColor[1]};
			if (newColor[2]<0) {newColor[2]=-newColor[2]};
			vec3.sub(newColor, color, newColor);
			return this.resizeColor(newColor);
		},

		crushColor: function(color) {
			var newColor = vec3.create();
			return vec3.scale(newColor, color, 0.8);
		},

		resizeColor: function(color) {
			vec3.min(color, color, white);
			return vec3.max(color, color, black);
		}

	}
})();