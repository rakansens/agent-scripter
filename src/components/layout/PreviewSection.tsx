import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Code2 } from 'lucide-react';
import CodeGenerationProgress from '@/components/chat/CodeGenerationProgress';
import CodeGenerationVisualizer from '@/components/code-generation/CodeGenerationVisualizer';
import { FileViewer } from '@/components/file-viewer/FileViewer';
import { useAgent } from '@/contexts/AgentContext';
import { FileNode } from '@/components/file-explorer/FileExplorer';
import { useToast } from '@/components/ui/use-toast';
import GeneratedLandingPage from '@/components/preview/GeneratedLandingPage';

const PreviewSection = () => {
  const { generationSteps, projectStructure, generationProgress } = useAgent();
  const [selectedFile, setSelectedFile] = React.useState<FileNode | null>(null);
  const [currentGeneratedCode, setCurrentGeneratedCode] = React.useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
    if (file.content) {
      setCurrentGeneratedCode(file.content);
      console.log('Selected file content:', file.content);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
    console.log('Preview toggled:', !showPreview);
  };

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
          onClick={togglePreview}
        >
          <Code2 className="w-4 h-4 mr-2" />
          コード
        </Button>
        <Button
          variant={showPreview ? "default" : "outline"}
          size="sm"
          onClick={togglePreview}
        >
          <Eye className="w-4 h-4 mr-2" />
          プレビュー
        </Button>
      </div>

      {showPreview ? (
        <Card className="p-4">
          <GeneratedLandingPage />
        </Card>
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

          {selectedFile && (
            <FileViewer file={selectedFile} />
          )}
        </>
      )}
    </div>
  );
};

export default PreviewSection;