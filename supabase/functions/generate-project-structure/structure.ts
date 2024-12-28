import { ProjectStructure } from './types.ts';
import { generateLayoutComponents, generateUIComponents, generateLandingPageComponents } from './components.ts';

export const generateProjectStructure = (prompt: string): ProjectStructure => {
  return {
    name: "Generated React Project",
    description: prompt,
    components: [
      {
        name: "src",
        type: "directory",
        path: "/src",
        description: "Source code directory",
        children: [
          {
            name: "components",
            type: "directory",
            path: "/src/components",
            description: "Reusable components",
            children: [
              {
                name: "layout",
                type: "directory",
                path: "/src/components/layout",
                description: "Layout components",
                children: generateLayoutComponents()
              },
              {
                name: "ui",
                type: "directory",
                path: "/src/components/ui",
                description: "UI components",
                children: generateUIComponents()
              },
              {
                name: "sections",
                type: "directory",
                path: "/src/components/sections",
                description: "Landing page sections",
                children: generateLandingPageComponents(prompt)
              }
            ]
          }
        ]
      }
    ],
    dependencies: [
      "react",
      "react-dom",
      "react-router-dom",
      "typescript",
      "tailwindcss",
      "@tanstack/react-query",
      "lucide-react",
      "clsx",
      "class-variance-authority"
    ]
  };
};