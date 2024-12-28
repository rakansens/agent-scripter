import { ComponentStructure } from '../types.ts';

export const generateLandingPageComponents = (): ComponentStructure[] => {
  return [
    {
      name: "Hero.tsx",
      type: "component",
      path: "/src/components/sections/Hero.tsx",
      description: "Hero section component",
      code: `
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-primary">Our Project</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Built with Gemini API and modern web technologies.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;`,
      language: "typescript"
    },
    {
      name: "Features.tsx",
      type: "component",
      path: "/src/components/sections/Features.tsx",
      description: "Features section component",
      code: `
import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Sparkles, Zap } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered',
    description: 'Leveraging the power of Gemini API for intelligent interactions.',
    icon: Brain
  },
  {
    name: 'Real-time Processing',
    description: 'Fast and efficient processing of your requests.',
    icon: Zap
  },
  {
    name: 'Smart Features',
    description: 'Advanced capabilities powered by modern AI technology.',
    icon: Sparkles
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Features
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Powered by advanced AI technology.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.name} className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;`,
      language: "typescript"
    }
  ];
};