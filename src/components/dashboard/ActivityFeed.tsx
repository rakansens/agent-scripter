import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Clock, GitCommit, MessageSquare } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Tanaka',
    action: 'コメントを追加',
    target: 'プロジェクトA',
    time: '5分前',
    icon: MessageSquare,
  },
  {
    id: 2,
    user: 'Yamada',
    action: 'コミットを作成',
    target: 'feature/new-dashboard',
    time: '15分前',
    icon: GitCommit,
  },
  // ... 他のアクティビティ
];

const ActivityFeed = () => {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-2">
            <Avatar>
              <activity.icon className="h-5 w-5" />
            </Avatar>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>
                が{activity.target}に{activity.action}しました
              </p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ActivityFeed;