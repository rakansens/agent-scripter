import { useState } from 'react';
import { Message } from '@/lib/types';
import { GenerationStep } from '@/lib/types/agent';
import { TreeNode } from '@/components/file-explorer/DirectoryTree';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { INITIAL_AGENTS } from '@/lib/constants/agents';

export const useCodeGeneration = () => {
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [directoryStructure, setDirectoryStructure] = useState<TreeNode | null>(null);
  const { toast } = useToast();

  const updateDirectoryStructure = (structure: any) => {
    const convertToTreeNode = (node: any): TreeNode => ({
      name: node.name,
      type: node.type === 'directory' ? 'directory' : 'file',
      status: 'creating',
      children: node.children?.map(convertToTreeNode)
    });

    setDirectoryStructure(convertToTreeNode(structure));
  };

  const generateCode = async (content: string) => {
    setGenerationProgress(0);
    setDirectoryStructure(null);

    try {
      const initialSteps: GenerationStep[] = INITIAL_AGENTS.map((agent, index) => ({
        id: String(index + 1),
        name: agent.name,
        agentRole: agent.role,
        status: index === 0 ? "in-progress" : "pending",
        message: index === 0 ? "処理を開始しています..." : "待機中",
        timestamp: new Date(),
      }));
      
      setGenerationSteps(initialSteps);

      const response = await supabase.functions.invoke("generate-project-structure", {
        body: { prompt: content },
      });

      if (!response.data) throw new Error("No response data");
      
      console.log('Generated project structure:', response.data.structure);
      updateDirectoryStructure(response.data.structure);
      setGenerationProgress(25);

      let progress = 25;
      for (let i = 1; i < initialSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        progress += Math.floor(75 / (initialSteps.length - 1));
        setGenerationProgress(progress);
        
        const updatedSteps = initialSteps.map((step, index) => ({
          ...step,
          status: index < i ? "completed" : 
                 index === i ? "in-progress" : 
                 "pending",
          message: index < i ? "完了" : index === i ? "処理中..." : "待機中",
        }));
        setGenerationSteps(updatedSteps);

        if (directoryStructure) {
          const updateNodeStatus = (node: TreeNode): TreeNode => ({
            ...node,
            status: 'completed',
            children: node.children?.map(updateNodeStatus)
          });
          setDirectoryStructure(updateNodeStatus(directoryStructure));
        }
      }

      setGenerationProgress(100);
      toast({
        title: "生成完了",
        description: "ランディングページの生成が完了しました。",
      });

      return {
        structure: response.data.structure,
        steps: initialSteps,
      };
    } catch (error) {
      console.error("Error in code generation:", error);
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "プロジェクト生成中にエラーが発生しました。",
      });
      throw error;
    }
  };

  return {
    generationProgress,
    generationSteps,
    directoryStructure,
    generateCode,
  };
};