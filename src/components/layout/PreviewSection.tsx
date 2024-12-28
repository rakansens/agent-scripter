import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Eye, Code2 } from 'lucide-react';
import CodeGenerationProgress from '@/components/chat/CodeGenerationProgress';
import CodeGenerationVisualizer from '@/components/code-generation/CodeGenerationVisualizer';
import ProjectStructureView from '@/components/project-structure/ProjectStructureView';
import { FileViewer } from '@/components/file-viewer/FileViewer';
import { useAgent } from '@/contexts/AgentContext';
import GeneratedLandingPage from '@/components/preview/GeneratedLandingPage';
import PreviewContainer from '@/components/preview/PreviewContainer';
import { FileNode } from '@/components/file-explorer/FileExplorer';

const PreviewSection = () => {
  const { generationSteps, projectStructure, generationProgress } = useAgent();
  const [selectedFile, setSelectedFile] = React.useState<FileNode | null>(null);
  const [currentGeneratedCode, setCurrentGeneratedCode] = React.useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const handleFileSelect = (file: FileNode) => {
    console.log('Selected file:', file);
    setSelectedFile(file);
  };

  // プロジェクト構造が存在しない場合の表示
  if (!projectStructure) {
    return (
      <div className="lg:col-span-1 space-y-4">
        <Card className="p-4">
          <CodeGenerationProgress
            progress={generationProgress}
            status="プロジェクト構造を生成中..."
            steps={generationSteps}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="flex justify-end space-x-2">
        <Button
          variant={showPreview ? "outline" : "default"}
          size="sm"
          onClick={() => setShowPreview(false)}
        >
          <Code2 className="w-4 h-4 mr-2" />
          コード
        </Button>
        <Button
          variant={showPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setShowPreview(true)}
        >
          <Eye className="w-4 h-4 mr-2" />
          プレビュー
        </Button>
      </div>

      {showPreview ? (
        <PreviewContainer>
          <GeneratedLandingPage />
        </PreviewContainer>
      ) : (
        <>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <ScrollArea className="h-[400px]">
                <ProjectStructureView
                  structure={projectStructure}
                  onSelect={handleFileSelect}
                />
              </ScrollArea>
            </Card>

            {selectedFile && (
              <FileViewer file={selectedFile} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewSection;