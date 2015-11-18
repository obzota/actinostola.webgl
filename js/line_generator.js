var Line  = function(vertex) {
	this.vertex = vertex;
	this.indices = new Float32Array(vertex.length/3);
	for (var i = 0; i < this.indices.length; i++) {
		this.indices[i] = i;
	};

	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.vertex, gl.STATIC_DRAW);

	this.indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.indexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

}

var BezierGenerator = {
	size: 100,

	LinkBezier: function(p0, p3) {
		var size = 100;
		var rad0 = p0.radius();
		var rad3 = p3.radius();

		// var rat1 = ( rad0 + (rad3 - rad0) * 0.4 ) / rad0;
		// var rat2 = ( rad3 - (rad3 - rad0) * 0.4 ) / rad3;
		var rat1 = 2;
		var rat2 = 0.5;

		var p1 = new Point(rat1*p0.x, rat1*p0.y, rat1*p0.z);
		var p2 = new Point(rat2*p3.x, rat2*p3.y, rat2*p3.z);

		var curve = new Bezier(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z).getLUT(size);
		var vertex = new Float32Array(3*(size+1));
		for (var i = 0; i < curve.length; i++) {
			vertex[3*i] = curve[i].x;
			vertex[3*i+1] = curve[i].y;
			vertex[3*i+2] = curve[i].z;
		};

		return new Line(vertex);
	},

	RootBezier: function (p3) {
		var size = 100;

		var rad = p3.radius();
		var rat = 0.5;

		var p0 = new Point(0,0,0);
		var p1 = PointGenerator.sphericalPoint(rad);
		var p2 = new Point(rat*p3.x, rat*p3.y, rat*p3.z);

		var curve = new Bezier(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z).getLUT(size);
		var vertex = new Float32Array(3*(size+1));
		for (var i = 0; i < curve.length; i++) {
			vertex[3*i] = curve[i].x;
			vertex[3*i+1] = curve[i].y;
			vertex[3*i+2] = curve[i].z;
		};

		return new Line(vertex);
	}
}