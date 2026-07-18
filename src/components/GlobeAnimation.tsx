import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createAtmosphereMaterial } from '../shaders/atmosphere';
import { getDeviceTier, disposeObject, isWebGLSupported } from '../utils/globePerformance';
import { generateStarfield, latLngToVector3 } from '../utils/globeDots';
import { createGlobeArcs } from '../utils/globeArcs';
import { createFallbackTexture } from '../utils/globeTextures';

interface GlobeAnimationProps {
  state: 'hidden' | 'rotating' | 'zooming' | 'done';
  onZoomComplete?: () => void;
}

export default function GlobeAnimation({ state, onZoomComplete }: GlobeAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  const onZoomCompleteRef = useRef(onZoomComplete);
  const dataRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    group: THREE.Group;
    globeMat: THREE.MeshPhongMaterial;
    cloudMat: THREE.MeshPhongMaterial | null;
    starsMat: THREE.PointsMaterial;
    dotsMat: THREE.PointsMaterial;
    ringMat: THREE.MeshBasicMaterial;
    marker: THREE.Mesh;
    ring: THREE.Mesh;
    arcs: ReturnType<typeof createGlobeArcs>;
    clock: THREE.Clock;
  } | null>(null);
  const zoomRef = useRef({ started: false, progress: 0 });

  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  useEffect(() => {
    onZoomCompleteRef.current = onZoomComplete;
  }, [onZoomComplete]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    if (!isWebGLSupported()) {
      container.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#94a3b8;font-family:monospace;font-size:14px">الكرة غير مدعومة في هذا المتصفح</div>';
      return;
    }

    const config = getDeviceTier();
    const globeSegments = config.segments;
    const cloudSegments = Math.floor(config.segments * 0.75);
    const glowSegments = Math.floor(config.segments * 0.5);
    const starCount = config.maxParticles;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030508);

    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0.3, 3.8);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: config.antialias,
        powerPreference: config.tier === 'low' ? 'low-power' : 'high-performance',
      });
    } catch {
      container.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#94a3b8;font-family:monospace;font-size:14px">الكرة غير مدعومة في هذا المتصفح</div>';
      return;
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(config.pixelRatio);
    renderer.setClearColor(0x030508, 1);
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    // Starfield
    const starPositions = generateStarfield(starCount, 40);
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 0.06,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starsMat);
    scene.add(stars);

    // Main group
    const group = new THREE.Group();
    group.rotation.x = 0.08;
    group.rotation.y = 2.35;
    scene.add(group);

    // Globe sphere with fallback texture
    const fallbackTex = new THREE.CanvasTexture(createFallbackTexture());
    fallbackTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const globeMat = new THREE.MeshPhongMaterial({
      map: fallbackTex,
      transparent: true,
      opacity: 0.9,
      specular: new THREE.Color('#555577'),
      shininess: 15,
    });
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, globeSegments, globeSegments),
      globeMat,
    );
    group.add(globe);

    // Load real textures (local first, CDN fallback)
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    const tryLoad = (urls: string[], key: 'map' | 'bumpMap' | 'specularMap' | 'normalMap') => {
      const tryNext = (index: number) => {
        const url = urls[index];
        if (!url) return;
        loader.load(
          url,
          (tex) => {
            tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
            if (key === 'map') globeMat.map = tex;
            else if (key === 'bumpMap') globeMat.bumpMap = tex;
            else if (key === 'normalMap') globeMat.normalMap = tex;
            else if (key === 'specularMap') globeMat.specularMap = tex;
            globeMat.needsUpdate = true;
          },
          undefined,
          () => tryNext(index + 1),
        );
      };
      tryNext(0);
    };
    tryLoad(
      [
        '/textures/earth-day.jpg',
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      ],
      'map',
    );
    tryLoad(
      ['/textures/earth-bump.png', 'https://unpkg.com/three-globe/example/img/earth-topology.png'],
      'bumpMap',
    );
    tryLoad(
      ['/textures/earth-specular.png', 'https://unpkg.com/three-globe/example/img/earth-water.png'],
      'specularMap',
    );

    // Cloud layer
    let cloudMat: THREE.MeshPhongMaterial | null = null;
    const tryLoadCloud = (urls: string[], idx = 0) => {
      const url = urls[idx];
      if (!url) return;
      loader.load(
        url,
        (tex) => {
          cloudMat = new THREE.MeshPhongMaterial({
            map: tex,
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
          const clouds = new THREE.Mesh(
            new THREE.SphereGeometry(1.008, cloudSegments, cloudSegments),
            cloudMat,
          );
          group.add(clouds);
          if (dataRef.current) dataRef.current.cloudMat = cloudMat;
        },
        undefined,
        () => tryLoadCloud(urls, idx + 1),
      );
    };
    tryLoadCloud([
      '/textures/earth-specular.png',
      'https://unpkg.com/three-globe/example/img/earth-water.png',
    ]);

    // Dot matrix continents (GitHub/Stripe style)
    const dotPositions: number[] = [];
    const dotColors: number[] = [];
    const dotSizes: number[] = [];
    const resolution = isMobile ? 6 : 4;

    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 256;
    dotCanvas.height = 128;
    const dotCtx = dotCanvas.getContext('2d')!;
    dotCtx.fillStyle = '#000';
    dotCtx.fillRect(0, 0, 256, 128);
    dotCtx.fillStyle = '#fff';

    // Simplified continent shapes
    const continents = [
      { x: 140, y: 70, rx: 15, ry: 25 }, // Africa
      { x: 130, y: 45, rx: 12, ry: 8 }, // Europe
      { x: 160, y: 50, rx: 25, ry: 15 }, // Asia
      { x: 60, y: 55, rx: 12, ry: 20 }, // N. America
      { x: 65, y: 85, rx: 8, ry: 15 }, // S. America
      { x: 185, y: 80, rx: 8, ry: 6 }, // Australia
    ];
    continents.forEach((c) => {
      dotCtx.beginPath();
      dotCtx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2);
      dotCtx.fill();
    });

    const dotImageData = dotCtx.getImageData(0, 0, 256, 128);
    for (let i = 0; i < dotImageData.data.length; i += 4) {
      const r = dotImageData.data[i] ?? 0;
      const g = dotImageData.data[i + 1] ?? 0;
      const b = dotImageData.data[i + 2] ?? 0;
      if (r + g + b > 100) {
        const pixelIndex = i / 4;
        const x = pixelIndex % 256;
        const y = Math.floor(pixelIndex / 256);
        if (x % resolution === 0 && y % resolution === 0) {
          const lat = (y / 128) * 180 - 90;
          const lng = (x / 256) * 360 - 180;
          const pos = latLngToVector3(lat, lng, 1.005);
          dotPositions.push(pos.x, pos.y, pos.z);
          dotColors.push(0.83, 0.69, 0.22); // Gold
          dotSizes.push(isMobile ? 1.5 : 2.0);
        }
      }
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('customColor', new THREE.Float32BufferAttribute(dotColors, 3));
    dotGeo.setAttribute('size', new THREE.Float32BufferAttribute(dotSizes, 1));
    const dotsMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: isMobile ? 0.015 : 0.02,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotsMat);
    group.add(dots);

    // Atmosphere glow (Fresnel)
    const atmosphereMat = createAtmosphereMaterial({
      color: 0x4a9eff,
      intensity: 1.5,
      power: 3.0,
    });
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.06, glowSegments, glowSegments),
      atmosphereMat,
    );
    group.add(atmosphere);

    // Golden inner glow
    const innerGlowMat = createAtmosphereMaterial({
      color: 0xd4af37,
      intensity: 0.8,
      power: 4.0,
    });
    const innerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.02, glowSegments, glowSegments),
      innerGlowMat,
    );
    group.add(innerGlow);

    // Marib marker (المدينة القديمة)
    const maribPos = latLngToVector3(15.47, 45.33, 1.015);
    const markerMat = new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.9,
    });
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), markerMat);
    marker.position.copy(maribPos);
    group.add(marker);

    // Pulsing ring
    const ringGeo = new THREE.RingGeometry(0.03, 0.055, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(maribPos);
    ring.lookAt(new THREE.Vector3(0, 0, 0));
    group.add(ring);

    // Animated arcs
    const arcs = createGlobeArcs(1.01, [
      { startLat: 15.47, startLng: 45.33, endLat: 40.71, endLng: -74.0 }, // Marib → New York
      { startLat: 15.47, startLng: 45.33, endLat: 51.51, endLng: -0.13 }, // Marib → London
      { startLat: 15.47, startLng: 45.33, endLat: 35.68, endLng: 139.69 }, // Marib → Tokyo
      { startLat: 15.47, startLng: 45.33, endLat: -33.87, endLng: 151.21 }, // Marib → Sydney
    ]);
    arcs.meshes.forEach((m) => group.add(m));

    // Lighting
    scene.add(new THREE.AmbientLight('#404060', 0.4));
    const dl = new THREE.DirectionalLight('#ffe8b0', 1.3);
    dl.position.set(3, 4, 5);
    scene.add(dl);
    const bl = new THREE.DirectionalLight('#6688cc', 0.5);
    bl.position.set(-4, -1, -3);
    scene.add(bl);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dataRef.current = {
      scene,
      camera,
      renderer,
      group,
      globeMat,
      cloudMat: null,
      starsMat,
      dotsMat,
      ringMat,
      marker,
      ring,
      arcs,
      clock,
    };

    const zoom = zoomRef.current;
    let rotSpeed = 0.003;
    let callbacksSent = false;
    let animFrameId = 0;
    let zoomCallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let stopped = false;
    let lastTime = performance.now();

    function animate() {
      if (stopped) return;
      const d = dataRef.current;
      if (!d) return;

      const currentTime = performance.now();
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      animFrameId = requestAnimationFrame(animate);
      const s = stateRef.current;

      if (s === 'hidden') {
        group.visible = false;
        stars.visible = false;
        return;
      }

      group.visible = true;
      stars.visible = true;

      if (prefersReducedMotion) {
        d.renderer.render(d.scene, d.camera);
        return;
      }

      if (s === 'rotating') {
        // Frame-rate independent rotation
        d.group.rotation.y += rotSpeed * deltaTime * 60;
        stars.rotation.y += 0.00015 * deltaTime * 60;

        const time = Date.now() * 0.003;
        d.ringMat.opacity = 0.35 + Math.sin(time) * 0.2;
        ring.scale.setScalar(1 + Math.sin(time) * 0.2);
        d.globeMat.opacity = 0.9;
        if (d.cloudMat) d.cloudMat.opacity = 0.35;
      }

      if (s === 'zooming') {
        if (!zoom.started) {
          zoom.started = true;
          zoom.progress = 0;
          callbacksSent = false;
        }

        // Frame-rate independent zoom
        zoom.progress = Math.min(zoom.progress + deltaTime / 2.7, 1);
        const ease = 1 - Math.pow(1 - zoom.progress, 3);

        rotSpeed *= Math.pow(0.94, deltaTime * 60);
        d.group.rotation.y += rotSpeed * deltaTime * 60;

        const scaleVal = 1 + ease * 2.0;
        d.group.scale.setScalar(scaleVal);
        d.globeMat.opacity = Math.max(0.9 * (1 - ease), 0);
        if (d.cloudMat) d.cloudMat.opacity = Math.max(0.35 * (1 - ease), 0);
        d.starsMat.opacity = Math.max(0.9 * (1 - ease), 0);
        d.dotsMat.opacity = Math.max(0.8 * (1 - ease), 0);

        (d.marker.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0.9 * (1 - ease * 0.7),
          0,
        );
        d.ringMat.opacity = Math.max(0.5 * (1 - ease * 0.7), 0);

        d.camera.position.z = 3.8 - ease * 1.0;
        d.camera.lookAt(0, 0, 0);

        // Update arcs
        d.arcs.update(currentTime);

        if (zoom.progress >= 1 && !callbacksSent) {
          callbacksSent = true;
          zoomCallbackTimer = setTimeout(() => onZoomCompleteRef.current?.(), 300);
        }
      }

      if (s === 'done') {
        d.globeMat.opacity = Math.max(d.globeMat.opacity - deltaTime * 2, 0);
        d.starsMat.opacity = Math.max(d.starsMat.opacity - deltaTime * 2, 0);
        d.dotsMat.opacity = Math.max(d.dotsMat.opacity - deltaTime * 2, 0);
        if (d.cloudMat) d.cloudMat.opacity = Math.max(d.cloudMat.opacity - deltaTime * 2, 0);
        (d.marker.material as THREE.MeshBasicMaterial).opacity = Math.max(
          (d.marker.material as THREE.MeshBasicMaterial).opacity - deltaTime * 2,
          0,
        );
        d.ringMat.opacity = Math.max(d.ringMat.opacity - deltaTime * 2, 0);

        if (d.globeMat.opacity <= 0.01) {
          group.visible = false;
        }
      }

      d.renderer.render(d.scene, d.camera);

      if (stateRef.current === 'done' && group && !group.visible) {
        stopped = true;
        cancelAnimationFrame(animFrameId);
        return;
      }
    }

    animate();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      if (resizeTimeout) return;
      resizeTimeout = setTimeout(() => {
        resizeTimeout = 0;
        if (!camera || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }, 100);
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animFrameId);
      if (zoomCallbackTimer) clearTimeout(zoomCallbackTimer);

      // Dispose all Three.js objects
      scene.traverse((obj) => {
        disposeObject(obj);
      });

      dataRef.current?.arcs.dispose();
      renderer.dispose();
      dataRef.current = null;
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ background: '#030508' }}
      aria-hidden="true"
      role="presentation"
    />
  );
}
