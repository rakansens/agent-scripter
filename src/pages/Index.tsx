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
import { FileViewer } from "@/components/file-viewer/FileViewer";
import PreviewContainer from "@/components/preview/PreviewContainer";
import GeneratedLandingPage from "@/components/preview/GeneratedLandingPage";
import { AGENT_PROMPTS, AgentRole } from "@/components/agents/AgentPrompts";

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
  {
    role: "content",
    name: "Content Agent",
    description: "Generates and optimizes content",
    capabilities: ["SEO optimization", "Content strategy", "Multilingual support"],
  },
  {
    role: "performance",
    name: "Performance Agent",
    description: "Optimizes application performance",
    capabilities: ["Image optimization", "Code splitting", "Bundle optimization"],
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
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (path: string) => {
    console.log('Selected file:', path);
    setSelectedFile(path);
  };

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
    setShowPreview(false);
    
    // Initialize generation steps with all agents
    const initialSteps: GenerationStep[] = INITIAL_AGENTS.map((agent, index) => ({
      id: String(index + 1),
      name: agent.name,
      agentRole: agent.role as AgentRole,
      status: index === 0 ? "in-progress" : "pending",
      message: index === 0 ? "処理を開始しています..." : "待機中",
      timestamp: new Date(),
    }));
    
    setGenerationSteps(initialSteps);

    try {
      const response = await supabase.functions.invoke("generate-project-structure", {
        body: { prompt: content },
      });

      if (!response.data) throw new Error("No response data");
      
      console.log('Generated project structure:', response.data.structure);
      setProjectStructure(response.data.structure);
      setGenerationProgress(25);
      setCurrentGeneratedCode(response.data.currentCode || "");
      
      // Update generation steps as each agent completes its task
      let progress = 25;
      for (let i = 1; i < initialSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate agent processing
        progress += Math.floor(75 / (initialSteps.length - 1));
        setGenerationProgress(progress);
        
        setGenerationSteps(prev => 
          prev.map((step, index) => ({
            ...step,
            status: index < i ? "completed" : index === i ? "in-progress" : "pending",
            message: index < i ? "完了" : index === i ? "処理中..." : "待機中",
          }))
        );
      }

      // Set all steps to completed
      setGenerationSteps(prev => 
        prev.map(step => ({
          ...step,
          status: "completed",
          message: "完了",
        }))
      );

      setGenerationProgress(100);
      setShowPreview(true);

      toast({
        title: "生成完了",
        description: "ランディングページの生成が完了しました。",
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
                    onSelect={handleFileSelect}
                  />
                </ScrollArea>
              </Card>
            )}

            {selectedFile && (
              <FileViewer filePath={selectedFile} />
            )}
          </div>
        </div>

        {showPreview && (
          <div className="mt-8">
            <PreviewContainer>
              <GeneratedLandingPage />
            </PreviewContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;