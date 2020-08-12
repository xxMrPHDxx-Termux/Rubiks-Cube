#version 330 es

uniform mat3 u_objMatrix;
uniform mat3 u_posMatrix;
uniform mat3 u_camMatrix;
uniform vec4 u_color;

out vec4 v_color;

void main(){
	v_color = u_color;
	gl_Position = vec4((u_objMatrix * u_posMatrix * u_camMatrix).xyz, 1.0);
}
