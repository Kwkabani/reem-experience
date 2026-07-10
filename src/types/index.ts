export const Stage = {
  Welcome: 0,
  PsychologyLab: 1,
  LifeSystem: 2,
  LifeLoading: 3,
  House: 4,
  Reveal: 5,
  FinalMessage: 6,
} as const;

export type Stage = (typeof Stage)[keyof typeof Stage];

export const STAGE_COUNT = 7;

export interface GameState {
  currentStage: Stage;
  answers: Record<string, string>;
  audioEnabled: boolean;
}
