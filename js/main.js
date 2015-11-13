var Scene = { 
	lines: [],
	meshes: [],
	program: null,
	lineProgram: null
};

function main () {

	var canvasId = 'glcanvas';
	canva = document.getElementById(canvasId);
	canva.width = 800;
	canva.style.width = 800;
	canva.height = 600;
	canva.style.height = 600;
	gl = setupGLFromId(canvasId);
	setBasicParam(gl);

	// initialize the programs
	var program = createProgramFromIds(gl, 'vert_shader', 'frag_shader');
	var lineProgram = createProgramFromIds(gl, 'line_vertex_shader', 'line_fragment_shader');
	Scene.meshProgram = program;
	Scene.lineProgram = lineProgram;

	// init viewport
	var aspect = canva.clientWidth / canva.clientHeight;
	Camera.init(3, 3, 0,    0,0,3,    0,0,1);
	Projection.init(1.0, aspect, 0.2, 30);

	// initialize the drawers
	gl.useProgram(program);
	Drawer.init(program);
	Drawer.setViewport(Camera, Projection);
	gl.useProgram(lineProgram);
	LineDrawer.init(lineProgram);
	LineDrawer.setViewport(Camera, Projection);

	/* * * * * * * * * * * * * * * * * * * * * * * * *
			Drawing a sphere
	 * * * * * * * * * * * * * * * * * * * * * * * * */
	gl.useProgram(program);
	mySphere = Builder.build(sphereObj, [0,0,0], 2, Colors.blue);
	// Drawer.drawObject(mySphere);

	/* * * * * * * * * * * * * * * * * * * * * * * * *
			gettin' data
	 * * * * * * * * * * * * * * * * * * * * * * * * */
	// var archi = JSON.parse(data);
	// console.log(archi);





	/* * * * * * * * * * * * * * * * * * * * * * * * *
			Drawing Bezier
	 * * * * * * * * * * * * * * * * * * * * * * * * */
	var origin = new Point(0,0,0);
	var p0 = new Point(0,0,3);

	gl.useProgram(lineProgram);
	for (var i = 0; i < 10; i++) {
		var p = PointGenerator.sphericalPoint(5, origin);
		Scene.lines[i] = BezierGenerator.LinkBezier(p0, p); 
	};

	render();
}

function render() {
	if (Scene.lines) {
		gl.useProgram(Scene.lineProgram);
		for (var i = 0; i < Scene.lines.length; i++) {
			LineDrawer.drawLine(Scene.lines[i]);
		};
	}
	if (Scene.meshes) {
		gl.useProgram(Scene.meshProgram);
		for (var i = 0; i < Scene.meshes.length; i++) {
			Drawer.drawObject(Scene.meshes[i]);
		};
	}
}

function resize() {
	canva.style.width = window.innerWidth + "px";
	// canva.width = window.innerWidth;
	canva.style.height = window.innerHeight + "px";
	// canva.height = window.innerHeight;
	render();
}
