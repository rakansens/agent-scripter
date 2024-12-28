import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Tablet, Smartphone } from 'lucide-react';

interface PreviewContainerProps {
  children: React.ReactNode;
}

const PreviewContainer = ({ children }: PreviewContainerProps) => {
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const viewportClasses = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <Tabs defaultValue="desktop" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Preview</h2>
          <TabsList>
            <TabsTrigger value="desktop">
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="tablet">
              <Tablet className="w-4 h-4 mr-2" />
              Tablet
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <TabsContent value="desktop" className="m-0">
            <div className="w-full overflow-auto">
              {children}
            </div>
          </TabsContent>
          <TabsContent value="tablet" className="m-0">
            <div className="w-[768px] mx-auto overflow-auto">
              {children}
            </div>
          </TabsContent>
          <TabsContent value="mobile" className="m-0">
            <div className="w-[375px] mx-auto overflow-auto">
              {children}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PreviewContainer;