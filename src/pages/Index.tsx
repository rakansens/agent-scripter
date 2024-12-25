import { useState } from "react";
import { Agent, ProjectStructure, GenerationStep } from "@/lib/types/agent";
import { Message } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import AgentSystem from "@/components/agents/AgentSystem";
import ChatContainer from "@/components/chat/ChatContainer";
import { supabase } from "@/integrations/supabase/client";

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
    
    setGenerationSteps([
      {
        id: "1",
        agentRole: "architect",
        status: "in-progress",
        message: "Analyzing requirements and designing project structure",
        timestamp: new Date(),
      },
      {
        id: "2",
        agentRole: "component-generator",
        status: "pending",
        message: "Waiting to generate components",
        timestamp: new Date(),
      },
      {
        id: "3",
        agentRole: "styling",
        status: "pending",
        message: "Waiting to apply styling",
        timestamp: new Date(),
      },
      {
        id: "4",
        agentRole: "testing",
        status: "pending",
        message: "Waiting to generate tests",
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await supabase.functions.invoke("generate-project-structure", {
        body: { prompt: content },
      });

      if (!response.data) throw new Error("No response data");

      setProjectStructure(response.data.structure);
      
      setGenerationSteps((prev) =>
        prev.map((step) =>
          step.agentRole === "architect"
            ? { ...step, status: "completed", message: "Project structure generated" }
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

      setGenerationProgress(100);
      setGenerationSteps((prev) =>
        prev.map((step) => ({ ...step, status: "completed" }))
      );

      toast({
        title: "Generation completed",
        description: "All components have been generated successfully.",
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
            ? { ...step, status: "error", message: "Generation failed" }
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
        <AgentSystem
          agents={INITIAL_AGENTS}
          currentStructure={projectStructure || undefined}
          steps={generationSteps}
          progress={generationProgress}
        />
        <ChatContainer
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          streamedMessage={currentStreamedMessage}
        />
      </div>
    </div>
  );
};

export default Index;