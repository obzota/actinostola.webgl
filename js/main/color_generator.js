var Colors = (function () {
	var white = vec3.create(); vec3.set(white, 1.0, 1.0, 1.0);
	var blue = vec3.create(); vec3.set(blue, 0.0, 0.0, 1.0);
	var green = vec3.create(); vec3.set(green, 0.0, 1.0, 0.0);
	var red = vec3.create(); vec3.set(red, 1.0, 0.0, 0.0);
	var sweetGreen = vec3.create(); vec3.set(sweetGreen, 1.0, 1.0, 1.0);
	var black = vec3.create();

	return {
		/**
		 * Constant colors
		 */
		white: white,
		blue: blue,
		green: green,
		red: red,
		sweetGreen: sweetGreen,
		black: black,

		/**
		 * Return a random color
		 *
		 * @method     getRandomColor
		 * @return     {vec3}  any color
		 */
		getRandomColor: function() {
			var color = vec3.create();
			var x = Math.random();
			var y = Math.random();
			var z = Math.random();
			vec3.set(color, x, y, z);
			vec3.normalize(color, color);
			return color;
		},

		getInheritedColor: function (color) {
			var newcolor = this.getRandomColor();
			var res = vec3.create();
			vec3.scale(res, color, 0.8);
			vec3.scaleAndAdd(res, res, newcolor, 0.2);
			return res;
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

		/**
		 * Return a new Color wich is the argument color
		 * multiplied by a factor < 1
		 *
		 * @method     crushColor
		 * @param      {vec3}  color   initial colors
		 * @return     {vec3}  new color
		 */
		crushColor: function(color) {
			var newColor = vec3.create();
			return vec3.scale(newColor, color, 0.8);
		},

		/**
		 * Assure that a color won't have values over 1.0 or under 0.0
		 * (annoying in the shaders)
		 *
		 * @method     resizeColor
		 * @param      {vec3}  color   to be resized
		 * @return     {vec3}  same color with off values truncated
		 */
		resizeColor: function(color) {
			vec3.min(color, color, white);
			return vec3.max(color, color, black);
		},

		/**
		 * return a color in the grayscale with the ratio
		 * d/max of white proportion
		 *
		 * @method     getGray
		 * @param      {number}  d       index
		 * @param      {number}  max     max value for index
		 * @return     {vec3}  color of the grayscale
		 */
		getGray: function(d, max) {
			var ratio = (max - d) / (max);
			var color = vec3.create();
			vec3.scale(color, this.white, ratio);
			return color;
		},

		toHexString: function(color) {
			var res = "#";
			res += this._numToHex(color[0]);
			res += this._numToHex(color[1]);
			res += this._numToHex(color[2]);
			return res;
		},

		_numToHex: function(num) {
			num = Math.floor(num * 255);
			if (num < 16) {
				return "0" + num.toString(16);
			} else {
				return num.toString(16);
			}
		}

	}
})();