import React, { useState, Fragment } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/Card';
import { Button } from '../../../ui/Button';
export type RiskItem = {
  id: string;
  hazardId: string;
  hazardName: string;
  severity: number;
  likelihood: number;
  afterSeverity?: number;
  afterLikelihood?: number;
};
type RiskMatrixProps = {
  riskItems: RiskItem[];
  className?: string;
};
export const RiskMatrix = ({
  riskItems,
  className = ''
}: RiskMatrixProps) => {
  const [showAfterMitigation, setShowAfterMitigation] = useState(false);
  // Matrix labels
  const severityLabels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
  const likelihoodLabels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
  // Function to determine cell color based on risk score
  const getCellColor = (severity: number, likelihood: number) => {
    const score = severity * likelihood;
    if (score <= 4) return 'bg-risk-low-bg';
    if (score <= 9) return 'bg-risk-medium-bg';
    if (score <= 16) return 'bg-risk-high-bg';
    return 'bg-risk-extreme-bg';
  };
  // Function to get badge color based on risk score
  const getBadgeColor = (severity: number, likelihood: number) => {
    const score = severity * likelihood;
    if (score <= 4) return 'bg-risk-low';
    if (score <= 9) return 'bg-risk-medium';
    if (score <= 16) return 'bg-risk-high';
    return 'bg-risk-extreme';
  };
  // Get the position of a hazard in the matrix
  const getHazardPosition = (item: RiskItem) => {
    const severity = showAfterMitigation && item.afterSeverity !== undefined ? item.afterSeverity : item.severity;
    const likelihood = showAfterMitigation && item.afterLikelihood !== undefined ? item.afterLikelihood : item.likelihood;
    return {
      severity,
      likelihood
    };
  };
  return <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-muted pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Risk Assessment Matrix</CardTitle>
          <div className="flex space-x-2">
            <Button variant={showAfterMitigation ? 'outline' : 'default'} size="sm" onClick={() => setShowAfterMitigation(false)} className={!showAfterMitigation ? 'bg-headspace-orange hover:bg-headspace-orange/90' : ''}>
              Before Mitigation
            </Button>
            <Button variant={showAfterMitigation ? 'default' : 'outline'} size="sm" onClick={() => setShowAfterMitigation(true)} className={showAfterMitigation ? 'bg-headspace-blue hover:bg-headspace-blue/90' : ''}>
              After Mitigation
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex">
          {/* Y-axis labels (Likelihood) */}
          <div className="flex flex-col justify-between text-right mr-2 pt-8">
            {likelihoodLabels.map((label, index) => <div key={index} className="h-12 flex items-center justify-end text-xs font-medium">
                  {label}
                </div>).reverse()}
            <div className="h-8"></div> {/* Empty space for the corner */}
          </div>
          <div className="flex-1">
            {/* Matrix cells */}
            <div className="grid grid-cols-5 gap-1">
              {[5, 4, 3, 2, 1].map(likelihood => <Fragment key={`row-${likelihood}`}>
                  {[1, 2, 3, 4, 5].map(severity => {
                // Find hazards in this cell
                const cellHazards = riskItems.filter(item => {
                  const pos = getHazardPosition(item);
                  return pos.severity === severity && pos.likelihood === likelihood;
                });
                const score = severity * likelihood;
                return <div key={`cell-${likelihood}-${severity}`} className={`
                          h-12 p-1 rounded-md flex flex-wrap items-center justify-center
                          ${getCellColor(severity, likelihood)}
                          transition-all duration-300 ease-in-out relative
                        `}>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getBadgeColor(severity, likelihood)}`}>
                          {score}
                        </span>
                        {cellHazards.length > 0 && <div className="absolute top-1 right-1 flex flex-wrap justify-end max-w-[80%]">
                            {cellHazards.map((hazard, index) => <div key={hazard.id} className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-white shadow-sm ${index > 0 ? '-ml-1' : ''}`} style={{
                      backgroundColor: showAfterMitigation ? '#32ABFF' : '#FF7E1D',
                      zIndex: cellHazards.length - index
                    }} title={hazard.hazardName}>
                                {index + 1}
                              </div>)}
                          </div>}
                      </div>;
              })}
                </Fragment>)}
            </div>
            {/* X-axis labels (Severity) */}
            <div className="grid grid-cols-5 gap-1 mt-1">
              {severityLabels.map((label, index) => <div key={index} className="text-xs text-center font-medium">
                  {label}
                </div>)}
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-risk-low rounded-md mr-2"></div>
            <span className="text-xs font-medium">Low (1-4)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-risk-medium rounded-md mr-2"></div>
            <span className="text-xs font-medium">Medium (5-9)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-risk-high rounded-md mr-2"></div>
            <span className="text-xs font-medium">High (10-16)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-risk-extreme rounded-md mr-2"></div>
            <span className="text-xs font-medium">Extreme (17-25)</span>
          </div>
        </div>
      </CardContent>
    </Card>;
};