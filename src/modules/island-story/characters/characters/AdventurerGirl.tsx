import { memo } from 'react';

function AdventurerGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="adv-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#B22222" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#B22222" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#adv-glow)" />
      <ellipse cx="100" cy="268" rx="35" ry="6" fill="rgba(0,0,0,0.08)" />

      {/* Hair back - twin tails */}
      <path
        d="M68 102 Q62 130 65 155 Q68 166 72 170 Q76 162 76 148 Q78 132 80 118 Z"
        fill="#6B0000"
      />
      <path
        d="M132 102 Q138 130 135 155 Q132 166 128 170 Q124 162 124 148 Q122 132 120 118 Z"
        fill="#6B0000"
      />
      {/* Twin tails */}
      <path d="M65 108 Q58 115 55 130 Q54 140 58 145 Q62 140 64 130 Z" fill="#6B0000" />
      <path d="M135 108 Q142 115 145 130 Q146 140 142 145 Q138 140 136 130 Z" fill="#6B0000" />

      {/* Body - adventurer jacket */}
      <path
        d="M78 172 Q85 158 100 154 Q115 158 122 172 L128 248 Q125 258 115 260 L85 260 Q75 258 72 248 Z"
        fill="#B22222"
      />
      {/* Jacket inner */}
      <path d="M85 174 Q100 168 115 174 L112 242 Q100 247 88 242 Z" fill="#8B1A1A" />
      {/* Belt */}
      <rect x="80" y="216" width="40" height="5" rx="1" fill="#3D2B1F" />
      <rect x="96" y="214" width="8" height="9" rx="1" fill="#DAA520" />

      {/* Arms */}
      <path d="M78 172 Q66 190 64 210 Q65 215 68 217 L74 215 Q76 208 77 195 Z" fill="#F5D6C6" />
      <path
        d="M122 172 Q134 190 136 210 Q135 215 132 217 L126 215 Q124 208 123 195 Z"
        fill="#F5D6C6"
      />

      {/* Torch in hand */}
      <line
        x1="133"
        y1="210"
        x2="138"
        y2="182"
        stroke="#6B4A2A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M136 186 Q138 178 134 174 Q140 178 138 186 Z" fill="#DAA520" />
      <path d="M136 182 Q137 176 135 173 Q139 176 138 182 Z" fill="#FF6347" />
      <path d="M136 178 Q136.5 174 135 172 Q138 174 137 178 Z" fill="#FFD700" />
      {/* Embers */}
      <circle cx="140" cy="172" r="0.8" fill="#FFD700" opacity="0.6" />
      <circle cx="134" cy="170" r="0.6" fill="#FF6347" opacity="0.5" />

      {/* Legs */}
      <path d="M88 256 Q86 264 82 268 L78 268 Q76 264 80 258 Z" fill="#8B1A1A" />
      <path d="M112 256 Q114 264 118 268 L122 268 Q124 264 120 258 Z" fill="#8B1A1A" />
      <ellipse cx="80" cy="268" rx="9" ry="5" fill="#3D2B1F" />
      <ellipse cx="120" cy="268" rx="9" ry="5" fill="#3D2B1F" />

      {/* Head */}
      <circle cx="100" cy="108" r="37" fill="#F5D6C6" />

      {/* Face */}
      <ellipse cx="87" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="113" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="88" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="112" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="90" cy="103" r="1" fill="white" />
      <circle cx="114" cy="103" r="1" fill="white" />
      {/* Determined eyebrows */}
      <path
        d="M82 98 Q87 96 92 98"
        stroke="#6B4A0A"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M108 98 Q113 96 118 98"
        stroke="#6B4A0A"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
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
        fill="#8B0000"
      />
      {/* Side strands */}
      <path d="M62 100 Q59 90 62 82 Q65 75 70 71 Z" fill="#8B0000" />
      <path d="M138 100 Q141 90 138 82 Q135 75 130 71 Z" fill="#8B0000" />

      {/* Adventure bandana */}
      <path d="M60 78 Q80 66 100 64 Q120 66 140 78 Q120 74 100 73 Q80 74 60 78 Z" fill="#B22222" />
      <circle cx="100" cy="70" r="2.5" fill="#DAA520" />
      <path
        d="M60 78 Q54 90 56 100"
        stroke="#B22222"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M140 78 Q146 90 144 100"
        stroke="#B22222"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default memo(AdventurerGirl);
