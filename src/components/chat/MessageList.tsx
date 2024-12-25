import { Message } from "@/lib/types";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList = ({ messages, isTyping }: MessageListProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto h-[calc(100vh-200px)]">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageList;