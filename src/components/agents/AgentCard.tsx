import React from 'react';
import { Agent } from '@/lib/types/agent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  status?: string;
  isActive?: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  status = 'Idle',
  isActive = false 
}) => {
  return (
    <Card className={`transition-all ${isActive ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot className="w-4 h-4" />
          {agent.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{agent.description}</p>
        <div className="text-xs font-medium">
          Status: <span className="text-primary">{status}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;