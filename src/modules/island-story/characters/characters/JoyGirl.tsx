import { memo } from 'react';

function JoyGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="joy-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#joy-glow)" />
      <ellipse cx="100" cy="268" rx="34" ry="6" fill="rgba(0,0,0,0.08)" />

      {/* Hair back */}
      <path
        d="M72 100 Q66 130 70 160 Q72 168 76 170 Q80 164 80 150 Q82 135 83 118 Z"
        fill="#B8860B"
      />
      <path
        d="M128 100 Q134 130 130 160 Q128 168 124 170 Q120 164 120 150 Q118 135 117 118 Z"
        fill="#B8860B"
      />

      {/* Body - sunny dress */}
      <path
        d="M78 172 Q85 158 100 154 Q115 158 122 172 L128 248 Q125 258 115 260 L85 260 Q75 258 72 248 Z"
        fill="#FF8C00"
      />
      {/* Dress overlay */}
      <path
        d="M82 176 Q100 168 118 176 L124 242 Q115 250 100 252 Q85 250 76 242 Z"
        fill="#FFA500"
      />
      {/* Sun on dress */}
      <circle cx="100" cy="215" r="6" fill="#FFD700" opacity="0.5" />
      <g stroke="#FFD700" strokeWidth="0.8" opacity="0.4">
        <line x1="100" y1="207" x2="100" y2="205" />
        <line x1="100" y1="223" x2="100" y2="225" />
        <line x1="92" y1="215" x2="90" y2="215" />
        <line x1="108" y1="215" x2="110" y2="215" />
        <line x1="94" y1="209" x2="93" y2="208" />
        <line x1="106" y1="221" x2="107" y2="222" />
        <line x1="106" y1="209" x2="107" y2="208" />
        <line x1="94" y1="221" x2="93" y2="222" />
      </g>

      {/* Arms */}
      <path d="M78 172 Q66 190 64 210 Q65 215 68 217 L74 215 Q76 208 77 195 Z" fill="#F5D6C6" />
      <path
        d="M122 172 Q134 190 136 210 Q135 215 132 217 L126 215 Q124 208 123 195 Z"
        fill="#F5D6C6"
      />

      {/* Legs */}
      <path d="M88 256 Q86 265 82 268 L78 268 Q76 265 80 258 Z" fill="#E07000" />
      <path d="M112 256 Q114 265 118 268 L122 268 Q124 265 120 258 Z" fill="#E07000" />
      <ellipse cx="80" cy="268" rx="9" ry="5" fill="#FF8C00" />
      <ellipse cx="120" cy="268" rx="9" ry="5" fill="#FF8C00" />

      {/* Head */}
      <circle cx="100" cy="108" r="37" fill="#F5D6C6" />

      {/* Face */}
      <ellipse cx="86" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="114" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="87" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="113" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="89" cy="103" r="1" fill="white" />
      <circle cx="115" cy="103" r="1" fill="white" />
      {/* Happy eyebrows */}
      <path
        d="M81 97 Q86 94 92 97"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M108 97 Q114 94 119 97"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="114" rx="5" ry="3" fill="rgba(255,150,150,0.22)" />
      <ellipse cx="122" cy="114" rx="5" ry="3" fill="rgba(255,150,150,0.22)" />
      {/* Big smile */}
      <path
        d="M94 117 Q100 124 106 117"
        stroke="#D4739D"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M96 119 Q100 122 104 119" fill="#FF8899" opacity="0.3" />

      {/* Hair front */}
      <path
        d="M62 100 Q62 70 80 60 Q92 54 100 57 Q108 54 120 60 Q138 70 138 100 Q134 90 126 84 Q114 76 100 80 Q86 76 74 84 Q66 90 62 100 Z"
        fill="#DAA520"
      />

      {/* Sunflower crown */}
      <g transform="translate(75, 65)">
        <circle cx="0" cy="0" r="4" fill="#FFD700" />
        <circle cx="0" cy="0" r="2" fill="#8B4513" />
      </g>
      <g transform="translate(90, 60)">
        <circle cx="0" cy="0" r="3.5" fill="#FFD700" />
        <circle cx="0" cy="0" r="1.8" fill="#8B4513" />
      </g>
      <g transform="translate(105, 59)">
        <circle cx="0" cy="0" r="3.5" fill="#FFD700" />
        <circle cx="0" cy="0" r="1.8" fill="#8B4513" />
      </g>
      <g transform="translate(118, 63)">
        <circle cx="0" cy="0" r="3" fill="#FFD700" />
        <circle cx="0" cy="0" r="1.5" fill="#8B4513" />
      </g>
      {/* Leaves */}
      <ellipse cx="74" cy="65" rx="3" ry="1.5" fill="#6B8E23" transform="rotate(-20 74 65)" />
      <ellipse cx="119" cy="63" rx="2.5" ry="1.2" fill="#6B8E23" transform="rotate(25 119 63)" />

      {/* Sparkle */}
      <path
        d="M130 55 L132 50 L134 55 L139 57 L134 59 L132 64 L130 59 L125 57 Z"
        fill="#FFD700"
        opacity="0.5"
      />
    </svg>
  );
}

export default memo(JoyGirl);
