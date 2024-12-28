import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1月', value: 400 },
  { name: '2月', value: 300 },
  { name: '3月', value: 600 },
  { name: '4月', value: 800 },
  { name: '5月', value: 500 },
];

const StatisticsPanel = () => {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">統計情報</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-sm text-gray-500">総プロジェクト数</p>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">アクティブユーザー</p>
          <p className="text-2xl font-bold">156</p>
        </div>
      </div>
    </Card>
  );
};

export default StatisticsPanel;