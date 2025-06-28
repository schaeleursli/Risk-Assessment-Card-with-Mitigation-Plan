import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon } from 'lucide-react';
import { sampleProjects, sampleWorkMethods } from '../data/sampleData';
import { WorkMethodCard } from './WorkMethodCard';
import WorkMethodDetail from './WorkMethodDetail';
type ProjectDetailProps = {
  projectId: string;
  onBack: () => void;
};
const ProjectDetail = ({
  projectId,
  onBack
}: ProjectDetailProps) => {
  const [selectedWorkMethodId, setSelectedWorkMethodId] = useState<string | null>(null);
  const [showNewWorkMethodForm, setShowNewWorkMethodForm] = useState(false);
  const [newWorkMethod, setNewWorkMethod] = useState({
    id: '',
    documentNumber: '',
    revision: 'A',
    title: '',
    operationTypes: [] as string[],
    date: new Date().toISOString().split('T')[0],
    location: '',
    projectId: projectId
  });
  const project = sampleProjects.find(p => p.id === projectId);
  const projectWorkMethods = sampleWorkMethods.filter(wm => wm.projectId === projectId);
  const handleCreateWorkMethod = () => {
    const workMethodId = Date.now().toString();
    const workMethodWithId = {
      ...newWorkMethod,
      id: workMethodId
    };
    sampleWorkMethods.push(workMethodWithId);
    setNewWorkMethod({
      id: '',
      documentNumber: '',
      revision: 'A',
      title: '',
      operationTypes: [],
      date: new Date().toISOString().split('T')[0],
      location: '',
      projectId: projectId
    });
    setShowNewWorkMethodForm(false);
    setSelectedWorkMethodId(workMethodId);
  };
  const handleOperationTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setNewWorkMethod(prev => {
      if (isChecked) {
        return {
          ...prev,
          operationTypes: [...prev.operationTypes, value]
        };
      } else {
        return {
          ...prev,
          operationTypes: prev.operationTypes.filter(type => type !== value)
        };
      }
    });
  };
  if (selectedWorkMethodId) {
    return <WorkMethodDetail workMethodId={selectedWorkMethodId} onBack={() => setSelectedWorkMethodId(null)} />;
  }
  if (!project) {
    return <div>Project not found</div>;
  }
  return <div>
      <div className="flex items-center mb-6">
        <button className="mr-4 p-2 rounded-full hover:bg-gray-200" onClick={onBack}>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-headspace-purple">
          {project.name}
        </h2>
      </div>
      <div className="bg-white p-6 rounded-card shadow-card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <span className="text-sm text-gray-500">Location</span>
            <p className="font-medium">
              {project.location}, {project.country}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Type</span>
            <p className="font-medium capitalize">{project.type}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Status</span>
            <p className="font-medium capitalize">{project.status}</p>
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-500">Description</span>
          <p className="font-medium">{project.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Work Method Statements</h3>
        <button className="bg-headspace-orange text-white px-4 py-2 rounded-card flex items-center" onClick={() => setShowNewWorkMethodForm(!showNewWorkMethodForm)}>
          <PlusIcon className="w-5 h-5 mr-2" />
          New Work Method
        </button>
      </div>
      {showNewWorkMethodForm && <div className="bg-white p-6 rounded-card shadow-card mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Create New Work Method Statement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Document Number
              </label>
              <input type="text" className="w-full p-2 border rounded-card" value={newWorkMethod.documentNumber} onChange={e => setNewWorkMethod({
            ...newWorkMethod,
            documentNumber: e.target.value
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Revision</label>
              <input type="text" className="w-full p-2 border rounded-card" value={newWorkMethod.revision} onChange={e => setNewWorkMethod({
            ...newWorkMethod,
            revision: e.target.value
          })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" className="w-full p-2 border rounded-card" value={newWorkMethod.title} onChange={e => setNewWorkMethod({
            ...newWorkMethod,
            title: e.target.value
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" className="w-full p-2 border rounded-card" value={newWorkMethod.date} onChange={e => setNewWorkMethod({
            ...newWorkMethod,
            date: e.target.value
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" className="w-full p-2 border rounded-card" value={newWorkMethod.location} onChange={e => setNewWorkMethod({
            ...newWorkMethod,
            location: e.target.value
          })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Operation Types
              </label>
              <div className="flex flex-wrap gap-4">
                {['Marine', 'Installation', 'Lifting', 'Transport', 'Skidding'].map(type => <label key={type} className="inline-flex items-center">
                    <input type="checkbox" className="rounded text-headspace-orange mr-1" value={type} checked={newWorkMethod.operationTypes.includes(type)} onChange={handleOperationTypeChange} />
                    <span>{type}</span>
                  </label>)}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 border rounded-card" onClick={() => setShowNewWorkMethodForm(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-headspace-orange text-white rounded-card" onClick={handleCreateWorkMethod}>
              Create Work Method
            </button>
          </div>
        </div>}
      <div className="grid grid-cols-1 gap-6">
        {projectWorkMethods.map(workMethod => <div key={workMethod.id} className="cursor-pointer transform transition-transform hover:scale-[1.01]" onClick={() => setSelectedWorkMethodId(workMethod.id)}>
            <WorkMethodCard documentNumber={workMethod.documentNumber} revision={workMethod.revision} title={workMethod.title} operationTypes={workMethod.operationTypes} date={workMethod.date} location={workMethod.location} />
          </div>)}
      </div>
    </div>;
};
export default ProjectDetail;