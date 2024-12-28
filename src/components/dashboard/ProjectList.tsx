import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

const projects = [
  {
    id: 1,
    name: 'プロジェクトA',
    description: 'AIを活用した新機能の開発',
    progress: 75,
    status: '進行中',
    members: 5,
  },
  {
    id: 2,
    name: 'プロジェクトB',
    description: 'ダッシュボードUI改善',
    progress: 45,
    status: '計画中',
    members: 3,
  },
  // ... 他のプロジェクト
];

const ProjectList = () => {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
              <Badge>{project.status}</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>進捗</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              メンバー: {project.members}人
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProjectList;