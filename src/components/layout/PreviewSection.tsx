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

const PreviewSection = () => {
  const { generationSteps, projectStructure, generationProgress } = useAgent();
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [currentGeneratedCode, setCurrentGeneratedCode] = React.useState<string>('');

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
  };

  return (
    <div className="space-y-4 h-full overflow-auto">
      <PreviewContainer>
        <GeneratedLandingPage />
      </PreviewContainer>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="progress">
          <AccordionTrigger>生成の進捗</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        {projectStructure && (
          <AccordionItem value="structure">
            <AccordionTrigger>プロジェクト構造</AccordionTrigger>
            <AccordionContent>
              <Card className="p-4">
                <ScrollArea className="h-[300px]">
                  <ProjectStructureView
                    structure={projectStructure}
                    onSelect={handleFileSelect}
                  />
                </ScrollArea>
              </Card>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="code">
          <AccordionTrigger>生成されたコード</AccordionTrigger>
          <AccordionContent>
            <CodeGenerationVisualizer 
              steps={generationSteps}
              currentCode={currentGeneratedCode}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {selectedFile && (
        <Card className="p-4">
          <FileViewer filePath={selectedFile} />
        </Card>
      )}
    </div>
  );
};

export default PreviewSection;