/* * * * * * * * * * * * * * * * * * * * * 
	CLASS 	Point
 * * * * * * * * * * * * * * * * * * * * */

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

/* * * * * * * * * * * * * * * * * * * * * 
	CLASS 	Cloud
 * * * * * * * * * * * * * * * * * * * * */

var Cloud = function(center, radius, color, sizes, delays) {
	this.center = vec3.create();
	vec3.set(this.center, center.x, center.y, center.z);
	this.sizes = sizes;
	this.delays = delays;
	this.radius = radius;
	this.color = color;
	this.size = sizes.length;
	this.focus = false;

	this.sizesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.sizesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.sizes, gl.STATIC_DRAW);

	this.delaysBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.delaysBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.delays, gl.STATIC_DRAW);
}

/* * * * * * * * * * * * * * * * * * * * * 
	OBJ 	PointGenerator
 * * * * * * * * * * * * * * * * * * * * */

var PointGenerator = {

	localSphericalPoint: function (radius, center) {
		var point = this.unitSphericalPoint();
		point.mult(radius);
		point.add(center);
		return point;
	},

	sphericalPoint: function (radius) {
		var point = this.unitSphericalPoint();
		point.mult(radius);
		return point;
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

	generateCloud: function (center, radius, color, objects) {
		var sizes = new Float32Array(objects.length);
		var delays = new Float32Array(objects.length);
		for (var i = 0; i < objects.length; i++) {
			p = this.randomParameter(objects[i].size);
			sizes[i] = p.size;
			delays[i] = p.delay;
		};
		return new Cloud(center, radius, color, sizes, delays);
	},

	randomParameter: function(size) {
		var p = {speed: 1.0, delay: 0.0, size: 1.0};
		if (size) {
			p.size = Math.floor(Math.log10(size));
			p.size = Math.max(1.0, p.size);
		};
		p.delay = Math.random() * 10000;
		return p;
	} 

}