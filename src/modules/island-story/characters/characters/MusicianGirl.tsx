import { memo } from 'react';

function MusicianGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="mus-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FF69B4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#mus-glow)" />
      <ellipse cx="100" cy="268" rx="33" ry="5" fill="rgba(0,0,0,0.08)" />

      {/* Hair back */}
      <path d="M72 100 Q66 130 70 160 Q72 172 76 175 Q80 168 80 155 Z" fill="#2A1A4A" />
      <path d="M128 100 Q134 130 130 160 Q128 172 124 175 Q120 168 120 155 Z" fill="#2A1A4A" />

      {/* Body - music dress */}
      <path
        d="M78 170 Q85 155 100 152 Q115 155 122 170 L128 248 Q125 258 115 260 L85 260 Q75 258 72 248 Z"
        fill="#DE5285"
      />
      {/* Dress overlay */}
      <path
        d="M82 174 Q100 166 118 174 L124 240 Q115 248 100 250 Q85 248 76 240 Z"
        fill="#FF69B4"
      />
      {/* Music notes on dress */}
      <g opacity="0.4">
        <circle cx="92" cy="205" r="2" fill="white" />
        <line x1="94" y1="205" x2="94" y2="195" stroke="white" strokeWidth="0.8" />
        <path d="M94 195 Q97 196 96 199" stroke="white" strokeWidth="0.6" fill="none" />
      </g>
      <g opacity="0.3">
        <circle cx="110" cy="220" r="1.8" fill="white" />
        <line x1="111.8" y1="220" x2="111.8" y2="212" stroke="white" strokeWidth="0.7" />
        <path d="M111.8 212 Q114.5 213 113.5 215.5" stroke="white" strokeWidth="0.5" fill="none" />
      </g>

      {/* Arms */}
      <path d="M78 170 Q68 188 66 210 Q67 215 70 216 L76 214 Q78 208 78 195 Z" fill="#F5D6C6" />
      <path
        d="M122 170 Q132 188 134 210 Q133 215 130 216 L124 214 Q122 208 122 195 Z"
        fill="#F5D6C6"
      />

      {/* Microphone */}
      <line x1="132" y1="206" x2="134" y2="230" stroke="#888" strokeWidth="1.5" />
      <ellipse cx="132" cy="204" rx="4" ry="5" fill="#555" />
      <ellipse cx="132" cy="204" rx="2.5" ry="3.5" fill="#888" />
      <circle cx="132" cy="230" r="2" fill="#555" />

      {/* Legs */}
      <path d="M88 256 Q86 264 82 268 L78 268 Q76 264 80 258 Z" fill="#C04060" />
      <path d="M112 256 Q114 264 118 268 L122 268 Q124 264 120 258 Z" fill="#C04060" />
      <ellipse cx="80" cy="268" rx="8" ry="4" fill="#DE5285" />
      <ellipse cx="120" cy="268" rx="8" ry="4" fill="#DE5285" />

      {/* Head */}
      <circle cx="100" cy="108" r="37" fill="#F5D6C6" />

      {/* Face */}
      <ellipse cx="87" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="113" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="88" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="112" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="90" cy="103" r="1" fill="white" />
      <circle cx="114" cy="103" r="1" fill="white" />
      {/* Playful eyebrows */}
      <path
        d="M81 98 Q87 95 93 98"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M107 96 Q113 93 119 96"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="116" rx="4" ry="2.5" fill="rgba(255,150,150,0.2)" />
      <ellipse cx="122" cy="116" rx="4" ry="2.5" fill="rgba(255,150,150,0.2)" />
      {/* Singing mouth */}
      <ellipse cx="100" cy="119" rx="4" ry="2.5" fill="#D4739D" />

      {/* Hair front - wavy with music notes */}
      <path
        d="M62 100 Q62 70 80 60 Q92 54 100 57 Q108 54 120 60 Q138 70 138 100 Q134 90 125 84 Q112 76 100 80 Q88 76 75 84 Q66 90 62 100 Z"
        fill="#3D2A6A"
      />
      {/* Waves */}
      <path d="M64 85 Q68 80 72 85 Q76 90 80 85" stroke="#4A3A7A" strokeWidth="1" fill="none" />
      <path
        d="M120 85 Q124 80 128 85 Q132 90 136 85"
        stroke="#4A3A7A"
        strokeWidth="1"
        fill="none"
      />

      {/* Music note hair clips */}
      <g transform="translate(75, 72) scale(0.6)">
        <circle cx="0" cy="0" r="3" fill="#FFD700" />
        <line x1="3" y1="0" x2="3" y2="-10" stroke="#FFD700" strokeWidth="1.5" />
        <path d="M3 -10 Q7 -9 6 -6" stroke="#FFD700" strokeWidth="1" fill="none" />
      </g>
      <g transform="translate(118, 70) scale(0.5)">
        <circle cx="0" cy="0" r="3" fill="#FFD700" />
        <line x1="3" y1="0" x2="3" y2="-10" stroke="#FFD700" strokeWidth="1.5" />
        <path d="M3 -10 Q7 -9 6 -6" stroke="#FFD700" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

export default memo(MusicianGirl);
