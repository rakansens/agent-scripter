import React from 'react';
import Layout from './Layout';
import ChatSection from './ChatSection';
import PreviewSection from './PreviewSection';
import { AgentProvider } from '@/contexts/AgentContext';
import { MessageProvider } from '@/contexts/MessageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FolderTree } from 'lucide-react';
import FileExplorer from '../file-explorer/FileExplorer';
import { useAgent } from '@/contexts/AgentContext';

const MainContent = () => {
  const { projectStructure } = useAgent();

  return (
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
              <TabsTrigger value="structure" className="flex-1">
                <FolderTree className="w-4 h-4 mr-2" />
                プロジェクト構造
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-0">
              <PreviewSection />
            </TabsContent>

            <TabsContent value="structure" className="mt-0">
              {projectStructure && (
                <FileExplorer 
                  structure={{
                    ...projectStructure,
                    type: 'directory',
                    children: projectStructure.components.map(comp => ({
                      name: comp.name,
                      type: 'file',
                      content: comp.code || '',
                      language: comp.language || 'typescript'
                    }))
                  }} 
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

const MainLayout = () => {
  return (
    <AgentProvider>
      <MessageProvider>
        <MainContent />
      </MessageProvider>
    </AgentProvider>
  );
};

export default MainLayout;