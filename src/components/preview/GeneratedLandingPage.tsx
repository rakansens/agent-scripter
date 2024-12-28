import React from 'react';
import { useAgent } from '@/contexts/AgentContext';

const GeneratedLandingPage = () => {
  const { projectStructure } = useAgent();

  if (!projectStructure) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">プレビューを生成中...</p>
      </div>
    );
  }

  // プロジェクト構造から実際のコンポーネントを生成
  const generateComponent = (code: string) => {
    try {
      // 安全なコード実行のため、evalを使用せず、
      // 将来的にはより安全な方法（例：sandboxed iframe）を実装することを推奨
      return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-500">
            注: プレビューは開発中です。現在は静的なHTMLとして表示されています。
          </p>
          <div 
            className="mt-4"
            dangerouslySetInnerHTML={{ 
              __html: code
                .replace(/class=/g, 'className=')
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            }} 
          />
        </div>
      );
    } catch (error) {
      console.error('Error generating preview:', error);
      return (
        <div className="p-4 bg-red-100 text-red-600 rounded-lg">
          プレビューの生成中にエラーが発生しました。
        </div>
      );
    }
  };

  // メインコンポーネントを探す（例：App.tsxやindex.tsx）
  const mainComponent = projectStructure.components.find(
    comp => comp.name.toLowerCase().includes('app') || 
           comp.name.toLowerCase().includes('index')
  );

  if (!mainComponent || !mainComponent.code) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">メインコンポーネントが見つかりません。</p>
      </div>
    );
  }

  return generateComponent(mainComponent.code);
};

export default GeneratedLandingPage;