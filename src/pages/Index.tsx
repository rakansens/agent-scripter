import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            AIエージェントによる自動生成
          </h1>
          <p className="text-gray-600">
            各エージェントが連携して、ユーザーの要求に応じたコンテンツを生成します。
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;