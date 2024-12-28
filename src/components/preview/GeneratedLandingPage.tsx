import React, { useEffect, useState } from 'react';
import { useAgent } from '@/contexts/AgentContext';
import { Card } from '@/components/ui/card';

const GeneratedLandingPage = () => {
  const { projectStructure } = useAgent();
  const [sections, setSections] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!projectStructure) return;

    const sectionsDir = projectStructure.components[0]?.children?.[0]?.children?.find(
      dir => dir.name === 'sections'
    );

    if (!sectionsDir?.children) return;

    const loadedSections = sectionsDir.children.map(section => {
      if (!section.code) return null;

      try {
        // コードを安全に評価するための関数
        const evalComponent = new Function(
          'React',
          'Button',
          'Card',
          'Rocket',
          'Shield',
          'Zap',
          `
          const exports = {};
          ${section.code}
          return exports.default;
        `
        );

        // 必要な依存関係をインポート
        const Button = () => <button className="px-4 py-2 bg-primary text-white rounded">Button</button>;
        const icons = {
          Rocket: () => <span>🚀</span>,
          Shield: () => <span>🛡️</span>,
          Zap: () => <span>⚡</span>
        };

        const Component = evalComponent(
          React,
          Button,
          Card,
          icons.Rocket,
          icons.Shield,
          icons.Zap
        );

        return <Component key={section.name} />;
      } catch (error) {
        console.error(`Error rendering section ${section.name}:`, error);
        return null;
      }
    });

    setSections(loadedSections.filter(Boolean));
  }, [projectStructure]);

  if (!sections.length) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">プレビューを生成中...</p>
      </Card>
    );
  }

  return <div className="space-y-8">{sections}</div>;
};

export default GeneratedLandingPage;