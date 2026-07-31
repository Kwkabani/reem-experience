import { memo } from 'react';

function Terrain() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ground-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(40,60,30,0)" />
            <stop offset="60%" stopColor="rgba(40,60,30,0.08)" />
            <stop offset="100%" stopColor="rgba(30,50,20,0.12)" />
          </linearGradient>
        </defs>

        {/* Main ground fill behind all locations */}
        <path
          d="M0 180 Q50 160 100 170 Q150 155 200 165 Q250 150 300 160 Q350 155 400 170 L400 300 L0 300 Z"
          fill="rgba(40,55,30,0.06)"
        />

        {/* Path connecting beach -> house */}
        <path
          d="M180 205 Q160 190 140 170 Q130 160 120 155"
          stroke="rgba(60,75,45,0.08)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Path connecting beach -> tree */}
        <path
          d="M220 205 Q250 195 270 178 Q280 170 285 160"
          stroke="rgba(60,75,45,0.08)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Path connecting house -> cave */}
        <path
          d="M110 150 Q95 135 85 122 Q80 115 78 110"
          stroke="rgba(60,75,45,0.06)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Path connecting tree -> tower */}
        <path
          d="M290 155 Q300 140 310 125 Q315 115 318 108"
          stroke="rgba(60,75,45,0.06)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Ground texture / grass patches */}
        <g opacity="0.04">
          <circle cx="150" cy="180" r="3" fill="#5a8a3a" />
          <circle cx="160" cy="175" r="2" fill="#4a7a2a" />
          <circle cx="250" cy="185" r="3" fill="#5a8a3a" />
          <circle cx="260" cy="170" r="2.5" fill="#4a7a2a" />
          <circle cx="130" cy="140" r="2" fill="#5a8a3a" />
          <circle cx="280" cy="150" r="2.5" fill="#4a7a2a" />
          <circle cx="90" cy="125" r="2" fill="#3a6a2a" />
          <circle cx="310" cy="110" r="2" fill="#3a6a2a" />
        </g>
      </svg>
    </div>
  );
}

export default memo(Terrain);
