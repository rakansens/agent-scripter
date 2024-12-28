import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/lib/types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      
      // ユーザーメッセージを追加
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);

      // AIからの応答を取得
      const response = await supabase.functions.invoke('chat-with-gemini', {
        body: { messages: [...messages, userMessage] }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // AIの応答を追加
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};