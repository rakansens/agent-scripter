import React from 'react';
import Layout from './Layout';
import ChatSection from './ChatSection';
import PreviewSection from './PreviewSection';
import AgentSection from './AgentSection';
import { AgentProvider } from '@/contexts/AgentContext';
import { MessageProvider } from '@/contexts/MessageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, MessageSquare, Bot } from 'lucide-react';

const MainLayout = () => {
  return (
    <AgentProvider>
      <MessageProvider>
        <Layout>
          <div className="flex h-[calc(100vh-2rem)] gap-4">
            {/* チャットセクション（左側） */}
            <div className="w-1/2 flex flex-col">
              <ChatSection />
            </div>

            {/* 右側のタブ付きセクション */}
            <div className="w-1/2 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="preview" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    プレビュー
                  </TabsTrigger>
                  <TabsTrigger value="agents" className="flex-1">
                    <Bot className="w-4 h-4 mr-2" />
                    生成プロセス
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="mt-0">
                  <PreviewSection />
                </TabsContent>
                
                <TabsContent value="agents" className="mt-0">
                  <AgentSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Layout>
      </MessageProvider>
    </AgentProvider>
  );
};

export default MainLayout;