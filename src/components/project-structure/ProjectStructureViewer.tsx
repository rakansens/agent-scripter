import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Folder, FileCode } from 'lucide-react';

interface DirectoryNode {
  name: string;
  type: 'directory' | 'file';
  children?: DirectoryNode[];
}

const ProjectStructureViewer: React.FC = () => {
  const projectStructure: DirectoryNode = {
    name: 'src',
    type: 'directory',
    children: [
      {
        name: 'components',
        type: 'directory',
        children: [
          {
            name: 'layout',
            type: 'directory',
            children: [
              { name: 'Header.tsx', type: 'file' },
              { name: 'Footer.tsx', type: 'file' },
              { name: 'Layout.tsx', type: 'file' }
            ]
          },
          {
            name: 'ui',
            type: 'directory',
            children: [
              { name: 'Button.tsx', type: 'file' },
              { name: 'Card.tsx', type: 'file' }
            ]
          }
        ]
      },
      {
        name: 'pages',
        type: 'directory',
        children: [
          { name: 'index.tsx', type: 'file' },
          { name: 'about.tsx', type: 'file' }
        ]
      },
      {
        name: 'hooks',
        type: 'directory',
        children: [
          { name: 'useAuth.tsx', type: 'file' },
          { name: 'useToast.ts', type: 'file' }
        ]
      },
      {
        name: 'utils',
        type: 'directory',
        children: [
          { name: 'api.ts', type: 'file' },
          { name: 'helpers.ts', type: 'file' }
        ]
      }
    ]
  };

  const renderNode = (node: DirectoryNode, level: number = 0) => {
    const paddingLeft = `${level * 1.5}rem`;

    return (
      <div key={node.name} style={{ paddingLeft }}>
        <div className="flex items-center py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2">
          {node.type === 'directory' ? (
            <Folder className="w-4 h-4 text-blue-500 mr-2" />
          ) : (
            <FileCode className="w-4 h-4 text-gray-500 mr-2" />
          )}
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {node.name}
          </span>
        </div>
        {node.children?.map(child => renderNode(child, level + 1))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <ScrollArea className="h-[500px] p-4">
        <h2 className="text-lg font-semibold mb-4">プロジェクト構造</h2>
        {renderNode(projectStructure)}
      </ScrollArea>
    </Card>
  );
};

export default ProjectStructureViewer;