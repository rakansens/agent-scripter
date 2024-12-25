export type AgentRole = 
  | "architect" 
  | "component-generator" 
  | "styling" 
  | "testing";

export interface Agent {
  role: AgentRole;
  name: string;
  description: string;
  capabilities: string[];
}

export interface ProjectStructure {
  name: string;
  description: string;
  components: ComponentStructure[];
  dependencies: string[];
}

export interface ComponentStructure {
  name: string;
  type: "component" | "hook" | "utility";
  path: string;
  description: string;
  dependencies?: string[];
  children?: ComponentStructure[];
}

export interface GenerationStep {
  id: string;
  agentRole: AgentRole;
  status: "pending" | "in-progress" | "completed" | "error";
  message: string;
  timestamp: Date;
}