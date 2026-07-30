import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const PARTICLE_COUNT = 20;

function AncientTree() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        cx: 30 + Math.random() * 40,
        cy: 15 + Math.random() * 35,
        r: 1 + Math.random() * 2.5,
        duration: 3 + Math.random() * 5,
        delay: i * 0.25,
        color: i % 3 === 0 ? '#aaffaa' : i % 3 === 1 ? '#ffeeaa' : '#88ddff',
      })),
    [],
  );

  return (
    <svg width="100%" height="100%" viewBox="0 0 130 130" fill="none" className="drop-shadow-lg">
      <defs>
        <radialGradient id="tree-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6a9a5a" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#4a7a3a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2a5a1a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="magic-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#aaffaa" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#66dd88" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#33aa55" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="trunk-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5a3a1a" stopOpacity="0.65" />
          <stop offset="40%" stopColor="#7a4a2a" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#6a4020" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5a3a1a" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Shadow on ground */}
      <ellipse cx="60" cy="118" rx="45" ry="7" fill="rgba(0,0,0,0.14)" />

      {/* Ground glow beneath tree */}
      <motion.ellipse
        cx="60"
        cy="115"
        rx="35"
        ry="6"
        fill="#66dd88"
        opacity="0.06"
        animate={{ opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Magical glow behind tree */}
      <motion.circle
        cx="60"
        cy="50"
        r="50"
        fill="url(#magic-glow)"
        animate={{ r: [50, 56, 50], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tree aura */}
      <circle cx="60" cy="50" r="42" fill="url(#tree-glow)" />

      {/* Roots */}
      <path
        d="M50 95 Q30 98 22 104 Q18 108 20 112"
        stroke="#5a3a1a"
        strokeWidth="3.5"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path
        d="M62 95 Q70 102 78 107 Q84 112 80 115"
        stroke="#5a3a1a"
        strokeWidth="3"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path
        d="M54 96 Q42 103 35 108"
        stroke="#5a3a1a"
        strokeWidth="2.5"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M65 95 Q75 100 82 104"
        stroke="#5a3a1a"
        strokeWidth="2"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />

      {/* Trunk - thicker for ancient tree */}
      <path d="M52 92 Q48 65 53 42 L67 42 Q62 65 58 92 Z" fill="url(#trunk-grad)" />

      {/* Trunk texture */}
      <path d="M54 90 Q52 70 56 50" stroke="rgba(40,20,5,0.18)" strokeWidth="1" fill="none" />
      <path d="M58 88 Q56 68 60 48" stroke="rgba(40,20,5,0.14)" strokeWidth="0.8" fill="none" />
      <path d="M56 92 Q54 72 58 52" stroke="rgba(40,20,5,0.1)" strokeWidth="1.2" fill="none" />
      {/* Moss on trunk */}
      <path
        d="M52 75 Q54 72 56 74 Q58 70 59 73"
        stroke="rgba(60,100,50,0.2)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 65 Q62 62 64 64"
        stroke="rgba(60,100,50,0.15)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Main branches */}
      <path
        d="M54 52 Q35 42 25 36"
        stroke="#5a3a1a"
        strokeWidth="3"
        fill="none"
        opacity="0.45"
        strokeLinecap="round"
      />
      <path
        d="M58 48 Q70 36 80 30"
        stroke="#5a3a1a"
        strokeWidth="2.5"
        fill="none"
        opacity="0.45"
        strokeLinecap="round"
      />
      <path
        d="M52 46 Q30 44 20 40"
        stroke="#5a3a1a"
        strokeWidth="2"
        fill="none"
        opacity="0.38"
        strokeLinecap="round"
      />
      <path
        d="M60 42 Q75 38 85 34"
        stroke="#5a3a1a"
        strokeWidth="2"
        fill="none"
        opacity="0.38"
        strokeLinecap="round"
      />
      <path
        d="M56 38 Q40 30 30 26"
        stroke="#5a3a1a"
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path
        d="M62 36 Q72 26 82 22"
        stroke="#5a3a1a"
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />

      {/* Secondary thin branches */}
      <path
        d="M25 36 Q20 30 22 26"
        stroke="#5a3a1a"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M80 30 Q85 24 82 20"
        stroke="#5a3a1a"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Foliage canopy */}
      <motion.g
        animate={{ y: [0, -2.5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Back layer - dark green */}
        <ellipse cx="35" cy="38" rx="22" ry="18" fill="rgba(40,80,30,0.25)" />
        <ellipse cx="70" cy="34" rx="20" ry="16" fill="rgba(38,75,28,0.22)" />
        <ellipse cx="55" cy="28" rx="18" ry="15" fill="rgba(42,82,32,0.25)" />

        {/* Mid layer - medium green */}
        <ellipse cx="40" cy="36" rx="16" ry="14" fill="rgba(55,95,45,0.3)" />
        <ellipse cx="65" cy="33" rx="15" ry="13" fill="rgba(50,90,40,0.28)" />
        <ellipse cx="52" cy="26" rx="14" ry="12" fill="rgba(58,98,48,0.3)" />

        {/* Leaf patches - irregular shapes */}
        <ellipse cx="30" cy="34" rx="10" ry="8" fill="rgba(70,110,55,0.25)" />
        <ellipse cx="75" cy="30" rx="9" ry="7" fill="rgba(65,105,50,0.22)" />
        <ellipse cx="48" cy="22" rx="8" ry="6" fill="rgba(75,115,60,0.2)" />

        {/* Front highlights - lighter green */}
        <ellipse cx="45" cy="32" rx="12" ry="10" fill="rgba(85,125,65,0.22)" />
        <ellipse cx="60" cy="30" rx="10" ry="8" fill="rgba(80,120,60,0.2)" />
        <ellipse cx="52" cy="24" rx="9" ry="7" fill="rgba(90,130,70,0.18)" />

        {/* Bright spot highlights */}
        <ellipse cx="48" cy="28" rx="6" ry="5" fill="rgba(110,155,85,0.15)" />
        <ellipse cx="58" cy="26" rx="5" ry="4" fill="rgba(105,150,80,0.12)" />

        {/* Color variation - yellow-green patches */}
        <ellipse cx="38" cy="30" rx="5" ry="4" fill="rgba(140,170,60,0.12)" />
        <ellipse cx="65" cy="28" rx="4" ry="3" fill="rgba(130,160,55,0.1)" />

        {/* Small flowers in canopy */}
        <circle cx="42" cy="34" r="1.5" fill="rgba(255,200,220,0.2)" />
        <circle cx="58" cy="28" r="1.2" fill="rgba(255,180,200,0.18)" />
        <circle cx="50" cy="38" r="1" fill="rgba(255,200,220,0.15)" />
        <circle cx="68" cy="32" r="1.3" fill="rgba(255,180,200,0.15)" />
        <circle cx="35" cy="40" r="1" fill="rgba(255,200,220,0.12)" />
      </motion.g>

      {/* Floating magical particles */}
      {particles.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill={p.color}
          opacity={0.5}
          animate={{
            y: [-8, -28, -8],
            x: [-3, 4, -3],
            opacity: [0.1, 0.6, 0.1],
            scale: [0.7, 1.3, 0.7],
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
  );
}

export default memo(AncientTree);
