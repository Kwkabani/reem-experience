import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

interface Choice {
  label: string;
  value: string;
  isComedy?: boolean;
}

interface ChoiceButtonsProps {
  choices: Choice[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export default function ChoiceButtons({ choices, onSelect, disabled = false }: ChoiceButtonsProps) {
  const { playSound } = useGame();

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {choices.map((choice, i) => (
        <motion.button
          key={choice.value}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          aria-label={choice.label}
          className={`w-full px-6 py-3.5 rounded-xl border text-right transition-all duration-200 text-base leading-relaxed font-bold min-h-[44px] ${
            choice.isComedy
              ? 'bg-gradient-to-b from-[rgba(168,85,247,0.12)] to-[rgba(168,85,247,0.04)] border-[rgba(168,85,247,0.3)] text-purple-300/90 shadow-[0_4px_12px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.15),0_4px_12px_rgba(0,0,0,0.2)] active:scale-[0.96] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(168,85,247,0.2)]'
              : 'bg-[rgba(201,168,76,0.06)] backdrop-blur-[12px] border-[rgba(201,168,76,0.25)] text-gold hover:bg-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.5)] hover:shadow-[0_0_24px_rgba(201,168,76,0.08)] active:bg-[rgba(201,168,76,0.2)] active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]'
          } ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
          onClick={() => { if (!disabled) { playSound('click'); onSelect(choice.value); } }}
          whileHover={disabled ? {} : { scale: 1.02 }}
          whileTap={disabled ? {} : { scale: 0.98 }}
          disabled={disabled}
        >
          <span>{choice.label}</span>
          {choice.isComedy && (
            <span className="mr-2 text-sm opacity-60">😂</span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
