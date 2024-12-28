import { ComponentStructure } from './types.ts';

export const generateLayoutComponents = (): ComponentStructure[] => {
  return [
    {
      name: "Layout.tsx",
      type: "component",
      path: "/src/components/layout/Layout.tsx",
      description: "Main layout component",
      code: `
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
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
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        variant === 'primary' 
          ? 'bg-purple-600 text-white hover:bg-purple-700' 
          : 'bg-white text-purple-600 border border-purple-600 hover:bg-purple-50',
        size === 'sm' ? 'px-3 py-1.5 text-sm' :
        size === 'lg' ? 'px-6 py-3 text-lg' :
        'px-4 py-2 text-base',
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
    }
  ];
};