import { memo } from 'react';

function ExplorerGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="exp-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#5A7A3A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#5A7A3A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#exp-glow)" />
      <ellipse cx="100" cy="268" rx="35" ry="6" fill="rgba(0,0,0,0.08)" />

      {/* Hair back */}
      <path
        d="M72 105 Q65 135 68 165 Q70 175 74 178 Q77 170 78 155 Q80 140 82 130 Z"
        fill="#7A5C1A"
      />
      <path
        d="M128 105 Q135 135 132 165 Q130 175 126 178 Q123 170 122 155 Q120 140 118 130 Z"
        fill="#7A5C1A"
      />

      {/* Body - explorer jacket */}
      <path
        d="M78 180 Q85 168 100 165 Q115 168 122 180 L128 245 Q125 255 115 258 L85 258 Q75 255 72 245 Z"
        fill="#5A7A3A"
      />
      {/* Jacket inner */}
      <path d="M88 185 Q100 180 112 185 L108 240 Q100 245 92 240 Z" fill="#4A6A2A" />
      {/* Belt */}
      <rect x="78" y="215" width="44" height="6" rx="1" fill="#8B6914" />
      <rect x="96" y="213" width="8" height="10" rx="1" fill="#C49A3C" />

      {/* Arms */}
      <path d="M78 180 Q68 195 65 215 Q64 220 68 222 L74 220 Q76 215 77 200 Z" fill="#5A7A3A" />
      <path
        d="M122 180 Q132 195 135 215 Q136 220 132 222 L126 220 Q124 215 123 200 Z"
        fill="#5A7A3A"
      />
      {/* Hands */}
      <circle cx="70" cy="220" r="5" fill="#F5D6C6" />
      <circle cx="130" cy="220" r="5" fill="#F5D6C6" />

      {/* Backpack */}
      <path
        d="M110 178 Q130 175 138 185 Q142 195 140 230 L134 235 Q128 230 126 210 Q124 195 118 185 Z"
        fill="#8B6914"
      />
      <rect x="130" y="190" width="3" height="12" rx="1" fill="#6B4A0A" />

      {/* Legs */}
      <path d="M88 255 Q86 265 82 268 L78 268 Q76 265 80 255 Z" fill="#4A6A2A" />
      <path d="M112 255 Q114 265 118 268 L122 268 Q124 265 120 255 Z" fill="#4A6A2A" />
      {/* Boots */}
      <ellipse cx="80" cy="268" rx="9" ry="5" fill="#5C4030" />
      <ellipse cx="120" cy="268" rx="9" ry="5" fill="#5C4030" />

      {/* Head */}
      <circle cx="100" cy="112" r="38" fill="#F5D6C6" />

      {/* Face */}
      <ellipse cx="86" cy="108" rx="5" ry="6" fill="white" />
      <ellipse cx="114" cy="108" rx="5" ry="6" fill="white" />
      <ellipse cx="87" cy="109" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="113" cy="109" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="89" cy="107" r="1" fill="white" />
      <circle cx="115" cy="107" r="1" fill="white" />
      {/* Eyebrows */}
      <path
        d="M80 100 Q86 97 92 100"
        stroke="#6B4A0A"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M108 100 Q114 97 120 100"
        stroke="#6B4A0A"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      {/* Blush */}
      <ellipse cx="78" cy="118" rx="5" ry="3" fill="rgba(255,150,150,0.2)" />
      <ellipse cx="122" cy="118" rx="5" ry="3" fill="rgba(255,150,150,0.2)" />
      {/* Mouth */}
      <path
        d="M95 119 Q100 123 105 119"
        stroke="#D4739D"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hair front */}
      <path
        d="M62 105 Q62 75 80 65 Q90 60 100 62 Q110 60 120 65 Q138 75 138 105 Q135 95 128 90 Q118 85 100 88 Q82 85 72 90 Q65 95 62 105 Z"
        fill="#8B6914"
      />
      <path d="M62 105 Q58 100 60 95 Q63 85 72 82 Z" fill="#8B6914" />
      {/* Ponytail */}
      <path d="M100 62 Q102 50 108 45 Q112 42 115 44 Q110 48 108 55 Z" fill="#8B6914" />
      <path d="M108 44 Q118 40 125 42 Q130 45 128 50 Q120 46 112 48 Z" fill="#8B6914" />

      {/* Hair accessory - compass */}
      <circle cx="100" cy="65" r="4" fill="#C49A3C" />
      <circle cx="100" cy="65" r="2" fill="white" />
      <line x1="100" y1="62" x2="100" y2="68" stroke="#C49A3C" strokeWidth="0.5" />
      <line x1="97" y1="65" x2="103" y2="65" stroke="#C49A3C" strokeWidth="0.5" />
    </svg>
  );
}

export default memo(ExplorerGirl);
