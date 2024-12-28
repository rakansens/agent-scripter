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

const PreviewSection = () => {
  const { generationSteps, projectStructure, generationProgress } = useAgent();
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [currentGeneratedCode, setCurrentGeneratedCode] = React.useState<string>('');

  const handleFileSelect = (path: string) => {
    console.log('Selected file:', path);
    setSelectedFile(path);
  };

  return (
    <div className="lg:col-span-1 space-y-4">
      <PreviewContainer>
        <GeneratedLandingPage />
      </PreviewContainer>

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
      
      <CodeGenerationVisualizer 
        steps={generationSteps}
        currentCode={currentGeneratedCode}
      />

      {projectStructure && (
        <Card className="p-4">
          <ScrollArea className="h-[400px]">
            <ProjectStructureView
              structure={projectStructure}
              onSelect={handleFileSelect}
            />
          </ScrollArea>
        </Card>
      )}

      {selectedFile && (
        <FileViewer filePath={selectedFile} />
      )}
    </div>
  );
};

export default PreviewSection;