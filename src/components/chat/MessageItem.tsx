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
    // First, check for generated files list
    if (content.includes('以下のファイルが生成されました：')) {
      const [intro, filesList] = content.split('\n\n');
      return (
        <>
          <p className="text-sm mb-2 text-gray-700 dark:text-gray-200">{intro}</p>
          <div className="space-y-1">
            {filesList.split('\n').map((line, index) => {
              const filePath = line.replace('- ', '');
              return (
                <button
                  key={index}
                  onClick={() => console.log('Selected file:', filePath)}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 block text-left transition-colors"
                >
                  {filePath}
                </button>
              );
            })}
          </div>
        </>
      );
    }

    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <p key={`text-${lastIndex}`} className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-200">
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
                "px-3 py-1 rounded-t-lg text-sm transition-colors",
                selectedTab === 'code'
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-800"
              )}
            >
              Code
            </button>
            <button
              onClick={() => setSelectedTab('preview')}
              className={cn(
                "px-3 py-1 rounded-t-lg text-sm transition-colors",
                selectedTab === 'preview'
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-800"
              )}
            >
              Preview
            </button>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
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
        <p key={`text-${lastIndex}`} className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-200">
          {content.slice(lastIndex)}
        </p>
      );
    }

    return parts.length > 0 ? parts : <p className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-200">{content}</p>;
  };

  return (
    <div
      className={cn(
        "flex animate-fade-in p-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-6 py-4 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        )}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
};

export default MessageItem;