import React from 'react';
import { AgentProvider } from '@/contexts/AgentContext';
import { MessageProvider } from '@/contexts/MessageContext';
import AgentSection from './AgentSection';
import ChatSection from './ChatSection';
import PreviewSection from './PreviewSection';

const MainLayout = () => {
  return (
    <AgentProvider>
      <MessageProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AgentSection />
                <ChatSection />
              </div>
              <PreviewSection />
            </div>
          </div>
        </div>
      </MessageProvider>
    </AgentProvider>
  );
};

export default MainLayout;