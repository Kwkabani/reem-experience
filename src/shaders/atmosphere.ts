import * as THREE from 'three';

// Fresnel atmosphere vertex shader
export const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fresnel atmosphere fragment shader
export const atmosphereFragmentShader = `
  uniform vec3 glowColor;
  uniform float intensity;
  uniform float power;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = 1.0 - dot(viewDir, vNormal);
    fresnel = pow(fresnel, power) * intensity;
    gl_FragColor = vec4(glowColor, fresnel);
  }
`;

/**
 * Create a Fresnel atmosphere glow material for the globe.
 * Uses additive blending on the back side to produce a rim-light glow effect.
 *
 * @param options - Optional configuration for color, intensity, and power.
 * @returns A configured `THREE.ShaderMaterial` for the atmosphere.
 */
export function createAtmosphereMaterial(options?: {
  color?: number;
  intensity?: number;
  power?: number;
}): THREE.ShaderMaterial {
  const color = options?.color ?? 0x4a9eff;
  const intensity = options?.intensity ?? 1.5;
  const power = options?.power ?? 3.0;

  return new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      power: { value: power },
    },
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
}
