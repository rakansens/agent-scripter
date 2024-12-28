import React from 'react';
import { Card } from '@/components/ui/card';
import CodeEditor from '@/components/chat/CodeEditor';
import { FileNode } from '@/components/file-explorer/FileExplorer';

interface FileViewerProps {
  file: FileNode | null;
}

export const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  if (!file) {
    return null;
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">{file.name}</h3>
      <CodeEditor
        code={file.content || `// Content of ${file.name}`}
        language={file.language || 'typescript'}
        readOnly
      />
    </Card>
  );
};