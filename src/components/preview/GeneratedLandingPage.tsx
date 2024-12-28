import React from 'react';
import { useComponentGeneration } from '@/contexts/ComponentGenerationContext';

const GeneratedLandingPage = () => {
  const { generatedComponents, isGenerating } = useComponentGeneration();

  if (isGenerating) {
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
    <div className="min-h-screen">
      {generatedComponents.map((component, index) => (
        <div 
          key={index}
          className="p-4 border-b border-gray-200"
          dangerouslySetInnerHTML={{ __html: component }}
        />
      ))}
    </div>
  );
};

export default GeneratedLandingPage;