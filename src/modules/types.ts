export interface AppModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  accentColor: string;
  component: React.LazyExoticComponent<React.ComponentType<ModuleProps>>;
  badge?: string;
}

export interface ModuleProps {
  onComplete: () => void;
}

export interface ModuleRegistry {
  modules: AppModule[];
  getModule: (id: string) => AppModule | undefined;
}
