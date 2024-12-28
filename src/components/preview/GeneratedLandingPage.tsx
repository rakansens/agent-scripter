import React, { useEffect } from 'react';
import { useComponentGeneration } from '@/contexts/ComponentGenerationContext';
import { useToast } from '@/components/ui/use-toast';
import PreviewContainer from './PreviewContainer';

const GeneratedLandingPage = () => {
  const { generatedComponents, isGenerating } = useComponentGeneration();
  const { toast } = useToast();

  useEffect(() => {
    if (isGenerating) {
      toast({
        title: "コンポーネント生成中",
        description: "プレビューを更新しています...",
      });
    }
  }, [isGenerating, toast]);

  if (isGenerating && generatedComponents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">コンポーネントを生成中...</p>
        </div>
      </div>
    );
  }

  if (generatedComponents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">生成されたコンポーネントがありません。チャットでお題を入力してください。</p>
      </div>
    );
  }

  return (
    <PreviewContainer>
      <div className="min-h-screen">
        {generatedComponents.map((component, index) => (
          <div 
            key={index}
            className="animate-fade-in"
            dangerouslySetInnerHTML={{ __html: component }}
          />
        ))}
      </div>
    </PreviewContainer>
  );
};

export default GeneratedLandingPage;