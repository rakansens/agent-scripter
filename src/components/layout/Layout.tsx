import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 h-14 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 z-50 backdrop-blur-sm">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Lovable AI Editor
            </h1>
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
              Beta
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {/* ここに必要なヘッダーアクションを追加 */}
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
