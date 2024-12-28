import React from 'react';
import Layout from './Layout';
import ChatSection from './ChatSection';
import PreviewSection from './PreviewSection';
import { AgentProvider } from '@/contexts/AgentContext';
import { MessageProvider } from '@/contexts/MessageContext';
import { ComponentGenerationProvider } from '@/contexts/ComponentGenerationContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AgentProvider>
      <MessageProvider>
        <ComponentGenerationProvider>
          <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <ChatSection />
              </div>
              <PreviewSection />
            </div>
            {children}
          </Layout>
        </ComponentGenerationProvider>
      </MessageProvider>
    </AgentProvider>
  );
};

export default MainLayout;