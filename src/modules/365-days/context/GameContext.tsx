import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import { Stage, type GameState } from '../types';

interface GameContextType extends GameState {
  goToNextStage: () => void;
  setAnswer: (key: string, value: string) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    currentStage: Stage.Welcome,
    answers: {},
    audioEnabled: false,
  });

  const goToNextStage = useCallback(() => {
    setState((prev) => {
      const next = prev.currentStage + 1;
      if (next > Stage.FinalMessage) return prev;
      return { ...prev, currentStage: next as Stage };
    });
  }, []);

  const setAnswer = useCallback((key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }));
  }, []);

  const value = useMemo(
    () => ({ ...state, goToNextStage, setAnswer }),
    [state, goToNextStage, setAnswer],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
