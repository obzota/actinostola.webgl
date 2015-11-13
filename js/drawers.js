var Drawer = {
	// Here comes uniforms and attributes declared in the shaders
	init: function(program) {
		this.aPositionLoc = gl.getAttribLocation(program, "a_Position"),
		this.aNormalLoc =  gl.getAttribLocation(program, "a_Normal"),
		this.uProjectionLoc = gl.getUniformLocation(program, "u_Projection"),
		this.uCameraLoc = gl.getUniformLocation(program, "u_Camera"),
		this.uColorLoc = gl.getUniformLocation(program, "u_Color")
	},

	setViewport: function (camera, projection) {
		gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
		gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix())
	},

	drawObject: function (mesh) {
		console.log(mesh);
		gl.uniform4fv(this.uColorLoc, mesh.color);

		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
		gl.enableVertexAttribArray(this.aPositionLoc);
		gl.vertexAttribPointer(this.aPositionLoc, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
		gl.enableVertexAttribArray(this.aNormalLoc);
		gl.vertexAttribPointer(this.aNormalLoc, 3, gl.FLOAT, false, 0, 0);

		gl.drawArrays(gl.POINTS, 0, mesh.vertex.length/3);
	}
} 

var LineDrawer = {
	init: function(program) {
		this.aPositionLoc = gl.getAttribLocation(program, "a_Position"),
		this.aColorLoc = gl.getAttribLocation(program, "a_Color"),
		this.uProjectionLoc = gl.getUniformLocation(program, "u_Projection"),
		this.uCameraLoc = gl.getUniformLocation(program, "u_Camera"),
		this.uColorLoc = gl.getUniformLocation(program, "u_Color")
	},

	setViewport: function (camera, projection) {
		gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
		gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix());
	},

	drawLine: function (line) {
		console.log(line);
		gl.bindBuffer(gl.ARRAY_BUFFER, line.vertexBuffer);
		gl.enableVertexAttribArray(this.aPositionLoc);
		gl.vertexAttribPointer(this.aPositionLoc, 3, gl.FLOAT, false, 0, 0);

		gl.drawArrays(gl.LINE_STRIP, 0, line.vertex.length/3);

		// gl.bindBuffer(gl.ARRAY_BUFFER, line.colorBuffer);
		// gl.enableVertexAttribArray(this.aColorLoc);
		// gl.vertexAttribPointer(this.aColorLoc, 3, gl.FLOAT, false, 0, 0);
	}
}