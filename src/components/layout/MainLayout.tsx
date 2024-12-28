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
      <div className="fixed inset-0 flex overflow-hidden bg-gray-50 dark:bg-gray-950">
        {/* 左サイド：チャットセクション */}
        <div className="w-[450px] flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <ChatSection />
        </div>

        {/* 右サイド：タブ付きコンテンツエリア */}
        <div className="flex-1 overflow-auto">
          <div className="h-full p-6">
            <Tabs defaultValue="preview" className="h-full flex flex-col">
              <div className="mb-6 px-2">
                <TabsList className="w-full p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <TabsTrigger value="preview" className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                    <Eye className="w-4 h-4 mr-2" />
                    プレビュー
                  </TabsTrigger>
                  <TabsTrigger value="structure" className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                    <FolderTree className="w-4 h-4 mr-2" />
                    プロジェクト構造
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                    <Code className="w-4 h-4 mr-2" />
                    コード
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                    <Settings className="w-4 h-4 mr-2" />
                    設定
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="preview" className="flex-1 mt-0 rounded-lg overflow-hidden">
                <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                  <PreviewSection />
                </div>
              </TabsContent>

              <TabsContent value="structure" className="flex-1 mt-0">
                <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
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
                <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">コードエディタ</h3>
                  {/* コードエディタの実装 */}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="flex-1 mt-0">
                <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
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