// Dot matrix vertex shader
export const dotsVertexShader = `
  attribute float size;
  attribute float opacity;
  attribute vec3 customColor;
  
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    vColor = customColor;
    vOpacity = opacity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Dot matrix fragment shader with twinkling
export const dotsFragmentShader = `
  uniform float time;
  
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.2, dist) * vOpacity;
    gl_FragColor = vec4(vColor, alpha);
  }
`;
