import { useContext } from 'react';
import { ModuleCompleteContext } from './module-complete-context';

export function useModuleComplete() {
  return useContext(ModuleCompleteContext);
}
