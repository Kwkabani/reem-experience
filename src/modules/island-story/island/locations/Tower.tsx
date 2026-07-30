import { memo } from 'react';
import { motion } from 'framer-motion';

function Tower() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 120" fill="none" className="drop-shadow-lg">
      <defs>
        <linearGradient id="tower-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6a6a7a" stopOpacity="0.5" />
          <stop offset="30%" stopColor="#8a8a9a" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#7a7a8a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#5a5a6a" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="tower-spire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a4a6a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3a2a4a" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="beacon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffeeaa" stopOpacity="0.85" />
          <stop offset="25%" stopColor="#ffcc44" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffaa22" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ff8800" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffeeaa" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#ffdd66" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffeeaa" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Shadow on ground */}
      <ellipse cx="40" cy="115" rx="24" ry="5" fill="rgba(0,0,0,0.14)" />

      {/* Tower body - taller */}
      <path d="M22 100 L24 28 L56 28 L58 100 Z" fill="url(#tower-body)" />

      {/* Stone block texture */}
      <line x1="23" y1="40" x2="57" y2="40" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
      <line x1="23" y1="52" x2="57" y2="52" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
      <line x1="22" y1="64" x2="58" y2="64" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
      <line x1="22" y1="76" x2="58" y2="76" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
      <line x1="22" y1="88" x2="58" y2="88" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
      {/* Vertical stone joints */}
      <line x1="40" y1="34" x2="40" y2="40" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" />
      <line x1="32" y1="46" x2="32" y2="52" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" />
      <line x1="48" y1="46" x2="48" y2="52" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" />
      <line x1="36" y1="58" x2="36" y2="64" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" />
      <line x1="44" y1="58" x2="44" y2="64" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" />

      {/* Windows - 3 levels */}
      {/* Level 1 (bottom) */}
      <rect x="34" y="78" width="12" height="16" rx="1" fill="rgba(20,20,30,0.4)" />
      <rect x="36" y="80" width="8" height="12" rx="0.5" fill="#ffcc44" opacity="0.12" />

      {/* Level 2 (middle) */}
      <rect x="34" y="54" width="12" height="14" rx="1" fill="rgba(20,20,30,0.4)" />
      <rect x="36" y="56" width="8" height="10" rx="0.5" fill="#ffcc44" opacity="0.18" />
      <line x1="40" y1="56" x2="40" y2="66" stroke="rgba(40,20,10,0.3)" strokeWidth="0.8" />
      <line x1="36" y1="61" x2="44" y2="61" stroke="rgba(40,20,10,0.3)" strokeWidth="0.8" />

      {/* Level 3 (top) */}
      <rect x="34" y="36" width="12" height="12" rx="1" fill="rgba(20,20,30,0.35)" />
      <motion.rect
        x="36"
        y="38"
        width="8"
        height="8"
        rx="0.5"
        fill="#ffcc44"
        opacity="0.25"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="40" y1="38" x2="40" y2="46" stroke="rgba(40,20,10,0.3)" strokeWidth="0.8" />
      <line x1="36" y1="42" x2="44" y2="42" stroke="rgba(40,20,10,0.3)" strokeWidth="0.8" />

      {/* Balcony at top */}
      <rect x="20" y="28" width="40" height="4" rx="1" fill="rgba(80,80,100,0.4)" />
      {/* Balcony railing */}
      <line x1="22" y1="24" x2="22" y2="32" stroke="rgba(80,80,100,0.2)" strokeWidth="0.8" />
      <line x1="30" y1="24" x2="30" y2="32" stroke="rgba(80,80,100,0.2)" strokeWidth="0.8" />
      <line x1="40" y1="24" x2="40" y2="32" stroke="rgba(80,80,100,0.2)" strokeWidth="0.8" />
      <line x1="50" y1="24" x2="50" y2="32" stroke="rgba(80,80,100,0.2)" strokeWidth="0.8" />
      <line x1="58" y1="24" x2="58" y2="32" stroke="rgba(80,80,100,0.2)" strokeWidth="0.8" />
      {/* Railing crossbar */}
      <line x1="20" y1="24" x2="60" y2="24" stroke="rgba(80,80,100,0.18)" strokeWidth="0.6" />

      {/* Spire roof */}
      <path d="M22 30 L40 4 L58 30 Z" fill="url(#tower-spire)" />
      {/* Spire detail lines */}
      <path d="M40 4 L40 30" stroke="rgba(80,70,100,0.15)" strokeWidth="0.5" />
      <path d="M40 4 L28 30" stroke="rgba(80,70,100,0.08)" strokeWidth="0.3" />
      <path d="M40 4 L52 30" stroke="rgba(80,70,100,0.08)" strokeWidth="0.3" />

      {/* Flag on top */}
      <line x1="40" y1="4" x2="40" y2="-8" stroke="rgba(80,80,100,0.3)" strokeWidth="0.8" />
      <path d="M40 -8 L50 -5 L40 -2 Z" fill="rgba(160,60,60,0.25)" />

      {/* Beacon crystal */}
      <motion.circle
        cx="40"
        cy="8"
        r="5"
        fill="#ffeeaa"
        opacity="0.85"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Beacon glow */}
      <motion.circle
        cx="40"
        cy="8"
        r="14"
        fill="url(#beacon-glow)"
        animate={{ r: [14, 20, 14], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Outer beacon glow ring */}
      <motion.circle
        cx="40"
        cy="8"
        r="22"
        fill="url(#beacon-glow)"
        animate={{ r: [22, 30, 22], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Primary light beam going up */}
      <motion.path
        d="M37 6 L34 -20 L46 -20 L43 6 Z"
        fill="url(#beam-grad)"
        opacity={0.7}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary wider beam */}
      <motion.path
        d="M34 4 L28 -25 L52 -25 L46 4 Z"
        fill="url(#beam-grad)"
        opacity={0.35}
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Particles around beam */}
      <motion.circle
        cx="38"
        cy="-5"
        r="1"
        fill="#ffeeaa"
        opacity="0.5"
        animate={{ y: [-2, -18], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
      />
      <motion.circle
        cx="44"
        cy="-2"
        r="0.8"
        fill="#ffdd66"
        opacity="0.4"
        animate={{ y: [-2, -15], opacity: [0.4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
      />
      <motion.circle
        cx="40"
        cy="0"
        r="1.2"
        fill="#ffeeaa"
        opacity="0.6"
        animate={{ y: [-1, -20], opacity: [0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
      />
      <motion.circle
        cx="36"
        cy="-8"
        r="0.7"
        fill="#ffcc44"
        opacity="0.35"
        animate={{ y: [-3, -16], x: [-2, 2], opacity: [0.35, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
      />

      {/* Decorative elements */}
      <rect x="37" y="96" width="6" height="4" rx="1" fill="rgba(60,60,80,0.3)" />
      <circle cx="40" cy="98" r="1.5" fill="rgba(201,168,76,0.2)" />
      {/* Arch above top window */}
      <path d="M33 36 Q40 32 47 36" stroke="rgba(80,80,100,0.15)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

export default memo(Tower);
