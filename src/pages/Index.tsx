import MainLayout from '@/components/layout/MainLayout';
import ProjectStructureViewer from '@/components/project-structure/ProjectStructureViewer';

const Index = () => {
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <ProjectStructureViewer />
      </div>
    </MainLayout>
  );
};

export default Index;