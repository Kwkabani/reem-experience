import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHARACTERS } from './config';
import CharacterCard from './CharacterCard';
import CharacterPreview from './CharacterPreview';
import type { CharacterConfig } from './types';

interface CharacterGalleryProps {
  onConfirm: (character: CharacterConfig) => void;
}

function CharacterGallery({ onConfirm }: CharacterGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCharacter = useMemo(
    () => CHARACTERS.find((c) => c.id === selectedId) || null,
    [selectedId],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center w-full max-w-xl mx-auto"
      dir="rtl"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-white mb-1"
      >
        اختر شخصيتك
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-xs text-white/40 mb-4"
      >
        من سترافقك في رحلة الجزيرة؟
      </motion.p>

      <AnimatePresence mode="wait">
        {selectedCharacter ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <CharacterPreview character={selectedCharacter} />
            <div className="flex gap-3 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedId(null)}
                className="px-4 py-2 rounded-lg text-sm text-white/60 border border-white/20 hover:bg-white/10 transition-colors"
              >
                رجوع
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onConfirm(selectedCharacter)}
                className="px-6 py-2 rounded-lg text-sm font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                اخترت 💫
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 gap-3 w-full"
            dir="rtl"
          >
            {CHARACTERS.map((char, i) => (
              <CharacterCard
                key={char.id}
                character={char}
                isSelected={false}
                onSelect={(id) => setSelectedId(id)}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(CharacterGallery);
