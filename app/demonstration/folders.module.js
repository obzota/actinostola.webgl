angular.module('demonstration.folders', ['actinostola.webgl']).

controller('demo.foldersctrl', ['$scope', 'webgl.scene', function foldersctrl ($scope, Scene) {
	var canvasId = 'folderscanvas';
	var canvas = document.getElementById(canvasId);

	var scene = new Scene(canvasId);

	// init objects
	var init = function () {
		scene.meshes = [];
		var sphere = Builder.build(scene.gl, sphereObj, [0, 0, 0], 0.1, Colors.white)
		scene.meshes.push(sphere);
		for (var i = 0; i < 5; i++) {
			var center = PointGenerator.sphericalPoint(1);
			var sphere = Builder.build(scene.gl, sphereObj, center, 0.1, Colors.getRandomColor());
			scene.meshes.push(sphere);
		};
		for (var i = 0; i < 20; i++) {
			var center = PointGenerator.sphericalPoint(2);
			var sphere = Builder.build(scene.gl, sphereObj, center, 0.1, Colors.getRandomColor());
			scene.meshes.push(sphere);
		};
	}
	init();
	for (var i = 0; i < 300; i++) {
		var point = PointGenerator.sphericalPoint(1);
		scene.points.push(point);
	};
	for (var i = 0; i < 900; i++) {
		var point2 = PointGenerator.sphericalPoint(2);
		scene.points.push(point2);
	};

	// EVENT HANDLING
	var resize = function () {
		scene.resize();
	};
	window.addEventListener('resize', resize, false);

	canvas.ondblclick = function () {
		init();
	}

	canvas.onmousemove = function (event) {
		scene.onmousemove(event);
	}

	canvas.onmousedown = function (event) {
		scene.onmousedown(event);
	}

	canvas.onmouseup = function (event) {
		scene.onmouseup(event);
	}

	// animloop
	var animloop = function () {
		requestAnimFrame(animloop);
		scene.handleEvents();
		scene.render();
	};

	scene.resize();
	animloop();

}]);