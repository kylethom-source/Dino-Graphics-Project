
#version 120

varying vec3  vN;                   // normal vector
varying vec3  vE;                   // vector from point to eye
varying vec3  vL;                   // vector from point to light

uniform bool  uSurface;             // whether to display the solid surface
uniform bool  uSilh;                // whether to display the silhouette
uniform float uTol;                 // tolerance for silhouette detection

const vec3   Color          = vec3( 0.5, 0.5, 0.5 );
const vec3   SpecularColor  = vec3( 1.0, 1.0, 1.0 );
const vec3   SilhouetteColor = vec3( 0.0, 0.0, 1.0 );
const float  Ka             = 0.1;
const float  Kd             = 0.6;
const float  Ks             = 0.3;
const float  Shininess      = 30.0;

void
main( )
{
    vec3 Normal = normalize( vN );
    vec3 Eye    = normalize( vE );
    vec3 Light  = normalize( vL );

    // Compute silhouette: if the angle between normal and eye-to-point is near 90 degrees,
    // then the dot product will be near 0. If it is less than uTol, render silhouette.
    float dotNE = abs( dot( Normal, Eye ) );
    bool isSilhouette = dotNE < uTol;

    vec3 fragColor = vec3( 0.0, 0.0, 0.0 );

    // If this is a silhouette and silhouettes are enabled, draw silhouette color
    if( isSilhouette && uSilh )
    {
        fragColor = SilhouetteColor;
        gl_FragColor = vec4( fragColor, 1.0 );
    }
    // Otherwise, if surfaces are enabled, do per-fragment lighting
    else if( uSurface )
    {
        // Ambient
        vec3 ambient = Ka * Color;

        // Diffuse
        float dd = max( dot( Normal, Light ), 0.0 );
        vec3 diffuse = Kd * dd * Color;

        // Specular
        float s = 0.0;
        if( dd > 0.0 )
        {
            vec3 ref = normalize( reflect( -Light, Normal ) );
            float cosphi = dot( Eye, ref );
            if( cosphi > 0.0 )
                s = pow( cosphi, Shininess );
        }
        vec3 specular = Ks * s * SpecularColor;

        fragColor = ambient + diffuse + specular;
        gl_FragColor = vec4( fragColor, 1.0 );
    }
    // Neither surface nor silhouette: discard this fragment (transparent)
    else
    {
        discard;
    }
}
