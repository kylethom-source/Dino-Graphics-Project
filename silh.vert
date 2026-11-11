
#version 120

varying vec3  vN;       // normal vector
varying vec3  vE;       // vector from point to eye
varying vec3  vL;       // vector from point to light

const vec3 LightPosition = vec3( 15.0, 15.0, 15.0 );

void
main( )
{
    vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;  // eye coordinate position

    vN = normalize( gl_NormalMatrix * gl_Normal );     // normal vector

    vE = vec3( 0.0, 0.0, 0.0 ) - ECposition.xyz;      // vector from point to eye

    vL = LightPosition - ECposition.xyz;               // vector from point to light

    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
