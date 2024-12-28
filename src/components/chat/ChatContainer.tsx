import { Message } from "@/lib/types";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useComponentGeneration } from "@/contexts/ComponentGenerationContext";

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (content: string) => void;
  streamedMessage: string;
}

const ChatContainer = ({ messages, isTyping, onSendMessage, streamedMessage }: ChatContainerProps) => {
  const { setIsGenerating } = useComponentGeneration();

  const handleSendMessage = (content: string) => {
    setIsGenerating(true);
    onSendMessage(content);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-hidden bg-gray-800 rounded-t-lg">
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          streamedMessage={streamedMessage}
        />
      </div>
      <div className="bg-gray-800 rounded-b-lg p-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;