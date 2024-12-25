import { useState } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import { Message } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStreamedMessage, setCurrentStreamedMessage] = useState("");

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
    setCurrentStreamedMessage("");

    try {
      const response = await supabase.functions.invoke('chat-with-gemini', {
        body: {
          messages: [...messages, newMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        },
      });

      if (!response.data) throw new Error('No response data');

      const reader = new ReadableStreamDefaultReader(response.data as ReadableStream);
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        setCurrentStreamedMessage(prev => prev + chunk);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: currentStreamedMessage,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "申し訳ありません。エラーが発生しました。",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setCurrentStreamedMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <ChatContainer
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        streamedMessage={currentStreamedMessage}
      />
    </div>
  );
};

export default Index;