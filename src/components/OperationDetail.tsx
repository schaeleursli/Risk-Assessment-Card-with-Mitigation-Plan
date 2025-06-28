import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { sampleOperations } from '../data/sampleData';
import { RiskAssessmentMatrix } from './RiskAssessmentMatrix';
import { RiskRating } from './RiskRating';
type OperationDetailProps = {
  operationId: string;
  onBack: () => void;
};
const OperationDetail = ({
  operationId,
  onBack
}: OperationDetailProps) => {
  const [preSeverity, setPreSeverity] = useState(3);
  const [preFrequency, setPreFrequency] = useState(4);
  const [postSeverity, setPostSeverity] = useState(2);
  const [postFrequency, setPostFrequency] = useState(2);
  const [mitigationPlan, setMitigationPlan] = useState('');
  const operation = sampleOperations.find(op => op.id === operationId);
  if (!operation) {
    return <div>Operation not found</div>;
  }
  return <div>
      <div className="flex items-center mb-6">
        <button className="mr-4 p-2 rounded-full hover:bg-gray-200" onClick={onBack}>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-headspace-purple">
          {operation.selectedOperation}
        </h2>
      </div>
      <div className="bg-white p-6 rounded-card shadow-card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-sm text-gray-500">Operation Type</span>
            <p className="font-medium">{operation.selectedOperation}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Equipment</span>
            <p className="font-medium">{operation.selectedEquipment}</p>
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-500">Description</span>
          <p className="font-medium">
            {operation.description || 'No description provided'}
          </p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
      {/* Pre-Mitigation Risk Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-card">
          <RiskRating severity={preSeverity} frequency={preFrequency} label="Pre-Mitigation Risk Rating" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="preSeverity" className="block text-xs text-gray-500 mb-1">
                Severity (1-5)
              </label>
              <input id="preSeverity" type="range" min="1" max="5" value={preSeverity} onChange={e => setPreSeverity(parseInt(e.target.value))} className="w-full accent-headspace-orange" />
            </div>
            <div>
              <label htmlFor="preFrequency" className="block text-xs text-gray-500 mb-1">
                Frequency (1-5)
              </label>
              <input id="preFrequency" type="range" min="1" max="5" value={preFrequency} onChange={e => setPreFrequency(parseInt(e.target.value))} className="w-full accent-headspace-orange" />
            </div>
          </div>
        </div>
        <RiskAssessmentMatrix severity={preSeverity} frequency={preFrequency} isPre={true} />
      </div>
      {/* Mitigation Plan */}
      <div className="mb-6 bg-blue-50 p-4 rounded-card">
        <h3 className="text-sm font-medium mb-2">Mitigation Plan</h3>
        <textarea className="w-full p-3 border rounded-card min-h-[100px]" value={mitigationPlan} onChange={e => setMitigationPlan(e.target.value)} placeholder="Describe the steps to mitigate this risk..." />
      </div>
      {/* Post-Mitigation Risk Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-card">
          <RiskRating severity={postSeverity} frequency={postFrequency} label="Post-Mitigation Risk Rating" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="postSeverity" className="block text-xs text-gray-500 mb-1">
                Severity (1-5)
              </label>
              <input id="postSeverity" type="range" min="1" max="5" value={postSeverity} onChange={e => setPostSeverity(parseInt(e.target.value))} className="w-full accent-headspace-blue" />
            </div>
            <div>
              <label htmlFor="postFrequency" className="block text-xs text-gray-500 mb-1">
                Frequency (1-5)
              </label>
              <input id="postFrequency" type="range" min="1" max="5" value={postFrequency} onChange={e => setPostFrequency(parseInt(e.target.value))} className="w-full accent-headspace-blue" />
            </div>
          </div>
        </div>
        <RiskAssessmentMatrix severity={postSeverity} frequency={postFrequency} isPre={false} />
      </div>
      {/* Summary */}
      <div className="bg-gray-100 p-4 rounded-card">
        <h3 className="text-sm font-bold mb-2">Risk Assessment Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-gray-500">
              Pre-Mitigation Risk Score:
            </span>
            <div className={`text-sm font-bold mt-1 px-2 py-0.5 rounded inline-block ${preSeverity * preFrequency <= 4 ? 'bg-risk-low' : preSeverity * preFrequency <= 9 ? 'bg-risk-medium' : preSeverity * preFrequency <= 16 ? 'bg-risk-high' : 'bg-risk-extreme'} text-white`}>
              {preSeverity * preFrequency}
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500">
              Post-Mitigation Risk Score:
            </span>
            <div className={`text-sm font-bold mt-1 px-2 py-0.5 rounded inline-block ${postSeverity * postFrequency <= 4 ? 'bg-risk-low' : postSeverity * postFrequency <= 9 ? 'bg-risk-medium' : postSeverity * postFrequency <= 16 ? 'bg-risk-high' : 'bg-risk-extreme'} text-white`}>
              {postSeverity * postFrequency}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default OperationDetail;