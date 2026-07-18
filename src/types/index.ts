export type SoundType =
  'click' | 'success' | 'error' | 'door' | 'typing' | 'complete' | 'loading' | 'ready';

export interface Choice {
  id: string;
  text: string;
  isComedy?: boolean;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
}
