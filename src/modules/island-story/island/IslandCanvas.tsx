import { type ReactNode, useMemo, type CSSProperties } from 'react';
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
import type { LocationConfig, RevealState } from './types';

interface IslandCanvasProps {
  reveal: RevealState;
  cameraZoom: number;
  cameraX: number;
  cameraY: number;
  fogOpacity: number;
  children?: ReactNode;
  character?: ReactNode;
  characterLocationId?: string;
  onLocationSelect?: (id: string) => void;
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

interface CharacterFigureProps {
  character: ReactNode;
  locationId: string;
  locations: LocationConfig[];
}

function CharacterFigure({ character, locationId, locations }: CharacterFigureProps) {
  const loc = locations.find((l) => l.id === locationId);
  if (!loc) return null;
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${loc.x}%`,
        top: `${loc.y + 5}%`,
        transform: 'translate(-50%, -50%)',
        width: '13%',
        zIndex: 60,
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {character}
        </motion.div>
      </motion.div>
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2"
        style={{
          width: '70%',
          height: '8%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.3), transparent 70%)',
        }}
      />
    </div>
  );
}

export default function IslandCanvas({
  reveal,
  cameraZoom,
  cameraX,
  cameraY,
  fogOpacity,
  children,
  character,
  characterLocationId,
  onLocationSelect,
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

                const content = (
                  <>
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
                    {onLocationSelect && (
                      <span
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full
                          bg-[rgba(201,168,76,0.15)] border border-gold/40
                          flex items-center justify-center text-gold text-xs
                          shadow-[0_0_12px_rgba(201,168,76,0.3)]"
                      >
                        +
                      </span>
                    )}
                  </>
                );

                const baseStyle: CSSProperties = {
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: `${22 * locationScaleStyles[loc.id]!.scale}%`,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                  zIndex: loc.depthLayer,
                };

                if (onLocationSelect) {
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => onLocationSelect(loc.id)}
                      aria-label={loc.revealText}
                      className="absolute cursor-pointer select-none bg-transparent border-0 p-0 m-0
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-xl"
                      style={{ ...baseStyle, pointerEvents: 'auto' }}
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <div key={loc.id} className="absolute" style={baseStyle}>
                    {content}
                  </div>
                );
              })}

              {character && characterLocationId && (
                <CharacterFigure
                  character={character}
                  locationId={characterLocationId}
                  locations={LOCATIONS}
                />
              )}
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
