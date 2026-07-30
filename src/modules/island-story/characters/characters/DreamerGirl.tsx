import { memo } from 'react';

function DreamerGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="dream-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#9B6B9B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#9B6B9B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#dream-glow)" />
      <ellipse cx="100" cy="268" rx="32" ry="5" fill="rgba(0,0,0,0.08)" />

      {/* Hair back - long flowing */}
      <path
        d="M70 100 Q62 130 65 170 Q68 190 74 195 Q78 185 78 165 Q80 145 82 125 Z"
        fill="#7A4A7A"
      />
      <path
        d="M130 100 Q138 130 135 170 Q132 190 126 195 Q122 185 122 165 Q120 145 118 125 Z"
        fill="#7A4A7A"
      />

      {/* Body - starry dress */}
      <path
        d="M78 175 Q85 162 100 158 Q115 162 122 175 L130 250 Q125 260 115 262 L85 262 Q75 260 70 250 Z"
        fill="#6B5B9B"
      />
      {/* Dress overlay */}
      <path d="M82 180 Q95 172 118 180 L124 240 Q115 248 100 250 Q85 248 76 240 Z" fill="#7B6BAB" />
      {/* Stars on dress */}
      <circle cx="92" cy="200" r="1.5" fill="#E8D0FF" opacity="0.6" />
      <circle cx="108" cy="215" r="1" fill="#E8D0FF" opacity="0.5" />
      <circle cx="95" cy="230" r="1.5" fill="#E8D0FF" opacity="0.4" />
      {/* Moon on dress */}
      <path d="M112 195 Q116 190 112 188 Q118 192 116 198 Z" fill="#E8D0FF" opacity="0.5" />

      {/* Arms */}
      <path d="M78 175 Q66 192 64 210 Q63 216 66 218 L72 216 Q74 210 75 195 Z" fill="#F0E0D0" />
      <path
        d="M122 175 Q134 192 136 210 Q137 216 134 218 L128 216 Q126 210 125 195 Z"
        fill="#F0E0D0"
      />

      {/* Moon pendant */}
      <circle cx="100" cy="168" r="4" fill="#E8D0FF" opacity="0.4" />
      <path
        d="M100 164 Q104 168 100 172"
        stroke="#FFD700"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />

      {/* Legs */}
      <path d="M88 258 Q86 265 82 268 Q78 268 80 262 Z" fill="#5A4A7A" />
      <path d="M112 258 Q114 265 118 268 Q122 268 120 262 Z" fill="#5A4A7A" />

      {/* Shoes */}
      <ellipse cx="80" cy="268" rx="8" ry="4" fill="#4A3A6A" />
      <ellipse cx="120" cy="268" rx="8" ry="4" fill="#4A3A6A" />

      {/* Head */}
      <circle cx="100" cy="108" r="36" fill="#F0E0D0" />

      {/* Face */}
      <ellipse cx="87" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="113" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="88" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="112" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="90" cy="103" r="1" fill="white" />
      <circle cx="114" cy="103" r="1" fill="white" />
      {/* Eyelashes */}
      <path d="M84 100 Q86 98 90 100" stroke="#3D2B1F" strokeWidth="0.8" fill="none" />
      <path d="M110 100 Q114 98 116 100" stroke="#3D2B1F" strokeWidth="0.8" fill="none" />
      {/* Blush */}
      <ellipse cx="78" cy="114" rx="4" ry="2.5" fill="rgba(255,150,150,0.18)" />
      <ellipse cx="122" cy="114" rx="4" ry="2.5" fill="rgba(255,150,150,0.18)" />
      {/* Mouth */}
      <path
        d="M96 116 Q100 119 104 116"
        stroke="#D4739D"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hair front - soft flowing */}
      <path
        d="M64 100 Q64 70 82 60 Q92 55 100 58 Q108 55 118 60 Q136 70 136 100 Q132 90 124 85 Q112 78 100 82 Q88 78 76 85 Q68 90 64 100 Z"
        fill="#9B6B9B"
      />
      {/* Side strands */}
      <path d="M64 100 Q60 95 62 88 Q65 80 70 76 Z" fill="#9B6B9B" />
      <path d="M136 100 Q140 95 138 88 Q135 80 130 76 Z" fill="#9B6B9B" />

      {/* Star hair clip */}
      <path
        d="M105 62 L107 67 L112 67 L108 70 L110 75 L105 72 L100 75 L102 70 L98 67 L103 67 Z"
        fill="#FFD700"
        opacity="0.7"
      />
    </svg>
  );
}

export default memo(DreamerGirl);
