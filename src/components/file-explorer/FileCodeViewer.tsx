import React from 'react';
import { FileNode } from './FileExplorer';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodeBlock from '../chat/CodeBlock';

interface FileCodeViewerProps {
  file: FileNode | null;
}

const FileCodeViewer = ({ file }: FileCodeViewerProps) => {
  if (!file || !file.content) return null;

  return (
    <Card className="mt-4 p-4">
      <h3 className="text-lg font-semibold mb-2">{file.name}</h3>
      <ScrollArea className="h-[400px]">
        <CodeBlock 
          code={file.content} 
          language={file.language || 'typescript'} 
        />
      </ScrollArea>
    </Card>
  );
};

export default FileCodeViewer;