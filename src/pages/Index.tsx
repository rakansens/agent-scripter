import { useState } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import { Message } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import CodeGenerationProgress from "@/components/chat/CodeGenerationProgress";
import GeneratedArtifacts from "@/components/chat/GeneratedArtifacts";

interface Artifact {
  name: string;
  type: 'file' | 'component';
  content: string;
}

const TECH_STACK = ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStreamedMessage, setCurrentStreamedMessage] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState("");
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

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
    setGenerationStatus("Initializing with React + TypeScript...");

    try {
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
        setGenerationStatus("Generating code with Tailwind CSS and shadcn/ui...");
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

      const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
      let match;
      const newArtifacts: Artifact[] = [];
      
      while ((match = codeBlockRegex.exec(response.data)) !== null) {
        const fileName = match[1]?.includes('file=') 
          ? match[1].split('file=')[1]
          : `Generated_${Date.now()}.tsx`;
        
        newArtifacts.push({
          name: fileName,
          type: fileName.includes('Component') ? 'component' : 'file',
          content: match[2].trim()
        });
      }

      setArtifacts(prev => [...prev, ...newArtifacts]);

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

  const handleArtifactSelect = (artifact: Artifact) => {
    console.log('Selected artifact:', artifact);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 flex">
        <div className="w-64 p-4 border-r border-gray-700">
          <GeneratedArtifacts 
            artifacts={artifacts}
            onSelect={handleArtifactSelect}
          />
        </div>
        <div className="flex-1">
          <ChatContainer
            messages={messages}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            streamedMessage={currentStreamedMessage}
          />
        </div>
      </div>
      {generationProgress > 0 && (
        <div className="fixed bottom-4 right-4 w-80">
          <CodeGenerationProgress
            progress={generationProgress}
            status={generationStatus}
            tech={TECH_STACK}
          />
        </div>
      )}
    </div>
  );
};

export default Index;