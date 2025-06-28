import React, { useState } from 'react';
import { ArrowLeftIcon, ClipboardListIcon } from 'lucide-react';
import { sampleWorkMethods } from '../data/sampleData';
import OperationList from './OperationList';
import WorkMethodSummary from './WorkMethodSummary';
type WorkMethodDetailProps = {
  workMethodId: string;
  onBack: () => void;
};
const WorkMethodDetail = ({
  workMethodId,
  onBack
}: WorkMethodDetailProps) => {
  const [activeView, setActiveView] = useState<'operations' | 'summary'>('operations');
  const workMethod = sampleWorkMethods.find(wm => wm.id === workMethodId);
  if (!workMethod) {
    return <div>Work Method not found</div>;
  }
  return <div>
      <div className="flex items-center mb-6">
        <button className="mr-4 p-2 rounded-full hover:bg-gray-200" onClick={onBack}>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-headspace-purple">
          {workMethod.documentNumber} - {workMethod.title}
        </h2>
        <div className="ml-auto flex">
          <button className={`px-4 py-2 flex items-center ${activeView === 'operations' ? 'bg-headspace-orange text-white' : 'bg-gray-100 text-gray-700'} rounded-l-card`} onClick={() => setActiveView('operations')}>
            Operations
          </button>
          <button className={`px-4 py-2 flex items-center ${activeView === 'summary' ? 'bg-headspace-orange text-white' : 'bg-gray-100 text-gray-700'} rounded-r-card`} onClick={() => setActiveView('summary')}>
            <ClipboardListIcon className="w-4 h-4 mr-2" />
            Summary
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-card shadow-card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <span className="text-sm text-gray-500">Document Number</span>
            <p className="font-medium">{workMethod.documentNumber}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Revision</span>
            <p className="font-medium">{workMethod.revision}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Date</span>
            <p className="font-medium">{workMethod.date}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-sm text-gray-500">Location</span>
            <p className="font-medium">{workMethod.location}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Operation Types</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {workMethod.operationTypes.map(type => <span key={type} className="bg-headspace-purple px-3 py-1 rounded-full text-sm text-white">
                  {type}
                </span>)}
            </div>
          </div>
        </div>
      </div>
      {activeView === 'operations' ? <OperationList workMethodId={workMethodId} /> : <WorkMethodSummary workMethodId={workMethodId} onBack={() => setActiveView('operations')} />}
    </div>;
};
export default WorkMethodDetail;