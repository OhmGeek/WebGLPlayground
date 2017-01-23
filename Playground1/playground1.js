var gl;
var shaders = {};

// Functions
function main() {
	var canvas = document.getElementById('webgl');
	gl = initWebGL(canvas);

	// check opengl is actually working.
	if(!gl){
		return;
	}

	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);i
}

function initWebGL(canvas) {
	gl = null;

	gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	if(!gl) {
		alert("Can't initialise WebGL.");
	}
	return gl;
}

function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl,"shader-vs");

	// Create the shader program
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	// Alert if the shader program couldn't start
	if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)) {
		console.log("Can't start shader program " + gl.getProgramInfoLog(shaderProgram));
	}

	gl.useProgram(shaderProgram);

	vertexPositionAttribute = gl.getAttribLocation(shaderProgram,"aVertexPosition");

	gl.enableVertexAttribArray(vertexPositionAttribute);
}

function getShader(gl,id,type) {
	// get the shader from the shaders object
	var shaderScript = shaders[id];
	
	if(!shaderScript) {
		return null; //error if no shader found
	}

	if(!type) {
		if(shaderScript.type == "x-shader/x-fragment") {
			type = gl.FRAGMENT_SHADER;
		}
		else if(shaderScript.type== "x-shader/x-vertex") {
			type = gl.VERTEX_SHADER;
		}
		else {
			return null;
		}
	}
	shader = gl.createShader(type);
}
