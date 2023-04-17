#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    
    vec3 orange = vec3(1.000,0.479,0.011);
    vec3 blue = vec3(0.179,0.235,1.000);
    vec3 greyish = vec3(0.995,0.937,0.656);
    vec3 yellowish = vec3(0.995,0.889,0.006);
    
    
	float blueOrangeFactor = smoothstep(0.2, 0.7, st.x);    
    float blueGreyFactor = smoothstep(0.0, 0.8, st.y) * (1.0 - smoothstep(0.8, 1.0, st.y));
    float orangeYellowFactor = smoothstep(0.2, 0.45, st.y) * (1.0 - smoothstep(0.45, 1.0, st.y));
    
    vec3 blueGreyMix = mix(blue, greyish, blueGreyFactor);
    vec3 orangeYellowMix = mix(orange, yellowish, orangeYellowFactor);
    color = mix(blueGreyMix, orangeYellowMix, blueOrangeFactor);
    
    vec3 black = vec3(0.0);
    float blackColorFactor = smoothstep(0.25, 0.3, st.y) * (1.0 - smoothstep(0.28, 0.3, st.y));
    color = mix(color, black, blackColorFactor);
    
    vec3 silver = vec3(0.725,0.725,0.725);
    float silverBlackFactor = smoothstep(0.0, 0.55, st.y);
    float blackOrangeFactor = smoothstep(0.0, 1.0, st.x) * (1.0-smoothstep(0.7, 1.0, st.x));
    
    vec3 silverBlackMix = mix(silver, black, silverBlackFactor);
    vec3 blackOrangeMix = mix(silverBlackMix, orange, blackOrangeFactor);
    float blackOrangeColorFactor = smoothstep(0.25, 0.3, st.y);
    color = mix(blackOrangeMix, color, blackOrangeColorFactor);
    

    gl_FragColor = vec4(color,1.0);
}
