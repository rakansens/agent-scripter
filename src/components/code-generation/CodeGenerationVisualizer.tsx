import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import TypingCodeBlock from '../chat/TypingCodeBlock';
import { GenerationStep } from '@/lib/types/agent';

interface CodeGenerationVisualizerProps {
  steps: GenerationStep[];
  currentCode?: string;
}

const CodeGenerationVisualizer = ({ steps, currentCode }: CodeGenerationVisualizerProps) => {
  const activeStep = steps.find(step => step.status === 'in-progress');

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">コード生成プロセス</h3>
      <ScrollArea className="h-[300px]">
        {activeStep && currentCode && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>現在の生成ステップ:</span>
              <span className="font-medium text-primary">{activeStep.name}</span>
            </div>
            <TypingCodeBlock 
              code={currentCode} 
              language="typescript"
              typingSpeed={20}
            />
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default CodeGenerationVisualizer;