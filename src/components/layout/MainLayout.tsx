import React from 'react';
import Layout from './Layout';
import ChatSection from './ChatSection';
import PreviewSection from './PreviewSection';
import { AgentProvider } from '@/contexts/AgentContext';
import { MessageProvider } from '@/contexts/MessageContext';

const MainLayout = () => {
  return (
    <AgentProvider>
      <MessageProvider>
        <Layout>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ChatSection />
            </div>
            <PreviewSection />
          </div>
        </Layout>
      </MessageProvider>
    </AgentProvider>
  );
};

export default MainLayout;