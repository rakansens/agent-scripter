import React from 'react';
import Layout from './Layout';
import ChatSection from './ChatSection';
import PreviewSection from './PreviewSection';
import { AgentProvider } from '@/contexts/AgentContext';
import { MessageProvider } from '@/contexts/MessageProvider';
import Hero from '../sections/Hero';
import Features from '../sections/Features';

const MainLayout = () => {
  return (
    <AgentProvider>
      <MessageProvider>
        <Layout>
          <div className="flex flex-col min-h-screen">
            <Hero />
            <Features />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
              <ChatSection />
              <PreviewSection />
            </div>
          </div>
        </Layout>
      </MessageProvider>
    </AgentProvider>
  );
};

export default MainLayout;