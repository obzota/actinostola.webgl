var Drawable = function (vertex, normals, color) {
	this.vertex = vertex;
	this.normals = normals;
	this.color = color;
	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.vertex, gl.STATIC_DRAW);
	this.normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
}

var Builder = {

	build: function(object, pos, scale, color) {
		var buffedVertex = new Float32Array(object.nFaces*9);
		var buffedNormals = new Float32Array(object.nFaces*9);
		for (var i = 0; i < object.nFaces; i++) {
			var f = object.faces[i];

			var v0 = vec4.create();
			vec4.set(v0, object.vertex[3*(f.v0-1)], object.vertex[3*(f.v0-1)+1], object.vertex[3*(f.v0-1)+2], 1);
			var v1 = vec4.create();
			vec4.set(v1, object.vertex[3*(f.v1-1)], object.vertex[3*(f.v1-1)+1], object.vertex[3*(f.v1-1)+2], 1);
			var v2 = vec4.create();
			vec4.set(v2, object.vertex[3*(f.v2-1)], object.vertex[3*(f.v2-1)+1], object.vertex[3*(f.v2-1)+2], 1);

			var n0 = vec4.create();
			vec4.set(n0, object.normals[3*(f.n0-1)], object.normals[3*(f.n0-1)+1], object.normals[3*(f.n0-1)+2], 1);
			var n1 = vec4.create();
			vec4.set(n1, object.normals[3*(f.n1-1)], object.normals[3*(f.n1-1)+1], object.normals[3*(f.n1-1)+2], 1);
			var n2 = vec4.create();
			vec4.set(n2, object.normals[3*(f.n2-1)], object.normals[3*(f.n2-1)+1], object.normals[3*(f.n2-1)+2], 1);
 
			var mat = mat4.create();
			mat4.identity(mat);
			var s = vec3.create(); vec3.set(s, scale, scale, scale);
			var t = vec3.create(); vec3.set(t, pos[0], pos[1], pos[2]);
			mat4.translate(mat, mat, t);
			mat4.scale(mat, mat, s);

			vec4.transformMat4(v0, v0, mat); 
			vec4.transformMat4(v1, v1, mat);
			vec4.transformMat4(v2, v2, mat);
			vec4.transformMat4(n0, n0, mat);
			vec4.transformMat4(n1, n1, mat);
			vec4.transformMat4(n2, n2, mat);

			buffedVertex[9*i+0] = v0[0];
			buffedVertex[9*i+1] = v0[1];
			buffedVertex[9*i+2] = v0[2];
			buffedVertex[9*i+3] = v1[0];
			buffedVertex[9*i+4] = v1[1];
			buffedVertex[9*i+5] = v1[2];
			buffedVertex[9*i+6] = v2[0];
			buffedVertex[9*i+7] = v2[1];
			buffedVertex[9*i+8] = v2[2];

			buffedNormals[9*i+0] = n0[0];
			buffedNormals[9*i+1] = n0[1];
			buffedNormals[9*i+2] = n0[2];
			buffedNormals[9*i+3] = n1[0];
			buffedNormals[9*i+4] = n1[1];
			buffedNormals[9*i+5] = n1[2];
			buffedNormals[9*i+6] = n2[0];
			buffedNormals[9*i+7] = n2[1];
			buffedNormals[9*i+8] = n2[2];
		};

		return new Drawable(buffedVertex, buffedNormals, color);
	},
}