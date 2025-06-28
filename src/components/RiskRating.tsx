import React from 'react';
type RiskRatingProps = {
  severity: number;
  frequency: number;
  label: string;
};
export const RiskRating = ({
  severity,
  frequency,
  label
}: RiskRatingProps) => {
  // Calculate risk score
  const riskScore = severity * frequency;
  // Determine risk level and color
  let riskLevel = '';
  let riskColor = '';
  if (riskScore <= 4) {
    riskLevel = 'Low';
    riskColor = 'bg-risk-low';
  } else if (riskScore <= 9) {
    riskLevel = 'Medium';
    riskColor = 'bg-risk-medium';
  } else if (riskScore <= 16) {
    riskLevel = 'High';
    riskColor = 'bg-risk-high';
  } else {
    riskLevel = 'Extreme';
    riskColor = 'bg-risk-extreme';
  }
  return <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-medium">{label}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Frequency</span>
          <div className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${riskColor}`}></div>
            <span className="font-medium">{frequency}/5</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Severity</span>
          <div className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${riskColor}`}></div>
            <span className="font-medium">{severity}/5</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">Risk Level:</span>
        <span className={`text-sm font-bold px-2 py-0.5 rounded ${riskColor} text-white`}>
          {riskLevel} ({riskScore})
        </span>
      </div>
    </div>;
};