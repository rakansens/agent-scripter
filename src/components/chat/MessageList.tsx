import { Message } from "@/lib/types";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  streamedMessage: string;
}

const MessageList = ({ messages, isTyping, streamedMessage }: MessageListProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto h-[calc(100vh-200px)]">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {streamedMessage && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
            <p className="text-sm whitespace-pre-wrap">{streamedMessage}</p>
          </div>
        </div>
      )}
      {isTyping && !streamedMessage && <TypingIndicator />}
    </div>
  );
};

export default MessageList;