import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { WmsBuilder } from '../features/wms/components/WmsBuilder';
import { Button } from '../ui/Button';
const WmsBuilderPage = () => {
  const {
    projectId,
    wmsId
  } = useParams<{
    projectId: string;
    wmsId: string;
  }>();
  // In a real app, we would fetch the WMS data
  const wmsTitle = 'Wind Turbine Installation Procedure';
  return <div className="min-h-screen bg-muted/20">
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to={`/projects/${projectId}`} className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={18} />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Work Method Statement</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link to={`/projects/${projectId}/wms/${wmsId}/pdf`}>
              <Button variant="outline">
                <FileText size={16} className="mr-2" />
                Export PDF
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <WmsBuilder wmsId={wmsId || ''} wmsTitle={wmsTitle} />
      </main>
    </div>;
};
export default WmsBuilderPage;