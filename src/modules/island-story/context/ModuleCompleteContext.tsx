import { type ReactNode } from 'react';
import { ModuleCompleteContext } from './module-complete-context';

export function ModuleCompleteProvider({
  onComplete,
  children,
}: {
  onComplete: () => void;
  children: ReactNode;
}) {
  return (
    <ModuleCompleteContext.Provider value={onComplete}>{children}</ModuleCompleteContext.Provider>
  );
}
