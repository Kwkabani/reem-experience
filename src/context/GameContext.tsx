import { createContext, useContext, useState, useCallback, useRef, useMemo, useEffect, type ReactNode } from 'react';
import { Stage, type GameState } from '../types';
import { AudioManager } from '../audio/AudioManager';

interface GameContextType extends GameState {
  goToNextStage: () => void;
  setAnswer: (key: string, value: string) => void;
  enableAudio: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'door' | 'typing' | 'complete' | 'loading' | 'ready') => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    currentStage: Stage.Welcome,
    answers: {},
    audioEnabled: false,
  });

  const audioRef = useRef<AudioManager | null>(null);

  const enableAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new AudioManager();
    }
    audioRef.current.init();
    setState(prev => ({ ...prev, audioEnabled: true }));
  }, []);

  // BUG-05: dispose AudioManager when the provider unmounts
  useEffect(() => {
    return () => {
      audioRef.current?.dispose();
    };
  }, []);

  const playSound = useCallback((type: 'click' | 'success' | 'error' | 'door' | 'typing' | 'complete' | 'loading' | 'ready') => {
    // BUG-02 follow-up: play() is async; catch to suppress unhandled-rejection warnings
    audioRef.current?.play(type)?.catch(() => {});
  }, []);

  const goToNextStage = useCallback(() => {
    setState(prev => {
      const next = prev.currentStage + 1;
      if (next > Stage.FinalMessage) return prev;
      return { ...prev, currentStage: next as Stage };
    });
  }, []);

  const setAnswer = useCallback((key: string, value: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }));
  }, []);

  const value = useMemo(
    () => ({ ...state, goToNextStage, setAnswer, enableAudio, playSound }),
    [state, goToNextStage, setAnswer, enableAudio, playSound]
  );

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
