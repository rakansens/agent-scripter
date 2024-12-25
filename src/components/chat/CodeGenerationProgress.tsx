import { Progress } from "@/components/ui/progress";

interface CodeGenerationProgressProps {
  progress: number;
  status: string;
  tech?: string[];
}

const CodeGenerationProgress = ({ progress, status, tech = [] }: CodeGenerationProgressProps) => {
  return (
    <div className="w-full space-y-2 p-4 bg-gray-800 rounded-lg">
      <div className="flex justify-between text-sm text-gray-300">
        <span>Generating code...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-gray-400">{status}</p>
      {tech.length > 0 && (
        <div className="flex gap-2 mt-2">
          {tech.map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeGenerationProgress;