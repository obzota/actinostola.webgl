_webgl.factory('webgl.scene', function webglScene() {
	var Scene = function (canvasId) {
		this.gl = setupGLFromId(canvasId);
		this.canvas = document.getElementById(canvasId);

		this.lines = [];
		this.meshes = [];
		this.clouds = [];
		this.points = [];

		this.enable = {
			lines: true,
			meshes: true,
			clouds: true,
			points: true,
			depth: 5
		};

		this.buffer = {
			x: 0,
			y: 0,
			x0: 0,
			y0: 0,
			down: false,
			dscroll: 0
		};

		this.camera = new Camera(3, 3, 0,    0,0,0,    0,0,1);
		this.projection = new Projection(1.0, 1.0, 0.2, 100);

		this.meshProgram = createProgramFromIds(this.gl, 'vert_shader', 'frag_shader');
		this.lineProgram = createProgramFromIds(this.gl, 'line_vertex_shader', 'line_fragment_shader');
		this.cloudProgram = createProgramFromIds(this.gl, 'cloud_vertex_shader', 'cloud_fragment_shader');
		this.pointProgram = createProgramFromIds(this.gl, 'point_vertex_shader', 'point_fragment_shader');


		this.drawer = new Drawer(this.gl, this.meshProgram);
		this.drawer.setProgram();
		this.drawer.setViewport(this.camera, this.projection);

		this.lineDrawer = new LineDrawer(this.gl, this.lineProgram);
		this.lineDrawer.setProgram();
		this.lineDrawer.setViewport(this.camera, this.projection);

		this.cloudDrawer = new CloudDrawer(this.gl, this.cloudProgram);
		this.cloudDrawer.setProgram();
		this.cloudDrawer.setViewport(this.camera, this.projection);

		this.pointDrawer = new PointDrawer(this.gl, this.pointProgram);
		this.pointDrawer.setViewport(this.camera, this.projection);

		this.init_time = (new Date()).getTime();
	};

	Scene.prototype.resize = function () {
		var width = window.innerWidth;
		var height = window.innerHeight;
		this.canvas.style.width = width + "px";
		this.canvas.width = width;
		this.canvas.style.height = height + "px";
		this.canvas.height = height;

		this.projection.setAspect(this.canvas);
		this.gl.viewport(0,0, this.canvas.width, this.canvas.height);
	};


	Scene.prototype.render = function () {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		var t = ((new Date()).getTime() - this.init_time) / 1000.0;

		var lim = this.enable.depth;

		if (this.enable.lines) {
			this.gl.useProgram(this.lineDrawer.program);
			this.lineDrawer.setViewport(this.camera, this.projection);
			for (var i = 0; i < this.lines.length; i++) {
				var d = this.lines[i].depth;
				if (!angular.isDefined(d) || d <= lim) {
					this.lineDrawer.draw(this.lines[i], t);
				}
			};
		}

		if (this.enable.clouds) {
			this.cloudDrawer.setProgram();
			this.cloudDrawer.setViewport(this.camera, this.projection);
			for (var i = 0; i < this.clouds.length; i++) {
				if (this.clouds[i].depth <= lim) {
					this.cloudDrawer.draw(this.clouds[i], t);
				}
			};
		}

		if (this.enable.meshes) {
			this.gl.useProgram(this.meshProgram);
			this.drawer.setViewport(this.camera, this.projection);
			for (var i = 0; i < this.meshes.length; i++) {
				if (this.meshes[i].depth <= lim) {
					this.drawer.draw(this.meshes[i], t);
				}
			};
		}

		if (this.enable.points) {
			this.pointDrawer.setProgram();
			this.pointDrawer.setViewport(this.camera, this.projection);
			this.pointDrawer.draw(this.points);
		}

	};

	Scene.prototype.handleEvents = function (eventBuffer) {
		if (!eventBuffer) eventBuffer = this.buffer;
		var deltaX = eventBuffer.x - eventBuffer.x0;
		var deltaY = eventBuffer.y - eventBuffer.y0;
		if (eventBuffer.down) {
			this.camera.mouseMoveUpdate(deltaX, deltaY);
		}
		if (eventBuffer.dscroll != 0) {
			var radius = this.camera.changeRadius(eventBuffer.dscroll);
			this.projection.setFar(radius);
			eventBuffer.dscroll = 0;
		}
		eventBuffer.x0 = eventBuffer.x;
		eventBuffer.y0 = eventBuffer.y;
	};

	Scene.prototype.onmousemove = function (event) {
		this.buffer.x = event.clientX;
		this.buffer.y = event.clientY;
	};

	Scene.prototype.onmousedown = function (event) {
		if (event.button != 0) return;
		this.buffer.down = true;
		this.buffer.x0 = event.clientX;
		this.buffer.x = event.clientX;
		this.buffer.y0 = event.clientY;
		this.buffer.y = event.clientY;
	};

	Scene.prototype.onmouseup = function (event) {
		this.buffer.down = false;
	};

	return Scene;
});

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();