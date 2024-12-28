import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { Message } from '@/lib/types';

interface MessageContextType {
  messages: Message[];
  isTyping: boolean;
  currentStreamedMessage: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setIsTyping: (isTyping: boolean) => void;
  setCurrentStreamedMessage: (message: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStreamedMessage, setCurrentStreamedMessage] = useState('');

  return (
    <MessageContext.Provider
      value={{
        messages,
        isTyping,
        currentStreamedMessage,
        setMessages,
        setIsTyping,
        setCurrentStreamedMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};