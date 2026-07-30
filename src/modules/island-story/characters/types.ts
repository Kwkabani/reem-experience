import type { ComponentType } from 'react';
import type { PersonalityType } from '../types';

export interface CharacterAppearance {
  hairColor: string;
  outfitColor: string;
  accentColor: string;
  skinTone: string;
}

export interface CharacterConfig {
  id: string;
  name: string;
  description: string;
  personality: PersonalityType;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  };
  appearance: CharacterAppearance;
  animationType: 'float' | 'gentle' | 'glow' | 'bounce' | 'drift';
  component: ComponentType;
}
