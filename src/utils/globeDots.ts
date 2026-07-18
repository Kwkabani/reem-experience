import * as THREE from 'three';

/**
 * Generate dot positions for Earth's continents using image sampling
 * This creates the GitHub/Stripe-style dot matrix globe
 */
export function generateEarthDots(
  radius: number,
  options?: {
    resolution?: number; // pixels to skip (default: 4)
    threshold?: number; // brightness threshold (default: 100)
  },
): Float32Array {
  const threshold = options?.threshold ?? 100;

  // Create offscreen canvas for image sampling
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // We'll use a procedural approach to generate continent-like shapes
  // since we can't load external images in this utility
  const width = 256;
  const height = 128;
  canvas.width = width;
  canvas.height = height;

  // Fill with dark ocean
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  // Draw simplified continents (approximate shapes)
  ctx.fillStyle = '#ffffff';

  // Africa
  ctx.beginPath();
  ctx.ellipse(140, 70, 15, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Europe
  ctx.beginPath();
  ctx.ellipse(130, 45, 12, 8, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Asia
  ctx.beginPath();
  ctx.ellipse(160, 50, 25, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Americas
  ctx.beginPath();
  ctx.ellipse(60, 55, 12, 20, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(65, 85, 8, 15, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Australia
  ctx.beginPath();
  ctx.ellipse(185, 80, 8, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  const imageData = ctx.getImageData(0, 0, width, height);
  const positions: number[] = [];
  const colors: number[] = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i] ?? 0;
    const g = imageData.data[i + 1] ?? 0;
    const b = imageData.data[i + 2] ?? 0;

    if (r + g + b > threshold) {
      const pixelIndex = i / 4;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);

      const lat = (y / height) * 180 - 90;
      const lon = (x / width) * 360 - 180;

      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      positions.push(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );

      // Gold color for land
      colors.push(0.83, 0.69, 0.22); // #D4AF37
    }
  }

  return new Float32Array(positions);
}

/**
 * Generate starfield positions
 */
export function generateStarfield(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    const radius = spread * (0.3 + Math.random() * 0.7);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);
  }

  return positions;
}

/**
 * Convert lat/lng to Vector3
 */
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/**
 * Generate arc points between two lat/lng positions
 */
export function generateArcPoints(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  globeRadius: number,
  arcHeight: number = 0.3,
  segments: number = 50,
): THREE.Vector3[] {
  const start = latLngToVector3(startLat, startLng, globeRadius);
  const end = latLngToVector3(endLat, endLng, globeRadius);

  const mid = start.clone().add(end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(globeRadius + distance * arcHeight);

  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  return curve.getPoints(segments);
}
