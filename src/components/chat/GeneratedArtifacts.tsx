import { useState } from 'react';
import { FileIcon, FolderIcon, ComponentIcon, PencilIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CodeEditor from './CodeEditor';

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
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <FolderIcon className="w-5 h-5" />
        Generated Artifacts
      </h3>
      <div className="space-y-2">
        {artifacts.map((artifact, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition-colors",
              "hover:bg-gray-700",
              selectedArtifact?.name === artifact.name ? "bg-gray-700" : "bg-gray-800"
            )}
          >
            <button
              onClick={() => handleArtifactClick(artifact)}
              className="flex items-center gap-2 flex-1"
            >
              {artifact.type === 'file' ? (
                <FileIcon className="w-4 h-4 text-blue-400" />
              ) : (
                <ComponentIcon className="w-4 h-4 text-green-400" />
              )}
              <span className="text-sm text-white">{artifact.name}</span>
            </button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleEdit(artifact)}
              >
                <PencilIcon className="w-4 h-4" />
              </Button>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-400 hover:text-red-300"
                  onClick={() => onDelete(artifact)}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

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