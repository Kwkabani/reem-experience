import { memo } from 'react';

function SageGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="sage-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#4A6FA5" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#4A6FA5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#sage-glow)" />
      <ellipse cx="100" cy="268" rx="32" ry="5" fill="rgba(0,0,0,0.08)" />

      {/* Hair back */}
      <path
        d="M73 100 Q67 130 70 160 Q72 170 76 173 Q80 165 80 150 Q82 130 83 115 Z"
        fill="#E0E0E0"
      />
      <path
        d="M127 100 Q133 130 130 160 Q128 170 124 173 Q120 165 120 150 Q118 130 117 115 Z"
        fill="#E0E0E0"
      />

      {/* Body - scholar robe */}
      <path
        d="M78 170 Q85 155 100 150 Q115 155 122 170 L130 248 Q127 258 117 260 L83 260 Q73 258 70 248 Z"
        fill="#4A6FA5"
      />
      {/* Robe trim */}
      <path
        d="M80 172 Q100 164 120 172 L126 240 Q115 248 100 250 Q85 248 74 240 Z"
        fill="#5A7FB5"
      />
      {/* Book belt */}
      <rect x="85" y="210" width="30" height="4" rx="1" fill="#8B6914" />
      <rect x="97" y="208" width="6" height="8" rx="1" fill="#C49A3C" />

      {/* Arms */}
      <path d="M78 170 Q66 190 64 210 Q65 215 68 217 L74 215 Q76 208 77 195 Z" fill="#E8E0D0" />
      <path
        d="M122 170 Q134 190 136 210 Q135 215 132 217 L126 215 Q124 208 123 195 Z"
        fill="#E8E0D0"
      />

      {/* Book in hand */}
      <rect
        x="130"
        y="202"
        width="10"
        height="14"
        rx="1"
        fill="#8B4513"
        transform="rotate(10 130 202)"
      />
      <rect
        x="132"
        y="204"
        width="6"
        height="10"
        rx="0.5"
        fill="#F5DEB3"
        transform="rotate(10 130 202)"
      />
      <line
        x1="133"
        y1="206"
        x2="137"
        y2="206"
        stroke="#8B4513"
        strokeWidth="0.5"
        transform="rotate(10 130 202)"
      />
      <line
        x1="133"
        y1="208"
        x2="136"
        y2="208"
        stroke="#8B4513"
        strokeWidth="0.5"
        transform="rotate(10 130 202)"
      />

      {/* Legs */}
      <path d="M88 256 Q86 264 82 268 L78 268 Q76 264 80 258 Z" fill="#3A5F95" />
      <path d="M112 256 Q114 264 118 268 L122 268 Q124 264 120 258 Z" fill="#3A5F95" />
      <ellipse cx="80" cy="268" rx="8" ry="4" fill="#2A4A7A" />
      <ellipse cx="120" cy="268" rx="8" ry="4" fill="#2A4A7A" />

      {/* Head */}
      <circle cx="100" cy="108" r="37" fill="#E8E0D0" />

      {/* Face */}
      <ellipse cx="87" cy="104" rx="4.5" ry="5.5" fill="white" />
      <ellipse cx="113" cy="104" rx="4.5" ry="5.5" fill="white" />
      <ellipse cx="88" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="112" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="90" cy="103" r="1" fill="white" />
      <circle cx="114" cy="103" r="1" fill="white" />
      {/* Glasses */}
      <circle cx="88" cy="105" r="8" stroke="#C49A3C" strokeWidth="0.8" fill="none" />
      <circle cx="112" cy="105" r="8" stroke="#C49A3C" strokeWidth="0.8" fill="none" />
      <line x1="96" y1="105" x2="104" y2="105" stroke="#C49A3C" strokeWidth="0.8" />
      <path d="M80 102 Q78 98 80 96" stroke="#C49A3C" strokeWidth="0.8" fill="none" />
      <path d="M120 102 Q122 98 120 96" stroke="#C49A3C" strokeWidth="0.8" fill="none" />
      {/* Eyebrows */}
      <path
        d="M82 96 Q88 94 93 96"
        stroke="#A0A0A0"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M107 96 Q112 94 118 96"
        stroke="#A0A0A0"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="114" rx="4" ry="2.5" fill="rgba(255,150,150,0.15)" />
      <ellipse cx="122" cy="114" rx="4" ry="2.5" fill="rgba(255,150,150,0.15)" />
      <path
        d="M96 116 Q100 119 104 116"
        stroke="#D4739D"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hair front - straight with headband */}
      <path
        d="M63 100 Q63 72 80 62 Q92 55 100 58 Q108 55 120 62 Q137 72 137 100 Q133 90 125 85 Q112 78 100 82 Q88 78 75 85 Q67 90 63 100 Z"
        fill="#D3D3D3"
      />
      {/* Side strands */}
      <path d="M63 100 Q60 92 63 85 Q66 78 70 74 Z" fill="#D3D3D3" />
      <path d="M137 100 Q140 92 137 85 Q134 78 130 74 Z" fill="#D3D3D3" />
      {/* Headband */}
      <path
        d="M62 82 Q80 72 100 70 Q120 72 138 82"
        stroke="#C49A3C"
        strokeWidth="2.5"
        fill="none"
      />
      <circle cx="100" cy="70" r="2" fill="#FFD700" opacity="0.6" />
    </svg>
  );
}

export default memo(SageGirl);
