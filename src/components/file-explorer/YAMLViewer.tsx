import React from 'react';
import { FileNode } from './FileExplorer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface YAMLViewerProps {
  yaml: string;
  onStructureGenerated: (structure: FileNode) => void;
}

const YAMLViewer: React.FC<YAMLViewerProps> = ({ yaml, onStructureGenerated }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Project Structure (YAML)
          </h3>
        </div>
        <SyntaxHighlighter
          language="yaml"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
          }}
        >
          {yaml}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default YAMLViewer;