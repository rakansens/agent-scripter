import { ProjectStructure } from './types.ts';
import { generateLayoutComponents, generateUIComponents } from './components.ts';

export const generateProjectStructure = (prompt: string): ProjectStructure => {
  console.log('Generating structure for prompt:', prompt);
  
  const structure: ProjectStructure = {
    name: "Beauty Salon Landing Page",
    description: prompt,
    components: [
      {
        name: "src",
        type: "directory",
        path: "/src",
        description: "Source code directory",
        children: [
          {
            name: "pages",
            type: "directory",
            path: "/src/pages",
            description: "Page components",
            children: [
              {
                name: "Home.tsx",
                type: "component",
                path: "/src/pages/Home.tsx",
                description: "Home page component",
                code: `
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <About />
      <Contact />
    </Layout>
  );
};

export default Home;`,
                language: "typescript"
              }
            ]
          }
        ]
      }
    ],
    dependencies: [
      "react",
      "react-dom",
      "typescript",
      "tailwindcss"
    ]
  };

  // コンポーネントの追加
  if (structure.components[0]?.children) {
    structure.components[0].children.push({
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
        }
      ]
    });
  }

  console.log('Generated structure:', JSON.stringify(structure, null, 2));
  return structure;
};