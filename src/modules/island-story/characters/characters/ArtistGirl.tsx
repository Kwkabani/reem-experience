import { memo } from 'react';

function ArtistGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="art-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FF6347" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FF6347" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#art-glow)" />
      <ellipse cx="100" cy="268" rx="33" ry="6" fill="rgba(0,0,0,0.08)" />

      {/* Hair back */}
      <path d="M74 100 Q68 125 70 150 Q72 162 76 165 Q80 158 80 145 Z" fill="#6B3A1A" />
      <path d="M126 100 Q132 125 130 150 Q128 162 124 165 Q120 158 120 145 Z" fill="#6B3A1A" />

      {/* Body - paint-splattered smock */}
      <path
        d="M78 170 Q85 155 100 152 Q115 155 122 170 L128 245 Q125 255 115 258 L85 258 Q75 255 72 245 Z"
        fill="#FF6347"
      />
      {/* Smock front */}
      <path d="M85 172 Q100 166 115 172 L112 238 Q100 243 88 238 Z" fill="#FF7A5A" />
      {/* Paint splatters */}
      <circle cx="92" cy="190" r="3" fill="#FFD700" opacity="0.5" />
      <circle cx="108" cy="210" r="2" fill="#9370DB" opacity="0.4" />
      <circle cx="95" cy="225" r="2.5" fill="#87CEEB" opacity="0.4" />
      <circle cx="110" cy="195" r="1.5" fill="#FF69B4" opacity="0.5" />

      {/* Arms */}
      <path d="M78 170 Q66 188 64 208 Q65 213 68 215 L74 212 Q76 206 77 192 Z" fill="#F5D6C6" />
      <path
        d="M122 170 Q134 188 136 208 Q135 213 132 215 L126 212 Q124 206 123 192 Z"
        fill="#F5D6C6"
      />

      {/* Legs */}
      <path d="M88 254 Q86 263 82 268 L78 268 Q76 264 80 258 Z" fill="#FF7A5A" />
      <path d="M112 254 Q114 263 118 268 L122 268 Q124 264 120 258 Z" fill="#FF7A5A" />
      {/* Colorful shoes */}
      <ellipse cx="80" cy="268" rx="9" ry="5" fill="#FF6347" />
      <ellipse cx="120" cy="268" rx="9" ry="5" fill="#9370DB" />

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
        d="M82 98 Q87 95 93 98"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M107 98 Q113 95 118 98"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="116" rx="4" ry="2.5" fill="rgba(255,150,150,0.2)" />
      <ellipse cx="122" cy="116" rx="4" ry="2.5" fill="rgba(255,150,150,0.2)" />
      <path
        d="M96 117 Q100 120 104 117"
        stroke="#D4739D"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hair front - messy bun with brush */}
      <path
        d="M63 100 Q63 72 80 62 Q92 56 100 58 Q108 56 120 62 Q137 72 137 100 Q133 90 125 85 Q112 78 100 82 Q88 78 75 85 Q67 90 63 100 Z"
        fill="#8B4513"
      />
      {/* Messy bun */}
      <circle cx="100" cy="58" r="12" fill="#8B4513" />
      <path d="M94 52 Q100 48 106 52" stroke="#6B3A1A" strokeWidth="1.5" fill="none" />
      <path d="M96 62 Q100 66 104 62" stroke="#6B3A1A" strokeWidth="1" fill="none" />

      {/* Paintbrush in hair */}
      <line
        x1="108"
        y1="50"
        x2="118"
        y2="38"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="118" cy="37" rx="3" ry="2" fill="#FF6347" transform="rotate(-45 118 37)" />
      <ellipse cx="120" cy="35" rx="1.5" ry="1" fill="#FF69B4" transform="rotate(-45 120 35)" />

      {/* Colorful palette accessory */}
      <ellipse cx="136" cy="210" rx="10" ry="7" fill="#FFF8DC" transform="rotate(-15 136 210)" />
      <circle cx="132" cy="208" r="2" fill="#FF6347" />
      <circle cx="138" cy="207" r="2" fill="#FFD700" />
      <circle cx="142" cy="210" r="2" fill="#9370DB" />
      <circle cx="134" cy="213" r="1.5" fill="#87CEEB" />

      {/* Paint on cheek */}
      <circle cx="77" cy="108" r="1.5" fill="#FF6347" opacity="0.3" />
    </svg>
  );
}

export default memo(ArtistGirl);
