import React, { Fragment } from 'react';
type RAMSChartProps = {
  operations: any[];
  showMitigationView: 'pre' | 'post';
};
const RAMSChart = ({
  operations,
  showMitigationView
}: RAMSChartProps) => {
  // More realistic risk data mapping for each operation type
  const operationRisks = operations.map(operation => {
    // Assign risk values based on operation type
    let preSeverity = 3;
    let preFrequency = 3;
    let postSeverity = 2;
    let postFrequency = 2;
    // Set specific risk levels based on operation type
    switch (operation.selectedOperation.toLowerCase()) {
      case 'lifting':
        preSeverity = 4; // Major
        preFrequency = 3; // Possible
        postSeverity = 3; // Moderate
        postFrequency = 2; // Unlikely
        break;
      case 'installation':
        preSeverity = 3; // Moderate
        preFrequency = 4; // Likely
        postSeverity = 2; // Minor
        postFrequency = 2; // Unlikely
        break;
      case 'transport':
        preSeverity = 3; // Moderate
        preFrequency = 3; // Possible
        postSeverity = 2; // Minor
        postFrequency = 2; // Unlikely
        break;
      case 'pile driving':
        preSeverity = 4; // Major
        preFrequency = 2; // Unlikely
        postSeverity = 3; // Moderate
        postFrequency = 1; // Rare
        break;
      default:
        // Default values for other operation types
        preSeverity = 3;
        preFrequency = 3;
        postSeverity = 2;
        postFrequency = 2;
    }
    return {
      id: operation.id,
      name: operation.selectedOperation,
      equipment: operation.selectedEquipment,
      description: operation.description,
      preSeverity,
      preFrequency,
      postSeverity,
      postFrequency
    };
  });
  // Create a 5x5 grid representing the risk matrix positions
  // Initialize with empty arrays for each cell
  const matrixGrid = Array(5).fill(null).map(() => Array(5).fill(null).map(() => []));
  // Place operations in the grid based on their risk scores
  operationRisks.forEach(risk => {
    const severity = showMitigationView === 'pre' ? risk.preSeverity : risk.postSeverity;
    const frequency = showMitigationView === 'pre' ? risk.preFrequency : risk.postFrequency;
    // Adjust for 0-based indexing
    const severityIndex = severity - 1;
    const frequencyIndex = 5 - frequency; // Invert because matrix has frequency descending
    // Add the risk to the specific cell
    matrixGrid[frequencyIndex][severityIndex].push(risk);
  });
  // Function to determine cell color based on position
  const getCellColor = (sevIndex: number, freqIndex: number) => {
    const riskScore = (sevIndex + 1) * (5 - freqIndex);
    if (riskScore <= 4) return 'bg-risk-low'; // Green
    if (riskScore <= 9) return 'bg-risk-medium'; // Orange/Yellow
    if (riskScore <= 16) return 'bg-risk-high'; // Red
    return 'bg-risk-extreme'; // Dark Red
  };
  const frequencyLabels = ['Almost Certain', 'Likely', 'Possible', 'Unlikely', 'Rare'];
  const severityLabels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
  return <div>
      <h3 className="text-xl font-medium mb-4">
        {showMitigationView === 'pre' ? 'Pre' : 'Post'}-Mitigation Risk
        Distribution
      </h3>
      <div className="mb-8">
        <div className="grid grid-cols-[auto_1fr] gap-2">
          {/* Y-axis labels (Frequency) */}
          <div className="flex flex-col justify-between py-2">
            {frequencyLabels.map((label, index) => <div key={index} className="h-32 flex items-center text-sm font-medium">
                {label}
              </div>)}
          </div>
          {/* Matrix grid */}
          <div>
            <div className="grid grid-cols-5 gap-1">
              {matrixGrid.map((row, rowIndex) => <Fragment key={`row-${rowIndex}`}>
                  {row.map((cell, colIndex) => <div key={`cell-${rowIndex}-${colIndex}`} className={`
                        h-32 p-2 rounded-md flex flex-col gap-1 overflow-auto
                        ${getCellColor(colIndex, rowIndex)}
                      `}>
                      {Array.isArray(cell) && cell.map((risk: any) => <div key={risk.id} className="bg-white bg-opacity-90 text-black text-sm font-medium p-2 rounded-md shadow-sm">
                            {risk.name}
                          </div>)}
                    </div>)}
                </Fragment>)}
            </div>
            {/* X-axis labels (Severity) */}
            <div className="grid grid-cols-5 gap-1 mt-2">
              {severityLabels.map((label, index) => <div key={index} className="text-sm font-medium text-center">
                  {label}
                </div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-medium mb-4">Risk Score Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-risk-low rounded mr-2"></div>
            <span className="text-sm">Low (1-4)</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-risk-medium rounded mr-2"></div>
            <span className="text-sm">Medium (5-9)</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-risk-high rounded mr-2"></div>
            <span className="text-sm">High (10-16)</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-risk-extreme rounded mr-2"></div>
            <span className="text-sm">Extreme (17-25)</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-medium mb-3">Operation Risk Scores</h3>
        <div className="space-y-2">
          {operationRisks.map(risk => {
          const preScore = risk.preSeverity * risk.preFrequency;
          const postScore = risk.postSeverity * risk.postFrequency;
          return <div key={risk.id} className="bg-gray-50 p-3 rounded-card">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{risk.name}</span>
                  <div className="flex space-x-4">
                    <div>
                      <span className="text-xs text-gray-500 mr-1">Pre:</span>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded ${preScore <= 4 ? 'bg-risk-low' : preScore <= 9 ? 'bg-risk-medium' : preScore <= 16 ? 'bg-risk-high' : 'bg-risk-extreme'} text-white`}>
                        {preScore}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 mr-1">Post:</span>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded ${postScore <= 4 ? 'bg-risk-low' : postScore <= 9 ? 'bg-risk-medium' : postScore <= 16 ? 'bg-risk-high' : 'bg-risk-extreme'} text-white`}>
                        {postScore}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{risk.equipment}</p>
              </div>;
        })}
        </div>
      </div>
    </div>;
};
export default RAMSChart;