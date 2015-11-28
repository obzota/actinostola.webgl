var Matrix = function {

}

function matrixTranslation(tx, ty, tz) {
	return [
		1,  0,  0, tx,
		0,  1,  0, ty,
		0,  0,  1, tz,
		0,  0,  0,  1
	];
}

function matrixXRotation(angleRad) {
	var c = Math.cos(angleRad);
	var s = Math.sin(angleRad);

	return [
		1,  0,  0,  0,
		0,  c,  -s, 0,
		0,  s,  c,  0,
		0,  0,  0,  1
	];
}

function matrixYRotation(angleRad) {
	var c = Math.cos(angleRad);
	var s = Math.sin(angleRad);

	return [
		 c, 0, s, 0,
		 0, 1, 0, 0,
		-s, 0, c, 0,
		 0, 0, 0, 1
	];
}

function matrixZRotation(angleRad) {
	var c = Math.cos(angleRad);
	var s = Math.sin(angleRad);

	return [
		c, -s, 0, 0,
		s,  c, 0, 0,
		0,  0, 1, 0,
		0,  0, 0, 1
	];
}

function matrixRotation(angle, axis) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);

	var kx = axis[0];
	var ky = axis[1];
	var kz = axis[2];

	return [
		kx*kx*(1-c)+c,
		kz*kx*(1-c)-kz*s,
		kx*kz*(1-c)+ky*s,

		ky*kx*(1-c)+kz*s,
		kz*kx*(1-c)+c,
		ky*kz*(1-c)-kx*s,

		kz*kx*(1-c)-ky*s,
		kx*kz*(1-c)-kx*s,
		kz*kz*(1-c)+c
	];
}

function matrixScale(sx, sy, sz) {
	return [
		sx, 0,  0,  0,
		0,  sy, 0,  0,
		0,  0,  sz, 0,
		0,  0,  0,  1
	];
}


function orthographicProjection(l, b, n, r, t, f) {
	return [
		2/(r-l), 0, 0, -(r+l)/(r-l),
		0, 2/(t-b), 0, -(t+b)/(t-b),
		0, 0, -2/(f-n), -(f+n)/(f-n),
		0,  0,  0,  1
	];
}

function frustrumProjection(left, right, bot, top, near, far) {
	return [
		2*near/(right-left), 0, (right+left)/(right-left), 0,
		0, 2*near/(top-bot), (top+bottom)/(top-bottom), 0,
		0, 0, -(far+near)/(far-near), -2*far*near/(far-near),
		0, 0, -1, 0,
	]
}

function perspectiveProjection(fovy, aspect, near, far) {
	var top = near * Math.tan(fovy/2);
	var bot = -top;
	var right = top * aspect;
	var left = bot * aspect;

	return frustrumProjection(left, right, bot, top, near, far);
}