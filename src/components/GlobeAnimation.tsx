import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GlobeAnimationProps {
  state: 'hidden' | 'rotating' | 'zooming' | 'done';
  onZoomComplete?: () => void;
}

function generateFallbackTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, '#0a1628');
  grad.addColorStop(0.5, '#0f1f3a');
  grad.addColorStop(1, '#0a1628');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 1024);

  ctx.strokeStyle = 'rgba(139, 164, 199, 0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 18; i++) { const y = (i / 18) * 1024; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2048, y); ctx.stroke(); }
  for (let i = 0; i <= 36; i++) { const x = (i / 36) * 2048; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke(); }

  ctx.strokeStyle = 'rgba(201, 168, 76, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(900, 520, 200, 300, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(900, 300, 150, 100, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(1400, 350, 350, 250, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(1280, 430, 60, 50, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(400, 350, 200, 180, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(500, 600, 70, 200, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(1750, 650, 80, 60, 0, 0, Math.PI * 2); ctx.stroke();

  const cx = 1281, cy = 425;
  const dotGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 15);
  dotGrad.addColorStop(0, 'rgba(201, 168, 76, 0.6)');
  dotGrad.addColorStop(1, 'rgba(201, 168, 76, 0)');
  ctx.fillStyle = dotGrad;
  ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.fill();

  return canvas;
}

function latLngToPos(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export default function GlobeAnimation({ state, onZoomComplete }: GlobeAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  const onZoomCompleteRef = useRef(onZoomComplete);
  const dataRef = useRef<{
    scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer;
    group: THREE.Group; globeMat: THREE.MeshPhongMaterial;
    cloudMat: THREE.MeshPhongMaterial | null; glowMat: THREE.ShaderMaterial;
    starsMat: THREE.PointsMaterial; markerMat: THREE.MeshBasicMaterial; ringMat: THREE.MeshBasicMaterial;
  } | null>(null);
  const zoomRef = useRef({ started: false, progress: 0 });

  useEffect(() => { stateRef.current = state; }, [state]);
  useEffect(() => { onZoomCompleteRef.current = onZoomComplete; }, [onZoomComplete]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    // BUG-04 + Mobile: reduce geometry complexity on small screens
    const isMobile = window.innerWidth < 768;
    const globeSegments  = isMobile ? 32 : 64;
    const cloudSegments  = isMobile ? 24 : 48;
    const glowSegments   = isMobile ? 16 : 32;
    const starCount      = isMobile ? 800 : 2000;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0.3, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: '#ffffff', size: 0.06, transparent: true, opacity: 0.9, sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starsMat);
    scene.add(stars);

    // Group
    const group = new THREE.Group();
    group.rotation.x = 0.08;
    group.rotation.y = 2.35;
    scene.add(group);

    // Globe
    const fallbackTex = new THREE.CanvasTexture(generateFallbackTexture());
    fallbackTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const globeMat = new THREE.MeshPhongMaterial({
      map: fallbackTex, transparent: true, opacity: 0.9,
      specular: new THREE.Color('#555577'), shininess: 15,
    });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1, globeSegments, globeSegments), globeMat);
    group.add(globe);

    // BUG-08 FIX: Load real textures with error handlers
    const loader = new THREE.TextureLoader();
    const tryLoad = (url: string, key: 'map' | 'bumpMap' | 'specularMap') => {
      loader.load(
        url,
        (tex) => {
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          if (key === 'map') globeMat.map = tex;
          else if (key === 'bumpMap') globeMat.bumpMap = tex;
          else globeMat.specularMap = tex;
          globeMat.needsUpdate = true;
        },
        undefined,
        () => { /* fail silently — fallback texture is already shown */ },
      );
    };
    tryLoad('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg', 'map');
    tryLoad('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg', 'bumpMap');
    tryLoad('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg', 'specularMap');

    // Clouds
    let cloudMat: THREE.MeshPhongMaterial | null = null;
    loader.load(
      'https://threejs.org/examples/textures/planets/earth_clouds_1024.png',
      (tex) => {
        cloudMat = new THREE.MeshPhongMaterial({
          map: tex, transparent: true, opacity: 0.35,
          blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
        });
        const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.008, cloudSegments, cloudSegments), cloudMat);
        group.add(clouds);
        // BUG-04 FIX: update the dataRef so animate() can control cloud opacity
        if (dataRef.current) dataRef.current.cloudMat = cloudMat;
      },
      undefined,
      () => { /* no clouds on slow/offline connections — acceptable */ },
    );

    // Glow
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() { float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8); gl_FragColor = vec4(0.4, 0.6, 0.9, 1.0) * intensity * 0.5; }
      `,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(new THREE.SphereGeometry(1.06, glowSegments, glowSegments), glowMat);
    group.add(glow);

    // Marib marker
    const maribPos = latLngToPos(15.47, 45.33, 1.01);
    const markerMat = new THREE.MeshBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.9 });
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), markerMat);
    marker.position.copy(maribPos);
    group.add(marker);

    // Ring
    const ringGeo = new THREE.RingGeometry(0.03, 0.055, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(maribPos);
    ring.lookAt(new THREE.Vector3(0, 0, 0));
    group.add(ring);

    // Lights
    scene.add(new THREE.AmbientLight('#404060', 0.4));
    const dl = new THREE.DirectionalLight('#ffe8b0', 1.3);
    dl.position.set(3, 4, 5); scene.add(dl);
    const bl = new THREE.DirectionalLight('#6688cc', 0.5);
    bl.position.set(-4, -1, -3); scene.add(bl);

    dataRef.current = { scene, camera, renderer, group, globeMat, cloudMat, glowMat, starsMat, markerMat, ringMat };

    const zoom = zoomRef.current;
    let rotSpeed = 0.003;
    let callbacksSent = false;
    let animFrameId = 0;
    // BUG-07 FIX: track the zoom callback timer so it can be cleared on unmount
    let zoomCallbackTimer: ReturnType<typeof setTimeout> | null = null;

    function animate() {
      animFrameId = requestAnimationFrame(animate);
      const d = dataRef.current;
      if (!d) return;
      const s = stateRef.current;

      if (s === 'hidden') {
        group.visible = false;
        stars.visible = false;
        d.renderer.render(d.scene, d.camera);
        return;
      }

      group.visible = true;
      stars.visible = true;

      if (s === 'rotating') {
        d.group.rotation.y += rotSpeed;
        stars.rotation.y += 0.00015;
        d.ringMat.opacity = 0.35 + Math.sin(Date.now() * 0.003) * 0.2;
        ring.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.2);
        d.globeMat.opacity = 0.9;
        if (d.cloudMat) d.cloudMat.opacity = 0.35;
      }

      if (s === 'zooming') {
        if (!zoom.started) {
          zoom.started = true;
          zoom.progress = 0;
          callbacksSent = false;
        }

        zoom.progress = Math.min(zoom.progress + 0.006, 1);
        const ease = 1 - Math.pow(1 - zoom.progress, 3);

        rotSpeed *= 0.94;
        d.group.rotation.y += rotSpeed;

        const scaleVal = 1 + ease * 2.0;
        d.group.scale.setScalar(scaleVal);
        d.globeMat.opacity = Math.max(0.9 * (1 - ease), 0);
        if (d.cloudMat) d.cloudMat.opacity = Math.max(0.35 * (1 - ease), 0);
        starsMat.opacity = Math.max(0.9 * (1 - ease), 0);

        d.markerMat.opacity = Math.max(0.9 * (1 - ease * 0.7), 0);
        d.ringMat.opacity = Math.max(0.5 * (1 - ease * 0.7), 0);

        d.camera.position.z = 3.8 - ease * 1.0;
        d.camera.lookAt(0, 0, 0);

        if (zoom.progress >= 1 && !callbacksSent) {
          callbacksSent = true;
          // BUG-07 FIX: store timer so cleanup can cancel it
          zoomCallbackTimer = setTimeout(() => onZoomCompleteRef.current?.(), 300);
        }
      }

      if (s === 'done') {
        d.globeMat.opacity = Math.max(d.globeMat.opacity - 0.02, 0);
        starsMat.opacity = Math.max(starsMat.opacity - 0.02, 0);
        if (d.cloudMat) d.cloudMat.opacity = Math.max(d.cloudMat.opacity - 0.02, 0);
        d.markerMat.opacity = Math.max(d.markerMat.opacity - 0.02, 0);
        d.ringMat.opacity = Math.max(d.ringMat.opacity - 0.02, 0);

        if (d.globeMat.opacity <= 0.01) {
          group.visible = false;
        }
      }

      d.renderer.render(d.scene, d.camera);
    }

    animate();

    const onResize = () => {
      const w2 = container.clientWidth;
      const h2 = container.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener('resize', onResize);

    // BUG-04 + BUG-07 FIX: full cleanup of Three.js resources + zoom timer
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animFrameId);

      // BUG-07: cancel zoom callback if still pending
      if (zoomCallbackTimer) clearTimeout(zoomCallbackTimer);

      // BUG-04: traverse scene and dispose all geometries & materials
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry.dispose();
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material as THREE.Material];
          mats.forEach(m => m.dispose());
        } else if ((obj as THREE.Points).isPoints) {
          const pts = obj as THREE.Points;
          (pts.geometry as THREE.BufferGeometry).dispose();
          (pts.material as THREE.Material).dispose();
        }
      });

      // Dispose textures that were loaded asynchronously
      if (globeMat.map) globeMat.map.dispose();
      if (globeMat.bumpMap) globeMat.bumpMap.dispose();
      if (globeMat.specularMap) globeMat.specularMap.dispose();
      if (cloudMat?.map) cloudMat.map.dispose();

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
    />
  );
}
