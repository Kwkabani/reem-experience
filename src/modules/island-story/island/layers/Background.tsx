import { memo } from 'react';
import { motion } from 'framer-motion';

const STAR_DATA = Array.from({ length: 50 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 60,
  size: 0.5 + Math.random() * 2,
  opacity: 0.2 + Math.random() * 0.8,
  delay: i * 0.15,
  duration: 2 + (i % 6) * 1.2,
}));

const CLOUD_DATA = [
  { x: 10, y: 16, width: 140, height: 40, duration: 50, delay: 0, opacity: 0.12 },
  { x: 45, y: 10, width: 180, height: 44, duration: 60, delay: 4, opacity: 0.15 },
  { x: 72, y: 20, width: 120, height: 36, duration: 45, delay: 8, opacity: 0.1 },
  { x: 30, y: 24, width: 100, height: 30, duration: 55, delay: 2, opacity: 0.08 },
];

function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0d1a2e 0%, #1a2438 20%, #2a2a30 40%, #3a3028 55%, #4a3828 70%, #2a2018 100%)',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5f0e8" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#d4c5a9" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#d4c5a9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#d4c5a9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mountains-distant" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3a40" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2a2a30" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="mountains-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a32" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1a1a22" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="mountains-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a24" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#101018" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="horizon-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4a060" stopOpacity="0" />
            <stop offset="40%" stopColor="#d4a060" stopOpacity="0.04" />
            <stop offset="70%" stopColor="#c98840" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#a06830" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="400" height="300" fill="url(#horizon-glow)" />

        {STAR_DATA.map((star, i) => (
          <motion.circle
            key={i}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill="white"
            opacity={star.opacity * 0.3}
            animate={{ opacity: [star.opacity * 0.15, star.opacity * 0.8, star.opacity * 0.15] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Moon glow */}
        <circle cx="75%" cy="18%" r="65" fill="url(#moon-glow)" />
        <motion.circle
          cx="75%"
          cy="18%"
          r="48"
          fill="url(#moon-glow)"
          animate={{ r: [48, 54, 48] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Moon body with craters */}
        <circle cx="75%" cy="18%" r="24" fill="#f5f0e8" opacity="0.95" />
        <circle cx="72%" cy="14%" r="4.5" fill="#d4c5a9" opacity="0.35" />
        <circle cx="78%" cy="20%" r="3" fill="#d4c5a9" opacity="0.25" />
        <circle cx="73%" cy="22%" r="2" fill="#d4c5a9" opacity="0.2" />
        <circle cx="69%" cy="18%" r="1.5" fill="#d4c5a9" opacity="0.15" />

        {/* Mountain layer 1 - distant (atmospheric, light) */}
        <path
          d="M0 230 Q30 190 60 210 Q90 170 130 195 Q160 150 200 185 Q230 165 270 190 Q300 155 340 180 Q370 160 400 175 L400 300 L0 300 Z"
          fill="url(#mountains-distant)"
          opacity="0.4"
        />

        {/* Mountain layer 2 - mid */}
        <path
          d="M0 245 Q40 205 80 225 Q120 185 160 210 Q200 175 240 200 Q280 170 320 195 Q360 180 400 195 L400 300 L0 300 Z"
          fill="url(#mountains-mid)"
          opacity="0.5"
        />

        {/* Mountain layer 3 - near (darkest, most detail) */}
        <path
          d="M0 260 Q25 230 50 245 Q75 215 110 235 Q140 190 180 220 Q210 200 250 225 Q280 195 320 215 Q350 200 400 220 L400 300 L0 300 Z"
          fill="url(#mountains-near)"
          opacity="0.6"
        />

        {/* Mountain ridge highlights */}
        <path
          d="M0 260 Q25 230 50 245 Q75 215 110 235"
          stroke="rgba(200,200,220,0.04)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M140 190 Q160 150 180 220"
          stroke="rgba(200,200,220,0.03)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      {/* Clouds */}
      {CLOUD_DATA.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            opacity: cloud.opacity,
          }}
          animate={{ x: [0, 25, 0] }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: cloud.delay,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 140 44" fill="none">
            <ellipse cx="35" cy="26" rx="32" ry="14" fill="white" opacity="0.12" />
            <ellipse cx="70" cy="20" rx="40" ry="16" fill="white" opacity="0.15" />
            <ellipse cx="105" cy="26" rx="30" ry="12" fill="white" opacity="0.1" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default memo(Background);
