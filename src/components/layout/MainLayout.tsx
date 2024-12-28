import React from 'react';
import { Card } from '@/components/ui/card';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Lovable AI Project
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white shadow-sm mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-600">
            Powered by Lovable AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;