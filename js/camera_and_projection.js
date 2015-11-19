var Camera = {

	init: function(xe, ye, ze, xc, yc, zc, xn, yn, zn) {
		// default :
		this.eye = vec3.create(); // eye in world coord
		this.localEye = vec3.create(); // unit vector in centered (local) coord
		this.radius = 1.0; // distance from center to eye (> 0)

		this.center = vec3.create();
		this.up = vec3.create(); // giving up direction to camera
		this.wasChanged = false; // the need to re-compute this.mat
		this.mat = mat4.create();

		this.set(xe, ye, ze, xc, yc, zc, xn, yn, zn);

	},

	set: function(xe, ye, ze, xc, yc, zc, xn, yn, zn) {
		// classic settings
		vec3.set(this.eye, xe, ye, ze);
		vec3.set(this.center, xc, yc, zc);
		vec3.set(this.up, xn, yn, zn);
		// cleaning 'up' vector
		vec3.normalize(this.up, this.up);
		// local settings
		vec3.sub(this.localEye, this.eye, this.center);
		this.radius = vec3.len(this.localEye);
		vec3.normalize(this.localEye, this.localEye);
		// need to compute mat
		this.wasChanged = true;
	},

	setFocus: function(center) {
		vec3.copy(this.center, center);
		this.computeEye();
	},

	computeEye: function() {
		vec3.normalize(this.localEye, this.localEye);
		vec3.scaleAndAdd(this.eye, this.center, this.localEye, this.radius);
		this.wasChanged = true;
	},

	computeUp: function() {
		var scale = vec3.dot(this.up, this.localEye);
		vec3.scaleAndAdd(this.up, this.up, this.localEye, scale);
		vec3.normalize(this.up, this.up);
		console.log(up);
	},

	changeRadius: function(dscroll) {
		this.radius *= (100.0 + dscroll) / 100.0;
		if (this.radius < 0.1) {this.radius = 0.1};
		this.computeEye();
	},

	getMatrix: function() {
		if (this.wasChanged) {
			this.computeEye();
			mat4.lookAt(this.mat, this.eye, this.center, this.up);
			this.wasChanged = false;
		};
		return this.mat;
	},

	mouseMoveUpdate: function(dx, dy) {
		// console.log("dx : " + dx + " - dy : " + dy);
		// console.log(this.localEye);
		var toCenter = vec3.create();
		vec3.negate(toCenter, this.localEye);

		var side = vec3.create();
		vec3.cross(side, toCenter, this.up);
		vec3.normalize(side, side); // should be normal but who knows

		// console.log(toCenter);
		// console.log(this.up);
		// console.log(side);

		/* now the local system is (toCenter, up, side) 
			As the rotation angle is little we approximate the new position
			with a vector in the plane of the camera (up, side) */
		vec3.scaleAndAdd(this.localEye, this.localEye, side, -dx/100); // update local x-axis
		vec3.scaleAndAdd(this.localEye, this.localEye, this.up, dy/100); // update local y-axis
		this.computeEye();
		// console.log(this.localEye);

		// calculating the new up of camera
		// this.computeUp();
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