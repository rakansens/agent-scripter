import { Progress } from "@/components/ui/progress";

interface CodeGenerationProgressProps {
  progress: number;
  status: string;
}

const CodeGenerationProgress = ({ progress, status }: CodeGenerationProgressProps) => {
  return (
    <div className="w-full space-y-2 p-4 bg-gray-800 rounded-lg">
      <div className="flex justify-between text-sm text-gray-300">
        <span>Generating code...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-gray-400">{status}</p>
    </div>
  );
};

export default CodeGenerationProgress;