import { type ReactNode, useMemo } from 'react';
import { motion } from 'framer-motion';
import Background from './layers/Background';
import Environment from './layers/Environment';
import Terrain from './layers/Terrain';
import Effects from './layers/Effects';
import BeachArea from './locations/BeachArea';
import House from './locations/House';
import AncientTree from './locations/AncientTree';
import Cave from './locations/Cave';
import Tower from './locations/Tower';
import { LOCATIONS, ISLAND_ASPECT_RATIO, PARALLAX_FACTORS } from './config';
import type { RevealState } from './types';

interface IslandCanvasProps {
  reveal: RevealState;
  cameraZoom: number;
  cameraX: number;
  cameraY: number;
  fogOpacity: number;
  children?: ReactNode;
}

const locationComponents: Record<string, React.ComponentType> = {
  beach: BeachArea,
  house: House,
  tree: AncientTree,
  cave: Cave,
  tower: Tower,
};

const locationAnimationVariants: Record<string, Record<string, unknown>> = {
  float: {
    animate: { y: [0, -3, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  },
  gentle: {
    animate: { y: [0, -2, 0] },
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
  },
  glow: {
    animate: { opacity: [0.6, 1, 0.6] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  },
  pulse: {
    animate: { opacity: [0.7, 1, 0.7], scale: [1, 1.02, 1] },
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

interface ParallaxLayerProps {
  factor: number;
  cameraX: number;
  cameraY: number;
  children: ReactNode;
}

function ParallaxLayer({ factor, cameraX, cameraY, children }: ParallaxLayerProps) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ x: cameraX * factor, y: cameraY * factor }}
      transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}

export default function IslandCanvas({
  reveal,
  cameraZoom,
  cameraX,
  cameraY,
  fogOpacity,
  children,
}: IslandCanvasProps) {
  const locationScaleStyles = useMemo(() => {
    const map: Record<string, { scale: number; depthLayer: number }> = {};
    LOCATIONS.forEach((loc) => {
      map[loc.id] = { scale: loc.scale, depthLayer: loc.depthLayer };
    });
    return map;
  }, []);

  return (
    <div className="relative w-full" style={{ aspectRatio: ISLAND_ASPECT_RATIO }}>
      <motion.div
        className="absolute inset-0"
        animate={{ scale: cameraZoom }}
        transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
        style={{ willChange: 'transform' }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl"
            style={{
              aspectRatio: ISLAND_ASPECT_RATIO,
              border: '1px solid rgba(201, 168, 76, 0.08)',
              boxShadow: '0 0 80px rgba(201, 168, 76, 0.04), 0 0 40px rgba(0,0,0,0.2)',
            }}
          >
            {/* Layer 1: Background (parallax slowest) */}
            <ParallaxLayer factor={PARALLAX_FACTORS.background} cameraX={cameraX} cameraY={cameraY}>
              <Background />
            </ParallaxLayer>

            {/* Layer 2: Environment (parallax medium) */}
            <ParallaxLayer
              factor={PARALLAX_FACTORS.environment}
              cameraX={cameraX}
              cameraY={cameraY}
            >
              <Environment fogOpacity={fogOpacity} />
            </ParallaxLayer>

            {/* Layer 3: Terrain (parallax medium-fast) */}
            <ParallaxLayer factor={PARALLAX_FACTORS.terrain} cameraX={cameraX} cameraY={cameraY}>
              <Terrain />
            </ParallaxLayer>

            {/* Layer 4: Locations (parallax full) */}
            <ParallaxLayer factor={PARALLAX_FACTORS.locations} cameraX={cameraX} cameraY={cameraY}>
              {LOCATIONS.map((loc) => {
                if (!reveal.isLocationRevealed(loc.id)) return null;
                const Component = locationComponents[loc.id];
                if (!Component) return null;
                const anim = locationAnimationVariants[loc.animationType] || {};

                return (
                  <div
                    key={loc.id}
                    className="absolute"
                    style={{
                      left: `${loc.x}%`,
                      top: `${loc.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: `${22 * locationScaleStyles[loc.id]!.scale}%`,
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                      zIndex: loc.depthLayer,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.7 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <motion.div {...anim}>
                        <Component />
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </ParallaxLayer>

            {/* Layer 5: Effects (parallax independent) */}
            <ParallaxLayer factor={PARALLAX_FACTORS.effects} cameraX={cameraX} cameraY={cameraY}>
              <Effects showMagicalParticles={reveal.isLocationRevealed('tree')} />
            </ParallaxLayer>

            {/* Atmosphere overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(6,13,26,0.25) 0%, transparent 25%, transparent 70%, rgba(6,13,26,0.15) 100%)',
              }}
            />
          </div>
        </div>
      </motion.div>

      {children}
    </div>
  );
}
