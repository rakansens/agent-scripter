import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import TypingCodeBlock from "./TypingCodeBlock";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";
import { useState } from "react";

interface MessageItemProps {
  message: Message;
  isTyping?: boolean;
}

const MessageItem = ({ message, isTyping = false }: MessageItemProps) => {
  const isUser = message.role === "user";
  const [selectedTab, setSelectedTab] = useState<'code' | 'preview'>('code');

  const renderContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <p key={`text-${lastIndex}`} className="text-sm whitespace-pre-wrap">
            {content.slice(lastIndex, match.index)}
          </p>
        );
      }

      const language = match[1] || 'typescript';
      const code = match[2].trim();
      parts.push(
        <div key={`code-${match.index}`} className="space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab('code')}
              className={cn(
                "px-3 py-1 rounded-t-lg text-sm",
                selectedTab === 'code'
                  ? "bg-gray-700 text-white"
                  : "bg-gray-600 text-gray-300"
              )}
            >
              Code
            </button>
            <button
              onClick={() => setSelectedTab('preview')}
              className={cn(
                "px-3 py-1 rounded-t-lg text-sm",
                selectedTab === 'preview'
                  ? "bg-gray-700 text-white"
                  : "bg-gray-600 text-gray-300"
              )}
            >
              Preview
            </button>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            {selectedTab === 'code' ? (
              isTyping ? (
                <TypingCodeBlock code={code} language={language} />
              ) : (
                <CodeEditor code={code} language={language} />
              )
            ) : (
              <CodePreview code={code} />
            )}
          </div>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

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