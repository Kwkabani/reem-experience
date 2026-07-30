import { memo } from 'react';
import { motion } from 'framer-motion';

function Cave() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 90" fill="none" className="drop-shadow-lg">
      <defs>
        <linearGradient id="rock-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#2a2a2a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="cliff-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4a4a" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#3a3a3a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2a2a2a" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="cave-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#ff8844" stopOpacity="0.4" />
          <stop offset="35%" stopColor="#cc6622" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#442200" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="inner-glow" cx="50%" cy="55%" r="40%">
          <stop offset="0%" stopColor="#ffaa55" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff6622" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow on ground */}
      <ellipse cx="55" cy="82" rx="45" ry="6" fill="rgba(0,0,0,0.13)" />

      {/* Cliff/hill formation above cave */}
      <path
        d="M5 80 Q10 50 18 42 Q25 35 35 38 Q42 30 52 34 Q58 28 65 33 Q72 30 78 35 Q85 32 92 38 Q100 42 108 40 Q115 45 118 55 L120 80 Z"
        fill="url(#cliff-grad)"
      />

      {/* Moss on cliff */}
      <path
        d="M15 48 Q20 44 28 46"
        stroke="rgba(60,100,50,0.15)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M80 42 Q86 38 92 40"
        stroke="rgba(60,100,50,0.12)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M35 50 Q38 46 42 48"
        stroke="rgba(60,100,50,0.1)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Cliff ridge lines */}
      <path d="M12 52 Q16 48 20 46" stroke="rgba(60,60,60,0.12)" strokeWidth="0.6" fill="none" />
      <path d="M85 44 Q88 40 92 38" stroke="rgba(60,60,60,0.1)" strokeWidth="0.6" fill="none" />
      <path d="M45 36 Q48 32 52 34" stroke="rgba(60,60,60,0.08)" strokeWidth="0.5" fill="none" />

      {/* Stalactites */}
      <path d="M25 45 L28 55 L30 46 Z" fill="rgba(60,55,50,0.3)" />
      <path d="M50 38 L52 48 L54 39 Z" fill="rgba(60,55,50,0.25)" />
      <path d="M70 36 L72 44 L74 37 Z" fill="rgba(60,55,50,0.22)" />
      <path d="M38 42 L39 48 L41 43 Z" fill="rgba(60,55,50,0.2)" />
      <path d="M60 35 L61 42 L63 36 Z" fill="rgba(60,55,50,0.18)" />

      {/* Rock formation - back */}
      <path
        d="M8 78 Q12 45 22 40 Q28 36 35 40 Q40 34 50 38 Q55 32 62 38 Q68 34 75 40 Q82 36 88 42 Q95 46 100 44 Q108 48 110 60 Q112 72 110 82 Z"
        fill="url(#rock-grad)"
      />

      {/* Rock details - left side */}
      <path d="M8 78 Q12 52 20 47 Q24 50 18 55 Q14 58 12 65 Z" fill="rgba(50,50,50,0.3)" />
      <path d="M14 58 Q16 54 20 52" stroke="rgba(60,60,60,0.12)" strokeWidth="0.8" fill="none" />

      {/* Rock details - right side */}
      <path
        d="M100 44 Q96 52 92 48 Q88 52 84 48 Q82 52 86 56 Q90 60 94 56 Q98 54 100 58 Z"
        fill="rgba(50,50,50,0.25)"
      />
      <path d="M92 48 Q95 44 98 46" stroke="rgba(60,60,60,0.1)" strokeWidth="0.8" fill="none" />

      {/* Cave entrance (dark opening) - irregular shape */}
      <path
        d="M30 68 Q28 58 32 52 Q35 48 42 46 Q48 44 55 46 Q62 44 68 46 Q74 48 78 52 Q82 56 80 66 Q78 74 72 78 Q60 82 48 80 Q38 78 32 74 Z"
        fill="rgba(5,5,8,0.75)"
      />

      {/* Inner cave glow */}
      <motion.ellipse
        cx="54"
        cy="62"
        rx="16"
        ry="12"
        fill="url(#cave-glow)"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Deep inner glow */}
      <motion.ellipse
        cx="54"
        cy="65"
        rx="8"
        ry="6"
        fill="url(#inner-glow)"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Vines hanging from top */}
      <path
        d="M28 46 Q27 52 29 56"
        stroke="rgba(50,80,40,0.15)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30 44 Q31 50 30 54"
        stroke="rgba(50,80,40,0.12)"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M75 40 Q74 46 76 50"
        stroke="rgba(50,80,40,0.13)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M72 42 Q73 48 71 52"
        stroke="rgba(50,80,40,0.1)"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Small rocks around entrance */}
      <ellipse cx="38" cy="76" rx="5" ry="3.5" fill="rgba(55,50,45,0.3)" />
      <ellipse cx="68" cy="77" rx="4.5" ry="3" fill="rgba(55,50,45,0.25)" />
      <ellipse cx="55" cy="80" rx="6" ry="3" fill="rgba(45,40,35,0.2)" />
      <ellipse cx="28" cy="74" rx="3" ry="2" fill="rgba(50,45,40,0.2)" />
      <ellipse cx="78" cy="74" rx="3" ry="2" fill="rgba(50,45,40,0.18)" />

      {/* Light rays from cave - more visible */}
      <motion.path
        d="M46 58 L38 44"
        stroke="#ff8844"
        strokeWidth="1.5"
        opacity="0.12"
        animate={{ opacity: [0.06, 0.18, 0.06] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M62 58 L70 42"
        stroke="#ff8844"
        strokeWidth="1.2"
        opacity="0.1"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.path
        d="M54 56 L52 38"
        stroke="#ffaa55"
        strokeWidth="1"
        opacity="0.08"
        animate={{ opacity: [0.04, 0.12, 0.04] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      {/* Subtle particles floating from entrance */}
      <motion.circle
        cx="50"
        cy="60"
        r="1"
        fill="#ffaa55"
        opacity="0.2"
        animate={{ y: [-2, -10], opacity: [0.2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
      />
      <motion.circle
        cx="58"
        cy="58"
        r="0.8"
        fill="#ff8844"
        opacity="0.15"
        animate={{ y: [-2, -8], opacity: [0.15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
      />
    </svg>
  );
}

export default memo(Cave);
