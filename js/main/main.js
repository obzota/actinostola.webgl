var canvasId = 'glcanvas';
var canvas = document.getElementById(canvasId);
var archi = JSON.parse(data);
console.log(archi);

// function main () {

// 	var gl = setupGLFromId(canvasId);
// 	setBasicParam(gl);

// 	resize();

// 	/* * * * * * * * * * * * * * * * * * * * * * * * *
// 			Drawing a sphere
// 	 * * * * * * * * * * * * * * * * * * * * * * * * */
// 	// gl.useProgram(Scene.meshProgram);
// 	// mySphere = Builder.build(sphereObj, [0,0,0], 2, Colors.getRandomColor());
// 	// Scene.meshes.push(mySphere);
// 	// mySphere = Builder.build(sphereObj, [0,0,0], 4, Colors.getRandomColor());
// 	// Scene.meshes.push(mySphere);
// 	// mySphere = Builder.build(sphereObj, [0,0,0], 8, Colors.getRandomColor());
// 	// Scene.meshes.push(mySphere);


// 	/* * * * * * * * * * * * * * * * * * * * * * * * *
// 			gettin' data
// 	 * * * * * * * * * * * * * * * * * * * * * * * * */
// 	archi = JSON.parse(data);
// 	console.log(archi);


// 	/* * * * * * * * * * * * * * * * * * * * * * * * *
// 			Drawing Bezier
// 	 * * * * * * * * * * * * * * * * * * * * * * * * */
// 	// var origin = vec3.create();
// 	// var p0 = vec3.create();
// 	// // var origin = new Point(0,0,0);
// 	// // var p0 = new Point(0,0,0);
// 	// var points = [];
// 	// gl.useProgram(Scene.lineProgram);
// 	// for (var i = 0; i < 5; i++) {
// 	// 	var p = PointGenerator.sphericalPoint(2);
// 	// 	Scene.lines.push(BezierGenerator.rootBezier(p, Colors.white, Colors.blue));
// 	// 	points.push(p);
// 	// 	for (var j = 0; j < 5; j++) {
// 	// 		var q = PointGenerator.sphericalPointWithinRange(p, 4);
// 	// 		Scene.lines.push(BezierGenerator.complexLinkBezier(p, q));
// 	// 		points.push(q);
// 	// 	}
// 	// };


// 	/* * * * * * * * * * * * * * * * * * * * * * * * *
// 			Drawing Clouds
// 	 * * * * * * * * * * * * * * * * * * * * * * * * */
// 	// var objects = [{size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {size:0}, {}, {}, {},
// 	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
// 	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
// 	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
// 	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
// 	// 	{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
// 	//  	{}, {}, {}, {}, {}, {}, {}, {}];
// 	// var objects = [{size:0}, {size:0}, {size:0}, {size:0}, {size:0},
// 	// {size:0}, {size:0}, {size:0}, {size:0}, {size:0}];

// 	// for (var i = 0; i < objects.length; i++) {
// 	// 	objects[i].size = Math.pow(10, Math.floor(Math.random()*15+1));
// 	// };
// 	// console.log(objects);

// 	// gl.useProgram(Scene.cloudProgram);
// 	// var cloud = PointGenerator.generateCloud(p0, 0.3, Colors.red, objects);
// 	// Scene.clouds[0] = cloud;

// 	// for (var i = points.length - 1; i >= 0; i--) {
// 	// 	var c = PointGenerator.generateCloud(points[i], 0.3, Colors.red, objects);
// 	// 	// c.focus = true;
// 	// 	Scene.clouds.push(c);
// 	// };
// 	// cloud.focus = true;


// 	/* * * * * * * * * * * * * * * * * * * * * * * * *
// 			Mini Root
// 	* * * * * * * * * * * * * * * * * * * * * * * * */
// 	 // var root = {
// 	 // 	depth: 0,
// 	 // 	Files: [
// 	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
// 		// ],
// 		// Folders: []
// 	 // };
// 	 // var f1 = {
// 	 // 	depth: 1,
// 	 // 	Files: [
// 	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
// 		// ],
// 		// Folders: []
// 	 // };
// 	 // var f2 = {
// 	 // 	depth: 1,
// 	 // 	Files: [
// 	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
// 		// ],
// 		// Folders: []
// 	 // };
// 	 // var f11 = {
// 	 // 	depth: 2,
// 	 // 	Files: [
// 	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
// 		// ],
// 		// Folders: []
// 	 // };
// 	 // var f12 = {
// 	 // 	depth: 2,
// 	 // 	Files: [
// 	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
// 		// ],
// 		// Folders: []
// 	 // };
// 	 // var f13 = {
// 	 // 	depth: 2,
// 	 // 	Files: [
// 	 // 		{size:100000}, {size:10000}, {size:1000}, {size:1000}
// 		// ],
// 		// Folders: []
// 	 // };
// 	 // f1.Folders.push(f11);
// 	 // f1.Folders.push(f12);
// 	 // f1.Folders.push(f13);
// 	 // root.Folders.push(f1);
// 	 // root.Folders.push(f2);
// 	 // TreeManager.build(root);



// 	/* * * * * * * * * * * * * * * * * * * * * * * * *
// 			Launching Animation
// 	* * * * * * * * * * * * * * * * * * * * * * * * */
// 	animloop();
// }






