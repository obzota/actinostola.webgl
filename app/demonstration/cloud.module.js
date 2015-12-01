angular.module('demonstration.cloud', ['actinostola.webgl']).

controller('demo.cloudctrl', ['$scope', 'webgl.scene', function cloudctrl ($scope, Scene) {
	var canvasId = 'cloudcanvas';
	var canvas = document.getElementById(canvasId);

	var scene = new Scene(canvasId);

	// init objects
	var sphere = Builder.build(scene.gl, sphereObj, [0, 0, 0], 0.1, Colors.white)
	scene.meshes.push(sphere);

	var Things = [];
	for (var i = 0; i < 60; i++) {
		Things.push({size: 100});
	};
	var init = function () {
		scene.clouds = [];
		var cloud = PointGenerator.generateCloud(scene.gl, [0,0,0], 2, [0,0,0], Things, 0, 0.05);
		var cloud2 = PointGenerator.generateCloud(scene.gl, [0,0,0], 2, [0,0,0], Things, 0, 0.05);
		var cloud3 = PointGenerator.generateCloud(scene.gl, [0,0,0], 2, [0,0,0], Things, 0, 0.05);
		scene.clouds.push(cloud);
		scene.clouds.push(cloud2);
		scene.clouds.push(cloud3);
		scene.cloudDrawer.mode = scene.gl.LINE_STRIP;

	}
	init();

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
	// scene.render();

}]);
