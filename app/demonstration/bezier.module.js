angular.module('demonstration.bezier', ['actinostola.webgl']).

controller('demo.bezierctrl', ['$scope', 'webgl.scene', function bezierctrl ($scope, Scene) {
	var canvasId = 'beziercanvas';
	var canvas = document.getElementById(canvasId);

	var scene = new Scene(canvasId);

	// init objects
	var init = function () {
		scene.lines = [];
		for (var j = 0; j < 5; j++) {
			var p = PointGenerator.sphericalPoint(1);
			var q = PointGenerator.sphericalPointWithinRange(p, 2);
			var cp = Colors.getRandomColor();
			var cq = Colors.getRandomColor();
			for (var i = 0; i < 10; i++) {
				var bez = BezierGenerator.complexLinkBezier(scene.gl, p, q, cp, cq);
				scene.lines.push(bez);
			};
			// console.log(scene.camera);
			// var m = vec3.create(); vec3.lerp(m, p, q, 0.5);
			// scene.camera.setFocus(m);
			// scene.camera.setRadius(2.5);
		};

		var r = PointGenerator.sphericalPoint(1);
		var co = Colors.white;
		var cr = Colors.getRandomColor();
		for (var i = 0; i < 20; i++) {
			var bez = BezierGenerator.rootBezier(scene.gl, r, co, cr);
			scene.lines.push(bez);
		};
		console.log(scene.lines);
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
	// scene.render();

}]);
