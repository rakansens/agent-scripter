import { ComponentStructure } from '../types';

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
    <header className="bg-white shadow dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI-Powered Project
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
          Powered by Gemini API
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