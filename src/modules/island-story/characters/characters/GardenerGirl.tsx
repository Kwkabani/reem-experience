import { memo } from 'react';

function GardenerGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="grd-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#6B8E23" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6B8E23" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#grd-glow)" />
      <ellipse cx="100" cy="268" rx="34" ry="6" fill="rgba(0,0,0,0.08)" />

      {/* Braided hair back */}
      <path d="M72 100 Q68 130 70 155 Q72 168 76 172 Q80 165 80 150 Z" fill="#8B4513" />
      <path d="M128 100 Q132 130 130 155 Q128 168 124 172 Q120 165 120 150 Z" fill="#8B4513" />

      {/* Body - garden dress with apron */}
      <path
        d="M78 172 Q85 158 100 154 Q115 158 122 172 L128 248 Q125 258 115 260 L85 260 Q75 258 72 248 Z"
        fill="#6B8E23"
      />
      {/* Apron */}
      <path d="M88 172 Q100 168 112 172 L110 240 Q100 245 90 240 Z" fill="#8FBC8F" />
      {/* Apron pocket */}
      <rect x="93" y="200" width="14" height="12" rx="2" fill="#7AAA7A" />
      {/* Flower in pocket */}
      <circle cx="100" cy="198" r="3" fill="#FFB7C5" />
      <circle cx="100" cy="198" r="1.5" fill="#FFD700" />

      {/* Arms */}
      <path d="M78 172 Q66 190 64 210 Q65 215 68 216 L74 214 Q76 208 77 194 Z" fill="#F5D6C6" />
      <path
        d="M122 172 Q134 190 136 210 Q135 215 132 216 L126 214 Q124 208 123 194 Z"
        fill="#F5D6C6"
      />

      {/* Legs */}
      <path d="M88 256 Q86 264 82 268 L78 268 Q76 264 80 258 Z" fill="#5A7A3A" />
      <path d="M112 256 Q114 264 118 268 L122 268 Q124 264 120 258 Z" fill="#5A7A3A" />
      {/* Garden boots */}
      <ellipse cx="80" cy="268" rx="9" ry="5" fill="#556B2F" />
      <ellipse cx="120" cy="268" rx="9" ry="5" fill="#556B2F" />

      {/* Head */}
      <circle cx="100" cy="108" r="37" fill="#F5D6C6" />

      {/* Face */}
      <ellipse cx="87" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="113" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="88" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="112" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="90" cy="103" r="1" fill="white" />
      <circle cx="114" cy="103" r="1" fill="white" />
      <path
        d="M82 98 Q87 95 92 98"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M108 98 Q113 95 118 98"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="114" rx="5" ry="3" fill="rgba(255,150,150,0.2)" />
      <ellipse cx="122" cy="114" rx="5" ry="3" fill="rgba(255,150,150,0.2)" />
      <path
        d="M95 116 Q100 120 105 116"
        stroke="#D4739D"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hair front - braided crown */}
      <path
        d="M63 100 Q63 72 80 62 Q92 56 100 60 Q108 56 120 62 Q137 72 137 100 Q133 90 125 85 Q112 78 100 82 Q88 78 75 85 Q67 90 63 100 Z"
        fill="#A0522D"
      />
      {/* Braid crown */}
      <path
        d="M70 78 Q80 68 100 65 Q120 68 130 78"
        stroke="#8B4513"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M72 75 Q82 66 100 62 Q118 66 128 75"
        stroke="#A0522D"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Flowers in hair */}
      <circle cx="80" cy="78" r="4" fill="#FFB7C5" />
      <circle cx="80" cy="78" r="2" fill="#FFD700" />
      <circle cx="120" cy="80" r="3.5" fill="#FFB7C5" />
      <circle cx="120" cy="80" r="1.8" fill="#FFD700" />
      <circle cx="95" cy="68" r="2.5" fill="#FFD700" />
      {/* Leaves */}
      <ellipse cx="84" cy="80" rx="3" ry="1.5" fill="#6B8E23" transform="rotate(-30 84 80)" />
      <ellipse cx="116" cy="82" rx="2.5" ry="1.2" fill="#6B8E23" transform="rotate(30 116 82)" />
    </svg>
  );
}

export default memo(GardenerGirl);
