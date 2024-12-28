import React from 'react';
import Layout from './Layout';
import ChatSection from './ChatSection';
import PreviewSection from './PreviewSection';
import { AgentProvider } from '@/contexts/AgentContext';
import { MessageProvider } from '@/contexts/MessageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FolderTree, Code, Settings } from 'lucide-react';
import FileExplorer from '../file-explorer/FileExplorer';
import { useAgent } from '@/contexts/AgentContext';
import { cn } from '@/lib/utils';

const MainContent = () => {
  const { projectStructure } = useAgent();

  return (
    <Layout>
      <div className="fixed inset-0 flex overflow-hidden">
        {/* チャットセクション */}
        <div className="w-[450px] flex flex-col bg-white/90 dark:bg-gray-900/90 border-r border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
          <ChatSection />
        </div>

        {/* タブ付きコンテンツエリア */}
        <div className="flex-1 overflow-auto">
          <div className="h-full p-4">
            <Tabs defaultValue="preview" className="h-full flex flex-col">
              <div className="mb-4">
                <TabsList className="w-full p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                  <TabsTrigger value="preview" className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all">
                    <Eye className="w-4 h-4 mr-2" />
                    プレビュー
                  </TabsTrigger>
                  <TabsTrigger value="structure" className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all">
                    <FolderTree className="w-4 h-4 mr-2" />
                    プロジェクト構造
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all">
                    <Code className="w-4 h-4 mr-2" />
                    コード
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all">
                    <Settings className="w-4 h-4 mr-2" />
                    設定
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="preview" className="flex-1 mt-0 rounded-lg overflow-hidden">
                <div className="h-full bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
                  <PreviewSection />
                </div>
              </TabsContent>

              <TabsContent value="structure" className="flex-1 mt-0">
                <div className="h-full bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm p-6">
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
                </div>
              </TabsContent>

              <TabsContent value="code" className="flex-1 mt-0">
                <div className="h-full bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">コードエディタ</h3>
                  {/* コードエディタの実装 */}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="flex-1 mt-0">
                <div className="h-full bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">設定</h3>
                  {/* 設定の実装 */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
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