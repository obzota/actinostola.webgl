/* * * * * * * * * * * * * * * * * * * * *
	CLASS 	Cloud
 * * * * * * * * * * * * * * * * * * * * */

var Cloud = function(gl, center, radius, color, sizes, delays, depth) {
	this.center = vec3.create();
	vec3.copy(this.center, center);
	this.sizes = sizes;
	this.delays = delays;
	this.radius = radius;
	this.color = color;
	this.size = sizes.length;
	this.focus = false;
	this.depth = depth;

	this.sizesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.sizesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.sizes, gl.STATIC_DRAW);

	this.delaysBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.delaysBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.delays, gl.STATIC_DRAW);

	// this.children = [];
}

/* * * * * * * * * * * * * * * * * * * * *
	OBJ 	PointGenerator
 * * * * * * * * * * * * * * * * * * * * */

var PointGenerator = {

	localSphericalPoint: function (center, radius) {
		var point = this.unitSphericalPoint();
		vec3.scale(point, point, radius);
		vec3.add(point, point, center);
		return point;
	},

	sphericalPoint: function (radius) {
		var point = this.unitSphericalPoint();
		vec3.scale(point, point, radius);
		return point;
	},

	sphericalPointWithinRange: function (center, radius) {
		var res = this.sphericalPoint(radius);
		var dist = vec3.distance(res, center);
		while( dist > 0.8 * radius) {
			res = this.sphericalPoint(radius);
			dist = vec3.distance(res, center);
		}
		return res;
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

		var p = vec3.create();
		vec3.set(p, x, y, z);
		return p;
	},

	generateCloud: function (gl, center, radius, color, objects, depth, delta) {
		var sizes = new Float32Array(objects.length);
		var delays = new Float32Array(objects.length);
		for (var i = 0; i < objects.length; i++) {
			p = this.randomParameter(objects[i].size);
			sizes[i] = p.size;
			delays[i] = p.delay;
		};
		if (delta) {
			for (var i = 1; i < delays.length; i++) {
				delays[i] = delays[i-1] + delta;
			};
		};
		return new Cloud(gl, center, radius, color, sizes, delays, depth);
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