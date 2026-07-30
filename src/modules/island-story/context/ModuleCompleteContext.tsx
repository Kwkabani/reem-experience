import { createContext, useContext, type ReactNode } from 'react';

const ModuleCompleteContext = createContext<(() => void) | null>(null);

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

export function useModuleComplete() {
  return useContext(ModuleCompleteContext);
}
