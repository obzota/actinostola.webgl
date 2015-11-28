var Line  = function(gl, vertex, color0, color1) {
	this.vertex = vertex;
	this.indices = new Float32Array(vertex.length/3);
	for (var i = 0; i < this.indices.length; i++) {
		this.indices[i] = i;
	};

	this.color1 = color1;
	this.color0 = color0;

	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.vertex, gl.STATIC_DRAW);

	this.indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.indexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

}

var BezierGenerator = {
	size: 100,

	linkBezier: function(gl, p0, p3, color0, color1) {
		var size = 100;
		var rad0 = vec3.len(p0);
		var rad3 = vec3.len(p3);

		// var rat1 = ( rad0 + (rad3 - rad0) * 0.4 ) / rad0;
		// var rat2 = ( rad3 - (rad3 - rad0) * 0.4 ) / rad3;
		var rat1 = 1.5;
		var rat2 = 0.9;

		var p1 = vec3.create(); vec3.scale(p1, p0, rat1);
		var p2 = vec3.create(); vec3.scale(p2, p3, rat2);
		var mid = vec3.create(); vec3.lerp(mid, p0, p3, 0.5);
		// var p1 = PointGenerator.localSphericalPoint(mid, rad0/2.0);
		// var p2 = PointGenerator.localSphericalPoint(mid, rad0/2.0);

		var curve = new Bezier(p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2]).getLUT(size);
		var vertex = new Float32Array(3*(size+1));
		for (var i = 0; i < curve.length; i++) {
			vertex[3*i] = curve[i].x;
			vertex[3*i+1] = curve[i].y;
			vertex[3*i+2] = curve[i].z;
		};

		return new Line(gl, vertex, color0, color1);
	},

	complexLinkBezier: function(gl, p0, p3, color0, color1) {
		var size = 100;
		var rad0 = vec3.len(p0);
		var rad3 = vec3.len(p3);

		// var rat1 = ( rad0 + (rad3 - rad0) * 0.4 ) / rad0;
		// var rat2 = ( rad3 - (rad3 - rad0) * 0.4 ) / rad3;
		var rat1 = 1.1;
		var rat2 = 0.9;

		var p1 = vec3.create(); vec3.scale(p1, p0, rat1);
		var p2 = vec3.create(); vec3.scale(p2, p3, rat2);
		var m1 = vec3.create(); vec3.lerp(m1, p0, p3, 0.5);

		var m0 = vec3.create(); vec3.lerp(m0, p1, m1, 0.5);
		var m2 = vec3.create(); vec3.lerp(m2, m1, p2, 0.5);

		var disturb = PointGenerator.sphericalPoint(rad0/4);
		vec3.add(m0, m1, disturb);
		vec3.add(m2, m1, vec3.negate(disturb, disturb));
		if (vec3.distance(m0, p0) > vec3.distance(m2, p0)) {
			var tmp = m0;
			m0 = m2;
			m2 = tmp;
		}

		var curve0 = new Bezier(p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], m0[0], m0[1], m0[2], m1[0], m1[1], m1[2]).getLUT(size);
		var curve1 = new Bezier(m1[0], m1[1], m1[2], m2[0], m2[1], m2[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2]).getLUT(size);

		var vertex = new Float32Array(2*3*(size+1));
		for (var i = 0; i < curve0.length; i++) {
			vertex[3*i] = curve0[i].x;
			vertex[3*i+1] = curve0[i].y;
			vertex[3*i+2] = curve0[i].z;
		};
		for (var i = 0; i < curve1.length; i++) {
			vertex[3*(i+size+1)+0] = curve1[i].x;
			vertex[3*(i+size+1)+1] = curve1[i].y;
			vertex[3*(i+size+1)+2] = curve1[i].z;
		};

		return new Line(gl, vertex, color0, color1);
	},

	rootBezier: function (gl, p3, color0, color1) {
		var size = 100;

		var rad = vec3.len(p3);
		var rat = 0.5;

		var p0 = vec3.create();
		vec3.set(p0, 0, 0, 0);
		var p1 = PointGenerator.sphericalPoint(rad);
		var p2 = vec3.create();
		vec3.scale(p2, p3, rat);

		var curve = new Bezier(p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2]).getLUT(size);
		var vertex = new Float32Array(3*(size+1));
		for (var i = 0; i < curve.length; i++) {
			vertex[3*i] = curve[i].x;
			vertex[3*i+1] = curve[i].y;
			vertex[3*i+2] = curve[i].z;
		};

		return new Line(gl, vertex, color0, color1);
	}
}