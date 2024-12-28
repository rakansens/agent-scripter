import { ComponentStructure } from '../types.ts';

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
        'bg-white rounded-lg shadow-md p-6 dark:bg-gray-800',
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