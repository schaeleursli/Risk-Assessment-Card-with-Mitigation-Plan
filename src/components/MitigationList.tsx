import React from 'react';
import { FileIcon, ImageIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
type MitigationListProps = {
  operations: any[];
};
const MitigationList = ({
  operations
}: MitigationListProps) => {
  // Mock mitigation data for each operation
  const mitigationData = operations.map((operation, index) => {
    // Generate mock data based on operation
    const seed = index + 1;
    const preSeverity = seed % 5 + 1;
    const preFrequency = (seed + 2) % 5 + 1;
    const preScore = preSeverity * preFrequency;
    const postSeverity = Math.max(preSeverity - 1, 1);
    const postFrequency = Math.max(preFrequency - 2, 1);
    const postScore = postSeverity * postFrequency;
    return {
      id: operation.id,
      operation: operation.selectedOperation,
      equipment: operation.selectedEquipment,
      preSeverity,
      preFrequency,
      preRiskScore: preScore,
      postSeverity,
      postFrequency,
      postRiskScore: postScore,
      mitigationPlan: `For ${operation.selectedOperation} operations using ${operation.selectedEquipment}, ensure proper training, inspection of equipment before use, and follow standard operating procedures. Implement additional safety measures such as barricades, spotters, and communication protocols.`,
      attachments: [{
        name: `${operation.selectedOperation}_Procedure.pdf`,
        type: 'pdf'
      }, {
        name: `${operation.selectedOperation}_Safety_Checklist.pdf`,
        type: 'pdf'
      }, {
        name: `${operation.selectedEquipment}_Setup.jpg`,
        type: 'image'
      }].slice(0, seed % 4) // Vary the number of attachments
    };
  });
  const getRiskClass = (score: number) => {
    if (score <= 4) return 'bg-risk-low';
    if (score <= 9) return 'bg-risk-medium';
    if (score <= 16) return 'bg-risk-high';
    return 'bg-risk-extreme';
  };
  return <div className="space-y-6">
      {mitigationData.map(item => <div key={item.id} className="bg-gray-50 p-4 rounded-card">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium">{item.operation}</h3>
              <p className="text-sm text-gray-600">{item.equipment}</p>
            </div>
            <div className="flex space-x-3">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Pre-Mitigation</div>
                <div className={`text-sm font-bold px-2 py-0.5 rounded-full ${getRiskClass(item.preRiskScore)}`}>
                  {item.preRiskScore}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  Post-Mitigation
                </div>
                <div className={`text-sm font-bold px-2 py-0.5 rounded-full ${getRiskClass(item.postRiskScore)}`}>
                  {item.postRiskScore}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <CheckCircleIcon className="w-4 h-4 text-headspace-orange mr-1" />
              Mitigation Plan
            </h4>
            <p className="text-sm bg-white p-3 rounded-card border border-gray-100">
              {item.mitigationPlan}
            </p>
          </div>
          {item.attachments.length > 0 && <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <AlertCircleIcon className="w-4 h-4 text-headspace-purple mr-1" />
                Supporting Documentation
              </h4>
              <div className="space-y-2">
                {item.attachments.map((attachment, idx) => <div key={idx} className="flex items-center bg-white p-2 rounded-card border border-gray-100">
                    {attachment.type === 'pdf' ? <FileIcon className="h-4 w-4 text-red-500 mr-2" /> : <ImageIcon className="h-4 w-4 text-blue-500 mr-2" />}
                    <span className="text-sm">{attachment.name}</span>
                  </div>)}
              </div>
            </div>}
        </div>)}
      {mitigationData.length === 0 && <div className="text-center py-8">
          <p className="text-gray-500">No mitigation plans available</p>
        </div>}
    </div>;
};
export default MitigationList;