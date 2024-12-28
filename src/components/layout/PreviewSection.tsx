import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodeGenerationProgress from '@/components/chat/CodeGenerationProgress';
import CodeGenerationVisualizer from '@/components/code-generation/CodeGenerationVisualizer';
import ProjectStructureView from '@/components/project-structure/ProjectStructureView';
import { FileViewer } from '@/components/file-viewer/FileViewer';
import { useAgent } from '@/contexts/AgentContext';
import GeneratedLandingPage from '@/components/preview/GeneratedLandingPage';
import PreviewContainer from '@/components/preview/PreviewContainer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Eye, GitBranch } from 'lucide-react';

const PreviewSection = () => {
  const { generationSteps, projectStructure, generationProgress } = useAgent();
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [currentGeneratedCode, setCurrentGeneratedCode] = React.useState<string>('');

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
  };

  return (
    <div className="space-y-4 h-full overflow-auto">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            プレビュー
          </TabsTrigger>
          <TabsTrigger value="process" className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            生成プロセス
          </TabsTrigger>
          <TabsTrigger value="structure" className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            プロジェクト構造
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-0">
          <PreviewContainer>
            <GeneratedLandingPage />
          </PreviewContainer>
        </TabsContent>

        <TabsContent value="process" className="mt-0 space-y-4">
          <Card className="p-4">
            <CodeGenerationProgress
              progress={generationProgress}
              status={
                generationProgress === 100
                  ? "生成完了"
                  : generationProgress > 0
                  ? "生成中..."
                  : "待機中"
              }
              steps={generationSteps}
              tech={["React", "TypeScript", "Tailwind CSS"]}
            />
          </Card>

          <Card className="p-4">
            <CodeGenerationVisualizer 
              steps={generationSteps}
              currentCode={currentGeneratedCode}
            />
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="mt-0">
          {projectStructure && (
            <Card className="p-4">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <ProjectStructureView
                  structure={projectStructure}
                  onSelect={handleFileSelect}
                />
              </ScrollArea>
            </Card>
          )}
          {selectedFile && (
            <Card className="mt-4 p-4">
              <FileViewer filePath={selectedFile} />
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviewSection;