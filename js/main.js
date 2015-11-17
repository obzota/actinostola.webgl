var Scene = { 
	lines: [],
	meshes: [],
	clouds: [],
	meshProgram: null,
	lineProgram: null,
	cloudProgram: null,
	pointProgram: null
};

function main () {

	var canvasId = 'glcanvas';
	canva = document.getElementById(canvasId);
	gl = setupGLFromId(canvasId);
	setBasicParam(gl);

	resize();

	// initialize the programs
	Scene.meshProgram = createProgramFromIds(gl, 'vert_shader', 'frag_shader');
	Scene.lineProgram = createProgramFromIds(gl, 'line_vertex_shader', 'line_fragment_shader');
	Scene.cloudProgram = createProgramFromIds(gl, 'cloud_vertex_shader', 'cloud_fragment_shader');
	Scene.pointProgram = createProgramFromIds(gl, 'point_vertex_shader', 'point_fragment_shader');

	// init viewport
	var aspect = canva.clientWidth / canva.clientHeight;
	Camera.init(3, 3, 0,    0,0,3,    0,0,1);
	Projection.init(1.0, aspect, 0.2, 30);

	// initialize the drawers
	Drawer.init(Scene.meshProgram);
	Drawer.setProgram();
	Drawer.setViewport(Camera, Projection);

	LineDrawer.init(Scene.lineProgram);
	LineDrawer.setProgram();
	LineDrawer.setViewport(Camera, Projection);

	CloudDrawer.init(Scene.cloudProgram);
	CloudDrawer.setProgram();
	CloudDrawer.setViewport(Camera, Projection);

	PointDrawer.init(Scene.pointProgram);
	PointDrawer.setViewport(Camera, Projection);

	/* * * * * * * * * * * * * * * * * * * * * * * * *
			Drawing a sphere
	 * * * * * * * * * * * * * * * * * * * * * * * * */
	// gl.useProgram(Scene.meshProgram);
	// mySphere = Builder.build(sphereObj, [0,0,3], 2, Colors.blue);
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

	gl.useProgram(Scene.lineProgram);
	for (var i = 0; i < 10; i++) {
		var p = PointGenerator.sphericalPoint(5);
		Scene.lines[i] = BezierGenerator.LinkBezier(p0, p); 
	};

	/* * * * * * * * * * * * * * * * * * * * * * * * *
			Drawing Cloud
	 * * * * * * * * * * * * * * * * * * * * * * * * */
	var objects = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

	gl.useProgram(Scene.cloudProgram);
	var cloud = PointGenerator.generateCloud(p0, 0.4, Colors.red, objects);
	Scene.clouds[0] = cloud;

	render();
}

var init_time = (new Date()).getTime();
function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	var t = ((new Date()).getTime() - init_time) / 1000.0;

	if (Scene.lines) {
		gl.useProgram(LineDrawer.program);
		LineDrawer.setViewport(Camera, Projection);
		for (var i = 0; i < Scene.lines.length; i++) {
			LineDrawer.drawLine(Scene.lines[i]);
		};
	}

	if (Scene.clouds) {
		gl.useProgram(CloudDrawer.program);
		CloudDrawer.setViewport(Camera, Projection);
		for (var i = 0; i < Scene.clouds.length; i++) {
			CloudDrawer.draw(Scene.clouds[i], t);
		}
	}

	// if (Scene.meshes) {
	// 	gl.useProgram(Scene.meshProgram);
	// 	for (var i = 0; i < Scene.meshes.length; i++) {
	// 		Drawer.drawObject(Scene.meshes[i]);
	// 	};
	// }
}

function resize() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	canva.style.width = width + "px";
	canva.width = width;
	canva.style.height = height + "px";
	canva.height = height;

	Projection.setAspect();
	gl.viewport(0,0, canva.width, canva.height);
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
