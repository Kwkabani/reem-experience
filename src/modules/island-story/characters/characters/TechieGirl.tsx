import { memo } from 'react';

function TechieGirl() {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="tech-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#00CED1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00CED1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="120" r="90" fill="url(#tech-glow)" />
      <ellipse cx="100" cy="268" rx="33" ry="5" fill="rgba(0,0,0,0.08)" />

      {/* Hair back */}
      <path
        d="M73 100 Q68 130 70 155 Q72 168 76 172 Q80 165 80 150 Q82 135 83 118 Z"
        fill="#2A5A5A"
      />
      <path
        d="M127 100 Q132 130 130 155 Q128 168 124 172 Q120 165 120 150 Q118 135 117 118 Z"
        fill="#2A5A5A"
      />

      {/* Body - tech jacket */}
      <path
        d="M78 172 Q85 158 100 154 Q115 158 122 172 L128 248 Q125 258 115 260 L85 260 Q75 258 72 248 Z"
        fill="#3A7A7A"
      />
      {/* Jacket inner */}
      <path d="M86 176 Q100 170 114 176 L110 242 Q100 247 90 242 Z" fill="#4A8A8A" />
      {/* Tech belt */}
      <rect x="80" y="218" width="40" height="4" rx="1" fill="#555" />
      <rect x="96" y="216" width="8" height="8" rx="1" fill="#00CED1" />
      {/* Tech buttons */}
      <circle cx="100" cy="220" r="1.5" fill="#00CED1" opacity="0.8" />
      <circle cx="100" cy="220" r="0.5" fill="white" opacity="0.5" />

      {/* Arms */}
      <path d="M78 172 Q66 190 64 210 Q65 215 68 217 L74 215 Q76 208 77 195 Z" fill="#F0D8C8" />
      <path
        d="M122 172 Q134 190 136 210 Q135 215 132 217 L126 215 Q124 208 123 195 Z"
        fill="#F0D8C8"
      />

      {/* Tablet in hand */}
      <rect
        x="130"
        y="200"
        width="12"
        height="18"
        rx="1.5"
        fill="#555"
        transform="rotate(-5 130 200)"
      />
      <rect
        x="131.5"
        y="202"
        width="9"
        height="14"
        rx="0.5"
        fill="#87CEEB"
        opacity="0.6"
        transform="rotate(-5 130 200)"
      />
      <rect x="135" y="216" width="2" height="1" fill="#888" transform="rotate(-5 130 200)" />
      {/* Screen glow */}
      <rect
        x="132"
        y="203"
        width="8"
        height="12"
        rx="0.3"
        fill="#E0F0FF"
        opacity="0.3"
        transform="rotate(-5 130 200)"
      />

      {/* Legs */}
      <path d="M88 256 Q86 264 82 268 L78 268 Q76 264 80 258 Z" fill="#2A6A6A" />
      <path d="M112 256 Q114 264 118 268 L122 268 Q124 264 120 258 Z" fill="#2A6A6A" />
      <ellipse cx="80" cy="268" rx="9" ry="5" fill="#1A5A5A" />
      <ellipse cx="120" cy="268" rx="9" ry="5" fill="#1A5A5A" />

      {/* Head */}
      <circle cx="100" cy="108" r="36" fill="#F0D8C8" />

      {/* Face */}
      <ellipse cx="87" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="113" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="88" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <ellipse cx="112" cy="105" rx="2.5" ry="3" fill="#3D2B1F" />
      <circle cx="90" cy="103" r="1" fill="white" />
      <circle cx="114" cy="103" r="1" fill="white" />
      {/* Focused eyebrows */}
      <path
        d="M82 98 Q87 96 92 99"
        stroke="#6B4A0A"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M108 99 Q113 96 118 98"
        stroke="#6B4A0A"
        strokeWidth="0.9"
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

      {/* Hair front - bob cut */}
      <path
        d="M64 100 Q64 72 82 62 Q94 56 100 59 Q106 56 118 62 Q136 72 136 100 Q132 90 124 85 Q112 78 100 82 Q88 78 76 85 Q68 90 64 100 Z"
        fill="#3A7A7A"
      />
      {/* Side pieces */}
      <path d="M64 100 Q62 90 64 82 Q68 76 72 74 Z" fill="#3A7A7A" />
      <path d="M136 100 Q138 90 136 82 Q132 76 128 74 Z" fill="#3A7A7A" />

      {/* Headphones */}
      <path
        d="M64 82 Q64 60 80 55 Q100 50 120 55 Q136 60 136 82"
        stroke="#555"
        strokeWidth="3"
        fill="none"
      />
      <rect x="58" y="78" width="10" height="8" rx="3" fill="#555" />
      <rect x="132" y="78" width="10" height="8" rx="3" fill="#555" />
      {/* Headphone glow */}
      <rect x="58" y="78" width="10" height="4" rx="2" fill="#00CED1" opacity="0.3" />
      <rect x="132" y="78" width="10" height="4" rx="2" fill="#00CED1" opacity="0.3" />
    </svg>
  );
}

export default memo(TechieGirl);
