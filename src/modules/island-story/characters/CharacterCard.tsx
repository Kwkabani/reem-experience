import { memo } from 'react';
import { motion } from 'framer-motion';
import type { CharacterConfig } from './types';

interface CharacterCardProps {
  character: CharacterConfig;
  onSelect: (id: string) => void;
  index: number;
}

function CharacterCard({ character, onSelect, index }: CharacterCardProps) {
  const CharacterSvg = character.component;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      onClick={() => onSelect(character.id)}
      className="relative flex flex-col items-center p-2 sm:p-3 rounded-xl cursor-pointer
        bg-white/5 hover:bg-white/10 hover:ring-1 hover:ring-white/20 hover:scale-[1.03]
        transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
        min-h-[44px]"
      dir="rtl"
    >
      <div className="w-16 h-24 sm:w-20 sm:h-28 mb-2">
        <CharacterSvg />
      </div>
      <span className="text-xs sm:text-sm font-bold leading-tight text-center text-white/80">
        {character.name}
      </span>
      <span className="text-[10px] leading-tight text-center mt-0.5 text-white/40 line-clamp-2">
        {character.description}
      </span>
    </motion.button>
  );
}

export default memo(CharacterCard);
