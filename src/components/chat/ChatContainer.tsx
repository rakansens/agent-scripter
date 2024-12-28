import { Message } from "@/lib/types";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Card } from "@/components/ui/card";

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (content: string) => void;
  streamedMessage: string;
}

const ChatContainer = ({ messages, isTyping, onSendMessage, streamedMessage }: ChatContainerProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          streamedMessage={streamedMessage}
        />
      </div>
      
      <div className="p-4 border-t dark:border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;