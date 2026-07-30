import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OceanWaves from '../components/OceanWaves';
import SystemMessage from '../../../components/SystemMessage';
import { useGame } from '../context/GameContext';
import { useAudio } from '../../../context/AudioContext';
import { sceneTransition, fadeUp } from '../systems/AnimationPresets';
import { STARTER_MESSAGES } from '../data/story';

type Phase = 'intro' | 'messages' | 'bottle_arrives' | 'ready' | 'focus';

const DURATIONS = {
  intro: 1500,
  messageInterval: 2400,
  messageGap: 500,
  bottleArrive: 2000,
};

const MESSAGE_DURATIONS = [2800, 2800, 2800, 1800];

export default function OceanScene() {
  const { goToNextScene } = useGame();
  const { enableAudio, playSound } = useAudio();
  const [phase, setPhase] = useState<Phase>('intro');
  const [msgIndex, setMsgIndex] = useState(0);
  const [allMessagesDone, setAllMessagesDone] = useState(false);
  const [focusScale, setFocusScale] = useState(1);
  const [bottleClicked, setBottleClicked] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const focusTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    enableAudio();
  }, [enableAudio]);

  useEffect(() => {
    const handler = () => playSound('click');
    document.addEventListener('pointerdown', handler, { once: true });
    return () => document.removeEventListener('pointerdown', handler);
  }, [playSound]);

  useEffect(() => {
    return () => {
      focusTimers.current.forEach(clearTimeout);
      focusTimers.current = [];
    };
  }, []);

  useEffect(() => {
    if (phase !== 'ready') return;
    const t = setTimeout(() => setHintVisible(true), 800);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'intro') return;
    const t = setTimeout(() => {
      setPhase('messages');
      playSound('ready');
    }, DURATIONS.intro);
    return () => clearTimeout(t);
  }, [phase, playSound]);

  useEffect(() => {
    if (phase !== 'messages') return;
    if (msgIndex >= STARTER_MESSAGES.length) return;
    const t = setTimeout(() => {
      setMsgIndex((prev) => prev + 1);
    }, MESSAGE_DURATIONS[msgIndex]);
    return () => clearTimeout(t);
  }, [phase, msgIndex]);

  useEffect(() => {
    if (phase !== 'messages') return;
    if (msgIndex < STARTER_MESSAGES.length) return;
    if (!allMessagesDone) {
      setAllMessagesDone(true);
      return;
    }
    const t = setTimeout(() => {
      setPhase('bottle_arrives');
      playSound('success');
    }, DURATIONS.messageGap);
    return () => clearTimeout(t);
  }, [phase, msgIndex, allMessagesDone, playSound]);

  useEffect(() => {
    if (phase !== 'bottle_arrives') return;
    const t = setTimeout(() => setPhase('ready'), DURATIONS.bottleArrive);
    return () => clearTimeout(t);
  }, [phase]);

  const handleBottleClick = () => {
    if (bottleClicked) return;
    setBottleClicked(true);
    setPhase('focus');
    focusTimers.current = [
      setTimeout(() => setFocusScale(1.4), 100),
      setTimeout(() => setFocusScale(1.6), 500),
      setTimeout(() => {
        goToNextScene();
      }, 1400),
    ];
  };

  const showBottle = phase === 'bottle_arrives' || phase === 'ready';

  return (
    <motion.div {...sceneTransition} className="relative min-h-[100dvh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: focusScale }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        style={{ willChange: 'transform' }}
      >
        <OceanWaves />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,13,26,0.92) 0%, transparent 25%, transparent 65%, rgba(6,13,26,0.5) 100%)',
        }}
      />

      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-5">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 1.5 }}
            >
              <motion.p
                className="text-gold/30 font-display font-bold text-3xl"
                animate={{ opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✦
              </motion.p>
            </motion.div>
          )}

          {phase === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              className="flex flex-col items-center gap-2 w-full max-w-md"
            >
              {STARTER_MESSAGES.slice(0, msgIndex + 1).map((msg, i) => (
                <motion.div
                  key={i}
                  custom={i * 0.15}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  <SystemMessage
                    text={msg}
                    delay={0}
                    speed={35}
                    soundInterval={2}
                    soundType="typing_soft"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {phase === 'bottle_arrives' && (
            <motion.div
              key="bottle_arrives"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.6 } }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="text-center mt-[45vh]"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <SystemMessage
                  text="شيء يطفو على سطح الماء..."
                  delay={0.5}
                  speed={35}
                  soundInterval={2}
                  soundType="typing_soft"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottle hint - positioned above bottle */}
      {phase === 'ready' && hintVisible && (
        <motion.p
          key="bottle-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-1/2 -translate-x-1/2 text-silver-blue/40 text-xs font-mono z-20"
          style={{ bottom: 'calc(35% + 80px)' }}
        >
          اضغطي على القارورة
        </motion.p>
      )}

      {/* Bottle */}
      {showBottle && (
        <motion.button
          onClick={handleBottleClick}
          className="absolute cursor-pointer select-none"
          style={{
            left: '50%',
            bottom: '35%',
            zIndex: 30,
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={phase === 'ready' ? { y: [0, -10, 0], opacity: 1 } : { y: 0, opacity: 1 }}
          transition={
            phase === 'ready'
              ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
          }
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="فتح القارورة"
        >
          <motion.div
            className="text-5xl drop-shadow-[0_0_20px_rgba(212,197,169,0.2)]"
            animate={{
              opacity: [0.8, 1, 0.8],
              filter: [
                'drop-shadow(0 0 12px rgba(212,197,169,0.2))',
                'drop-shadow(0 0 24px rgba(212,197,169,0.4))',
                'drop-shadow(0 0 12px rgba(212,197,169,0.2))',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            🧪
          </motion.div>
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-4"
            style={{
              background: 'radial-gradient(ellipse, rgba(212,197,169,0.2), transparent)',
            }}
          />
        </motion.button>
      )}

      {/* Camera focus overlay on click */}
      {phase === 'focus' && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'radial-gradient(circle, transparent 30%, rgba(6,13,26,0.6) 100%)',
          }}
        />
      )}
    </motion.div>
  );
}
