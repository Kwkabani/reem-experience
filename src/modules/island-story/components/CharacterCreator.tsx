import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../../components/GlassCard';
import Button from '../../../components/Button';
import { sanitizeInput } from '../../../utils/sanitize';
import { staggerContainer, fadeUp, scaleIn } from '../systems/AnimationPresets';
import CharacterGallery from '../characters/CharacterGallery';
import type { AvatarType, PersonalityType } from '../types';
import type { CharacterConfig } from '../characters/types';
import { PERSONALITIES } from '../data/story';

interface CharacterCreatorProps {
  onSave: (
    name: string,
    avatar: AvatarType,
    personality: PersonalityType,
    characterId?: string,
    characterName?: string,
  ) => void;
}

type Step = 'name' | 'character' | 'personality' | 'review';

export default function CharacterCreator({ onSave }: CharacterCreatorProps) {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [character, setCharacter] = useState<CharacterConfig | null>(null);
  const [personality, setPersonality] = useState<PersonalityType | null>(null);
  const [error, setError] = useState('');

  const avatar: AvatarType = personality || 'explorer';

  const handleNext = () => {
    if (step === 'name') {
      if (!name.trim()) {
        setError('الرجاء إدخال اسم الشخصية');
        return;
      }
      setError('');
      setStep('character');
    } else if (step === 'character') {
      if (!character) {
        setError('الرجاء اختيار شخصيتك');
        return;
      }
      setError('');
      setStep('personality');
    } else if (step === 'personality') {
      if (!personality) {
        setError('الرجاء اختيار الطباع');
        return;
      }
      setError('');
      setStep('review');
    }
  };

  const handleSave = () => {
    onSave(sanitizeInput(name), avatar, personality!, character?.id, character?.name);
  };

  const handleBack = () => {
    setError('');
    if (step === 'character') setStep('name');
    else if (step === 'personality') setStep('character');
    else if (step === 'review') setStep('personality');
  };

  const getStepNumber = () =>
    step === 'name' ? 1 : step === 'character' ? 2 : step === 'personality' ? 3 : 4;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center w-full max-w-md gap-6 py-4"
    >
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4].map((p) => (
          <motion.div
            key={p}
            className={`h-0.5 rounded-full transition-colors duration-300 ${p <= getStepNumber() ? 'bg-gold/60' : 'bg-white/10'}`}
            style={{ width: p === getStepNumber() ? '24px' : '16px' }}
            layout
          />
        ))}
      </div>

      <motion.div custom={0.1} variants={fadeUp} className="text-center">
        <p className="text-gold font-display font-bold text-xl mb-1">أنشئي شخصيتك</p>
        <p className="text-silver-blue/60 text-sm font-body">من ستكونين في هذه الرحلة؟</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Step 1: Name */}
        {step === 'name' && (
          <motion.div
            key="name"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            className="w-full"
          >
            <GlassCard delay={0.2}>
              <label htmlFor="char-name" className="block text-silver-blue text-xs font-mono mb-3">
                ما اسمك؟
              </label>
              <input
                id="char-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="أدخلي اسم شخصيتك..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-warm-white font-body
                  placeholder:text-silver-blue/30 focus:outline-none focus:border-gold/50 focus:bg-white/[0.08]
                  focus:shadow-[0_0_20px_rgba(201,168,76,0.05)] transition-all duration-200"
                maxLength={20}
                dir="auto"
                autoFocus
              />
            </GlassCard>
          </motion.div>
        )}

        {/* Step 2: Character Gallery */}
        {step === 'character' && (
          <motion.div
            key="character"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            className="w-full"
          >
            <GlassCard delay={0.1}>
              <CharacterGallery
                onConfirm={(c) => {
                  setCharacter(c);
                  setError('');
                  setStep('personality');
                }}
              />
            </GlassCard>
          </motion.div>
        )}

        {/* Step 3: Personality */}
        {step === 'personality' && (
          <motion.div
            key="personality"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            className="w-full"
          >
            <GlassCard delay={0.1}>
              <p className="text-silver-blue text-xs font-mono mb-4 text-center">ما طباعك؟</p>
              <div className="flex flex-col gap-2">
                {PERSONALITIES.map((p, i) => (
                  <motion.button
                    key={p.id}
                    custom={i * 0.1}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    onClick={() => {
                      setPersonality(p.id as PersonalityType);
                      setError('');
                    }}
                    className={`text-right p-3 rounded-xl transition-all duration-300 cursor-pointer
                      ${
                        personality === p.id
                          ? 'bg-gold/15 border-2 border-gold/40 shadow-[0_0_25px_rgba(201,168,76,0.1)]'
                          : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
                      }`}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.span
                        className="text-xl"
                        animate={personality === p.id ? { rotate: [0, -10, 10, 0] } : undefined}
                        transition={{ duration: 0.5 }}
                      >
                        {p.icon}
                      </motion.span>
                      <div className="flex-1">
                        <p className="text-warm-white font-body text-sm font-bold">{p.label}</p>
                        <p className="text-silver-blue/60 text-xs font-body mt-0.5 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 4: Review */}
        {step === 'review' && (
          <motion.div
            key="review"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            className="w-full"
          >
            <GlassCard delay={0.1}>
              <p className="text-silver-blue text-xs font-mono mb-4 text-center">مراجعة شخصيتك</p>
              <div className="flex flex-col items-center gap-4 py-2">
                {/* Character preview */}
                {character && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                    className="w-24 h-32"
                  >
                    <character.component />
                  </motion.div>
                )}

                <div className="text-center">
                  <p className="text-gold font-display font-bold text-lg">{name}</p>
                  {character && (
                    <p className="text-amber-200/70 text-sm font-body mt-0.5">{character.name}</p>
                  )}
                  <p className="text-silver-blue/60 text-sm font-body mt-1">
                    {PERSONALITIES.find((p) => p.id === personality)?.label}
                  </p>
                </div>

                <motion.div
                  className="text-center max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-silver-blue/50 text-xs font-body leading-relaxed">
                    {PERSONALITIES.find((p) => p.id === personality)?.description}
                  </p>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs font-mono"
        >
          {error}
        </motion.p>
      )}

      {/* Navigation buttons */}
      <motion.div custom={0.4} variants={fadeUp} className="flex gap-3 w-full max-w-md">
        {step !== 'name' && (
          <Button onClick={handleBack} variant="glass" size="lg" className="flex-1">
            رجوع
          </Button>
        )}
        {step !== 'review' && step !== 'character' ? (
          <Button onClick={handleNext} variant="shine" size="lg" className="flex-1">
            التالي ←
          </Button>
        ) : step === 'review' ? (
          <Button onClick={handleSave} variant="shine" size="lg" className="flex-1">
            ابدئي الرحلة ✨
          </Button>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
