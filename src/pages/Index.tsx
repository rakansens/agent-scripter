import { useState } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import { Message } from "@/lib/types";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // AIの応答をシミュレート
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "申し訳ありませんが、現在AIモデルは統合されていません。これはデモ応答です。",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <ChatContainer
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Index;