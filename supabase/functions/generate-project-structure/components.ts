import { ComponentStructure } from './types';
import { generateLayoutComponents } from './templates/layout';
import { generateUIComponents } from './templates/ui';
import { generateLandingPageComponents } from './templates/landing';

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