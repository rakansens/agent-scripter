import { useState } from 'react';
import { FileIcon, FolderIcon, ComponentIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Artifact {
  name: string;
  type: 'file' | 'component';
  content: string;
}

interface GeneratedArtifactsProps {
  artifacts: Artifact[];
  onSelect: (artifact: Artifact) => void;
}

const GeneratedArtifacts = ({ artifacts, onSelect }: GeneratedArtifactsProps) => {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const handleArtifactClick = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    onSelect(artifact);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <FolderIcon className="w-5 h-5" />
        Generated Artifacts
      </h3>
      <div className="space-y-2">
        {artifacts.map((artifact, index) => (
          <button
            key={index}
            onClick={() => handleArtifactClick(artifact)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
              "hover:bg-gray-700",
              selectedArtifact?.name === artifact.name ? "bg-gray-700" : "bg-gray-800"
            )}
          >
            {artifact.type === 'file' ? (
              <FileIcon className="w-4 h-4 text-blue-400" />
            ) : (
              <ComponentIcon className="w-4 h-4 text-green-400" />
            )}
            <span className="text-sm text-white">{artifact.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GeneratedArtifacts;