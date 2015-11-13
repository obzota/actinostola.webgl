var Point = function (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Point.prototype = {
	add: function(b) {
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
	},

	mult: function(scal) {
		this.x *= scal;
		this.y *= scal;
		this.z *= scal;
	},

	radius: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},

	isOrigin: function() {
		return this.x == 0 && this.y == 0 && this.z == 0;
	}
}

var PointGenerator = {

	sphericalPoint: function (radius, center) {
		var point = this.unitSphericalPoint();
		return new Point(point.x*radius+center.x,
			 			point.y*radius+center.y,
			 				point.z*radius+center.z);
	},

	unitSphericalPoint: function () {
		var x1 = 1, x2 = 1, x3 = 1, x0 = 1;
		while ((x1*x1 + x2*x2 + x3*x3 + x0*x0) >= 1) {
			x1 = Math.random() * 2 -1;
			x2 = Math.random() * 2 -1;
			x3 = Math.random() * 2 -1;
			x0 = Math.random() * 2 -1;
		}
		var normQuad = x1*x1 + x2*x2 + x3*x3 + x0*x0;
		var x = 2 * (x1 * x3 + x0 * x2) / normQuad;
		var y = 2 * (x2 * x3 - x0 * x1) / normQuad;
		var z = (x0*x0 + x3*x3 - x1*x1 - x2*x2) / normQuad;
		return new Point(x, y, z);
	},

}