import React from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import { useChat } from '@/hooks/useChat';
import { useMessage } from '@/contexts/MessageContext';
import { useCodeGeneration } from '@/hooks/useCodeGeneration';

const ChatSection = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const { setIsTyping, setCurrentStreamedMessage } = useMessage();
  
  const {
    generationProgress,
    generationSteps,
    directoryStructure,
    generateCode
  } = useCodeGeneration();

  const handleSendMessage = async (content: string) => {
    setIsTyping(true);
    setCurrentStreamedMessage("");

    try {
      if (content.includes('generate') || content.includes('create')) {
        // コード生成のリクエストの場合
        await generateCode(content);
      } else {
        // 通常のチャットの場合
        await sendMessage(content);
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    } finally {
      setIsTyping(false);
      setCurrentStreamedMessage("");
    }
  };

  return (
    <div className="mt-8">
      <ChatContainer
        messages={messages}
        isTyping={isLoading}
        onSendMessage={handleSendMessage}
        streamedMessage=""
      />
    </div>
  );
};

export default ChatSection;