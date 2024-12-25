import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import CodeBlock from "./CodeBlock";

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.role === "user";

  // Function to detect and extract code blocks
  const renderContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <p key={`text-${lastIndex}`} className="text-sm whitespace-pre-wrap">
            {content.slice(lastIndex, match.index)}
          </p>
        );
      }

      // Add code block
      const language = match[1] || 'typescript';
      const code = match[2].trim();
      parts.push(
        <CodeBlock key={`code-${match.index}`} code={code} language={language} />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < content.length) {
      parts.push(
        <p key={`text-${lastIndex}`} className="text-sm whitespace-pre-wrap">
          {content.slice(lastIndex)}
        </p>
      );
    }

    return parts.length > 0 ? parts : <p className="text-sm whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div
      className={cn(
        "flex animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
};

export default MessageItem;