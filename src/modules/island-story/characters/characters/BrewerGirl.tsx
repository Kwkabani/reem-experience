import { memo } from 'react';

function BrewerGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="brew-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#D2691E" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#D2691E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#brew-glow)" />
      <ellipse cx="100" cy="268" rx="35" ry="6" fill="rgba(0,0,0,0.08)" />

      {/* Hair back - twin tails */}
      <path
        d="M68 102 Q62 130 65 155 Q68 166 72 170 Q76 162 76 148 Q78 132 80 118 Z"
        fill="#CC6633"
      />
      <path
        d="M132 102 Q138 130 135 155 Q132 166 128 170 Q124 162 124 148 Q122 132 120 118 Z"
        fill="#CC6633"
      />
      {/* Twin tails */}
      <path d="M65 108 Q58 115 55 130 Q54 140 58 145 Q62 140 64 130 Z" fill="#CC6633" />
      <path d="M135 108 Q142 115 145 130 Q146 140 142 145 Q138 140 136 130 Z" fill="#CC6633" />

      {/* Body - apron/chef outfit */}
      <path
        d="M78 172 Q85 158 100 154 Q115 158 122 172 L128 248 Q125 258 115 260 L85 260 Q75 258 72 248 Z"
        fill="#D2691E"
      />
      {/* Apron */}
      <path d="M85 174 Q100 168 115 174 L112 242 Q100 247 88 242 Z" fill="#FFF8DC" />
      {/* Apron string */}
      <path d="M85 174 Q75 172 72 176" stroke="#D2691E" strokeWidth="1.5" fill="none" />
      <path d="M115 174 Q125 172 128 176" stroke="#D2691E" strokeWidth="1.5" fill="none" />

      {/* Arms */}
      <path d="M78 172 Q66 190 64 210 Q65 215 68 217 L74 215 Q76 208 77 195 Z" fill="#F5D6C6" />
      <path
        d="M122 172 Q134 190 136 210 Q135 215 132 217 L126 215 Q124 208 123 195 Z"
        fill="#F5D6C6"
      />

      {/* Teacup in hand */}
      <path
        d="M132 206 Q136 200 140 206 L140 212 Q136 214 132 212 Z"
        fill="#FFF8DC"
        stroke="#D2691E"
        strokeWidth="0.8"
      />
      <ellipse cx="136" cy="206" rx="4" ry="1.5" fill="#F5DEB3" />
      {/* Steam */}
      <path
        d="M134 202 Q136 198 134 195"
        stroke="#D3D3D3"
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M138 202 Q140 197 138 194"
        stroke="#D3D3D3"
        strokeWidth="0.6"
        fill="none"
        opacity="0.4"
      />

      {/* Legs */}
      <path d="M88 256 Q86 264 82 268 L78 268 Q76 264 80 258 Z" fill="#8B4513" />
      <path d="M112 256 Q114 264 118 268 L122 268 Q124 264 120 258 Z" fill="#8B4513" />
      <ellipse cx="80" cy="268" rx="9" ry="5" fill="#654321" />
      <ellipse cx="120" cy="268" rx="9" ry="5" fill="#654321" />

      {/* Head */}
      <circle cx="100" cy="108" r="37" fill="#F5D6C6" />

      {/* Face */}
      <ellipse cx="87" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="113" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="88" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="112" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="90" cy="103" r="1" fill="white" />
      <circle cx="114" cy="103" r="1" fill="white" />
      {/* Sleepy eyes */}
      <path d="M83 101 Q88 103 93 101" stroke="#3D2B1F" strokeWidth="0.8" fill="none" />
      <path d="M107 101 Q112 103 117 101" stroke="#3D2B1F" strokeWidth="0.8" fill="none" />
      <ellipse cx="78" cy="116" rx="5" ry="3" fill="rgba(255,150,150,0.2)" />
      <ellipse cx="122" cy="116" rx="5" ry="3" fill="rgba(255,150,150,0.2)" />
      <path
        d="M95 117 Q100 121 105 117"
        stroke="#D4739D"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hair front */}
      <path
        d="M62 100 Q62 72 80 62 Q92 56 100 59 Q108 56 120 62 Q138 72 138 100 Q134 90 126 85 Q112 78 100 82 Q88 78 74 85 Q66 90 62 100 Z"
        fill="#E07040"
      />
      {/* Bangs */}
      <path d="M62 92 Q66 82 74 78" stroke="#CC6633" strokeWidth="1.5" fill="none" />

      {/* Chef hat */}
      <path
        d="M82 68 Q82 52 95 48 Q100 46 105 48 Q118 52 118 68"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="0.8"
      />
      <rect
        x="82"
        y="65"
        width="36"
        height="4"
        rx="1"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="0.5"
      />
      <path d="M92 55 Q100 50 108 55" stroke="#E0E0E0" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

export default memo(BrewerGirl);
