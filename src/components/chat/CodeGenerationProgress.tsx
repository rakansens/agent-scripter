import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { GenerationStep, GenerationStepStatus } from "@/lib/types/agent";

interface CodeGenerationProgressProps {
  progress: number;
  status: string;
  tech?: string[];
  steps?: GenerationStep[];
}

const mapStatus = (status: GenerationStep["status"]): GenerationStepStatus => {
  if (status === "in-progress") return "processing";
  return status;
};

const CodeGenerationProgress = ({ 
  progress, 
  status, 
  tech = [],
  steps = [] 
}: CodeGenerationProgressProps) => {
  return (
    <div className="w-full space-y-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex justify-between text-sm text-gray-300">
        <span>Generating code...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-gray-400">{status}</p>
      
      {steps.length > 0 && (
        <div className="space-y-2 mt-4">
          {steps.map((step, index) => {
            const mappedStatus = mapStatus(step.status);
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                {mappedStatus === "processing" && (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                )}
                {mappedStatus === "completed" && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
                {mappedStatus === "error" && (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                {mappedStatus === "pending" && (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                )}
                <span className="text-gray-300">{step.name}</span>
                {step.message && (
                  <span className="text-xs text-gray-400">- {step.message}</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeGenerationProgress;