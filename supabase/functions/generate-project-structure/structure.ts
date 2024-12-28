import { ProjectStructure } from './types';
import { generateComponents } from './components';

export const generateProjectStructure = (prompt: string): ProjectStructure => {
  return {
    name: "AI-Powered Project",
    description: prompt,
    components: generateComponents(prompt),
    dependencies: [
      "react",
      "react-dom",
      "typescript",
      "tailwindcss",
      "@google/generative-ai",
      "lucide-react",
      "clsx",
      "class-variance-authority"
    ]
  };
};