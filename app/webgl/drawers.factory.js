var Drawer = function(gl, program) {
	this.gl = gl;
	// Here comes uniforms and attributes declared in the shaders
	this.program = program;
	this.aPositionLoc = this.gl.getAttribLocation(program, "a_Position"),
	this.aNormalLoc =  this.gl.getAttribLocation(program, "a_Normal"),
	this.uProjectionLoc = this.gl.getUniformLocation(program, "u_Projection"),
	this.uCameraLoc = this.gl.getUniformLocation(program, "u_Camera"),
	this.uColorLoc = this.gl.getUniformLocation(program, "u_Color"),
	this.uEyePositionLoc = this.gl.getUniformLocation(program, "u_EyePosition"),
	this.uLuxPositionLoc = this.gl.getUniformLocation(program, "u_LuxPosition")
};

Drawer.prototype.setViewport = function (camera, projection) {
	this.gl.useProgram(this.program);
	this.gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
	this.gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix());
	this.gl.uniform3fv(this.uEyePositionLoc, camera.eye);
};

Drawer.prototype.setProgram = function () {
	this.gl.useProgram(this.program);
};

Drawer.prototype.draw = function (mesh) {
	this.gl.uniform3fv(this.uColorLoc, mesh.color);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.vertexBuffer);
	this.gl.enableVertexAttribArray(this.aPositionLoc);
	this.gl.vertexAttribPointer(this.aPositionLoc, 3, this.gl.FLOAT, false, 0, 0);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.normalBuffer);
	this.gl.enableVertexAttribArray(this.aNormalLoc);
	this.gl.vertexAttribPointer(this.aNormalLoc, 3, this.gl.FLOAT, false, 0, 0);

	this.gl.drawArrays(this.gl.TRIANGLES, 0, mesh.vertex.length/3);
};

var LineDrawer = function(gl, program) {
	this.gl = gl;
	this.program = program;
	this.aPositionLoc = this.gl.getAttribLocation(program, "a_Position");
	this.uProjectionLoc = this.gl.getUniformLocation(program, "u_Projection");
	this.uTimeLoc = this.gl.getUniformLocation(program, "u_Time");
	this.uCameraLoc = this.gl.getUniformLocation(program, "u_Camera");
	this.uColorOriginLoc = this.gl.getUniformLocation(program, "u_Color_Origin");
	this.uColorDestLoc = this.gl.getUniformLocation(program, "u_Color_Dest");
	this.uMaxIndexLoc = this.gl.getUniformLocation(program, "u_MaxIndex");
	this.aIndexLoc = this.gl.getAttribLocation(program, "a_Index");

	this.uOffsetLoc = this.gl.getUniformLocation(program, "u_Offset");
	this.uPeriodLoc = this.gl.getUniformLocation(program, "u_Period");
};

LineDrawer.prototype.setViewport = function (camera, projection) {
	this.gl.useProgram(this.program);
	this.gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
	this.gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix());
};

LineDrawer.prototype.setProgram = function () {
	this.gl.useProgram(this.program);
};

LineDrawer.prototype.draw = function (line, time) {
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, line.vertexBuffer);
	this.gl.enableVertexAttribArray(this.aPositionLoc);
	this.gl.vertexAttribPointer(this.aPositionLoc, 3, this.gl.FLOAT, false, 0, 0);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, line.indexBuffer);
	this.gl.enableVertexAttribArray(this.aIndexLoc);
	this.gl.vertexAttribPointer(this.aIndexLoc, 1, this.gl.FLOAT, false, 0, 0);

	this.gl.uniform3fv(this.uColorOriginLoc, line.color0);
	this.gl.uniform3fv(this.uColorDestLoc, line.color1);
	this.gl.uniform1f(this.uMaxIndexLoc, line.indices.length);
	this.gl.uniform1f(this.uTimeLoc, time);
	this.gl.uniform1f(this.uOffsetLoc, line.offset);
	this.gl.uniform1f(this.uPeriodLoc, line.period);
	this.gl.drawArrays(this.gl.LINE_STRIP, 0, line.vertex.length/3);

	// gl.bindBuffer(gl.ARRAY_BUFFER, line.colorBuffer);
	// gl.enableVertexAttribArray(this.aColorLoc);
	// gl.vertexAttribPointer(this.aColorLoc, 3, gl.FLOAT, false, 0, 0);
};

var CloudDrawer = function(gl, program) {
	this.gl = gl;
	this.program = program;
	this.uTimeLoc = this.gl.getUniformLocation(program, "u_Time");
	this.uPositionLoc = this.gl.getUniformLocation(program, "u_Position");
	this.uProjectionLoc = this.gl.getUniformLocation(program, "u_Projection");
	this.uCameraLoc = this.gl.getUniformLocation(program, "u_Camera");
	this.uColorLoc = this.gl.getUniformLocation(program, "u_Color");

	this.uRadiusLoc = this.gl.getUniformLocation(program, "u_Radius");
	this.uFocus = this.gl.getUniformLocation(program, "u_Focus"); // toggle if focus is on the object

	this.aSizeLoc = this.gl.getAttribLocation(program, "a_Size");
	this.aDelayLoc = this.gl.getAttribLocation(program, "a_Delay");

	this.mode = this.gl.POINTS;
};

CloudDrawer.prototype.setViewport = function (camera, projection) {
	this.gl.useProgram(this.program);
	this.gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
	this.gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix());
};

CloudDrawer.prototype.setProgram = function () {
	this.gl.useProgram(this.program);
};

CloudDrawer.prototype.draw = function (cloud, time) {
	this.gl.uniform1f(this.uTimeLoc, time);
	this.gl.uniform1f(this.uRadiusLoc, cloud.radius);
	this.gl.uniform3fv(this.uPositionLoc, cloud.center);
	this.gl.uniform4fv(this.uColorLoc, cloud.color);

	this.gl.uniform1i(this.uFocus, cloud.focus);

	if (this.aSizeLoc != -1) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cloud.sizesBuffer);
		this.gl.enableVertexAttribArray(this.aSizeLoc);
		this.gl.vertexAttribPointer(this.aSizeLoc, 1, this.gl.FLOAT, false, 0, 0);
	};
	if (this.aDelayLoc != -1) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cloud.delaysBuffer);
		this.gl.enableVertexAttribArray(this.aDelayLoc);
		this.gl.vertexAttribPointer(this.aDelayLoc, 1, this.gl.FLOAT, false, 0, 0);
	}

	this.gl.drawArrays(this.mode, 0, cloud.size);
};

var PointDrawer = function(gl, program) {
	this.gl = gl;
	this.program = program;
	this.aPositionLoc = this.gl.getAttribLocation(program, "a_Position");
	this.uProjectionLoc = this.gl.getUniformLocation(program, "u_Projection");
	this.uCameraLoc = this.gl.getUniformLocation(program, "u_Camera");
	this.mode = this.gl.POINTS;
	// this.uColorLoc = this.gl.getUniformLocation(program, "u_Color");
};

PointDrawer.prototype.setViewport = function (camera, projection) {
	this.gl.useProgram(this.program);
	this.gl.uniformMatrix4fv(this.uCameraLoc, false, camera.getMatrix());
	this.gl.uniformMatrix4fv(this.uProjectionLoc, false, projection.getMatrix());
};

PointDrawer.prototype.setProgram = function () {
	this.gl.useProgram(this.program);
};

PointDrawer.prototype.draw = function (points, time) {
	// this.gl.uniform4fv(this.uColorLoc, [0.0, 1.0, 0.0, 1.0]);

	var tmpbuffer = this.gl.createBuffer();
	var array = new Float32Array(3*points.length);
	for (var i = 0; i < points.length; i++) {
		array[3*i+0] = points[i][0];
		array[3*i+1] = points[i][1];
		array[3*i+2] = points[i][2];
	};
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tmpbuffer);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, array, this.gl.STATIC_DRAW);

	this.gl.enableVertexAttribArray(this.aPositionLoc);
	this.gl.vertexAttribPointer(this.aPositionLoc, 3, this.gl.FLOAT, false, 0, 0);

	this.gl.drawArrays(this.mode, 0, array.length/3);
};
