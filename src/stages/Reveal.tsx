import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StageWrapper from '../components/StageWrapper';
import GlassCard from '../components/GlassCard';
import LoveCard from '../components/LoveCard';
import SystemMessage from '../components/SystemMessage';
import MessageSequence from '../components/MessageSequence';
import Button from '../components/Button';
import BackgroundEffect, { particleDefs } from '../components/BackgroundEffect';
import { useGame } from '../context/GameContext';
import { Stage } from '../types';

type Phase = 'file' | 'searching' | 'found' | 'transition' | 'personal';

export default function Reveal() {
  const { goToNextStage, playSound } = useGame();
  const [phase, setPhase] = useState<Phase>('file');
  const [searchDone, setSearchDone] = useState(false);

  useEffect(() => {
    if (phase === 'file') {
      const t = setTimeout(() => {
        playSound('click');
        setPhase('searching');
      }, 2000);
      return () => clearTimeout(t);
    }
    if (phase === 'searching' && searchDone) {
      playSound('success');
      const t = setTimeout(() => setPhase('found'), 3000);
      return () => clearTimeout(t);
    }
    if (phase === 'found') {
      const t = setTimeout(() => setPhase('transition'), 3500);
      return () => clearTimeout(t);
    }
    if (phase === 'transition') {
      const t = setTimeout(() => {
        playSound('complete');
        setPhase('personal');
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [phase, searchDone, playSound]);

  const handlePersonalContinue = useCallback(() => {
    goToNextStage();
  }, [goToNextStage]);

  const searchingMessages = [
    { text: 'هذا الملف لم ينشأ بواسطة النظام.', speed: 30 },
    { text: 'جاري البحث عن المنشئ...', speed: 30 },
  ];

  return (
    <StageWrapper stage={Stage.Reveal}>
      <BackgroundEffect
        gradient="bg-gradient-to-b from-[#2d0a1e] via-[#1a0510] to-night"
        glowColor="rgba(201,168,76,0.08)"
        glowPosition="center"
        particles={particleDefs.hearts}
      />

      <AnimatePresence mode="wait">
        {phase === 'file' && (
          <motion.div
            key="file"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlassCard delay={0.2}>
              <div className="text-center">
                <span className="text-4xl block mb-3">📁</span>
                <p className="text-warm-white font-display font-bold text-lg">ملف 365 يومًا</p>
                <p className="text-silver-blue text-sm mt-1 font-mono">الحجم: سنة كاملة</p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'searching' && (
          <motion.div
            key="searching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            <MessageSequence messages={searchingMessages} onComplete={() => setSearchDone(true)} />
          </motion.div>
        )}

        {phase === 'found' && (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <GlassCard>
              <div className="text-center">
                <span className="text-green-400 text-2xl block mb-2">✓</span>
                <p className="text-silver-blue font-mono text-sm">✅تم العثور على المنشئ:</p>
                <p className="text-gold font-display font-bold text-2xl mt-2">محمد</p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'transition' && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <SystemMessage text="SYSTEM MODE OFF" delay={0.3} prefix={false} />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gold font-display font-bold text-xl mt-4"
            >
              PERSONAL MODE ON
            </motion.p>
          </motion.div>
        )}

        {phase === 'personal' && (
          <motion.div
            key="personal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <LoveCard variant="letter" delay={0.3}>
              <div className="text-center">
                <p className="text-gold font-display font-bold text-lg mb-4">عام كامل.. والحكاية لسه في أولها</p>
                <div className="space-y-4 text-right">
                  <p className="text-warm-white font-body leading-relaxed">ريم،</p>
                  <p className="text-warm-white font-body leading-relaxed">قبل سنة، اخترتك. وما زلت أختارك كل يوم.</p>
                  <p className="text-warm-white font-body leading-relaxed">مش بس لأنك أجمل شخص عرفته... لكن لأنك الإنسان اللي بجانبه أكون أنا.</p>
                  <p className="text-warm-white font-body leading-relaxed">
                    كل يوم يمر ؛ وكل لحظة وانا اتمنى قربش اكثر واكثر
                    مرينا مع بعض بلحظات وشعور صعب وشوعه ؛ لكن قدرنا نتعداها عارفة ليش ؟
                    اولا لان الله معانا ؛ ثانيا هذك الفتره اللي قدرنا نتكلم فيها وتفاهمنا وسمعنا بعض وحكينا كل شي لبعض
                    حسيت ان ارواحنا تتشابه ؛ اندمجنا سريع ؛ وكان كلامنا عفوي بدون اي تكلف
                    بس للاسف الوقت كان عدونا؛ بس هذك الفتره كانت احلا وقت بالنسبة لي ؛لاني تعرفت فيها بشكل سريع عن قلب ريم عن قرب
                  </p>
                  <p className="text-warm-white font-body leading-relaxed">
                    سنة خطوبة ياريم ... وكل يوم يمر، أتأكد أني اخترت صح.
                    سنة خطوبة ... وكل يوم يزداد فيني الشوق اكثر
                    شوق لقلبش الحالي اللي عرفته وبلحظة ماعد اقدرتش اتعرف عليه واتعمق في تفاصيلة
                    لكن الله يجمع بيننا على خير ويألف بين قلوبنا ويقوي علاقتنا اكثر واكثر
                    ويجعل ايامنا كلها حب وسعادة وراحة بال وطمأنينة ورضا من الله
                    ويقدرني ويقويني اكون لش سند ؛ وراحة ؛ وسعادة
                    واكثر دعوة بين ادعيها ياريم ان الله يملي حبش في قلبي ويكفيني بش دنيا واخره
                  </p>
                </div>
              </div>
            </LoveCard>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <Button
                onClick={handlePersonalContinue}
                variant="shine"
                size="lg"
              >
                الرسالة الأخيرة
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </StageWrapper>
  );
}
