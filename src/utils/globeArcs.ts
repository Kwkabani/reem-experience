import * as THREE from 'three';

/**
 * Create an animated arc between two points on a globe
 */
export function createAnimatedArc(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  globeRadius: number,
  options?: {
    color?: number;
    height?: number;
    segments?: number;
    speed?: number;
  },
): {
  mesh: THREE.Line;
  update: (time: number) => void;
  dispose: () => void;
} {
  const color = options?.color ?? 0xd4af37; // gold
  const height = options?.height ?? 0.3;
  const segments = options?.segments ?? 50;
  const speed = options?.speed ?? 0.001;

  // Calculate arc points
  const start = latLngToVector3(startLat, startLng, globeRadius);
  const end = latLngToVector3(endLat, endLng, globeRadius);

  const mid = start.clone().add(end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(globeRadius + distance * height);

  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  const points = curve.getPoints(segments);

  // Create geometry with draw range for animation
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.7,
  });

  const mesh = new THREE.Line(geometry, material);

  // Animation state
  let drawRange = 0;

  const update = (time: number) => {
    drawRange = (Math.sin(time * speed) + 1) / 2;
    geometry.setDrawRange(0, Math.floor(drawRange * segments));
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
  };

  return { mesh, update, dispose };
}

/**
 * Create multiple arcs for the globe
 */
export function createGlobeArcs(
  globeRadius: number,
  arcs: Array<{
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color?: number;
  }>,
): {
  meshes: THREE.Line[];
  update: (time: number) => void;
  dispose: () => void;
} {
  const createdArcs = arcs.map((arc, index) =>
    createAnimatedArc(arc.startLat, arc.startLng, arc.endLat, arc.endLng, globeRadius, {
      color: arc.color ?? 0xd4af37,
      speed: 0.001 + index * 0.0002,
    }),
  );

  return {
    meshes: createdArcs.map((arc) => arc.mesh),
    update: (time: number) => createdArcs.forEach((arc) => arc.update(time)),
    dispose: () => createdArcs.forEach((arc) => arc.dispose()),
  };
}

// Helper function (same as in globeDots.ts)
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}
