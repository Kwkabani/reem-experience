import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useAudio } from '../../../context/AudioContext';
import { sceneTransition } from '../systems/AnimationPresets';
import { BOTTLE_MESSAGE_1, BOTTLE_MESSAGE_2 } from '../data/story';

type Phase = 'arriving' | 'tap_hint' | 'shaking' | 'cork_pop' | 'paper_rise' | 'unfold' | 'reading';

const SHAKE_COUNT = 4;

export default function BottleScene() {
  const { goToNextScene, completeScene, currentScene } = useGame();
  const { playSound } = useAudio();
  const [phase, setPhase] = useState<Phase>('arriving');
  const [shakeIndex, setShakeIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [textComplete, setTextComplete] = useState(false);
  const advancingRef = useRef(false);

  useEffect(() => {
    playSound('ready');
  }, [playSound]);

  useEffect(() => {
    if (phase !== 'arriving') return;
    const t = setTimeout(() => setPhase('tap_hint'), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  const handleTap = useCallback(() => {
    if (phase !== 'tap_hint') return;
    playSound('click');
    setPhase('shaking');
  }, [phase, playSound]);

  useEffect(() => {
    if (phase !== 'shaking') return;
    if (shakeIndex < SHAKE_COUNT) {
      const t = setTimeout(() => {
        setShakeIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setPhase('cork_pop');
      playSound('success');
    }, 400);
    return () => clearTimeout(t);
  }, [phase, shakeIndex, playSound]);

  useEffect(() => {
    if (phase !== 'cork_pop') return;
    const t = setTimeout(() => {
      setPhase('paper_rise');
      playSound('ready');
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, playSound]);

  useEffect(() => {
    if (phase !== 'paper_rise') return;
    const t = setTimeout(() => {
      setPhase('unfold');
    }, 1200);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'unfold') return;
    const t = setTimeout(() => {
      setPhase('reading');
    }, 1200);
    return () => clearTimeout(t);
  }, [phase]);

  const skipablePhases = new Set<Phase>(['cork_pop', 'paper_rise', 'unfold']);

  const handleSkip = () => {
    playSound('click');
    switch (phase) {
      case 'cork_pop':
        setPhase('paper_rise');
        break;
      case 'paper_rise':
        setPhase('unfold');
        break;
      case 'unfold':
        setPhase('reading');
        break;
    }
  };

  const currentMessage = messageIndex === 0 ? BOTTLE_MESSAGE_1 : BOTTLE_MESSAGE_2;

  const handleContinue = () => {
    if (advancingRef.current) return;
    playSound('click');
    if (messageIndex === 0) {
      setMessageIndex(1);
      setTextComplete(false);
    } else {
      advancingRef.current = true;
      playSound('complete');
      completeScene(currentScene);
      goToNextScene();
    }
  };

  return (
    <motion.div
      {...sceneTransition}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a1a 0%, #141022 30%, #1a1410 60%, #0d1b2a 100%)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(212,197,169,0.06), transparent 70%)',
        }}
      />

      {/* Skip button during cinematic phases */}
      {skipablePhases.has(phase) && (
        <motion.button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-20 px-3 py-2.5 rounded-lg text-xs font-mono text-silver-blue/40 hover:text-silver-blue/70 border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver-blue/60 min-h-[44px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          تخطي
        </motion.button>
      )}

      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {phase === 'arriving' && (
            <motion.div
              key="arriving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="text-center"
            >
              <motion.p
                className="text-gold/40 font-display font-bold text-xs mb-8 tracking-widest"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                ~ رسالة في قارورة ~
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
                className="text-7xl mb-6"
              >
                🧪
              </motion.div>
            </motion.div>
          )}

          {phase === 'tap_hint' && (
            <motion.div
              key="tap_hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="text-center"
            >
              <motion.button
                onClick={handleTap}
                className="cursor-pointer select-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                aria-label="افتح القارورة"
              >
                <motion.div
                  className="text-7xl mb-4"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🧪
                </motion.div>
              </motion.button>
              <motion.p
                className="text-silver-blue/50 text-sm font-mono"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                اضغطي لفتح القارورة
              </motion.p>
            </motion.div>
          )}

          {phase === 'shaking' && (
            <motion.div key="shaking" className="text-center">
              <motion.div
                className="text-7xl mb-4"
                animate={{
                  rotate: shakeIndex % 2 === 0 ? [0, -12, 8, -8, 5, 0] : [0, 12, -8, 8, -5, 0],
                  x: shakeIndex % 2 === 0 ? [0, -4, 3, -2, 0] : [0, 4, -3, 2, 0],
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                🧪
              </motion.div>
              <motion.p
                className="text-silver-blue/40 text-xs font-mono"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                تفتح القارورة...
              </motion.p>
            </motion.div>
          )}

          {phase === 'cork_pop' && (
            <motion.div
              key="cork_pop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-4"
                initial={{ y: 0, scale: 1 }}
                animate={{ y: -80, scale: 0.3, rotate: 180, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                🍾
              </motion.div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="text-4xl"
              >
                💨
              </motion.div>
              <motion.p
                className="text-silver-blue/40 text-xs font-mono mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                طار الفلين!
              </motion.p>
            </motion.div>
          )}

          {phase === 'paper_rise' && (
            <motion.div
              key="paper_rise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              >
                <motion.div
                  className="inline-block text-5xl"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  📜
                </motion.div>
                <motion.p
                  className="text-silver-blue/40 text-xs font-mono mt-4"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  الورقة تخرج من القارورة...
                </motion.p>
              </motion.div>
            </motion.div>
          )}

          {phase === 'unfold' && (
            <motion.div
              key="unfold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scaleX: 0.1, scaleY: 0.1, rotateX: 90 }}
                animate={{ scaleX: 1, scaleY: 1, rotateX: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.19, 1, 0.22, 1],
                  type: 'spring',
                  stiffness: 120,
                  damping: 14,
                }}
                className="inline-block"
                style={{ perspective: '800px' }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ✉️
                </motion.div>
              </motion.div>
              <motion.p
                className="text-silver-blue/40 text-xs font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                تُفتح الرسالة...
              </motion.p>
            </motion.div>
          )}

          {phase === 'reading' && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-md flex flex-col items-center"
            >
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold/40 font-display font-bold text-xs mb-6 tracking-widest"
              >
                ~ رسالة في قارورة ~
              </motion.p>

              {/* Physical letter paper */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="relative w-full"
                style={{ perspective: '600px' }}
              >
                {/* Paper texture layers */}
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Base paper */}
                  <div
                    className="relative p-6 rounded-2xl border border-white/10"
                    style={{
                      background:
                        'linear-gradient(170deg, rgba(245,240,232,0.08) 0%, rgba(212,197,169,0.03) 50%, rgba(245,240,232,0.06) 100%)',
                      boxShadow:
                        '0 8px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Subtle paper grain */}
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Fold line decoration */}
                    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      className="text-right"
                      dir="rtl"
                    >
                      <div className="font-body leading-[2] text-beige/90 text-sm md:text-base tracking-wide">
                        <TypewriterText
                          key={messageIndex}
                          text={currentMessage}
                          onComplete={() => setTextComplete(true)}
                        />
                      </div>
                    </motion.div>

                    {/* Corner fold decorations */}
                    <div className="absolute top-0 right-0 w-8 h-8">
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-white/[0.03] border-r-transparent rounded-tr-2xl" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-8 h-8">
                      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[16px] border-l-[16px] border-b-white/[0.03] border-l-transparent rounded-bl-2xl" />
                    </div>
                  </div>
                </div>

                {/* Floating animation */}
                <motion.div
                  className="absolute -inset-1 pointer-events-none"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              {/* Continue button */}
              {textComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="mt-8"
                >
                  <button
                    onClick={handleContinue}
                    className="px-8 py-3 rounded-xl bg-gradient-to-b from-gold/20 to-gold/10 border border-gold/30
                      text-gold font-display font-bold text-sm tracking-wider
                      hover:from-gold/30 hover:to-gold/15 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)]
                      active:scale-[0.97] transition-all duration-200 cursor-pointer select-none"
                  >
                    {messageIndex === 0 ? 'اقرئي المزيد ←' : 'أكملي الرحلة ✨'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const { playSound } = useAudio();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    let charCount = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        index++;
        charCount++;
        setDisplayed(text.slice(0, index));
        if (charCount % 6 === 0) {
          playSound('typing_soft');
        }
      } else {
        clearInterval(interval);
        onCompleteRef.current();
      }
    }, 35);
    return () => clearInterval(interval);
  }, [text, playSound]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[2px] h-[1em] bg-beige/60 mr-0.5 align-middle"
        />
      )}
    </span>
  );
}
