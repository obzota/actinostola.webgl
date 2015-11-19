var Drawer = {
	// Here comes uniforms and attributes declared in the shaders
	init: function(program) {
		this.program = program;
		this.aPositionLoc = gl.getAttribLocation(program, "a_Position"),
		this.aNormalLoc =  gl.getAttribLocation(program, "a_Normal"),
		this.uProjectionLoc = gl.getUniformLocation(program, "u_Projection"),
		this.uCameraLoc = gl.getUniformLocation(program, "u_Camera"),
		this.uColorLoc = gl.getUniformLocation(program, "u_Color")
	},

	setViewport: function (camera, projection) {
		gl.useProgram(this.program);
		gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
		gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix())
	},

	setProgram: function () {
		gl.useProgram(this.program);
	},

	drawObject: function (mesh) {
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
		this.program = program;
		this.aPositionLoc = gl.getAttribLocation(program, "a_Position");
		this.uProjectionLoc = gl.getUniformLocation(program, "u_Projection");
		this.uCameraLoc = gl.getUniformLocation(program, "u_Camera");
		this.uColorOriginLoc = gl.getUniformLocation(program, "u_Color_Origin");
		this.uColorDestLoc = gl.getUniformLocation(program, "u_Color_Dest");
		this.uMaxIndexLoc = gl.getUniformLocation(program, "u_MaxIndex");
		this.aIndexLoc = gl.getAttribLocation(program, "a_Index");
	},

	setViewport: function (camera, projection) {
		gl.useProgram(this.program);
		gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
		gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix());
	},

	setProgram: function () {
		gl.useProgram(this.program);
	},

	drawLine: function (line) {
		gl.bindBuffer(gl.ARRAY_BUFFER, line.vertexBuffer);
		gl.enableVertexAttribArray(this.aPositionLoc);
		gl.vertexAttribPointer(this.aPositionLoc, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, line.indexBuffer);
		gl.enableVertexAttribArray(this.aIndexLoc);
		gl.vertexAttribPointer(this.aIndexLoc, 1, gl.FLOAT, false, 0, 0);

		gl.uniform3fv(this.uColorOriginLoc, line.color0);
		gl.uniform3fv(this.uColorDestLoc, line.color1);
		gl.uniform1f(this.uMaxIndexLoc, line.indices.length);

		gl.drawArrays(gl.LINE_STRIP, 0, line.vertex.length/3);

		// gl.bindBuffer(gl.ARRAY_BUFFER, line.colorBuffer);
		// gl.enableVertexAttribArray(this.aColorLoc);
		// gl.vertexAttribPointer(this.aColorLoc, 3, gl.FLOAT, false, 0, 0);
	}
}

var CloudDrawer = {
	init: function(program) {
		this.program = program;
		this.uTimeLoc = gl.getUniformLocation(program, "u_Time");
		this.uPositionLoc = gl.getUniformLocation(program, "u_Position");
		this.uProjectionLoc = gl.getUniformLocation(program, "u_Projection");
		this.uCameraLoc = gl.getUniformLocation(program, "u_Camera");
		this.uColorLoc = gl.getUniformLocation(program, "u_Color");

		this.uRadiusLoc = gl.getUniformLocation(program, "u_Radius");
		this.uFocus = gl.getUniformLocation(program, "u_Focus"); // toggle if focus is on the object

		this.aSizeLoc = gl.getAttribLocation(program, "a_Size");
		this.aDelayLoc = gl.getAttribLocation(program, "a_Delay");
	},

	setViewport: function (camera, projection) {
		gl.useProgram(this.program);
		gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
		gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix());
	},

	setProgram: function () {
		gl.useProgram(this.program);
	},

	draw: function (cloud, time) {
		gl.uniform1f(this.uTimeLoc, time);
		gl.uniform1f(this.uRadiusLoc, cloud.radius);
		gl.uniform3fv(this.uPositionLoc, cloud.center);
		gl.uniform4fv(this.uColorLoc, cloud.color);

		gl.uniform1i(this.uFocus, cloud.focus);

		if (this.aSizeLoc != -1) {
			gl.bindBuffer(gl.ARRAY_BUFFER, cloud.sizesBuffer);
			gl.enableVertexAttribArray(this.aSizeLoc);
			gl.vertexAttribPointer(this.aSizeLoc, 1, gl.FLOAT, false, 0, 0);
		};
		if (this.aDelayLoc != -1) {
			gl.bindBuffer(gl.ARRAY_BUFFER, cloud.delaysBuffer);
			gl.enableVertexAttribArray(this.aDelayLoc);
			gl.vertexAttribPointer(this.aDelayLoc, 1, gl.FLOAT, false, 0, 0);
		}

		gl.drawArrays(gl.POINTS, 0, cloud.size);
	}
}

var PointDrawer = {
	init: function(program) {
		this.program = program;
		this.aPositionLoc = gl.getUniformLocation(program, "a_Position");
		this.uProjectionLoc = gl.getUniformLocation(program, "u_Projection");
		this.uCameraLoc = gl.getUniformLocation(program, "u_Camera");
		this.uColorLoc = gl.getUniformLocation(program, "u_Color");
	},

	setViewport: function (camera, projection) {
		gl.useProgram(this.program);
		gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
		gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix());
	},

	setProgram: function () {
		gl.useProgram(this.program);
	},

	draw: function (point, time) {
		gl.uniform4fv(this.uColorLoc, [0.0, 1.0, 0.0, 1.0]);

		var tmpbuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, tmpbuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(this.aPositionLoc);
		gl.vertexAttribPointer(this.aPositionLoc, 3, gl.FLOAT, false, 0, 0);

		gl.drawArrays(gl.POINTS, 0, 1);
	}
}