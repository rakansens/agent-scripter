import { useState } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import { Message } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import CodeGenerationProgress from "@/components/chat/CodeGenerationProgress";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStreamedMessage, setCurrentStreamedMessage] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState("");

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
    setGenerationProgress(0);
    setGenerationStatus("Initializing...");

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
        setGenerationStatus("Generating code...");
      }, 500);

      const response = await supabase.functions.invoke('chat-with-gemini', {
        body: {
          messages: [...messages, newMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        },
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);
      setGenerationStatus("Complete!");

      if (!response.data) throw new Error('No response data');

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data,
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
      setTimeout(() => {
        setGenerationProgress(0);
        setGenerationStatus("");
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        <ChatContainer
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          streamedMessage={currentStreamedMessage}
        />
        {generationProgress > 0 && (
          <div className="fixed bottom-4 right-4 w-80">
            <CodeGenerationProgress
              progress={generationProgress}
              status={generationStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;