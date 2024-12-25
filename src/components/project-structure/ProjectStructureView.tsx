import React from 'react';
import { ProjectStructure, ComponentStructure } from '@/lib/types/agent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, FileCode, ChevronRight, ChevronDown } from 'lucide-react';

interface ProjectStructureViewProps {
  structure: ProjectStructure;
  onSelect?: (path: string) => void;
}

const ProjectStructureView: React.FC<ProjectStructureViewProps> = ({
  structure,
  onSelect
}) => {
  const [expandedPaths, setExpandedPaths] = React.useState<Set<string>>(new Set());

  const togglePath = (path: string) => {
    const newPaths = new Set(expandedPaths);
    if (newPaths.has(path)) {
      newPaths.delete(path);
    } else {
      newPaths.add(path);
    }
    setExpandedPaths(newPaths);
  };

  const renderComponent = (component: ComponentStructure, path: string = '') => {
    const currentPath = `${path}/${component.name}`;
    const isExpanded = expandedPaths.has(currentPath);
    const hasChildren = component.children && component.children.length > 0;

    return (
      <div key={currentPath} className="group">
        <button
          onClick={() => hasChildren ? togglePath(currentPath) : onSelect?.(currentPath)}
          className="flex items-center w-full px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm group"
        >
          <span className="mr-1.5 text-gray-500">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            ) : (
              <FileCode className="w-4 h-4 text-blue-500" />
            )}
          </span>
          <span className="flex-1 text-left truncate">{component.name}</span>
        </button>
        {isExpanded && hasChildren && (
          <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
            {component.children?.map(child => renderComponent(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Folder className="w-5 h-5 text-blue-500" />
          {structure.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {structure.components.map(component => renderComponent(component))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStructureView;