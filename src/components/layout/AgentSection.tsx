import React from 'react';
import AgentSystem from '@/components/agents/AgentSystem';
import { useAgent } from '@/contexts/AgentContext';

const AgentSection = () => {
  const { agents, generationSteps, generationProgress } = useAgent();

  return (
    <AgentSystem
      agents={agents}
      steps={generationSteps}
      progress={generationProgress}
    />
  );
};

export default AgentSection;