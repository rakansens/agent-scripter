import React, { createContext, useContext, useState } from 'react';
import { Agent, ProjectStructure, GenerationStep } from '@/lib/types/agent';
import { INITIAL_AGENTS } from '@/lib/constants/agents';

interface AgentContextType {
  agents: Agent[];
  generationSteps: GenerationStep[];
  projectStructure: ProjectStructure | null;
  generationProgress: number;
  setGenerationSteps: (steps: GenerationStep[]) => void;
  setProjectStructure: (structure: ProjectStructure | null) => void;
  setGenerationProgress: (progress: number) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [projectStructure, setProjectStructure] = useState<ProjectStructure | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  return (
    <AgentContext.Provider
      value={{
        agents: INITIAL_AGENTS,
        generationSteps,
        projectStructure,
        generationProgress,
        setGenerationSteps,
        setProjectStructure,
        setGenerationProgress,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};