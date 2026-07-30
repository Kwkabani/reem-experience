import { memo } from 'react';

function StargazerGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="star-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#191970" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#191970" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#star-glow)" />
      <ellipse cx="100" cy="268" rx="32" ry="5" fill="rgba(0,0,0,0.08)" />

      {/* Hair back */}
      <path d="M72 100 Q66 130 70 160 Q72 172 76 175 Q80 168 80 155 Z" fill="#1A1A3A" />
      <path d="M128 100 Q134 130 130 160 Q128 172 124 175 Q120 168 120 155 Z" fill="#1A1A3A" />

      {/* Body - starry night dress */}
      <path
        d="M78 172 Q85 158 100 154 Q115 158 122 172 L128 248 Q125 258 115 260 L85 260 Q75 258 72 248 Z"
        fill="#191970"
      />
      {/* Dress overlay */}
      <path
        d="M82 176 Q100 168 118 176 L124 242 Q115 250 100 252 Q85 250 76 242 Z"
        fill="#2A2A8A"
      />
      {/* Stars */}
      <circle cx="90" cy="195" r="1.2" fill="white" opacity="0.7" />
      <circle cx="110" cy="210" r="1" fill="white" opacity="0.5" />
      <circle cx="95" cy="230" r="1.5" fill="white" opacity="0.6" />
      <circle cx="106" cy="200" r="0.8" fill="white" opacity="0.4" />
      {/* Shooting star */}
      <line x1="114" y1="195" x2="125" y2="192" stroke="white" strokeWidth="0.5" opacity="0.4" />

      {/* Crystal necklace */}
      <circle cx="100" cy="165" r="3" fill="#B0C4DE" opacity="0.6" />
      <circle cx="100" cy="165" r="1.5" fill="#E0F0FF" opacity="0.8" />

      {/* Arms */}
      <path d="M78 172 Q68 190 66 210 Q67 215 70 217 L76 215 Q78 208 78 195 Z" fill="#E8D8C8" />
      <path
        d="M122 172 Q132 190 134 210 Q133 215 130 217 L124 215 Q122 208 122 195 Z"
        fill="#E8D8C8"
      />

      {/* Telescope */}
      <line
        x1="128"
        y1="205"
        x2="145"
        y2="185"
        stroke="#C49A3C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="145" cy="183" r="4" fill="#8B6914" />
      <ellipse cx="145" cy="183" rx="2" ry="3" fill="#B0C4DE" opacity="0.5" />
      <line x1="134" y1="200" x2="142" y2="190" stroke="#8B6914" strokeWidth="1" />

      {/* Legs */}
      <path d="M88 256 Q86 264 82 268 L78 268 Q76 264 80 258 Z" fill="#151550" />
      <path d="M112 256 Q114 264 118 268 L122 268 Q124 264 120 258 Z" fill="#151550" />
      <ellipse cx="80" cy="268" rx="8" ry="4" fill="#191970" />
      <ellipse cx="120" cy="268" rx="8" ry="4" fill="#191970" />

      {/* Head */}
      <circle cx="100" cy="108" r="37" fill="#E8D8C8" />

      {/* Face */}
      <ellipse cx="87" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="113" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="88" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="112" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="90" cy="103" r="1" fill="white" />
      <circle cx="114" cy="103" r="1" fill="white" />
      {/* Dreamy look */}
      <path
        d="M83 100 Q88 97 93 100"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M107 100 Q112 97 117 100"
        stroke="#6B4A0A"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="114" rx="4" ry="2.5" fill="rgba(255,150,150,0.18)" />
      <ellipse cx="122" cy="114" rx="4" ry="2.5" fill="rgba(255,150,150,0.18)" />
      <path
        d="M96 116 Q100 119 104 116"
        stroke="#D4739D"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hair front */}
      <path
        d="M62 100 Q62 70 80 60 Q92 54 100 57 Q108 54 120 60 Q138 70 138 100 Q134 90 125 84 Q112 76 100 80 Q88 76 75 84 Q66 90 62 100 Z"
        fill="#2A2A5A"
      />

      {/* Crescent moon hair accessory */}
      <path d="M110 62 Q116 56 112 52 Q118 58 114 64 Z" fill="#FFD700" opacity="0.7" />

      {/* Star hair clips */}
      <circle cx="82" cy="75" r="1.5" fill="#FFD700" opacity="0.5" />
      <circle cx="120" cy="72" r="1" fill="#FFD700" opacity="0.4" />
    </svg>
  );
}

export default memo(StargazerGirl);
