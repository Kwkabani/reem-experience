import * as THREE from 'three';

/**
 * Self-hosted texture paths (relative to public/)
 * These are bundled with the app, no external CDN dependency
 */
const TEXTURE_PATHS = {
  earthDay: '/textures/earth_day_2048.jpg',
  earthNight: '/textures/earth_night_2048.jpg',
  earthNormal: '/textures/earth_normal_2048.jpg',
  earthSpecular: '/textures/earth_specular_2048.jpg',
  earthClouds: '/textures/earth_clouds_1024.jpg',
};

/**
 * Fallback CDN URLs if self-hosted textures are not available
 */
const FALLBACK_PATHS = {
  earthDay: 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  earthNight: 'https://unpkg.com/three-globe/example/img/earth-night.jpg',
  earthNormal: 'https://unpkg.com/three-globe/example/img/earth-topology.png',
  earthSpecular: 'https://unpkg.com/three-globe/example/img/earth-water.png',
  earthClouds: 'https://unpkg.com/three-globe/example/img/earth-water.png',
};

/**
 * Texture cache to avoid reloading
 */
const textureCache = new Map<string, THREE.Texture>();

/**
 * Create a fallback canvas texture (procedural earth)
 */
export function createFallbackTexture(
  width: number = 1024,
  height: number = 512,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Dark ocean background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#0a0a1a');
  gradient.addColorStop(0.5, '#0d1117');
  gradient.addColorStop(1, '#0a0a1a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add grid lines
  ctx.strokeStyle = 'rgba(74, 158, 255, 0.08)';
  ctx.lineWidth = 1;

  // Latitude lines
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((lat + 90) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Longitude lines
  for (let lng = 0; lng < 360; lng += 30) {
    const x = (lng / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Add subtle continent shapes
  ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';

  // Africa
  ctx.beginPath();
  ctx.ellipse(width * 0.55, height * 0.55, 40, 60, 0, 0, Math.PI * 2);
  ctx.fill();

  // Europe
  ctx.beginPath();
  ctx.ellipse(width * 0.52, height * 0.35, 30, 20, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Asia
  ctx.beginPath();
  ctx.ellipse(width * 0.65, height * 0.4, 70, 40, 0, 0, Math.PI * 2);
  ctx.fill();

  // Americas
  ctx.beginPath();
  ctx.ellipse(width * 0.25, height * 0.4, 30, 60, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(width * 0.28, height * 0.7, 20, 40, 0.1, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Load a texture with fallback
 */
export function loadTexture(
  key: keyof typeof TEXTURE_PATHS,
  loader: THREE.TextureLoader,
): Promise<THREE.Texture> {
  // Check cache first
  if (textureCache.has(key)) {
    return Promise.resolve(textureCache.get(key)!);
  }

  return new Promise((resolve) => {
    const primaryPath = TEXTURE_PATHS[key];
    const fallbackPath = FALLBACK_PATHS[key];

    loader.load(
      primaryPath,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        textureCache.set(key, texture);
        resolve(texture);
      },
      undefined,
      () => {
        // Primary failed, try fallback
        loader.load(
          fallbackPath,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            textureCache.set(key, texture);
            resolve(texture);
          },
          undefined,
          () => {
            // Both failed, return fallback canvas texture
            const fallback = createFallbackTexture();
            textureCache.set(key, fallback);
            resolve(fallback);
          },
        );
      },
    );
  });
}

/**
 * Clear texture cache
 */
export function clearTextureCache(): void {
  textureCache.forEach((texture) => texture.dispose());
  textureCache.clear();
}
