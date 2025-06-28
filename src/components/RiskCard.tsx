import React, { useState } from 'react';
import { RiskRating } from './RiskRating';
import { RiskAssessmentMatrix } from './RiskAssessmentMatrix';
import { FileIcon, ImageIcon, PlusIcon, XIcon } from 'lucide-react';
type RiskType = 'lifting' | 'transport' | 'storage' | 'installation' | 'other';
const RiskCard = () => {
  const [riskType, setRiskType] = useState<RiskType>('lifting');
  const [riskDescription, setRiskDescription] = useState('');
  const [preSeverity, setPreSeverity] = useState(3);
  const [preFrequency, setPreFrequency] = useState(4);
  const [postSeverity, setPostSeverity] = useState(2);
  const [postFrequency, setPostFrequency] = useState(2);
  const [mitigationPlan, setMitigationPlan] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
    }
  };
  const clearAttachment = () => {
    setAttachmentName('');
  };
  return <div className="bg-white rounded-card shadow-card p-6 max-w-3xl w-full">
      <h2 className="text-xl font-bold mb-6 text-headspace-purple">
        Risk Assessment Card
      </h2>
      {/* Risk Description and Type */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Risk Type</label>
          <div className="flex flex-wrap gap-2">
            {['lifting', 'transport', 'storage', 'installation', 'other'].map(type => <button key={type} className={`px-4 py-2 rounded-full text-sm ${riskType === type ? 'bg-headspace-orange text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setRiskType(type as RiskType)}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>)}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Risk Description
          </label>
          <textarea id="description" className="w-full p-3 border rounded-card min-h-[100px]" value={riskDescription} onChange={e => setRiskDescription(e.target.value)} placeholder="Describe the risk in detail..." />
        </div>
      </div>
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
        <textarea className="w-full p-3 border rounded-card min-h-[100px] mb-4" value={mitigationPlan} onChange={e => setMitigationPlan(e.target.value)} placeholder="Describe the steps to mitigate this risk..." />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Supporting Documentation
          </label>
          {attachmentName ? <div className="flex items-center p-3 bg-white border rounded-card">
              <div className="flex items-center flex-1">
                {attachmentName.endsWith('.pdf') ? <FileIcon className="h-5 w-5 text-red-500 mr-2" /> : <ImageIcon className="h-5 w-5 text-blue-500 mr-2" />}
                <span className="text-sm truncate">{attachmentName}</span>
              </div>
              <button onClick={clearAttachment} className="p-1 hover:bg-gray-100 rounded-full">
                <XIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div> : <label className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-card cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center">
                <PlusIcon className="h-6 w-6 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">
                  Add image or PDF (calculations, drawings)
                </span>
              </div>
              <input type="file" className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
            </label>}
        </div>
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
export default RiskCard;