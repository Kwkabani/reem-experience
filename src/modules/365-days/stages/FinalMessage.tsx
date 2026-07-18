import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StageWrapper from '../components/StageWrapper';
import LoveCard from '../../../components/LoveCard';
import GlassCard from '../../../components/GlassCard';
import SystemMessage from '../../../components/SystemMessage';
import Button from '../../../components/Button';
import BackgroundEffect, { particleDefs } from '../../../components/BackgroundEffect';
import { useAudio } from '../../../context/AudioContext';
import { Stage } from '../types';
import { useModuleComplete } from '../context/ModuleContext';

type Phase = 'intro' | 'message' | 'question' | 'comedy' | 'final';

export default function FinalMessage() {
  const { playSound } = useAudio();
  const onComplete = useModuleComplete();
  const [phase, setPhase] = useState<Phase>('intro');
  const [flapOpen, setFlapOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];
    };
  }, []);

  const tmr = (ms: number, fn: () => void) => {
    const id = setTimeout(fn, ms);
    timerRef.current.push(id);
  };

  const openMessage = () => {
    if (flapOpen) return;
    playSound('click');
    setFlapOpen(true);
    tmr(700, () => setPhase('message'));
  };

  const showQuestion = () => {
    setPhase('question');
  };

  const handleNo = () => {
    playSound('error');
    setPhase('comedy');
    tmr(2500, () => setPhase('final'));
  };

  const handleYes = () => {
    playSound('complete');
    setPhase('final');
  };

  const handleRestart = () => {
    if (onComplete) {
      onComplete();
    } else {
      window.location.reload();
    }
  };

  return (
    <StageWrapper stage={Stage.FinalMessage}>
      <BackgroundEffect
        gradient="bg-gradient-to-b from-[#1a0f0a] via-night to-night"
        glowColor="rgba(201,168,76,0.06)"
        glowPosition="bottom"
        particles={particleDefs.envelopes}
      />

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-silver-blue font-mono text-sm"
            >
              رسالة واحدة متبقية...
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <SystemMessage
                text="يله افتحي الظرف عشان نقرا اخر رساله"
                speed={30}
                delay={0}
                prefix
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, type: 'spring', stiffness: 150 }}
              className="mt-2"
            >
              <div
                className="relative w-60 h-44 max-w-full cursor-pointer group"
                onClick={openMessage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openMessage();
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="افتح الظرف"
                style={{ perspective: '600px' }}
              >
                <div className="absolute -bottom-1 left-[5%] right-[5%] h-3 bg-black/20 rounded-full blur-sm" />

                <div className="relative w-full h-full bg-[#e8d5b0] rounded-lg border-2 border-[#c4a87a] overflow-hidden shadow-xl">
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px), repeating-linear-gradient(90deg, transparent 0px, transparent 15px, rgba(0,0,0,0.04) 15px, rgba(0,0,0,0.04) 16px)',
                    }}
                  />

                  <div
                    className="absolute top-0 left-0 right-0 h-[45%] opacity-60"
                    style={{ background: 'linear-gradient(180deg, #c9b896, transparent)' }}
                  />

                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[45%] origin-top z-10"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateX: flapOpen ? -180 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <div
                      className="w-full h-full bg-[#d4c4a0] border-2 border-[#c4a87a] rounded-t-lg"
                      style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                    />
                  </motion.div>

                  <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-gold to-[#b8942e] border-[3px] border-[#a08030] flex items-center justify-center shadow-lg z-[5]">
                    <span className="text-[#0d0805] text-lg">❤</span>
                  </div>

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[#8b7355] text-sm font-display tracking-wider">
                    إلى: ريم
                  </div>

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.08), transparent 70%)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <LoveCard variant="message" delay={0.2}>
              <p className="text-2xl text-center text-gold font-display font-bold mb-6">ريم</p>
              <div className="space-y-4 text-right">
                <p className="text-warm-white font-body leading-relaxed">
                  هذه آخر محطة في الرحلة.مش رحلتنا مع بعض ... رحلتنا في محطة التأمل.
                </p>
                <p className="text-warm-white font-body leading-relaxed">
                  حبيت أنو افعل لش هذه التجربة عشان اقول لش حاجة واحدة:
                </p>
                <p className="text-warm-white font-body leading-relaxed">
                  أنا معش. مش بس في الأيام الحالية بس: بل في كل يوم.
                </p>
                <p className="text-warm-white font-body leading-relaxed">
                  في الأيام اللي تضحكي فيها، والأيام اللي تحتاجي فيها تفضفض، والأيام اللي تحسي أنش
                  تحتاجي تسكتي.
                </p>
                <p className="text-warm-white font-body leading-relaxed">
                  أنا هنا. مش شرط يكون عندي كل الإجابات... بس عندي قلب يشتي يفهمش اكثر واكثر ؛
                  ويتعمق في كل تفاصيلش .
                </p>
                <p className="text-warm-white font-body leading-relaxed">
                  الحياة صح مش سهلة، لكنها تصبح أسهل لما تعرف أن في شخص واحد في الدنيا هذا يوقف معك
                  مهما صار.
                </p>
                <p className="text-warm-white font-body leading-relaxed">
                  أنا شوقع لش هذا الشخص ؛ بدون تكلف وبدون اي مبالغة
                  ----------------------------------------------------- اخترت الطريقة هذه عشان يكون
                  الكلام هذا مفاجئة لش واتمنى انو اليوم هذا يكون سبب في فرحتنا كل سنة ؛ ونجلس نتذكر
                  كل لحظة كل سنة باذن الله
                </p>
                <p className="text-warm-white font-body leading-relaxed text-gold font-bold mt-6">
                  — كاتب لك هذه الرسالة: محمد
                </p>
              </div>
            </LoveCard>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
              <Button onClick={showQuestion} variant="spotlight" size="lg">
                سؤال أخير
              </Button>
            </motion.div>
          </motion.div>
        )}

        {phase === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <GlassCard delay={0.2}>
              <p className="text-center text-warm-white font-body text-xl leading-relaxed">
                هل توعديني نوقع يد واحدة وقلب واحد ؟
              </p>
            </GlassCard>

            <div className="flex flex-col gap-3 w-full max-w-xs">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button onClick={handleYes} variant="spotlight" size="lg" className="w-full">
                  ❤️ نعم
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button onClick={handleNo} variant="nexus" size="lg" className="w-full">
                  😂 أحتاج أفكر
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === 'comedy' && (
          <motion.div
            key="comedy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-4xl mb-4"
            >
              😂
            </motion.p>
            <GlassCard delay={0.2}>
              <p className="text-warm-white text-center leading-relaxed">
                تم اكتشاف محاولة تفكير!
                <br />
                <span className="text-silver-blue text-sm">بس نعرف أن الجواب الصح هو... ❤️</span>
              </p>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="text-6xl mb-8"
            >
              ❤️
            </motion.p>

            <LoveCard variant="final" delay={0.5}>
              <p className="text-gold font-display font-bold text-2xl text-center">نعم</p>
              <div className="w-12 h-px bg-gold/20 mx-auto my-4" />
              <p className="text-warm-white text-center font-body leading-relaxed">ونعم للأبد.</p>
            </LoveCard>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-8"
            >
              <p className="text-silver-blue/70 text-sm font-mono">سنة حب ❤️ 10-07-2026</p>
              <p className="text-silver-blue/50 text-xs mt-1 font-mono">
                التجربة اكتملت. شكرًا لأنكِ ريم. 💫
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={handleRestart}
              className="mt-8 text-silver-blue/30 text-xs font-mono hover:text-silver-blue/60 transition-colors"
            >
              أعد المشاهدة ↺
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </StageWrapper>
  );
}
