import { useState } from "react";
import { Agent, ProjectStructure, GenerationStep } from "@/lib/types/agent";
import { Message } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import AgentSystem from "@/components/agents/AgentSystem";
import ChatContainer from "@/components/chat/ChatContainer";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import CodeGenerationProgress from "@/components/chat/CodeGenerationProgress";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectStructureView from "@/components/project-structure/ProjectStructureView";
import CodeGenerationVisualizer from "@/components/code-generation/CodeGenerationVisualizer";
import { FileNode } from "@/components/file-explorer/FileExplorer";

const INITIAL_AGENTS: Agent[] = [
  {
    role: "architect",
    name: "Architect Agent",
    description: "Designs the overall project structure and component hierarchy",
    capabilities: ["Project planning", "Directory structure", "Dependency management"],
  },
  {
    role: "component-generator",
    name: "Component Generator",
    description: "Generates React components and their implementations",
    capabilities: ["React", "TypeScript", "Component patterns"],
  },
  {
    role: "styling",
    name: "Styling Agent",
    description: "Handles component styling and visual design",
    capabilities: ["TailwindCSS", "Responsive design", "Accessibility"],
  },
  {
    role: "testing",
    name: "Testing Agent",
    description: "Creates test cases and ensures code quality",
    capabilities: ["Unit testing", "Integration testing", "Test coverage"],
  },
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStreamedMessage, setCurrentStreamedMessage] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [projectStructure, setProjectStructure] = useState<ProjectStructure | null>(null);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [currentGeneratedCode, setCurrentGeneratedCode] = useState<string>("");
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
    setCurrentStreamedMessage("");
    setGenerationProgress(0);
    setCurrentGeneratedCode("");
    
    setGenerationSteps([
      {
        id: "1",
        name: "プロジェクト構造の分析",
        agentRole: "architect",
        status: "in-progress",
        message: "要件を分析し、プロジェクト構造を設計中",
        timestamp: new Date(),
      },
      {
        id: "2",
        name: "コンポーネント生成",
        agentRole: "component-generator",
        status: "pending",
        message: "コンポーネント生成待機中",
        timestamp: new Date(),
      },
      {
        id: "3",
        name: "スタイリング",
        agentRole: "styling",
        status: "pending",
        message: "スタイリング待機中",
        timestamp: new Date(),
      },
      {
        id: "4",
        name: "テスト生成",
        agentRole: "testing",
        status: "pending",
        message: "テスト生成待機中",
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await supabase.functions.invoke("generate-project-structure", {
        body: { prompt: content },
      });

      if (!response.data) throw new Error("No response data");
      
      console.log('Generated project structure:', response.data.structure);
      setProjectStructure(response.data.structure);
      setGenerationProgress(25);
      setCurrentGeneratedCode(response.data.currentCode || "");
      
      setGenerationSteps((prev) =>
        prev.map((step) =>
          step.agentRole === "architect"
            ? { ...step, status: "completed", message: "プロジェクト構造の生成が完了しました" }
            : step.agentRole === "component-generator"
            ? { ...step, status: "in-progress", message: "コンポーネントを生成中..." }
            : step
        )
      );

      const componentResponse = await supabase.functions.invoke(
        "generate-components",
        {
          body: { structure: response.data.structure },
        }
      );

      if (!componentResponse.data) throw new Error("Component generation failed");
      console.log('Generated components:', componentResponse.data);

      // Update the project structure with generated code
      if (componentResponse.data.components) {
        const updatedStructure = {
          ...response.data.structure,
          components: response.data.structure.components.map((component: ComponentStructure) => {
            const generatedComponent = componentResponse.data.components.find(
              (gc: any) => gc.path === component.path
            );
            return generatedComponent
              ? { ...component, code: generatedComponent.content, language: 'typescript' }
              : component;
          }),
        };
        setProjectStructure(updatedStructure);
      }

      setGenerationProgress(100);
      setGenerationSteps((prev) =>
        prev.map((step) => ({ ...step, status: "completed" }))
      );

      toast({
        title: "生成完了",
        description: "全てのコンポーネントが正常に生成されました。",
      });

    } catch (error) {
      console.error("Error in project generation:", error);
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "プロジェクト生成中にエラーが発生しました。",
      });
      
      setGenerationSteps((prev) =>
        prev.map((step) =>
          step.status === "in-progress"
            ? { ...step, status: "error", message: "生成に失敗しました" }
            : step
        )
      );
    } finally {
      setIsTyping(false);
      setCurrentStreamedMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AgentSystem
              agents={INITIAL_AGENTS}
              steps={generationSteps}
              progress={generationProgress}
            />
            <div className="mt-8">
              <ChatContainer
                messages={messages}
                isTyping={isTyping}
                onSendMessage={handleSendMessage}
                streamedMessage={currentStreamedMessage}
              />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4">
              <CodeGenerationProgress
                progress={generationProgress}
                status={
                  generationProgress === 100
                    ? "生成完了"
                    : generationProgress > 0
                    ? "生成中..."
                    : "待機中"
                }
                steps={generationSteps}
                tech={["React", "TypeScript", "Tailwind CSS"]}
              />
            </Card>
            
            <CodeGenerationVisualizer 
              steps={generationSteps}
              currentCode={currentGeneratedCode}
            />

            {projectStructure && (
              <Card className="p-4">
                <ScrollArea className="h-[400px]">
                  <ProjectStructureView
                    structure={projectStructure}
                  />
                </ScrollArea>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;