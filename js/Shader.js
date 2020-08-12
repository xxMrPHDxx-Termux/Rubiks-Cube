import { loadText } from "./js/utils.js";

export default class Shader {
	constructor(gl, vertSrc, fragSrc){
		this.gl = gl;
		const vert = Shader.compile(gl, vertSrc, gl.VERTEX_SHADER);
		const frag = Shader.compile(gl, vertSrc, gl.FRAGMENT_SHADER);
		this.program = Shader.linkProgram(gl, vert, frag);
	}

	static compile(gl, src, type){
		const shader = gl.createShader(type);
		gl.shaderSource(src);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
			throw [
				type === gl.VERTEX_SHADER ? 
					'VERTEX' : 'FRAGMENT',
				' SHADER ',
				gl.getShaderInfoLog(shader);
			].join(' ');
		return shader;
	}
	static linkProgram(gl, vert, frag){
		const program = gl.createProgram();
		gl.attachShader(program, vert);
		gl.attachShader(program, frag);
		gl.linkProgram(program);
		if(!gl.getProgramParameter(program,gl.LINK_STATUS))
			throw gl.getProgramInfoLog(program);
		gl.deleteShader(vert);
		gl.deleteShader(frag);
		return program;
	}
	static async loadFromFile(gl, vertPath, fragPath){
		const [vSrc,fSrc] = await Promise.all([
			loadText(vertPath),
			loadText(fragPath),
		]);
		return new Shader(gl, vSrc, fSrc);
	}
}
