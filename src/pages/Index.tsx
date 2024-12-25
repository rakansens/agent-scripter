import { useState } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import { Message } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import CodeGenerationProgress from "@/components/chat/CodeGenerationProgress";
import GeneratedArtifacts from "@/components/chat/GeneratedArtifacts";
import { useToast } from "@/components/ui/use-toast";
import FileExplorer, { FileNode } from "@/components/file-explorer/FileExplorer";
import YAMLViewer from "@/components/file-explorer/YAMLViewer";

interface Artifact {
  name: string;
  type: 'file' | 'component';
  content: string;
}

interface GenerationStep {
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  message?: string;
}

const TECH_STACK = ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStreamedMessage, setCurrentStreamedMessage] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState("");
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [projectStructure, setProjectStructure] = useState<FileNode | null>(null);
  const { toast } = useToast();

  const updateGenerationStep = (stepName: string, status: GenerationStep['status'], message?: string) => {
    setGenerationSteps(prev => {
      const stepIndex = prev.findIndex(step => step.name === stepName);
      if (stepIndex === -1) {
        return [...prev, { name: stepName, status, message }];
      }
      const newSteps = [...prev];
      newSteps[stepIndex] = { ...newSteps[stepIndex], status, message };
      return newSteps;
    });
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
    setGenerationStatus("Initializing...");
    setGenerationSteps([
      { name: 'Analyzing request', status: 'processing' },
      { name: 'Generating YAML structure', status: 'pending' },
      { name: 'Setting up environment', status: 'pending' },
      { name: 'Generating code', status: 'pending' },
      { name: 'Optimizing and formatting', status: 'pending' }
    ]);

    try {
      updateGenerationStep('Analyzing request', 'completed');
      updateGenerationStep('Setting up environment', 'processing');
      
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      updateGenerationStep('Setting up environment', 'completed');
      updateGenerationStep('Generating code', 'processing');

      const response = await supabase.functions.invoke('chat-with-gemini', {
        body: {
          messages: [...messages, newMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        },
      });

      clearInterval(progressInterval);
      
      if (!response.data) throw new Error('No response data');

      updateGenerationStep('Generating code', 'completed');
      updateGenerationStep('Optimizing and formatting', 'processing');

      const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
      let match;
      const newArtifacts: Artifact[] = [];
      
      while ((match = codeBlockRegex.exec(response.data)) !== null) {
        const fileName = match[1]?.includes('file=') 
          ? match[1].split('file=')[1]
          : `Generated_${Date.now()}.tsx`;
        
        newArtifacts.push({
          name: fileName,
          type: fileName.includes('Component') ? 'component' : 'file',
          content: match[2].trim()
        });
      }

      setArtifacts(prev => [...prev, ...newArtifacts]);
      updateGenerationStep('Optimizing and formatting', 'completed');

      // Convert artifacts to FileNode structure
      const rootNode: FileNode = {
        name: 'root',
        type: 'directory',
        children: newArtifacts.map(artifact => ({
          name: artifact.name,
          type: 'file',
          content: artifact.content,
          language: artifact.name.split('.').pop() || 'typescript'
        }))
      };
      setProjectStructure(rootNode);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setGenerationProgress(100);
      setGenerationStatus("Generation completed successfully!");

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "申し訳ありません。エラーが発生しました。",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setGenerationSteps(prev => 
        prev.map(step => 
          step.status === 'processing' 
            ? { ...step, status: 'error' }
            : step
        )
      );
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "コード生成中にエラーが発生しました。もう一度お試しください。",
      });
    } finally {
      setIsTyping(false);
      setCurrentStreamedMessage("");
    }
  };

  const handleArtifactSelect = (artifact: Artifact) => {
    console.log('Selected artifact:', artifact);
  };

  const handleArtifactEdit = (artifact: Artifact, newContent: string) => {
    setArtifacts(prev => 
      prev.map(a => 
        a.name === artifact.name 
          ? { ...a, content: newContent }
          : a
      )
    );
    toast({
      title: "変更を保存しました",
      description: `${artifact.name} の変更が保存されました。`,
    });
  };

  const handleArtifactDelete = (artifact: Artifact) => {
    setArtifacts(prev => prev.filter(a => a.name !== artifact.name));
    toast({
      title: "アーティファクトを削除しました",
      description: `${artifact.name} を削除しました。`,
    });
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 flex">
        <div className="w-64 p-4 border-r border-gray-700">
          {projectStructure && (
            <FileExplorer
              structure={projectStructure}
              onFileSelect={(file) => {
                if (file.content) {
                  const artifact: Artifact = {
                    name: file.name,
                    type: 'file',
                    content: file.content
                  };
                  handleArtifactSelect(artifact);
                }
              }}
            />
          )}
          <div className="mt-4">
            <GeneratedArtifacts 
              artifacts={artifacts}
              onSelect={handleArtifactSelect}
              onEdit={handleArtifactEdit}
              onDelete={handleArtifactDelete}
            />
          </div>
        </div>
        <div className="flex-1">
          <ChatContainer
            messages={messages}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            streamedMessage={currentStreamedMessage}
          />
        </div>
      </div>
      {generationProgress > 0 && (
        <div className="fixed bottom-4 right-4 w-80">
          <CodeGenerationProgress
            progress={generationProgress}
            status={generationStatus}
            tech={TECH_STACK}
            steps={generationSteps}
          />
        </div>
      )}
    </div>
  );
};

export default Index;