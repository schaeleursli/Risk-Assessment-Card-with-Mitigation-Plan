import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { sampleOperations } from '../data/sampleData';
import { OperationCard } from './OperationCard';
import OperationDetail from './OperationDetail';
type OperationListProps = {
  workMethodId: string;
};
const OperationList = ({
  workMethodId
}: OperationListProps) => {
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(null);
  const [showNewOperation, setShowNewOperation] = useState(false);
  const workMethodOperations = sampleOperations.filter(op => op.workMethodId === workMethodId);
  const handleSaveOperation = async (data: any) => {
    const operationId = Date.now().toString();
    const newOperation = {
      id: operationId,
      ...data,
      workMethodId
    };
    sampleOperations.push(newOperation);
    setShowNewOperation(false);
    setSelectedOperationId(operationId);
  };
  if (selectedOperationId) {
    return <OperationDetail operationId={selectedOperationId} onBack={() => setSelectedOperationId(null)} />;
  }
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Operation Steps</h3>
        <button className="bg-headspace-orange text-white px-4 py-2 rounded-card flex items-center" onClick={() => setShowNewOperation(!showNewOperation)}>
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Operation
        </button>
      </div>
      {showNewOperation && <div className="mb-6">
          <OperationCard onSave={handleSaveOperation} />
        </div>}
      <div className="space-y-6">
        {workMethodOperations.map((operation, index) => <div key={operation.id} className="bg-white p-6 rounded-card shadow-card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedOperationId(operation.id)}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-medium">
                Step {index + 1}: {operation.selectedOperation}
              </h4>
              <span className="bg-headspace-purple text-white px-3 py-1 rounded-full text-sm">
                {operation.selectedEquipment}
              </span>
            </div>
            <p className="text-gray-600">
              {operation.description || 'No description provided'}
            </p>
          </div>)}
        {workMethodOperations.length === 0 && !showNewOperation && <div className="text-center py-8 bg-gray-50 rounded-card">
            <p className="text-gray-500">No operations added yet</p>
          </div>}
      </div>
    </div>;
};
export default OperationList;