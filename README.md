 I used the GLSLProgram C++ class to create a shader program from my vert and
frag files. Then I created a vertex shader that sets up per-fragment lighting by passing the normal
and the vector from eye to fragment. Then I created the fragment shader with per-fragment
lighting, silhouette detection, and toggle able surface/silhouette rendering.
To use the program you can press ‘s’ to toggle the surface on/off; ‘h’ to toggle the silhouette
on/off and use the ‘+,-’ keys to increase or decrease the tolerance of finding the silhouette edge.
