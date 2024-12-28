import { ComponentStructure } from './types.ts';
import { generateLayoutComponents } from './templates/layout.ts';
import { generateUIComponents } from './templates/ui.ts';
import { generateLandingPageComponents } from './templates/landing.ts';

export const generateComponents = (prompt: string): ComponentStructure[] => {
  return [
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
              description: "Page sections",
              children: generateLandingPageComponents()
            }
          ]
        }
      ]
    }
  ];
};