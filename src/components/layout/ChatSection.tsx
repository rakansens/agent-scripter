import React from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import { useMessage } from '@/contexts/MessageContext';
import { useAgent } from '@/contexts/AgentContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/lib/types';
import { GenerationStep, AgentRole, GenerationStepStatus } from '@/lib/types/agent';
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

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    setCurrentStreamedMessage("");
    setGenerationProgress(0);

    try {
      const initialSteps: GenerationStep[] = INITIAL_AGENTS.map((agent, index) => ({
        id: String(index + 1),
        name: agent.name,
        agentRole: agent.role as AgentRole,
        status: index === 0 ? "in-progress" as const : "pending" as GenerationStepStatus,
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

      // 生成されたファイルの一覧を作成
      const allFiles = [];
      const processComponent = (component: any, path = '') => {
        const currentPath = `${path}/${component.name}`;
        if (component.type === 'file' || component.type === 'component') {
          allFiles.push(currentPath);
        }
        if (component.children) {
          component.children.forEach((child: any) => processComponent(child, currentPath));
        }
      };

      response.data.structure.components.forEach((comp: any) => processComponent(comp));

      const filesList = allFiles.map(file => `- ${file}`).join('\n');

      const filesMessage: Message = {
        id: Date.now().toString(),
        content: `以下のファイルが生成されました：\n\n${filesList}`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, filesMessage]);
      
      let progress = 25;
      for (let i = 1; i < initialSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        progress += Math.floor(75 / (initialSteps.length - 1));
        setGenerationProgress(progress);
        
        const updatedSteps = initialSteps.map((step, index) => ({
          ...step,
          status: index < i ? ("completed" as GenerationStepStatus) : 
                 index === i ? ("in-progress" as const) : 
                 ("pending" as GenerationStepStatus),
          message: index < i ? "完了" : index === i ? "処理中..." : "待機中",
        }));
        setGenerationSteps(updatedSteps);
      }

      const completedSteps = initialSteps.map(step => ({
        ...step,
        status: "completed" as GenerationStepStatus,
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