import { ComponentStructure } from './types.ts';

export const generateLayoutComponents = (): ComponentStructure[] => {
  return [
    {
      name: "Header.tsx",
      type: "component",
      path: "/src/components/layout/Header.tsx",
      description: "Main header component",
      code: `
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            Beauty Salon
          </h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 hover:text-gray-900">サービス</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">私たちについて</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">お問い合わせ</a>
          </nav>
          <Button>予約する</Button>
        </div>
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Beauty Salon</h3>
            <p className="text-gray-400">
              最高品質のヘアケアサービスを提供します
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">営業時間</h3>
            <p className="text-gray-400">
              火-日: 10:00 - 20:00<br />
              月曜定休
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
            <p className="text-gray-400">
              電話: 03-1234-5678<br />
              メール: info@beautysalon.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 Beauty Salon. All rights reserved.</p>
        </div>
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
        'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow',
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