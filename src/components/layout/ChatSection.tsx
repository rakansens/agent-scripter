import React from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import { useMessage } from '@/contexts/MessageContext';
import { useAgent } from '@/contexts/AgentContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/lib/types';
import { GenerationStep, AgentRole } from '@/lib/types/agent';
import { INITIAL_AGENTS } from '@/lib/constants/agents';

const ChatSection = () => {
  const { messages, isTyping, currentStreamedMessage, setMessages, setIsTyping, setCurrentStreamedMessage } = useMessage();
  const { setGenerationSteps, setProjectStructure, setGenerationProgress } = useAgent();
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setIsTyping(true);
    setCurrentStreamedMessage("");
    setGenerationProgress(0);

    try {
      // Initialize generation steps with all agents
      const initialSteps: GenerationStep[] = INITIAL_AGENTS.map((agent, index) => ({
        id: String(index + 1),
        name: agent.name,
        agentRole: agent.role as AgentRole,
        status: index === 0 ? "in-progress" : "pending",
        message: index === 0 ? "処理を開始しています..." : "待機中",
        timestamp: new Date(),
      }));
      
      setGenerationSteps(initialSteps);

      const response = await supabase.functions.invoke("generate-project-structure", {
        body: { prompt: content },
      });

      if (!response.data) throw new Error("No response data");
      
      console.log('Generated project structure:', response.data.structure);
      setProjectStructure(response.data.structure);
      setGenerationProgress(25);
      
      // Update generation steps as each agent completes its task
      let progress = 25;
      for (let i = 1; i < initialSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate agent processing
        progress += Math.floor(75 / (initialSteps.length - 1));
        setGenerationProgress(progress);
        
        const updatedSteps = initialSteps.map((step, index) => ({
          ...step,
          status: index < i ? "completed" : index === i ? "in-progress" : "pending",
          message: index < i ? "完了" : index === i ? "処理中..." : "待機中",
        }));
        setGenerationSteps(updatedSteps);
      }

      // Set all steps to completed
      const completedSteps = initialSteps.map(step => ({
        ...step,
        status: "completed",
        message: "完了",
      }));
      setGenerationSteps(completedSteps);

      setGenerationProgress(100);
      toast({
        title: "生成完了",
        description: "ランディングページの生成が完了しました。",
      });

    } catch (error) {
      console.error("Error in project generation:", error);
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "プロジェクト生成中にエラーが発生しました。",
      });
    } finally {
      setIsTyping(false);
      setCurrentStreamedMessage("");
    }
  };

  return (
    <div className="mt-8">
      <ChatContainer
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        streamedMessage={currentStreamedMessage}
      />
    </div>
  );
};

export default ChatSection;