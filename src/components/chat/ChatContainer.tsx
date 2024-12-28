import { Message } from "@/lib/types";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Card } from "@/components/ui/card";
import { Bot, User } from 'lucide-react';

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (content: string) => void;
  streamedMessage: string;
}

const ChatContainer = ({ messages, isTyping, onSendMessage, streamedMessage }: ChatContainerProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">AI アシスタント</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          あなたのコーディングをサポートします
        </p>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          streamedMessage={streamedMessage}
        />
      </div>
      
      <div className="p-4 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;