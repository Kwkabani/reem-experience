import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StageWrapper from '../components/StageWrapper';
import GlassCard from '../../../components/GlassCard';
import RealDoor from '../../../components/RealDoor';
import Letter from '../../../components/Letter';
import SystemMessage from '../../../components/SystemMessage';
import MessageSequence from '../../../components/MessageSequence';
import Button from '../../../components/Button';
import ChoiceButtons from '../../../components/ChoiceButtons';
import { useGame } from '../context/GameContext';
import { useAudio } from '../../../context/AudioContext';
import { Stage, type Room } from '../types';
import { shuffle } from '../../../utils/random';
import { sanitizeInput } from '../../../utils/sanitize';

const rooms = [
  {
    id: 'respect',
    label: 'غرفة الاحترام',
    icon: '🤝',
    title: 'الاحترام',
    message:
      'الاختلاف بيننا ليس تهديدًا لعلاقتنا... بل دليل على أن كل منا يكمل الآخر.\nأحب فيك أنك تحترمين رأيي حتى لو اختلفنا.',
  },
  {
    id: 'safety',
    label: 'غرفة الأمان',
    icon: '🛡️',
    title: 'الأمان',
    message:
      'أن تكوني بجانبي لا يعني أنكِ قوية دائمًا.\nالأمان الحقيقي هو أن تعرفي أنكِ تستطيعين الانهيار بجانبي وسأكون لك سندًا.',
  },
  {
    id: 'laugh',
    label: 'غرفة الضحك',
    icon: '😄',
    title: 'قوانين البيت',
    message:
      'القانون الأول: الضحك واجب.\nالقانون الثاني: إذا ضحكنا على نفس النكتة ١٠ مرات... نضحك عليها 11 مرة .\nالقانون الثالث: السخافة المتبادلة مسموحة ٢٤ ساعة.',
  },
  {
    id: 'space',
    label: 'غرفة المساحة',
    icon: '🌙',
    title: 'المساحة الخاصة',
    message:
      'اذا احتجنا يوما الى بعض الصمت \n فلايعني ذلك اننا توقفنا عن الاهتمام عن بعض \n بل يعني اننا نريد ان نعود لبعض بنسخة افضل من انفسنا 🤍\n ويكون بيننا اتفاق ! \n مش نحول كل صمت الى فيلم , ولا كل تأخير الى قضية 🌚😂',
  },
  {
    id: 'support',
    label: 'غرفة السند',
    icon: '🤲',
    title: 'السند',
    message:
      'اشتي تكون فرحتك كانها فرحتي\n وتعبك يكون تعبي \n ويكون معانا مساحة امنه نتكلم عن كل شي بدون خوف \nويكون عندنا ثقة ان محد بيفهم الثاني خطاء',
  },
];

const backWallRooms = rooms.slice(0, 3);
const sideWallRooms = rooms.slice(3);

type SecretPhase = 'hidden' | 'messages' | 'visible' | 'opened' | 'question1' | 'question2';
type Q1Phase = 'input' | 'answer' | 'reveal';
type Q2State = 'choices' | 'typing' | 'analyzing' | 'comedy' | 'done';

const analysisText = 'خليش دائما واثقة اني محتاج لش تكوني سند لي في كل وقت';
const comedyText = ' 🫣 شكل ريم طولت في وقت التفكير ';

const SECRET_MESSAGES = [
  { text: 'لحظة لحظة !', speed: 30 },
  { text: 'باقي باب سري ظهر فجأه !', speed: 30 },
  { text: 'يعلم الله ايش به ورا الباب هذا', speed: 30 },
];

const Q1_ANSWER_MESSAGES = [
  { text: '🤍ياسلام اجابة تدل على وعي ريم ', speed: 30 },
  { text: 'خليني اعرض لش الرد اللي حصلناه في النظام ', speed: 30 },
];

const Q2_COMEDY_MESSAGES = [
  { text: comedyText, speed: 25 },
  { text: 'النظام قرر يسهل الاجابة اكثر 😂', speed: 25 },
];

const Q2_CHOICES = [
  { label: 'أكيد بكون جنبك وسندك', value: 'normal' },
  { label: 'محتاجة افكر🙂‍↔️', value: 'comedy', isComedy: true },
];

export default function House() {
  const { goToNextStage, setAnswer } = useGame();
  const { playSound } = useAudio();
  const [openedRooms, setOpenedRooms] = useState<string[]>([]);
  const [readRooms, setReadRooms] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [secretPhase, setSecretPhase] = useState<SecretPhase>('hidden');
  const [q1Phase, setQ1Phase] = useState<Q1Phase>('input');
  const [q1Input, setQ1Input] = useState('');
  const [q2State, setQ2State] = useState<Q2State>('choices');
  const [chosenAnswer, setChosenAnswer] = useState<'normal' | 'comedy' | null>(null);
  const [shuffledBack] = useState(() => shuffle(backWallRooms));
  const [shuffledSide] = useState(() => shuffle(sideWallRooms));

  const letterOverlayRef = useRef<HTMLDivElement>(null);
  const q2ResponseRef = useRef<HTMLDivElement>(null);

  const handleCloseLetter = useCallback(() => {
    if (selectedRoom && !readRooms.includes(selectedRoom.id)) {
      setReadRooms((prev) => [...prev, selectedRoom.id]);
    }
    setSelectedRoom(null);
  }, [selectedRoom, readRooms]);

  useEffect(() => {
    if (readRooms.length >= 5 && secretPhase === 'hidden') {
      const t = setTimeout(() => setSecretPhase('messages'), 800);
      return () => clearTimeout(t);
    }
  }, [readRooms.length, secretPhase]);

  useEffect(() => {
    if (secretPhase !== 'messages') return;
    const t = setTimeout(() => {
      playSound('success');
      setSecretPhase('visible');
    }, 5000);
    return () => clearTimeout(t);
  }, [secretPhase, playSound]);

  useEffect(() => {
    if (secretPhase !== 'opened') return;
    const t = setTimeout(() => {
      setSecretPhase('question1');
      setQ1Phase('input');
    }, 1200);
    return () => clearTimeout(t);
  }, [secretPhase]);

  useEffect(() => {
    if (q1Phase !== 'answer') return;
    const t = setTimeout(() => setQ1Phase('reveal'), 4000);
    return () => clearTimeout(t);
  }, [q1Phase]);

  useEffect(() => {
    if (q2State !== 'analyzing') return;
    const t = setTimeout(goToNextStage, analysisText.length * 30 + 2500);
    return () => clearTimeout(t);
  }, [q2State, goToNextStage]);

  useEffect(() => {
    if (q2State !== 'typing') return;
    const t = setTimeout(() => {
      setQ2State(chosenAnswer === 'normal' ? 'analyzing' : 'comedy');
    }, 1500);
    return () => clearTimeout(t);
  }, [q2State, chosenAnswer]);

  useEffect(() => {
    if (!selectedRoom || !letterOverlayRef.current) return;
    const overlay = letterOverlayRef.current;
    const focusableElements = overlay.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    overlay.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    overlay.addEventListener('keydown', handleTab);
    return () => overlay.removeEventListener('keydown', handleTab);
  }, [selectedRoom]);

  useEffect(() => {
    if (q2State === 'analyzing' || q2State === 'comedy') {
      setTimeout(() => {
        q2ResponseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [q2State]);

  const handleOpenRoom = (room: Room) => {
    if (openedRooms.includes(room.id)) return;
    playSound('door');
    setOpenedRooms((prev) => [...prev, room.id]);
    setSelectedRoom(room);
  };

  const handleSecretOpen = () => {
    playSound('door');
    setSecretPhase('opened');
  };

  const handleQ1Submit = () => {
    if (!q1Input.trim()) return;
    setAnswer('secret', sanitizeInput(q1Input));
    setQ1Phase('answer');
    playSound('success');
  };

  const startQ2 = () => {
    setSecretPhase('question2');
    setQ2State('choices');
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* === Room Background === */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F08] via-[#3D291D] to-[#0d0805]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 25px, rgba(0,0,0,0.04) 25px, rgba(0,0,0,0.04) 26px)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[18%] bg-gradient-to-b from-[#0d0805] via-[#0d0805]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-[#0d0805] via-[#1A0F08]/90 to-transparent" />
        <div
          className="absolute bottom-0 left-0 right-0 h-[20%] opacity-[0.06]"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent 0px, transparent 30px, rgba(201,168,76,0.2) 30px, rgba(201,168,76,0.2) 31px)',
          }}
        />
        <div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[70%] h-[35%] opacity-[0.12] rounded-full"
          style={{ background: 'radial-gradient(ellipse, #C9A84C, transparent 70%)' }}
        />
      </div>

      <StageWrapper stage={Stage.House}>
        <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center gap-5 pb-8">
          <GlassCard>
            <p className="text-gold font-display font-bold text-center text-lg">
              بيتنا المستقبلي 👸🤴
            </p>
            <p className="text-silver-blue text-center text-sm mt-1">
              كل غرفة تخبئ رسالة... اختاري باب
            </p>
          </GlassCard>

          {/* === Back wall doors (shuffled) === */}
          <div className="flex items-center justify-center gap-x-4 sm:gap-x-5 w-full px-2">
            {shuffledBack.map((r) => (
              <RealDoor
                key={r.id}
                label={r.label}
                onOpen={() => handleOpenRoom(r)}
                isOpen={openedRooms.includes(r.id)}
              />
            ))}
          </div>

          {/* === System messages before secret door appears === */}
          <AnimatePresence>
            {secretPhase === 'messages' && (
              <motion.div
                key="secret-messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-sm space-y-2 px-2"
              >
                <MessageSequence messages={SECRET_MESSAGES} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* === Side wall separator === */}
          <div className="w-[85%] h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

          {/* === Side wall doors (shuffled, perspective) === */}
          <div className="self-end mr-3 sm:mr-6" style={{ perspective: '600px' }}>
            <div
              className="flex items-center gap-x-3 sm:gap-x-4"
              style={{ transform: 'rotateY(-10deg)', transformOrigin: 'left center' }}
            >
              {shuffledSide.map((r) => (
                <RealDoor
                  key={r.id}
                  label={r.label}
                  onOpen={() => handleOpenRoom(r)}
                  isOpen={openedRooms.includes(r.id)}
                  sideWall
                />
              ))}
            </div>
          </div>

          {/* === Secret door === */}
          <AnimatePresence>
            {secretPhase === 'visible' && (
              <div className="flex items-center justify-center gap-x-4 sm:gap-x-5 w-full px-2">
                <RealDoor key="secret-door" label="" onOpen={handleSecretOpen} isSecret />
              </div>
            )}
          </AnimatePresence>

          {/* === Question 1 (textarea): كيف يمكن لشخصين مختلفين... === */}
          <AnimatePresence>
            {secretPhase === 'question1' && q1Phase === 'input' && (
              <motion.div
                key="q1-input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center gap-6"
              >
                <GlassCard>
                  <div className="text-center">
                    <p className="text-gold font-display font-bold text-lg mb-1">❓سؤال</p>
                    <div className="w-8 h-px bg-gold/20 mx-auto my-3" />
                    <p className="text-warm-white font-body text-lg leading-relaxed">
                      كيف يمكن لشخصين مختلفين
                      <br />
                      أن يصنعا حياة واحدة؟
                    </p>
                  </div>
                </GlassCard>

                <div className="w-full max-w-sm">
                  <textarea
                    id="q1-textarea"
                    value={q1Input}
                    onChange={(e) => setQ1Input(e.target.value)}
                    placeholder="اكتبي إجابتك..."
                    aria-label="إجابتك على السؤال"
                    maxLength={500}
                    className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-warm-white font-body text-base resize-none focus:outline-none focus:border-gold/40 focus-visible:ring-2 focus-visible:ring-gold/60 transition-all placeholder:text-silver-blue/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleQ1Submit();
                      }
                    }}
                  />
                  <p
                    className={`text-xs text-left mt-1 font-mono transition-colors ${
                      q1Input.length > 450
                        ? 'text-red-400'
                        : q1Input.length > 350
                          ? 'text-yellow-400'
                          : 'text-silver-blue/50'
                    }`}
                  >
                    {q1Input.length}/500
                  </p>
                </div>

                <Button
                  onClick={handleQ1Submit}
                  variant="shine"
                  size="lg"
                  disabled={!q1Input.trim()}
                >
                  إرسال
                </Button>
              </motion.div>
            )}

            {secretPhase === 'question1' && q1Phase === 'answer' && (
              <motion.div
                key="q1-answer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-sm space-y-2 px-2"
              >
                <MessageSequence messages={Q1_ANSWER_MESSAGES} />
              </motion.div>
            )}

            {secretPhase === 'question1' && q1Phase === 'reveal' && (
              <motion.div
                key="q1-reveal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center gap-6"
              >
                <GlassCard delay={0.3}>
                  <div className="text-center">
                    <p className="text-gold font-display font-bold text-lg mb-3">اجابة النظام</p>
                    <p className="text-warm-white font-body leading-relaxed">
                      " يمكن لشخصين ان يبنيا حياة في حال ان قانونهما ليس من الضروري ان نجد شخصًا بلا
                      عيوب... بل أن نجد شخصًا نحترم عيوبه ونحاول فهمه."
                    </p>
                  </div>
                </GlassCard>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <Button onClick={startQ2} variant="glass" size="lg">
                    تابع
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* === Question 2 (choice): هل ستظل بجانبي مهما حدث؟ === */}
          <AnimatePresence>
            {secretPhase === 'question2' && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-sm space-y-4"
              >
                <GlassCard variant="warm">
                  <div className="text-center">
                    <p className="text-gold font-display text-lg mb-2">✧ السؤال الثاني✧</p>
                    <p className="text-beige leading-relaxed text-sm">هل ستظلين بجانبي مهما حدث؟</p>
                  </div>
                </GlassCard>

                {q2State === 'choices' && (
                  <ChoiceButtons
                    choices={Q2_CHOICES}
                    onSelect={(value) => {
                      setChosenAnswer(value as 'normal' | 'comedy');
                      setQ2State('typing');
                    }}
                  />
                )}

                {q2State === 'typing' && (
                  <motion.div key="q2-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <SystemMessage text="جاري تحليل الاجابة" speed={30} delay={0.5} prefix />
                  </motion.div>
                )}

                {q2State === 'analyzing' && (
                  <motion.div
                    key="q2-analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    ref={q2ResponseRef}
                  >
                    <SystemMessage text={analysisText} speed={30} delay={0.5} prefix />
                  </motion.div>
                )}

                {q2State === 'comedy' && (
                  <motion.div
                    key="q2-comedy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    ref={q2ResponseRef}
                    className="space-y-4"
                  >
                    <MessageSequence messages={Q2_COMEDY_MESSAGES} />

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: comedyText.length * 0.025 + 3.5 }}
                      className="rounded-xl bg-gradient-to-l from-gold via-gold/60 to-silver-blue p-[1px] shadow-lg shadow-gold/10"
                    >
                      <Button
                        onClick={goToNextStage}
                        variant="spotlight"
                        size="lg"
                        className="w-full"
                      >
                        أكيد بكون سندك بكل وقت
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </StageWrapper>

      {/* === Letter overlay with glow === */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            key="letter-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseLetter}
            onKeyDown={(e) => {
              if (e.key === 'Escape') handleCloseLetter();
            }}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="رسالة الغرفة"
            ref={letterOverlayRef}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseLetter}
                className="absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center
                           text-silver-blue/50 hover:text-silver-blue transition-colors"
                aria-label="إغلاق"
              >
                ✕
              </button>
              <div
                className="absolute opacity-25 rounded-full pointer-events-none"
                style={{
                  top: '-4rem',
                  right: '-4rem',
                  bottom: '-4rem',
                  left: '-4rem',
                  background: 'radial-gradient(circle, rgba(201,168,76,0.5), transparent 70%)',
                }}
              />
              <Letter title={selectedRoom.title} content={selectedRoom.message} delay={0.2} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
