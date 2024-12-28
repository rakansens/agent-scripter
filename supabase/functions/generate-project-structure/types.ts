export interface ProjectStructure {
  name: string;
  description: string;
  components: ComponentStructure[];
  dependencies: string[];
}

export interface ComponentStructure {
  name: string;
  type: "component" | "directory";
  path: string;
  description: string;
  children?: ComponentStructure[];
  code?: string;
  language?: string;
}