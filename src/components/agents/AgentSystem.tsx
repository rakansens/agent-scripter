import React from 'react';
import { Agent, ProjectStructure, GenerationStep } from '@/lib/types/agent';
import AgentCard from './AgentCard';
import { Progress } from '@/components/ui/progress';

interface AgentSystemProps {
  agents: Agent[];
  currentStructure?: ProjectStructure;
  steps: GenerationStep[];
  progress: number;
}

const AgentSystem: React.FC<AgentSystemProps> = ({
  agents,
  steps,
  progress
}) => {
  const activeAgent = steps.find(step => step.status === 'in-progress')?.agentRole;

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map(agent => (
          <AgentCard
            key={agent.role}
            agent={agent}
            isActive={agent.role === activeAgent}
            status={
              agent.role === activeAgent
                ? 'Working'
                : steps.some(s => s.agentRole === agent.role && s.status === 'completed')
                ? 'Completed'
                : 'Waiting'
            }
          />
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Generation Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <div className="space-y-2">
        {steps.map(step => (
          <div
            key={step.id}
            className={`p-3 rounded-lg text-sm ${
              step.status === 'error'
                ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                : step.status === 'completed'
                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                : step.status === 'in-progress'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                : 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            <div className="flex justify-between">
              <span>{step.message}</span>
              <span className="text-xs opacity-70">
                {new Date(step.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentSystem;