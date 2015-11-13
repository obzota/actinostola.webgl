function compileShader(gl, shaderSource, shaderType) {
	var shader = gl.createShader(shaderType);
	// lik the code source
	gl.shaderSource(shader, shaderSource);
	// compile the code source
	gl.compileShader(shader);
	// check
	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!success) {
		throw("ERROR : shader not compiled : " + gl.getShaderInfoLog(shader));
	}

	return shader;
}


function createProgram(gl, vertexShader, fragmentShader) {
	// creat a program
	var program = gl.createProgram();

	// add shaders
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	// link the program
	gl.linkProgram(program);

	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!success) {
		throw("ERROR : program failed to link : " + gl.getProgramInfoLog(program));
	}

	return program;
}

function createShaderFromId(gl, scriptId, opt_shaderType) {
	var shaderScript = document.getElementById(scriptId);

	// get the source code
	var shaderSource = shaderScript.text;

	// look for the type in the dom
	if (!opt_shaderType) {
		if (shaderScript.type == "x-shader/x-vertex") {
			opt_shaderType = gl.VERTEX_SHADER;
		} else if (shaderScript.type == "x-shader/x-fragment") {
			opt_shaderType = gl.FRAGMENT_SHADER;
		} else {
			throw("ERROR : shader type not set/found");
		}
	};

	// compile the shader
	return compileShader(gl, shaderSource, opt_shaderType);
}

function createProgramFromIds(gl, vertexShaderId, fragmentShaderId) {
	var vertexShader = createShaderFromId(gl, vertexShaderId);
	var fragmentShader = createShaderFromId(gl, fragmentShaderId);
	return createProgram(gl, vertexShader, fragmentShader);
}

function setupGLFromId(canvasId) {
	var canvas = document.getElementById(canvasId);
	if (!canvas) {
		throw("ERROR : canvas id not found");
	}

	var gl = canvas.getContext('experimental-webgl');
	if (!gl) {
		gl = canvas.getContext('webgl');
	}
	if (!gl) {
		alert('Your browser may not support webgl.');
		throw('ERROR : (experimental-)webgl not found');
	}

	return gl;
}

function setBasicParam(gl) {
	// Standart settings
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);

	// Drawing points : smoothing and size
	gl.enable(0x8642); // point size change
	gl.enable(0x0B10); // smooth points

	// set ground color black
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

}
