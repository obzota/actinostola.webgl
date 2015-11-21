/* Camera movements
	Generated when clic on the canva
	can release outside */
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

/* Zoom/Unzoom
	generated by scrolling on the wheel */

function mouseScroll(event) {
	Scene.mouse.dscroll += event.wheelDelta;
}



function handleEvents() {
	var deltaX = Scene.mouse.x - Scene.mouse.x0;
	var deltaY = Scene.mouse.y - Scene.mouse.y0;
	if (Scene.mouse.down) {
		Camera.mouseMoveUpdate(deltaX, deltaY);
	}
	if (Scene.mouse.dscroll != 0) {
		Camera.changeRadius(Scene.mouse.dscroll);
		Scene.mouse.dscroll = 0;
	}
	Scene.mouse.x0 = Scene.mouse.x;
	Scene.mouse.y0 = Scene.mouse.y;
}

canva.onscroll = mouseScroll;
canva.onmousedown = mouseDown;
document.onmouseup = mouseUp;
document.onmousemove = mouseMove;
canva.onwheel = mouseScroll;