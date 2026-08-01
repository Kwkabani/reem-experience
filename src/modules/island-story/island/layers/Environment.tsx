import { memo } from 'react';
import { motion } from 'framer-motion';

const WAVE_LAYERS = [
  {
    path: 'M0,30 C30,50 60,10 100,30 C140,50 170,10 200,30 C230,50 260,10 300,30 C330,50 360,10 400,30 L400,80 L0,80 Z',
    fill: 'rgba(20,60,90,0.12)',
    duration: 6,
    delay: 0,
    topOffset: '68%',
    height: '40px',
    distance: -400,
  },
  {
    path: 'M0,25 C40,45 80,5 120,25 C160,45 200,5 240,25 C280,45 320,5 360,25 L400,45 L400,80 L0,80 Z',
    fill: 'rgba(30,70,100,0.09)',
    duration: 9,
    delay: 0.5,
    topOffset: '70%',
    height: '35px',
    distance: -400,
  },
  {
    path: 'M0,35 C25,15 50,35 75,15 C100,35 125,15 150,35 C175,15 200,35 225,15 C250,35 275,15 300,35 L400,60 L0,60 Z',
    fill: 'rgba(15,50,80,0.08)',
    duration: 12,
    delay: 1,
    topOffset: '72%',
    height: '30px',
    distance: -400,
  },
];

const FOG_PARTICLE_DATA = [
  { x: 10, y: 65, size: 60, duration: 14, delay: 0 },
  { x: 30, y: 72, size: 80, duration: 18, delay: 0.4 },
  { x: 50, y: 68, size: 70, duration: 12, delay: 0.8 },
  { x: 70, y: 75, size: 90, duration: 16, delay: 1.2 },
  { x: 85, y: 70, size: 65, duration: 14, delay: 1.6 },
  { x: 20, y: 80, size: 75, duration: 10, delay: 2 },
  { x: 45, y: 85, size: 55, duration: 13, delay: 2.4 },
  { x: 60, y: 78, size: 85, duration: 15, delay: 2.8 },
  { x: 75, y: 82, size: 60, duration: 11, delay: 3.2 },
  { x: 90, y: 76, size: 70, duration: 17, delay: 3.6 },
  { x: 15, y: 88, size: 50, duration: 12, delay: 4 },
  { x: 55, y: 90, size: 65, duration: 14, delay: 4.4 },
];

const VEGETATION_DATA = [
  { x: 12, y: 72, size: 14, color: 'rgba(60,90,50,0.25)' },
  { x: 35, y: 75, size: 10, color: 'rgba(50,80,40,0.2)' },
  { x: 65, y: 73, size: 12, color: 'rgba(55,85,45,0.22)' },
  { x: 85, y: 76, size: 16, color: 'rgba(60,90,50,0.2)' },
  { x: 22, y: 70, size: 8, color: 'rgba(50,80,40,0.18)' },
  { x: 78, y: 71, size: 11, color: 'rgba(55,85,45,0.2)' },
];

interface EnvironmentProps {
  fogOpacity: number;
}

function Environment({ fogOpacity }: EnvironmentProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ocean base */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '35%',
          background:
            'linear-gradient(180deg, rgba(10,30,50,0.3) 0%, #0a1a2e 30%, #0d1e32 60%, #091520 100%)',
        }}
      />

      {/* Wave layers with translateX animation */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%] overflow-hidden">
        {WAVE_LAYERS.map((wave, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0"
            style={{ top: wave.topOffset, height: wave.height }}
            animate={{ x: [0, wave.distance] }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: wave.delay,
            }}
          >
            <svg
              width="200%"
              height="100%"
              viewBox="0 0 800 80"
              preserveAspectRatio="none"
              style={{ display: 'block' }}
            >
              <path d={wave.path + ` M400,0 L800,0 L800,80 L0,80 Z`} fill={wave.fill} />
              <g transform="translate(400, 0)">
                <path d={wave.path + ` M400,0 L800,0 L800,80 L0,80 Z`} fill={wave.fill} />
              </g>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Shore/sand area */}
      <div
        className="absolute bottom-0 left-[8%] right-[8%]"
        style={{
          height: '10%',
          background:
            'linear-gradient(180deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.07) 40%, transparent 100%)',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        }}
      />

      {/* Foam line */}
      <motion.div
        className="absolute bottom-[10%] left-[12%] right-[12%] h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), rgba(255,255,255,0.12), rgba(255,255,255,0.07), transparent)',
        }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Small vegetation */}
      {VEGETATION_DATA.map((veg, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${veg.x}%`,
            top: `${veg.y}%`,
            width: `${veg.size}px`,
            height: `${veg.size * 0.6}px`,
            background: `radial-gradient(ellipse, ${veg.color}, transparent 70%)`,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Fog overlay */}
      {fogOpacity > 0 && (
        <div
          className="absolute inset-0"
          style={{
            opacity: fogOpacity,
            background:
              'radial-gradient(ellipse at 50% 55%, rgba(180,190,210,0.08), rgba(6,13,26,0.9) 65%)',
            transition: 'opacity 1.5s ease-in-out',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Fog particles */}
      {fogOpacity > 0.05 && (
        <div className="absolute inset-0">
          {FOG_PARTICLE_DATA.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: 'radial-gradient(ellipse, rgba(200,210,230,0.05), transparent 70%)',
                filter: 'blur(4px)',
              }}
              animate={{
                x: [0, p.size * 0.25, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Environment);
