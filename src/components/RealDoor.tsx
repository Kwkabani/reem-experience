import { motion, AnimatePresence } from 'framer-motion';

interface RealDoorProps {
  label: string;
  onOpen: () => void;
  isOpen?: boolean;
  isSecret?: boolean;
  sideWall?: boolean;
}

export default function RealDoor({ label, onOpen, isOpen = false, isSecret = false, sideWall = false }: RealDoorProps) {
  const handleClick = () => {
    if (isOpen) return;
    onOpen();
  };

  return (
    <motion.div
      className="relative"
      style={{ perspective: '600px' }}
      initial={isSecret ? { opacity: 0, scale: 0.8 } : undefined}
      animate={isSecret ? { opacity: 1, scale: 1 } : undefined}
      transition={isSecret ? { duration: 0.6, ease: 'easeOut' } : undefined}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            exit={{ rotateY: -85, opacity: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeIn' }}
            onClick={handleClick}
            role="button"
            aria-label={isSecret ? 'باب سري' : label}
            className={`
              relative cursor-pointer select-none
              ${sideWall ? 'w-[75px] sm:w-[90px] h-[125px] sm:h-[145px]' : 'w-[85px] sm:w-[100px] h-[140px] sm:h-[160px]'}
              ${isSecret
                ? 'border-gold shadow-[0_0_20px_rgba(201,168,76,0.4)]'
                : 'border-[#3E2723] shadow-md shadow-black/30'
              }
            `}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
              borderWidth: '3px',
              borderRadius: '3px 3px 0 0',
              background: isSecret
                ? 'linear-gradient(150deg, #C9A84C, #D4B96A, #B8942E, #C9A84C)'
                : 'linear-gradient(140deg, #5C3A1E, #7A4E2D, #6B4226, #5C3A1E)',
            }}
          >
            {!isSecret && (
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 5px, rgba(0,0,0,0.4) 5px, rgba(0,0,0,0.4) 6px), repeating-linear-gradient(90deg, transparent 0px, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)',
                }}
              />
            )}

            {isSecret && (
              <div className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at 50% 40%, rgba(255,215,0,0.3), transparent 70%)',
                }}
              />
            )}

            <div
              className={`
                absolute right-1.5 top-[45%] -translate-y-1/2 w-[6px] h-[13px] rounded-full shadow-md
                ${isSecret ? 'bg-amber-300 shadow-amber-400/60' : 'bg-gold shadow-gold/30'}
              `}
            />

            <div
              className={`
                absolute bottom-1.5 left-1/2 -translate-x-1/2 px-1.5 py-[2px] rounded text-center font-display text-[10px] sm:text-[11px] leading-tight whitespace-nowrap
                ${isSecret
                  ? 'bg-[#0d0805]/80 text-gold border border-gold/30'
                  : 'bg-[#0d0805]/70 text-beige/90'
                }
              `}
            >
              {isSecret ? '~ ? ~' : label}
            </div>

            {isSecret && (
              <motion.span
                className="absolute top-3 left-1/2 -translate-x-1/2 text-gold text-sm"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦
              </motion.span>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ rotateY: 85, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`
              ${sideWall ? 'w-[75px] sm:w-[90px] h-[125px] sm:h-[145px]' : 'w-[85px] sm:w-[100px] h-[140px] sm:h-[160px]'}
              rounded-[3px_3px_0_0] flex items-center justify-center
              ${isSecret ? 'bg-gold/10' : 'bg-transparent'}
            `}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
              border: '3px solid',
              borderColor: isSecret ? '#C9A84C' : '#3E2723',
              boxShadow: isSecret ? 'inset 0 0 30px rgba(201,168,76,0.2)' : 'none',
            }}
          >
            <motion.span
              className="text-gold text-xl sm:text-2xl font-display"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              ✓
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
