import * as THREE from 'three';

/**
 * Device tier detection for adaptive rendering
 */
export function getDeviceTier(): {
  tier: 'high' | 'medium' | 'low';
  segments: number;
  textureSize: number;
  maxParticles: number;
  pixelRatio: number;
  antialias: boolean;
} {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const pixelRatio = Math.min(window.devicePixelRatio, 2);

  if (!isMobile) {
    return {
      tier: 'high',
      segments: 64,
      textureSize: 2048,
      maxParticles: 3000,
      pixelRatio,
      antialias: true,
    };
  } else if (window.innerWidth >= 768) {
    return {
      tier: 'medium',
      segments: 48,
      textureSize: 1024,
      maxParticles: 1500,
      pixelRatio: Math.min(pixelRatio, 1.5),
      antialias: false,
    };
  } else {
    return {
      tier: 'low',
      segments: 32,
      textureSize: 512,
      maxParticles: 500,
      pixelRatio: 1,
      antialias: false,
    };
  }
}

/**
 * Create a throttled function that runs at most once per frame
 */
export function createFrameThrottle<T extends (...args: unknown[]) => void>(fn: T): T {
  let pending = false;

  return ((...args: unknown[]) => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      fn(...args);
      pending = false;
    });
  }) as T;
}

/**
 * Properly dispose Three.js objects
 */
export function disposeObject(obj: THREE.Object3D): void {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
      child.geometry?.dispose();

      const materials = Array.isArray(child.material) ? child.material : [child.material];

      for (const mat of materials) {
        if (mat instanceof THREE.ShaderMaterial) {
          // Dispose uniforms
          for (const key in mat.uniforms) {
            const uniform = mat.uniforms[key];
            if (uniform) {
              const val = uniform.value;
              if (val && typeof val === 'object' && 'dispose' in val) {
                (val as { dispose: () => void }).dispose();
              }
            }
          }
        }

        // Dispose textures
        const textureKeys = [
          'map',
          'normalMap',
          'roughnessMap',
          'metalnessMap',
          'emissiveMap',
          'envMap',
          'aoMap',
          'bumpMap',
        ];

        for (const key of textureKeys) {
          const val = (mat as Record<string, unknown>)[key];
          if (val && typeof val === 'object' && 'isTexture' in val && val.isTexture) {
            (val as THREE.Texture).dispose();
          }
        }

        mat.dispose();
      }
    }
  });
}

/**
 * Check for WebGL support
 */
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Get optimal renderer settings based on device
 */
export function getRendererSettings(tier: 'high' | 'medium' | 'low'): {
  antialias: boolean;
  powerPreference: 'high-performance' | 'low-power' | 'default';
  alpha: boolean;
} {
  return {
    antialias: tier === 'high',
    powerPreference: tier === 'low' ? 'low-power' : 'high-performance',
    alpha: true,
  };
}
