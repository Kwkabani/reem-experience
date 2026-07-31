import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface EffectsProps {
  showMagicalParticles: boolean;
}

const FIREFLY_COUNT = 8;

function Effects({ showMagicalParticles }: EffectsProps) {
  const magicalParticles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        x: Math.random() * 100,
        y: 25 + Math.random() * 55,
        size: 1.5 + Math.random() * 3.5,
        duration: 4 + Math.random() * 7,
        delay: i * 0.25,
        color:
          i % 4 === 0 ? '#aaffaa' : i % 4 === 1 ? '#ffeeaa' : i % 4 === 2 ? '#88ddff' : '#ffccaa',
      })),
    [],
  );

  const fireflies = useMemo(
    () =>
      Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
        x: 15 + Math.random() * 70,
        y: 55 + Math.random() * 30,
        size: 2 + Math.random() * 3,
        duration: 3 + Math.random() * 4,
        delay: i * 0.6,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ambient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, transparent 35%, rgba(6,13,26,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Moon reflection on water */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '18%',
          width: '100px',
          height: '70px',
          background: 'linear-gradient(180deg, rgba(212,197,169,0.06) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(5px)',
        }}
        animate={{ width: ['100px', '130px', '100px'], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fireflies near ground */}
      {fireflies.map((f, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: 'radial-gradient(circle, rgba(200,220,100,0.4), transparent 70%)',
            boxShadow: '0 0 6px rgba(200,220,100,0.12)',
          }}
          animate={{
            y: [0, -8, 2, -6, 0],
            x: [0, 4, -3, 2, 0],
            opacity: [0.1, 0.5, 0.2, 0.6, 0.1],
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Magical floating particles */}
      {showMagicalParticles && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {magicalParticles.map((p, i) => (
            <motion.circle
              key={i}
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.size}
              fill={p.color}
              opacity={0.25}
              filter="url(#glow)"
              animate={{
                y: [-12, -32, -12],
                x: [-4, 6, -4],
                opacity: [0, 0.45, 0],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}

export default memo(Effects);
