import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { AudioManager } from '../audio/AudioManager';
import type { SoundType } from '../types';

interface AudioContextType {
  enableAudio: () => void;
  playSound: (type: SoundType) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<AudioManager | null>(null);

  const enableAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new AudioManager();
    }
    audioRef.current.init();
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.dispose();
    };
  }, []);

  const playSound = useCallback((type: SoundType) => {
    audioRef.current?.play(type)?.catch(() => {});
  }, []);

  const value = useMemo(() => ({ enableAudio, playSound }), [enableAudio, playSound]);

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
}
