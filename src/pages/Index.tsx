import { useState } from "react";
import { Agent, ProjectStructure, GenerationStep } from "@/lib/types/agent";
import { Message } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import AgentSystem from "@/components/agents/AgentSystem";
import ChatContainer from "@/components/chat/ChatContainer";
import { supabase } from "@/integrations/supabase/client";
import GeneratedArtifacts from "@/components/chat/GeneratedArtifacts";
import { Card } from "@/components/ui/card";
import CodePreview from "@/components/chat/CodePreview";
import CodeGenerationProgress from "@/components/chat/CodeGenerationProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [generatedFiles, setGeneratedFiles] = useState<Array<{ name: string; type: 'file' | 'component'; content: string; }>>([]);
  const [selectedFile, setSelectedFile] = useState<{ name: string; type: string; content: string; } | null>(null);
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
    setSelectedFile(null);
    
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

      setProjectStructure(response.data.structure);
      setGenerationProgress(25);
      
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

      setGenerationProgress(50);
      
      // Update generated files with real-time progress
      if (componentResponse.data.components) {
        const newFiles = componentResponse.data.components.map((comp: any) => ({
          name: comp.path.split('/').pop() || '',
          type: 'component',
          content: comp.content,
        }));
        
        setGeneratedFiles(newFiles);
        if (newFiles.length > 0) {
          setSelectedFile(newFiles[0]);
        }
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

  const handleFileSelect = (file: { name: string; type: string; content: string }) => {
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AgentSystem
              agents={INITIAL_AGENTS}
              currentStructure={projectStructure || undefined}
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
            
            <Card className="p-4">
              <Tabs defaultValue="files" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="files" className="flex-1">ファイル一覧</TabsTrigger>
                  <TabsTrigger value="preview" className="flex-1">プレビュー</TabsTrigger>
                </TabsList>
                <TabsContent value="files">
                  <ScrollArea className="h-[400px]">
                    <GeneratedArtifacts
                      artifacts={generatedFiles}
                      onSelect={handleFileSelect}
                    />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="preview">
                  <ScrollArea className="h-[400px]">
                    {selectedFile ? (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">{selectedFile.name}</h3>
                        <CodePreview code={selectedFile.content} />
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        ファイルを選択してください
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
