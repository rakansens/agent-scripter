import React from 'react';
import { Card } from '@/components/ui/card';
import CodeEditor from '@/components/chat/CodeEditor';

interface FileViewerProps {
  filePath: string;
}

export const FileViewer: React.FC<FileViewerProps> = ({ filePath }) => {
  // In a real application, we would fetch the file content here
  // For now, we'll display a placeholder
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">{filePath}</h3>
      <CodeEditor
        code={`// Content of ${filePath}`}
        language="typescript"
        readOnly
      />
    </Card>
  );
};