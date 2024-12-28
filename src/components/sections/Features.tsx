import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Sparkles, Zap } from 'lucide-react';

const features = [
  {
    name: 'AIパワード',
    description: 'Gemini APIを活用したインテリジェントな対話を実現',
    icon: Brain
  },
  {
    name: 'リアルタイム処理',
    description: '高速かつ効率的なリクエスト処理',
    icon: Zap
  },
  {
    name: 'スマート機能',
    description: '最新のAI技術による高度な機能',
    icon: Sparkles
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            主な機能
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            最新のAI技術を活用した機能を提供
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

export default Features;