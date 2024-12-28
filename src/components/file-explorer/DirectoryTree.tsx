import React from 'react';
import { FileIcon, FolderIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TreeNode {
  name: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
  status?: 'pending' | 'creating' | 'completed';
}

interface DirectoryTreeProps {
  structure: TreeNode;
  level?: number;
}

const DirectoryTree: React.FC<DirectoryTreeProps> = ({ structure, level = 0 }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'creating':
        return 'text-blue-500 animate-pulse';
      case 'completed':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="font-mono">
      <div
        className={cn(
          "flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer",
          structure.type === 'directory' && "font-semibold"
        )}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => structure.type === 'directory' && setIsExpanded(!isExpanded)}
      >
        {structure.type === 'directory' ? (
          <>
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            )}
            <FolderIcon className={cn("w-4 h-4", getStatusColor(structure.status))} />
          </>
        ) : (
          <>
            <span className="w-4" />
            <FileIcon className={cn("w-4 h-4", getStatusColor(structure.status))} />
          </>
        )}
        <span className={cn("text-sm", getStatusColor(structure.status))}>
          {structure.name}
        </span>
      </div>
      
      {structure.type === 'directory' && isExpanded && structure.children && (
        <div className="ml-2">
          {structure.children.map((child, index) => (
            <DirectoryTree
              key={`${child.name}-${index}`}
              structure={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectoryTree;