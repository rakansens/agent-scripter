import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatisticsPanel from './StatisticsPanel';
import ActivityFeed from './ActivityFeed';
import ProjectList from './ProjectList';

const DashboardLayout = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatisticsPanel />
        <Card className="md:col-span-2 p-6">
          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">アクティビティ</TabsTrigger>
              <TabsTrigger value="projects">プロジェクト</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <ActivityFeed />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectList />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLayout;