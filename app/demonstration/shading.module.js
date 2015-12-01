angular.module('demonstration.shading', ['actinostola.webgl']).

controller('demo.shadingctrl', ['$scope', 'webgl.scene', function shadingctrl ($scope, Scene) {
	var canvasId = 'shadingcanvas';
	var canvas = document.getElementById(canvasId);

	var scene = new Scene(canvasId);

	// init objects
	// One unique sphere
	var sphere = Builder.build(scene.gl, sphereObj, [0, 0, 0], 1, Colors.getRandomColor());
	scene.meshes.push(sphere);

	// EVENT HANDLING
	var resize = function () {
		scene.resize();
	};
	window.addEventListener('resize', resize, false);

	canvas.ondblclick = function () {
		sphere.color = Colors.getRandomColor();
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