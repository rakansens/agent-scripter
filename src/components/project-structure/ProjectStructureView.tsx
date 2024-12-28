import React, { useState } from 'react';
import { ProjectStructure, ComponentStructure } from '@/lib/types/agent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, FileCode, ChevronRight, ChevronDown } from 'lucide-react';
import CodeBlock from '../chat/CodeBlock';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { FileNode } from '@/components/file-explorer/FileExplorer';

interface ProjectStructureViewProps {
  structure: ProjectStructure;
  onSelect?: (file: FileNode) => void;
}

const ProjectStructureView: React.FC<ProjectStructureViewProps> = ({
  structure,
  onSelect
}) => {
  const [expandedPaths, setExpandedPaths] = React.useState<Set<string>>(new Set());
  const [selectedComponent, setSelectedComponent] = useState<ComponentStructure | null>(null);
  const { toast } = useToast();

  const togglePath = (path: string) => {
    const newPaths = new Set(expandedPaths);
    if (newPaths.has(path)) {
      newPaths.delete(path);
    } else {
      newPaths.add(path);
    }
    setExpandedPaths(newPaths);
  };

  const handleComponentSelect = (component: ComponentStructure) => {
    console.log('Selected component:', component);
    setSelectedComponent(component);
    
    // FileNodeオブジェクトを作成して渡す
    const fileNode: FileNode = {
      name: component.name,
      type: 'file',
      content: component.code || '',
      language: component.language || 'typescript'
    };
    
    onSelect?.(fileNode);

    if (!component.code) {
      toast({
        title: "コードが見つかりません",
        description: "このファイルにはまだコードが生成されていません。",
        variant: "destructive"
      });
    }
  };

  const renderComponent = (component: ComponentStructure, path: string = '') => {
    const currentPath = `${path}/${component.name}`;
    const isExpanded = expandedPaths.has(currentPath);
    const hasChildren = component.children && component.children.length > 0;
    const isSelected = selectedComponent?.name === component.name;

    return (
      <div key={currentPath} className="group">
        <button
          onClick={() => hasChildren ? togglePath(currentPath) : handleComponentSelect(component)}
          className={`flex items-center w-full px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm group ${
            isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`}
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
        {selectedComponent && selectedComponent.code && (
          <div className="mt-4 border-t pt-4 dark:border-gray-700">
            <h3 className="text-sm font-medium mb-2">{selectedComponent.name}</h3>
            <ScrollArea className="h-[300px]">
              <CodeBlock 
                code={selectedComponent.code} 
                language={selectedComponent.language || 'typescript'} 
              />
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectStructureView;