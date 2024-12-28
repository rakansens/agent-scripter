import React, { useState } from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import { useMessage } from '@/contexts/MessageContext';
import { useAgent } from '@/contexts/AgentContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/lib/types';
import { GenerationStep, AgentRole, GenerationStepStatus } from '@/lib/types/agent';
import { INITIAL_AGENTS } from '@/lib/constants/agents';
import type { TreeNode } from '../file-explorer/DirectoryTree';

const ChatSection = () => {
  const { messages, isTyping, currentStreamedMessage, setMessages, setIsTyping, setCurrentStreamedMessage } = useMessage();
  const { setGenerationSteps, setProjectStructure, setGenerationProgress } = useAgent();
  const [directoryStructure, setDirectoryStructure] = useState<TreeNode | null>(null);
  const { toast } = useToast();

  const updateDirectoryStructure = (structure: any) => {
    const convertToTreeNode = (node: any): TreeNode => ({
      name: node.name,
      type: node.type === 'directory' ? 'directory' : 'file',
      status: 'creating',
      children: node.children?.map(convertToTreeNode)
    });

    setDirectoryStructure(convertToTreeNode(structure));
  };

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
    setDirectoryStructure(null);

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

      const progressMessage: Message = {
        id: Date.now().toString(),
        content: "生成を開始します...",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, progressMessage]);

      const response = await supabase.functions.invoke("generate-project-structure", {
        body: { prompt: content },
      });

      if (!response.data) throw new Error("No response data");
      
      console.log('Generated project structure:', response.data.structure);
      setProjectStructure(response.data.structure);
      updateDirectoryStructure(response.data.structure);
      setGenerationProgress(25);
      
      const structureMessage: Message = {
        id: Date.now().toString(),
        content: `以下のファイルが生成されました：\n\n${response.data.structure.components.map(comp => `- ${comp.path}`).join('\n')}`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, structureMessage]);

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

        if (directoryStructure) {
          const updateNodeStatus = (node: TreeNode): TreeNode => ({
            ...node,
            status: 'completed',
            children: node.children?.map(updateNodeStatus)
          });
          setDirectoryStructure(updateNodeStatus(directoryStructure));
        }

        const stepMessage: Message = {
          id: Date.now().toString(),
          content: `${updatedSteps[i].name}の処理を実行中...\n進捗: ${progress}%`,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, stepMessage]);
      }

      const completedSteps = initialSteps.map(step => ({
        ...step,
        status: "completed" as GenerationStepStatus,
        message: "完了",
      }));
      setGenerationSteps(completedSteps);

      const completionMessage: Message = {
        id: Date.now().toString(),
        content: "生成が完了しました！",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, completionMessage]);

      setGenerationProgress(100);
      toast({
        title: "生成完了",
        description: "ランディングページの生成が完了しました。",
      });

    } catch (error) {
      console.error("Error in project generation:", error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "エラーが発生しました。もう一度お試しください。",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);

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