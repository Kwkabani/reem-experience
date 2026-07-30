import { motion, AnimatePresence } from 'framer-motion';

interface ResetGameDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ResetGameDialog({ open, onConfirm, onCancel }: ResetGameDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-night/80 backdrop-blur-sm"
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            className="relative w-full max-w-sm rounded-2xl p-6 border border-white/10"
            style={{
              background: 'linear-gradient(170deg, rgba(20,16,18,0.95), rgba(10,10,15,0.98))',
              boxShadow: '0 16px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-warm-white font-body text-sm leading-relaxed text-center mb-6">
              هل تريدين بدء الرحلة من جديد؟
              <br />
              <span className="text-silver-blue/50 text-xs">سيتم حذف تقدم الجزيرة الحالي فقط.</span>
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={onConfirm}
                className="w-full py-2.5 rounded-xl bg-gradient-to-b from-gold/20 to-gold/10 border border-gold/30
                  text-gold font-display font-bold text-sm tracking-wider
                  hover:from-gold/30 hover:to-gold/15 hover:border-gold/50
                  active:scale-[0.97] transition-all duration-200 cursor-pointer select-none"
              >
                إعادة البداية
              </button>
              <button
                onClick={onCancel}
                className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/5
                  text-silver-blue text-sm font-mono
                  hover:bg-white/[0.08] hover:border-white/10
                  active:scale-[0.97] transition-all duration-200 cursor-pointer select-none"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
