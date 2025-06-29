import React, { Fragment } from 'react';
type MatrixProps = {
  severity: number;
  frequency: number;
  isPre?: boolean;
};
export const RiskAssessmentMatrix = ({
  severity,
  frequency,
  isPre = true
}: MatrixProps) => {
  // Create the matrix labels
  const severityLabels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
  const frequencyLabels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
  // Function to determine cell color based on position
  const getCellColor = (sevIndex: number, freqIndex: number) => {
    const riskScore = (sevIndex + 1) * (freqIndex + 1);
    if (riskScore <= 4) return 'bg-risk-low-bg';
    if (riskScore <= 9) return 'bg-risk-medium-bg';
    if (riskScore <= 16) return 'bg-risk-high-bg';
    return 'bg-risk-extreme-bg';
  };
  // Function to determine badge color based on position
  const getBadgeColor = (sevIndex: number, freqIndex: number) => {
    const riskScore = (sevIndex + 1) * (freqIndex + 1);
    if (riskScore <= 4) return 'bg-risk-low';
    if (riskScore <= 9) return 'bg-risk-medium';
    if (riskScore <= 16) return 'bg-risk-high';
    return 'bg-risk-extreme';
  };
  // Function to determine if a cell is selected
  const isSelected = (sevIndex: number, freqIndex: number) => {
    return sevIndex === severity - 1 && freqIndex === frequency - 1;
  };
  return <div className="w-full max-w-md">
      <h3 className="text-sm font-medium mb-2">
        {isPre ? 'Pre-Mitigation' : 'Post-Mitigation'} Risk Level
      </h3>
      <div className="flex">
        {/* Y-axis labels (Frequency) */}
        <div className="flex flex-col justify-between text-right mr-2">
          {frequencyLabels.map((label, index) => <div key={index} className="h-8 flex items-center justify-end text-xs">
                {label}
              </div>).reverse()}
          <div className="h-8"></div> {/* Empty space for the corner */}
        </div>
        <div className="flex-1">
          {/* Matrix cells */}
          <div className="grid grid-cols-5 gap-0.5">
            {Array.from({
            length: 5
          }).map((_, freqIndex) => <Fragment key={freqIndex}>
                {Array.from({
              length: 5
            }).map((_, sevIndex) => {
              const score = (sevIndex + 1) * (5 - freqIndex);
              const selected = isSelected(sevIndex, 4 - freqIndex);
              return <div key={`${5 - freqIndex - 1}-${sevIndex}`} className={`
                      h-8 w-full flex items-center justify-center text-xs font-bold
                      ${getCellColor(sevIndex, 4 - freqIndex)}
                      ${selected ? 'ring-2 ring-headspace-purple' : ''}
                      rounded-md relative
                    `}>
                      <span className={`
                    px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold
                    ${getBadgeColor(sevIndex, 4 - freqIndex)}
                    ${selected ? 'scale-110 transform' : ''}
                  `}>
                        {score}
                      </span>
                    </div>;
            })}
              </Fragment>)}
          </div>
          {/* X-axis labels (Severity) */}
          <div className="grid grid-cols-5 gap-0.5 mt-1">
            {severityLabels.map((label, index) => <div key={index} className="text-xs text-center">
                {label}
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};