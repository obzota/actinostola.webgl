function mouseMove(event) {
	Scene.mouse.x = event.clientX;
	Scene.mouse.y = event.clientY;
}

function mouseDown(event) {
	if (event.button == 0) {
		Scene.mouse.down = true;
	};
	Scene.mouse.x0 = event.clientX;
	Scene.mouse.x = event.clientX;
	Scene.mouse.y0 = event.clientY;
	Scene.mouse.y = event.clientY;
}

function mouseUp(event) {
	Scene.mouse.down = false;
	Scene.mouse.x0 = 0;
	Scene.mouse.y0 = 0;
	Scene.mouse.x = 0;
	Scene.mouse.y = 0;
}

function handleEvents() {
	var deltaX = Scene.mouse.x - Scene.mouse.x0;
	var deltaY = Scene.mouse.y - Scene.mouse.y0;
	if (Scene.mouse.down) {
		Camera.mouseMoveUpdate(deltaX, deltaY);
	}
	Scene.mouse.x0 = Scene.mouse.x;
	Scene.mouse.y0 = Scene.mouse.y;
}

canva.onmousedown = mouseDown;
document.onmouseup = mouseUp;
document.onmousemove = mouseMove;
