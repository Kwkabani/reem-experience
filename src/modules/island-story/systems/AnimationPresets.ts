import type { Variants } from 'framer-motion';

const easeOutExpo = [0.19, 1, 0.22, 1] as const;
const easeInOutQuad = [0.45, 0, 0.55, 1] as const;

export const sceneTransition: Variants = {
  initial: { opacity: 0, scale: 1.08, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(2px)',
    transition: { duration: 1, ease: easeInOutQuad },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: easeOutExpo },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay, ease: easeOutExpo },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export const floatAnimation = {
  y: [0, -8, 0],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
};

export const softGlow = {
  opacity: [0.6, 1, 0.6],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
};
