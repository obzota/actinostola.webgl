var Scene = {
	lines: true,
	meshes: false,
	clouds: true,
	rangeSpheres: false,

	meshProgram: null,
	lineProgram: null,
	cloudProgram: null,
	pointProgram: null,

	mouse: {
		x0: 0,
		y0: 0,
		x:0,
		y:0,
		dscroll: 0
	}
};

var canvasId = 'glcanvas';
var canva = document.getElementById(canvasId);

function main () {

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
	Camera.init(3, 3, 0,    0,0,0,    0,0,1);
	Projection.init(1.0, aspect, 0.2, 100);

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
	// mySphere = Builder.build(sphereObj, [0,0,0], 2, Colors.getRandomColor());
	// Scene.meshes.push(mySphere);
	// mySphere = Builder.build(sphereObj, [0,0,0], 4, Colors.getRandomColor());
	// Scene.meshes.push(mySphere);
	// mySphere = Builder.build(sphereObj, [0,0,0], 8, Colors.getRandomColor());
	// Scene.meshes.push(mySphere);




	/* * * * * * * * * * * * * * * * * * * * * * * * *
			gettin' data
	 * * * * * * * * * * * * * * * * * * * * * * * * */
	archi = JSON.parse(data);
	console.log(archi);




	/* * * * * * * * * * * * * * * * * * * * * * * * *
			Drawing Bezier
	 * * * * * * * * * * * * * * * * * * * * * * * * */
	// var origin = vec3.create();
	// var p0 = vec3.create();
	// // var origin = new Point(0,0,0);
	// // var p0 = new Point(0,0,0);
	// var points = [];
	// gl.useProgram(Scene.lineProgram);
	// for (var i = 0; i < 5; i++) {
	// 	var p = PointGenerator.sphericalPoint(2);
	// 	Scene.lines.push(BezierGenerator.rootBezier(p, Colors.white, Colors.blue));
	// 	points.push(p);
	// 	for (var j = 0; j < 5; j++) {
	// 		var q = PointGenerator.sphericalPointWithinRange(p, 4);
	// 		Scene.lines.push(BezierGenerator.complexLinkBezier(p, q));
	// 		points.push(q);
	// 	}
	// };





	/* * * * * * * * * * * * * * * * * * * * * * * * *
			Drawing Clouds
	 * * * * * * * * * * * * * * * * * * * * * * * * */
	// var objects = [{size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {}, {}, {},
	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
	//  	{}, {}, {}, {}, {}, {}, {}, {}];
	// var objects = [{size:0}, {size:0}, {size:0}, {size:0}, {size:0},
	// {size:0}, {size:0}, {size:0}, {size:0}, {size:0}];

	// for (var i = 0; i < objects.length; i++) {
	// 	objects[i].size = Math.pow(10, Math.floor(Math.random()*15+1));
	// };
	// console.log(objects);

	// gl.useProgram(Scene.cloudProgram);
	// var cloud = PointGenerator.generateCloud(p0, 0.3, Colors.red, objects);
	// Scene.clouds[0] = cloud;

	// for (var i = points.length - 1; i >= 0; i--) {
	// 	var c = PointGenerator.generateCloud(points[i], 0.3, Colors.red, objects);
	// 	// c.focus = true;
	// 	Scene.clouds.push(c);
	// };
	// cloud.focus = true;





	/* * * * * * * * * * * * * * * * * * * * * * * * *
			Mini Root
	* * * * * * * * * * * * * * * * * * * * * * * * */
	 // var root = {
	 // 	depth: 0,
	 // 	Files: [
	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
		// ],
		// Folders: []
	 // };
	 // var f1 = {
	 // 	depth: 1,
	 // 	Files: [
	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
		// ],
		// Folders: []
	 // };
	 // var f2 = {
	 // 	depth: 1,
	 // 	Files: [
	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
		// ],
		// Folders: []
	 // };
	 // var f11 = {
	 // 	depth: 2,
	 // 	Files: [
	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
		// ],
		// Folders: []
	 // };
	 // var f12 = {
	 // 	depth: 2,
	 // 	Files: [
	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
		// ],
		// Folders: []
	 // };
	 // var f13 = {
	 // 	depth: 2,
	 // 	Files: [
	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
		// ],
		// Folders: []
	 // };
	 // f1.Folders.push(f11);
	 // f1.Folders.push(f12);
	 // f1.Folders.push(f13);
	 // root.Folders.push(f1);
	 // root.Folders.push(f2);
	 // TreeManager.build(root);



	TreeManager.build(archi);

	/* * * * * * * * * * * * * * * * * * * * * * * * *
			Launching Animation
	* * * * * * * * * * * * * * * * * * * * * * * * */
	animloop();
}

var init_time = (new Date()).getTime();
function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	var t = ((new Date()).getTime() - init_time) / 1000.0;
	handleEvents();

	if (Scene.lines) {
		gl.useProgram(LineDrawer.program);
		LineDrawer.setViewport(Camera, Projection);
		TreeManager.renderLinks();
	}

	if (Scene.clouds) {
		gl.useProgram(CloudDrawer.program);
		CloudDrawer.setViewport(Camera, Projection);
		TreeManager.renderClouds(t);
	}

	if (Scene.meshes) {
		gl.useProgram(Scene.meshProgram);
		Drawer.setViewport(Camera, Projection);
		for (var i = 0; i < Scene.meshes.length; i++) {
			Drawer.drawObject(Scene.meshes[i]);
		};
	}

	if (Scene.rangeSpheres) {
		gl.useProgram(Scene.meshProgram);
		Drawer.setViewport(Camera, Projection);
		TreeManager.drawRangeSpheres();
	};
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

function animloop(){
  requestAnimFrame(animloop);
  render();
}
