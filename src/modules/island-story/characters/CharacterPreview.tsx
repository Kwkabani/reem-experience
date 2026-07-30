import { memo } from 'react';
import { motion } from 'framer-motion';
import type { CharacterConfig } from './types';

interface CharacterPreviewProps {
  character: CharacterConfig;
}

function CharacterPreview({ character }: CharacterPreviewProps) {
  const CharacterSvg = character.component;

  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center"
      dir="rtl"
    >
      <div className="w-40 h-56 mb-4">
        <CharacterSvg />
      </div>
      <h3 className="text-xl font-bold text-amber-300 mb-1">{character.name}</h3>
      <p className="text-xs text-white/60 text-center max-w-[200px] leading-relaxed">
        {character.description}
      </p>
      <div className="flex gap-2 mt-3">
        {Object.values(character.colors)
          .slice(0, 3)
          .map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: color }}
            />
          ))}
      </div>
    </motion.div>
  );
}

export default memo(CharacterPreview);
