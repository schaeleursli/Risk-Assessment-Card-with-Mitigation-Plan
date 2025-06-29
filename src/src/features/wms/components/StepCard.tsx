import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Grip, AlertTriangle, Check, Paperclip } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../ui/Card';
import { Button } from '../../../ui/Button';
export type Step = {
  id: string;
  title: string;
  description: string;
  equipment: string[];
  hazards: Hazard[];
};
export type Hazard = {
  id: string;
  name: string;
  severity: number;
  likelihood: number;
  mitigation: string;
  afterSeverity: number;
  afterLikelihood: number;
  fileUrl?: string;
  mitigationComplete: boolean;
};
type StepCardProps = {
  step: Step;
  index: number;
  onEdit: (stepId: string) => void;
  onToggleMitigation: (stepId: string, hazardId: string) => void;
  dragHandleProps?: any;
};
export const StepCard = ({
  step,
  index,
  onEdit,
  onToggleMitigation,
  dragHandleProps
}: StepCardProps) => {
  const [expanded, setExpanded] = useState(false);
  // Calculate risk scores
  const getRiskScore = (severity: number, likelihood: number) => severity * likelihood;
  const getRiskLevel = (score: number) => {
    if (score <= 4) return {
      level: 'Low',
      color: 'bg-green-100 text-green-800'
    };
    if (score <= 9) return {
      level: 'Medium',
      color: 'bg-yellow-100 text-yellow-800'
    };
    if (score <= 16) return {
      level: 'High',
      color: 'bg-orange-100 text-orange-800'
    };
    return {
      level: 'Extreme',
      color: 'bg-red-100 text-red-800'
    };
  };
  // Calculate completion percentage
  const completedMitigations = step.hazards.filter(h => h.mitigationComplete).length;
  const completionPercentage = step.hazards.length > 0 ? Math.round(completedMitigations / step.hazards.length * 100) : 100;
  return <Card className="mb-4 transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 flex flex-row items-center justify-between bg-muted/50">
        <div className="flex items-center space-x-3">
          <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
            <Grip size={20} className="text-muted-foreground" />
          </div>
          <div className="font-medium">
            Step {index + 1}: {step.title}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {step.hazards.length > 0 && <div className="flex items-center">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500 ease-in-out" style={{
              width: `${completionPercentage}%`
            }} />
              </div>
              <span className="ml-2 text-xs font-medium">
                {completionPercentage}%
              </span>
            </div>}
          <Button variant="ghost" size="sm" onClick={() => onEdit(step.id)}>
            Edit
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
      </CardHeader>
      {expanded && <CardContent className="p-4 pt-2">
          <div className="text-sm text-muted-foreground mb-3">
            {step.description}
          </div>
          {step.equipment.length > 0 && <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Equipment:</h4>
              <div className="flex flex-wrap gap-2">
                {step.equipment.map((item, i) => <span key={i} className="px-2 py-1 bg-muted rounded-md text-xs">
                    {item}
                  </span>)}
              </div>
            </div>}
          {step.hazards.length > 0 && <div>
              <h4 className="text-sm font-medium mb-2">
                Hazards & Mitigations:
              </h4>
              <div className="space-y-3">
                {step.hazards.map(hazard => {
            const preRiskScore = getRiskScore(hazard.severity, hazard.likelihood);
            const postRiskScore = getRiskScore(hazard.afterSeverity, hazard.afterLikelihood);
            const preRisk = getRiskLevel(preRiskScore);
            const postRisk = getRiskLevel(postRiskScore);
            return <div key={hazard.id} className="p-3 bg-muted/30 rounded-md border">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <AlertTriangle size={16} className="text-orange-500 mr-2" />
                          <span className="font-medium text-sm">
                            {hazard.name}
                          </span>
                        </div>
                        <div className="flex space-x-2 text-xs">
                          <span className={`px-2 py-0.5 rounded ${preRisk.color}`}>
                            Pre: {preRiskScore} ({preRisk.level})
                          </span>
                          <span className={`px-2 py-0.5 rounded ${postRisk.color}`}>
                            Post: {postRiskScore} ({postRisk.level})
                          </span>
                        </div>
                      </div>
                      <div className="text-xs mb-3">{hazard.mitigation}</div>
                      <div className="flex items-center justify-between">
                        {hazard.fileUrl && <div className="flex items-center text-xs text-muted-foreground">
                            <Paperclip size={12} className="mr-1" />
                            <span>Attachment</span>
                          </div>}
                        <Button variant={hazard.mitigationComplete ? 'default' : 'outline'} size="sm" className="text-xs h-8" onClick={() => onToggleMitigation(step.id, hazard.id)}>
                          {hazard.mitigationComplete ? <>
                              <Check size={14} className="mr-1" />
                              Completed
                            </> : 'Mark Complete'}
                        </Button>
                      </div>
                    </div>;
          })}
              </div>
            </div>}
        </CardContent>}
    </Card>;
};