export const AUDIO_TONES = {
  click: { freq: 800, duration: 0.05, type: 'square' as OscillatorType, volume: 0.1 },
  success: [
    { freq: 523, duration: 0.1, type: 'sine' as OscillatorType, volume: 0.15 },
    { freq: 659, duration: 0.1, type: 'sine' as OscillatorType, volume: 0.15, delay: 100 },
    { freq: 784, duration: 0.15, type: 'sine' as OscillatorType, volume: 0.15, delay: 200 },
  ],
  error: [
    { freq: 300, duration: 0.15, type: 'sawtooth' as OscillatorType, volume: 0.12 },
    { freq: 200, duration: 0.2, type: 'sawtooth' as OscillatorType, volume: 0.12, delay: 150 },
  ],
  typing: { freq: 1000, duration: 0.02, type: 'sine' as OscillatorType, volume: 0.04 },
  typing_soft: { freq: 600, duration: 0.025, type: 'sine' as OscillatorType, volume: 0.025 },
  complete: [
    { freq: 262, duration: 0.15, type: 'sine' as OscillatorType, volume: 0.1 },
    { freq: 330, duration: 0.15, type: 'sine' as OscillatorType, volume: 0.1, delay: 150 },
    { freq: 392, duration: 0.15, type: 'sine' as OscillatorType, volume: 0.1, delay: 300 },
    { freq: 523, duration: 0.3, type: 'sine' as OscillatorType, volume: 0.15, delay: 450 },
  ],
  loading: { freq: 200, duration: 0.08, type: 'sine' as OscillatorType, volume: 0.05 },
  door: { noiseDuration: 0.3, volume: 0.08 },
  ready: {
    startFreq: 300,
    endFreq: 600,
    duration: 0.15,
    type: 'sine' as OscillatorType,
    volume: 0.1,
  },
} as const;
