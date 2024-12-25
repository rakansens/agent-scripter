import React, { useState } from 'react';
import { Folder, FileCode, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileNode[];
  language?: string;
}

interface FileExplorerProps {
  structure: FileNode;
  onFileSelect?: (file: FileNode) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ structure, onFileSelect }) => {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());

  const toggleDir = (path: string) => {
    const newExpanded = new Set(expandedDirs);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedDirs(newExpanded);
  };

  const renderNode = (node: FileNode, path: string = '') => {
    const currentPath = `${path}/${node.name}`;
    const isExpanded = expandedDirs.has(currentPath);

    if (node.type === 'directory') {
      return (
        <div key={currentPath}>
          <button
            onClick={() => toggleDir(currentPath)}
            className="flex items-center w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md group"
          >
            <span className="mr-1 text-gray-500">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </span>
            <Folder className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{node.name}</span>
          </button>
          {isExpanded && node.children && (
            <div className="ml-4 border-l border-gray-200 dark:border-gray-700">
              {node.children.map((child) => renderNode(child, currentPath))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={currentPath}
        onClick={() => onFileSelect?.(node)}
        className="flex items-center w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md group"
      >
        <FileCode className="w-4 h-4 text-gray-500 mr-2" />
        <span className="text-sm text-gray-700 dark:text-gray-300">{node.name}</span>
      </button>
    );
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="p-2">{renderNode(structure)}</div>
    </div>
  );
};

export default FileExplorer;