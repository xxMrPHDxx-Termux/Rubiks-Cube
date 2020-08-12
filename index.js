// import Shader from './js/Shader.js';

const screen = document.querySelector('#screen');
screen.setAttribute('width',window.WIDTH=innerWidth);
screen.setAttribute('height',window.HEIGHT=innerHeight);
const gl = screen.getContext('webgl');
const GL = WebGL2RenderingContext;
const msPerTick = 1000/30;

let shader;

async function setup(){
	/*
	shader = await Shader.loadFromFile(
		gl,
		'shaders/quad_vert.glsl',
		'shaders/quad_frag.glsl'
	).catch(alert);
	*/
}

function update(){

}

function draw(){
	gl.viewport(0,0,WIDTH,HEIGHT);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.clearColor(51/255,51/255,51/255,1);
}

let lastTime = performance.now()
let now, unprocessedTime = 0;
let ticks = 0, frames = 0;
function animate(){
	now = performance.now();
	unprocessedTime += (now - lastTime)/msPerTick;
	lastTime = now;
	while(unprocessedTime >= 1){
		update();
		ticks++;
		if(ticks == 60){
			window.fps = frames;
			ticks = frames = 0;
		}
		unprocessedTime--;
	}
	draw();
	frames++;
	requestAnimationFrame(animate);
}

Promise.resolve(setup())
	.then(animate)
	.catch(alert);
