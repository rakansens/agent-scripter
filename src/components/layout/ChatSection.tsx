import React from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import { useMessage } from '@/contexts/MessageContext';
import { useCodeGeneration } from '@/hooks/useCodeGeneration';
import { Message } from '@/lib/types';

const ChatSection = () => {
  const { 
    messages, 
    isTyping, 
    currentStreamedMessage, 
    setMessages, 
    setIsTyping, 
    setCurrentStreamedMessage 
  } = useMessage();
  
  const {
    generationProgress,
    generationSteps,
    directoryStructure,
    generateCode
  } = useCodeGeneration();

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

    try {
      const progressMessage: Message = {
        id: Date.now().toString(),
        content: "生成を開始します...",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, progressMessage]);

      const result = await generateCode(content);
      
      const structureMessage: Message = {
        id: Date.now().toString(),
        content: `以下のファイルが生成されました：\n\n${result.structure.components.map(comp => `- ${comp.path}`).join('\n')}`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, structureMessage]);

      const completionMessage: Message = {
        id: Date.now().toString(),
        content: "生成が完了しました！",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, completionMessage]);

    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "エラーが発生しました。もう一度お試しください。",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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