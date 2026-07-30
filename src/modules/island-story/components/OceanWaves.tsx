import { memo } from 'react';
import { motion } from 'framer-motion';

const STAR_DATA = Array.from({ length: 40 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 50,
  size: 0.5 + Math.random() * 1.8,
  opacity: 0.2 + Math.random() * 0.8,
  delay: i * 0.2,
  duration: 2 + (i % 4) * 1.5,
}));

const BIOLUMINESCENT = Array.from({ length: 6 }, (_, i) => ({
  x: 10 + Math.random() * 80,
  y: 55 + Math.random() * 35,
  size: 2 + Math.random() * 4,
  delay: i * 0.8,
  duration: 4 + Math.random() * 4,
}));

const WAVE_DATA = [
  {
    svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z' fill='rgba(13,42,58,0.3)'/%3E%3C/svg%3E")`,
    size: 1200,
    duration: 8,
    distance: -600,
    topOffset: 0,
  },
  {
    svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z' fill='rgba(20,50,70,0.25)'/%3E%3C/svg%3E")`,
    size: 1200,
    duration: 11,
    distance: -600,
    topOffset: -20,
  },
  {
    svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z' fill='rgba(30,60,80,0.18)'/%3E%3C/svg%3E")`,
    size: 1200,
    duration: 14,
    distance: -600,
    topOffset: -40,
  },
  {
    svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,40 C150,100 300,0 600,50 C900,100 1050,0 1200,40 L1200,120 L0,120 Z' fill='rgba(40,80,100,0.12)'/%3E%3C/svg%3E")`,
    size: 1800,
    duration: 18,
    distance: -900,
    topOffset: -60,
  },
];

function OceanWaves() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#060d1a' }}>
      {/* Stars */}
      <div className="absolute inset-0">
        {STAR_DATA.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{ opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div className="absolute" style={{ left: '65%', top: '12%', width: '90px', height: '90px' }}>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 60% 40%, #f5f0e8, #d4c5a9 50%, transparent 70%)',
            boxShadow: '0 0 60px rgba(212, 197, 169, 0.15), 0 0 120px rgba(212, 197, 169, 0.08)',
          }}
          animate={{
            boxShadow: [
              '0 0 60px rgba(212,197,169,0.15), 0 0 120px rgba(212,197,169,0.08)',
              '0 0 80px rgba(212,197,169,0.25), 0 0 160px rgba(212,197,169,0.12)',
              '0 0 60px rgba(212,197,169,0.15), 0 0 120px rgba(212,197,169,0.08)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Moon craters */}
        <div
          className="absolute rounded-full"
          style={{
            left: '15%',
            top: '10%',
            width: '12px',
            height: '12px',
            background: 'rgba(245, 240, 232, 0.3)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: '45%',
            top: '35%',
            width: '8px',
            height: '8px',
            background: 'rgba(245, 240, 232, 0.2)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: '65%',
            top: '55%',
            width: '5px',
            height: '5px',
            background: 'rgba(245, 240, 232, 0.15)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Moon reflection on water */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: '52%',
          width: '120px',
          height: '80px',
          background: 'linear-gradient(180deg, rgba(212,197,169,0.06) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(4px)',
        }}
        animate={{
          width: ['120px', '140px', '120px'],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ocean gradient */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '60%',
          background:
            'linear-gradient(180deg, rgba(6,13,26,0.6) 0%, #0a1a2e 25%, #0d2a3a 55%, #0a1a2e 100%)',
        }}
      />

      {/* Bioluminescent particles (floating in water) */}
      {BIOLUMINESCENT.map((p, i) => (
        <motion.div
          key={`bio-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle, rgba(100, 220, 200, 0.4), transparent 70%)',
            boxShadow: '0 0 8px rgba(100, 220, 200, 0.15)',
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Wave layers */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(10, 26, 46, 0.7) 15%, rgba(13, 42, 58, 0.95) 100%)',
          }}
        />
        {WAVE_DATA.map((wave, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{
              left: '-50%',
              width: '200%',
              height: '100%',
              background: 'repeat-x',
              backgroundImage: wave.svg,
              backgroundSize: `${wave.size}px 120px`,
              top: `${wave.topOffset}px`,
            }}
            animate={{ x: [0, wave.distance] }}
            transition={{ duration: wave.duration, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {/* Foam line */}
        <motion.div
          className="absolute bottom-[22%] left-0 right-0 h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), rgba(255,255,255,0.08), rgba(255,255,255,0.04), transparent)',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export default memo(OceanWaves);
