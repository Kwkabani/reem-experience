import { createContext } from 'react';

export const ModuleCompleteContext = createContext<(() => void) | null>(null);
