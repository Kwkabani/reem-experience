import { memo } from 'react';
import { motion } from 'framer-motion';
import type { CharacterConfig } from './types';

interface CharacterCardProps {
  character: CharacterConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

function CharacterCard({ character, isSelected, onSelect, index }: CharacterCardProps) {
  const CharacterSvg = character.component;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      onClick={() => onSelect(character.id)}
      className={`
        relative flex flex-col items-center p-4 rounded-xl cursor-pointer
        transition-all duration-300 outline-none
        ${
          isSelected
            ? 'bg-amber-500/20 ring-2 ring-amber-400 shadow-lg shadow-amber-500/20'
            : 'bg-white/5 hover:bg-white/10 hover:ring-1 hover:ring-white/20'
        }
      `}
      dir="rtl"
    >
      <div
        className={`w-24 h-32 mb-2 transition-transform duration-300 ${isSelected ? 'scale-110' : 'scale-100'}`}
      >
        <CharacterSvg />
      </div>
      <span
        className={`text-sm font-bold leading-tight text-center ${isSelected ? 'text-amber-300' : 'text-white/80'}`}
      >
        {character.name}
      </span>
      <span
        className={`text-[10px] leading-tight text-center mt-0.5 ${isSelected ? 'text-amber-200/70' : 'text-white/40'}`}
      >
        {character.description}
      </span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

export default memo(CharacterCard);
