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
    <Card className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 border-b dark:border-gray-800">
        <h2 className="text-lg font-semibold">チャット</h2>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          streamedMessage={streamedMessage}
        />
      </div>
      
      <div className="p-4 border-t dark:border-gray-800">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </Card>
  );
};

export default ChatContainer;