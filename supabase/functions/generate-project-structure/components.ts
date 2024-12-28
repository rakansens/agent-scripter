import { ComponentStructure } from './types.ts';

export const generateLandingPageComponents = (prompt: string): ComponentStructure[] => {
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
            <span className="block text-primary">Our Landing Page</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Generated landing page description based on your needs.
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
import { Rocket, Shield, Zap } from 'lucide-react';

const features = [
  {
    name: 'Fast Performance',
    description: 'Lightning fast loading times and smooth interactions.',
    icon: Zap
  },
  {
    name: 'Secure by Default',
    description: 'Built-in security features to protect your data.',
    icon: Shield
  },
  {
    name: 'Easy Deployment',
    description: 'Deploy with a single click to your favorite platform.',
    icon: Rocket
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
            Everything you need to build amazing products.
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
    },
    {
      name: "CTA.tsx",
      type: "component",
      path: "/src/components/sections/CTA.tsx",
      description: "Call to action section component",
      code: `
import React from 'react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="bg-primary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-primary-foreground">Start your free trial today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button variant="secondary" size="lg">
              Get started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;`,
      language: "typescript"
    }
  ];
};

export const generateLayoutComponents = (): ComponentStructure[] => {
  return [
    {
      name: "Header.tsx",
      type: "component",
      path: "/src/components/layout/Header.tsx",
      description: "Main header component",
      code: `
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Generated Project
        </h1>
      </div>
    </header>
  );
};

export default Header;`,
      language: "typescript"
    },
    {
      name: "Footer.tsx",
      type: "component",
      path: "/src/components/layout/Footer.tsx",
      description: "Main footer component",
      code: `
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-300">
          Generated with Lovable
        </p>
      </div>
    </footer>
  );
};

export default Footer;`,
      language: "typescript"
    },
    {
      name: "Layout.tsx",
      type: "component",
      path: "/src/components/layout/Layout.tsx",
      description: "Main layout wrapper",
      code: `
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;`,
      language: "typescript"
    }
  ];
};

export const generateUIComponents = (): ComponentStructure[] => {
  return [
    {
      name: "Button.tsx",
      type: "component",
      path: "/src/components/ui/Button.tsx",
      description: "Custom button component",
      code: `
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;`,
      language: "typescript"
    },
    {
      name: "Card.tsx",
      type: "component",
      path: "/src/components/ui/Card.tsx",
      description: "Card component",
      code: `
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-lg shadow-md p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;`,
      language: "typescript"
    }
  ];
};