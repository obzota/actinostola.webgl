var Camera = {

	init: function(xe, ye, ze, xc, yc, zc, xn, yn, zn) {
		this.eye = vec3.create();
		this.center = vec3.create();
		this.up = vec3.create();
		this.mat = mat4.create();
		this.set(xe, ye, ze, xc, yc, zc, xn, yn, zn);
	},

	set: function(xe, ye, ze, xc, yc, zc, xn, yn, zn) {
		vec3.set(this.eye, xe, ye, ze);
		vec3.set(this.center, xc, yc, zc);
		vec3.set(this.up, xn, yn, zn);
		mat4.lookAt(this.mat, this.eye, this.center, this.up);
	},

	getMatrix: function() {
		return this.mat;
	}
}

var Projection = {

	init: function(fovy, aspect, near, far) {
		this.fovy = fovy;
		this.aspect = aspect;
		this.near = near;
		this.far = far;
		this.mat = mat4.create();
		this.computeMatrix();
	},

	computeMatrix: function() {
		mat4.perspective(this.mat, this.fovy, this.aspect, this.near, this.far);
	},

	setAspect: function() {
		this.aspect = canva.clientWidth / canva.clientHeight;
	},

	getMatrix: function() {
		this.computeMatrix();
		return this.mat;
	}
}