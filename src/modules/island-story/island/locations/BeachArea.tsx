import { memo } from 'react';
import { motion } from 'framer-motion';

const WAVE_DATA = [
  { duration: 6, delay: 0, y: 35, opacity: 0.25, distance: -120 },
  { duration: 9, delay: 0.5, y: 33, opacity: 0.18, distance: -120 },
  { duration: 12, delay: 1, y: 37, opacity: 0.12, distance: -120 },
];

function BeachArea() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 140 100" fill="none" className="drop-shadow-lg">
      <defs>
        <linearGradient id="sand-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4b86a" stopOpacity="0.3" />
          <stop offset="40%" stopColor="#c9a84c" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#b89838" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="water-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a5a7a" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#1a4a6a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0d2a3a" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="wet-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a7050" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#b89838" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Ocean */}
      <rect x="0" y="28" width="140" height="72" fill="url(#water-grad)" rx="2" />

      {/* Wave layers with translateX */}
      <g clipPath="inset(28 0 0 0)">
        {WAVE_DATA.map((wave, i) => (
          <motion.g
            key={i}
            animate={{ x: [0, wave.distance] }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: wave.delay,
            }}
          >
            <path
              d={`M0 ${wave.y} Q17 ${wave.y - 8} 35 ${wave.y} Q52 ${wave.y + 8} 70 ${wave.y} Q87 ${wave.y - 8} 105 ${wave.y} Q122 ${wave.y + 8} 140 ${wave.y} L140 ${wave.y + 10} L0 ${wave.y + 10} Z`}
              fill={`rgba(40,100,140,${wave.opacity})`}
            />
            <path
              d={`M140 ${wave.y} Q157 ${wave.y - 8} 175 ${wave.y} Q192 ${wave.y + 8} 210 ${wave.y} Q227 ${wave.y - 8} 245 ${wave.y} Q262 ${wave.y + 8} 280 ${wave.y} L280 ${wave.y + 10} L140 ${wave.y + 10} Z`}
              fill={`rgba(40,100,140,${wave.opacity})`}
            />
          </motion.g>
        ))}
      </g>

      {/* Shoreline curve */}
      <path
        d="M5 52 Q20 44 40 48 Q60 42 80 46 Q100 42 120 47 Q132 44 138 50 L138 100 L2 100 Z"
        fill="url(#sand-grad)"
      />

      {/* Wet sand strip */}
      <path
        d="M5 52 Q20 44 40 48 Q60 42 80 46 Q100 42 120 47 Q132 44 138 50"
        stroke="url(#wet-sand)"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />

      {/* Tide line */}
      <path
        d="M8 54 Q22 48 42 51 Q62 45 82 49 Q102 45 122 50"
        stroke="rgba(100,80,50,0.15)"
        strokeWidth="0.8"
        fill="none"
        strokeDasharray="2 3"
      />

      {/* Foam along shore */}
      <motion.path
        d="M5 52 Q20 44 40 48 Q60 42 80 46 Q100 42 120 47 Q132 44 138 50"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        animate={{ opacity: [0.15, 0.4, 0.15], strokeWidth: [2, 3, 2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Palm tree silhouette */}
      <g>
        {/* Trunk */}
        <path
          d="M115 42 Q112 30 114 20"
          stroke="rgba(40,30,15,0.25)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Fronds */}
        <path
          d="M114 20 Q108 14 100 16"
          stroke="rgba(30,50,20,0.2)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M114 20 Q118 12 125 14"
          stroke="rgba(30,50,20,0.2)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M114 20 Q110 10 106 8"
          stroke="rgba(30,50,20,0.18)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M114 20 Q120 10 128 10"
          stroke="rgba(30,50,20,0.18)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Second smaller palm */}
      <g opacity="0.5">
        <path
          d="M18 48 Q16 38 18 30"
          stroke="rgba(40,30,15,0.2)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M18 30 Q12 25 8 27"
          stroke="rgba(30,50,20,0.15)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M18 30 Q22 23 28 25"
          stroke="rgba(30,50,20,0.15)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M18 30 Q15 22 12 20"
          stroke="rgba(30,50,20,0.12)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Rocks */}
      <ellipse cx="35" cy="60" rx="5" ry="3.5" fill="rgba(80,70,60,0.2)" />
      <ellipse cx="33" cy="59" rx="3" ry="2" fill="rgba(100,90,80,0.15)" />
      <ellipse cx="90" cy="58" rx="4" ry="3" fill="rgba(80,70,60,0.18)" />
      <ellipse cx="75" cy="63" rx="3" ry="2" fill="rgba(90,80,70,0.12)" />

      {/* Shells */}
      <ellipse cx="45" cy="66" rx="2.5" ry="1.8" fill="rgba(212,197,169,0.35)" />
      <ellipse cx="65" cy="70" rx="2" ry="1.2" fill="rgba(201,168,76,0.3)" />
      <ellipse cx="55" cy="69" rx="1.8" ry="1" fill="rgba(212,197,169,0.25)" />
      <ellipse cx="100" cy="64" rx="1.5" ry="1" fill="rgba(201,168,76,0.2)" />
      <ellipse cx="30" cy="68" rx="1.2" ry="0.8" fill="rgba(212,197,169,0.2)" />

      {/* Beach plants */}
      <g opacity="0.35">
        <path
          d="M25 54 Q27 48 29 54"
          stroke="rgba(70,110,60,0.4)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M25 54 Q23 49 21 54"
          stroke="rgba(60,100,50,0.35)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 55 Q102 50 104 55"
          stroke="rgba(70,110,60,0.35)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 55 Q98 51 96 55"
          stroke="rgba(60,100,50,0.3)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Subtle water shimmer */}
      <motion.rect
        x="30"
        y="34"
        width="20"
        height="1"
        fill="rgba(255,255,255,0.03)"
        animate={{ x: [30, 50, 30], opacity: [0, 0.05, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.rect
        x="70"
        y="38"
        width="15"
        height="1"
        fill="rgba(255,255,255,0.02)"
        animate={{ x: [70, 90, 70], opacity: [0, 0.04, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </svg>
  );
}

export default memo(BeachArea);
