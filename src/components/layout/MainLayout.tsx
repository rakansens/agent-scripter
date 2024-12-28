import React from 'react';
import Layout from './Layout';
import ChatSection from './ChatSection';
import PreviewSection from './PreviewSection';
import AgentSection from './AgentSection';
import { AgentProvider } from '@/contexts/AgentContext';

const MainLayout = () => {
  return (
    <AgentProvider>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <AgentSection />
            <ChatSection />
          </div>
          <PreviewSection />
        </div>
      </Layout>
    </AgentProvider>
  );
};

export default MainLayout;