import { useState } from 'react';
import { FileIcon, ComponentIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CodeEditor from './CodeEditor';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Artifact {
  name: string;
  type: 'file' | 'component';
  content: string;
}

interface GeneratedArtifactsProps {
  artifacts: Artifact[];
  onSelect: (artifact: Artifact) => void;
  onEdit?: (artifact: Artifact, newContent: string) => void;
  onDelete?: (artifact: Artifact) => void;
}

const GeneratedArtifacts = ({ 
  artifacts, 
  onSelect, 
  onEdit,
  onDelete 
}: GeneratedArtifactsProps) => {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState('');

  const handleArtifactClick = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    onSelect(artifact);
  };

  const handleEdit = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    setEditingContent(artifact.content);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedArtifact && onEdit) {
      onEdit(selectedArtifact, editingContent);
    }
    setIsEditDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-1 p-2">
            {artifacts.map((artifact, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer",
                  "hover:bg-gray-700/50",
                  selectedArtifact?.name === artifact.name ? "bg-gray-700/50" : "bg-transparent"
                )}
                onClick={() => handleArtifactClick(artifact)}
              >
                <div className="flex items-center gap-2 flex-1">
                  {artifact.type === 'file' ? (
                    <FileIcon className="w-4 h-4 text-blue-400" />
                  ) : (
                    <ComponentIcon className="w-4 h-4 text-green-400" />
                  )}
                  <span className="text-sm text-gray-200">{artifact.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(artifact);
                    }}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(artifact);
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {selectedArtifact && (
        <div className="border-t border-gray-700 mt-4 pt-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-200 mb-2">{selectedArtifact.name}</h4>
            <CodeEditor
              code={selectedArtifact.content}
              language={selectedArtifact.name.split('.').pop() || 'typescript'}
              readOnly
            />
          </div>
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit {selectedArtifact?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <CodeEditor
              code={editingContent}
              language={selectedArtifact?.name.split('.').pop() || 'typescript'}
              onChange={setEditingContent}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GeneratedArtifacts;