import { memo } from 'react';
import { motion } from 'framer-motion';

function House() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 100" fill="none" className="drop-shadow-lg">
      <defs>
        <linearGradient id="roof-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a3a2a" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#6a2a1a" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="wall-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b89878" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8a7050" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="window-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffdd77" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#ffaa33" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff8800" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ground-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffaa33" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffaa33" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow on ground */}
      <ellipse cx="60" cy="90" rx="42" ry="7" fill="rgba(0,0,0,0.15)" />

      {/* Warm light spill on ground from window */}
      <motion.ellipse
        cx="38"
        cy="88"
        rx="22"
        ry="8"
        fill="url(#ground-light)"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* House body */}
      <rect x="26" y="42" width="68" height="44" rx="2" fill="url(#wall-grad)" />

      {/* Wood plank texture */}
      <line x1="26" y1="46" x2="94" y2="46" stroke="rgba(60,40,20,0.08)" strokeWidth="0.5" />
      <line x1="26" y1="50" x2="94" y2="50" stroke="rgba(60,40,20,0.06)" strokeWidth="0.5" />
      <line x1="26" y1="54" x2="94" y2="54" stroke="rgba(60,40,20,0.07)" strokeWidth="0.5" />
      <line x1="26" y1="58" x2="94" y2="58" stroke="rgba(60,40,20,0.06)" strokeWidth="0.5" />
      <line x1="26" y1="62" x2="94" y2="62" stroke="rgba(60,40,20,0.07)" strokeWidth="0.5" />
      <line x1="26" y1="66" x2="94" y2="66" stroke="rgba(60,40,20,0.06)" strokeWidth="0.5" />
      <line x1="26" y1="70" x2="94" y2="70" stroke="rgba(60,40,20,0.07)" strokeWidth="0.5" />
      <line x1="26" y1="74" x2="94" y2="74" stroke="rgba(60,40,20,0.06)" strokeWidth="0.5" />
      <line x1="26" y1="78" x2="94" y2="78" stroke="rgba(60,40,20,0.07)" strokeWidth="0.5" />

      {/* Vertical plank lines */}
      <line x1="40" y1="42" x2="40" y2="86" stroke="rgba(40,30,20,0.04)" strokeWidth="0.3" />
      <line x1="54" y1="42" x2="54" y2="86" stroke="rgba(40,30,20,0.04)" strokeWidth="0.3" />
      <line x1="68" y1="42" x2="68" y2="86" stroke="rgba(40,30,20,0.04)" strokeWidth="0.3" />
      <line x1="82" y1="42" x2="82" y2="86" stroke="rgba(40,30,20,0.04)" strokeWidth="0.3" />

      {/* Roof - thatch style */}
      <polygon points="18,44 60,14 102,44" fill="url(#roof-grad)" />
      {/* Thatch texture */}
      <path d="M24 42 L60 16 L96 42" stroke="rgba(160,80,50,0.12)" strokeWidth="0.5" fill="none" />
      <path d="M30 40 L60 18 L90 40" stroke="rgba(160,80,50,0.1)" strokeWidth="0.5" fill="none" />
      <path d="M36 38 L60 20 L84 38" stroke="rgba(160,80,50,0.08)" strokeWidth="0.5" fill="none" />
      {/* Thatch edge fringe */}
      <path d="M18 44 L60 14 L102 44" stroke="rgba(140,60,40,0.15)" strokeWidth="1.5" fill="none" />
      {/* Ridge line */}
      <line
        x1="60"
        y1="14"
        x2="60"
        y2="20"
        stroke="rgba(180,90,60,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Porch */}
      <rect x="22" y="42" width="8" height="14" rx="1" fill="rgba(80,60,40,0.3)" />
      <rect x="22" y="38" width="76" height="5" rx="1" fill="rgba(90,70,50,0.25)" />
      {/* Porch posts */}
      <rect x="24" y="42" width="2" height="44" rx="0.5" fill="rgba(60,40,20,0.2)" />
      <rect x="96" y="42" width="2" height="44" rx="0.5" fill="rgba(60,40,20,0.2)" />
      {/* Porch beam */}
      <rect x="22" y="42" width="78" height="2" rx="0.5" fill="rgba(80,60,40,0.15)" />

      {/* Door */}
      <rect x="56" y="58" width="18" height="28" rx="2" fill="rgba(60,30,15,0.5)" />
      <rect x="58" y="60" width="14" height="24" rx="1.5" fill="rgba(80,40,20,0.4)" />
      {/* Door frame */}
      <rect
        x="56"
        y="58"
        width="18"
        height="28"
        rx="2"
        stroke="rgba(100,60,30,0.2)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Door handle */}
      <circle cx="70" cy="73" r="1.5" fill="rgba(201,168,76,0.45)" />
      {/* Door panel */}
      <rect x="61" y="63" width="8" height="10" rx="1" fill="rgba(60,30,15,0.15)" />

      {/* Window frame */}
      <rect x="30" y="52" width="14" height="14" rx="1" fill="rgba(40,20,10,0.4)" />
      <rect x="31" y="53" width="12" height="12" rx="0.5" fill="#ffdd77" opacity="0.5" />

      {/* Window glow */}
      <motion.rect
        x="31"
        y="53"
        width="12"
        height="12"
        rx="0.5"
        fill="#ffdd77"
        opacity="0.7"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Window cross */}
      <line x1="37" y1="53" x2="37" y2="65" stroke="rgba(40,20,10,0.5)" strokeWidth="1" />
      <line x1="31" y1="59" x2="43" y2="59" stroke="rgba(40,20,10,0.5)" strokeWidth="1" />

      {/* Window glow effect outside */}
      <motion.rect
        x="29"
        y="51"
        width="16"
        height="16"
        rx="2"
        fill="url(#window-glow)"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Second window */}
      <rect x="78" y="52" width="14" height="14" rx="1" fill="rgba(40,20,10,0.35)" />
      <motion.rect
        x="79"
        y="53"
        width="12"
        height="12"
        rx="0.5"
        fill="#ffdd77"
        opacity="0.4"
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="85" y1="53" x2="85" y2="65" stroke="rgba(40,20,10,0.4)" strokeWidth="1" />
      <line x1="79" y1="59" x2="91" y2="59" stroke="rgba(40,20,10,0.4)" strokeWidth="1" />

      {/* Chimney */}
      <rect x="72" y="18" width="12" height="24" rx="1" fill="rgba(140,80,50,0.55)" />
      <rect x="70" y="16" width="16" height="5" rx="1" fill="rgba(160,90,60,0.55)" />
      {/* Chimney brick lines */}
      <line x1="72" y1="24" x2="84" y2="24" stroke="rgba(100,60,30,0.08)" strokeWidth="0.5" />
      <line x1="72" y1="30" x2="84" y2="30" stroke="rgba(100,60,30,0.08)" strokeWidth="0.5" />
      <line x1="72" y1="36" x2="84" y2="36" stroke="rgba(100,60,30,0.08)" strokeWidth="0.5" />

      {/* Smoke from chimney - more visible */}
      <motion.circle
        cx="78"
        cy="10"
        r="5"
        fill="rgba(200,200,215,0.15)"
        animate={{ y: [-12, -28], opacity: [0.2, 0], scale: [1, 2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.circle
        cx="78"
        cy="10"
        r="4"
        fill="rgba(200,200,215,0.12)"
        animate={{ y: [-12, -26], opacity: [0.15, 0], scale: [1, 1.8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
      />
      <motion.circle
        cx="78"
        cy="10"
        r="3.5"
        fill="rgba(200,200,215,0.1)"
        animate={{ y: [-10, -24], opacity: [0.12, 0], scale: [1, 1.6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut', delay: 2.5 }}
      />

      {/* Small fence */}
      <line x1="12" y1="86" x2="20" y2="86" stroke="rgba(80,60,30,0.2)" strokeWidth="1.5" />
      <line x1="12" y1="86" x2="12" y2="78" stroke="rgba(80,60,30,0.2)" strokeWidth="1.5" />
      <line x1="16" y1="86" x2="16" y2="78" stroke="rgba(80,60,30,0.18)" strokeWidth="1" />
      <line x1="20" y1="86" x2="20" y2="78" stroke="rgba(80,60,30,0.18)" strokeWidth="1" />
      <line x1="10" y1="78" x2="22" y2="78" stroke="rgba(80,60,30,0.15)" strokeWidth="1" />

      {/* Small flowers by fence */}
      <circle cx="14" cy="82" r="1.5" fill="rgba(200,100,120,0.25)" />
      <circle cx="18" cy="80" r="1" fill="rgba(220,180,80,0.2)" />
      <circle cx="10" cy="84" r="1.2" fill="rgba(200,80,100,0.2)" />
    </svg>
  );
}

export default memo(House);
