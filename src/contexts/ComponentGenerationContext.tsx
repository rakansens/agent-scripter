import React, { createContext, useContext, useState, useCallback } from 'react';

interface ComponentGenerationContextType {
  generatedComponents: string[];
  addGeneratedComponent: (component: string) => void;
  isGenerating: boolean;
  setIsGenerating: (state: boolean) => void;
  clearComponents: () => void;
}

const ComponentGenerationContext = createContext<ComponentGenerationContextType | undefined>(undefined);

export const ComponentGenerationProvider = ({ children }: { children: React.ReactNode }) => {
  const [generatedComponents, setGeneratedComponents] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const addGeneratedComponent = useCallback((component: string) => {
    setGeneratedComponents(prev => [...prev, component]);
  }, []);

  const clearComponents = useCallback(() => {
    setGeneratedComponents([]);
  }, []);

  return (
    <ComponentGenerationContext.Provider 
      value={{ 
        generatedComponents, 
        addGeneratedComponent, 
        isGenerating, 
        setIsGenerating,
        clearComponents
      }}
    >
      {children}
    </ComponentGenerationContext.Provider>
  );
};

export const useComponentGeneration = () => {
  const context = useContext(ComponentGenerationContext);
  if (context === undefined) {
    throw new Error('useComponentGeneration must be used within a ComponentGenerationProvider');
  }
  return context;
};