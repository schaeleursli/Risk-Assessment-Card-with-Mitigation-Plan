import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Plus } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { SortableStepCard } from './SortableStepCard';
import { StepDialog } from './StepDialog';
import { HazardDialog } from './HazardDialog';
import { RiskMatrix, RiskItem } from './RiskMatrix';
import { Step, Hazard } from './StepCard';
type WmsBuilderProps = {
  wmsId: string;
  wmsTitle: string;
};
export const WmsBuilder = ({
  wmsId,
  wmsTitle
}: WmsBuilderProps) => {
  // State for steps
  const [steps, setSteps] = useState<Step[]>([{
    id: '1',
    title: 'Preparation of work area',
    description: 'Clear the work area of all obstacles and ensure proper access',
    equipment: ['Safety barriers', 'Warning signs'],
    hazards: [{
      id: '101',
      name: 'Slips, trips and falls',
      severity: 3,
      likelihood: 4,
      mitigation: 'Ensure work area is clear of debris. Mark any trip hazards with high-visibility tape.',
      afterSeverity: 2,
      afterLikelihood: 2,
      mitigationComplete: true
    }]
  }, {
    id: '2',
    title: 'Equipment inspection',
    description: 'Inspect all lifting equipment before use',
    equipment: ['Crane', 'Lifting slings', 'Shackles'],
    hazards: [{
      id: '201',
      name: 'Equipment failure',
      severity: 5,
      likelihood: 3,
      mitigation: 'Thorough pre-use inspection of all lifting equipment. Check certification is current.',
      afterSeverity: 4,
      afterLikelihood: 1,
      mitigationComplete: false
    }, {
      id: '202',
      name: 'Improper rigging',
      severity: 4,
      likelihood: 3,
      mitigation: 'Only qualified riggers to set up equipment. Double-check all connections.',
      afterSeverity: 3,
      afterLikelihood: 1,
      fileUrl: 'https://example.com/rigging-guide.pdf',
      mitigationComplete: false
    }]
  }]);
  // Dialog states
  const [stepDialogOpen, setStepDialogOpen] = useState(false);
  const [hazardDialogOpen, setHazardDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<Step | null>(null);
  const [editingHazard, setEditingHazard] = useState<{
    stepId: string;
    hazard: Hazard | null;
  }>({
    stepId: '',
    hazard: null
  });
  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  // Handlers
  const handleDragEnd = (event: any) => {
    const {
      active,
      over
    } = event;
    if (active.id !== over.id) {
      setSteps(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  const handleAddStep = () => {
    setEditingStep(null);
    setStepDialogOpen(true);
  };
  const handleEditStep = (stepId: string) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      setEditingStep(step);
      setStepDialogOpen(true);
    }
  };
  const handleAddHazard = (stepId: string) => {
    setEditingHazard({
      stepId,
      hazard: null
    });
    setHazardDialogOpen(true);
  };
  const handleEditHazard = (stepId: string, hazardId: string) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      const hazard = step.hazards.find(h => h.id === hazardId);
      if (hazard) {
        setEditingHazard({
          stepId,
          hazard
        });
        setHazardDialogOpen(true);
      }
    }
  };
  const handleSaveStep = (step: Step) => {
    if (editingStep) {
      // Update existing step
      setSteps(prev => prev.map(s => s.id === step.id ? step : s));
    } else {
      // Add new step
      const newStep = {
        ...step,
        id: Date.now().toString(),
        hazards: []
      };
      setSteps(prev => [...prev, newStep]);
    }
    setStepDialogOpen(false);
  };
  const handleSaveHazard = (hazard: Hazard) => {
    setSteps(prev => prev.map(step => {
      if (step.id === editingHazard.stepId) {
        if (editingHazard.hazard) {
          // Update existing hazard
          return {
            ...step,
            hazards: step.hazards.map(h => h.id === hazard.id ? hazard : h)
          };
        } else {
          // Add new hazard
          return {
            ...step,
            hazards: [...step.hazards, {
              ...hazard,
              id: Date.now().toString()
            }]
          };
        }
      }
      return step;
    }));
    setHazardDialogOpen(false);
  };
  const handleToggleMitigation = (stepId: string, hazardId: string) => {
    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          hazards: step.hazards.map(h => {
            if (h.id === hazardId) {
              return {
                ...h,
                mitigationComplete: !h.mitigationComplete
              };
            }
            return h;
          })
        };
      }
      return step;
    }));
  };
  // Transform steps and hazards into risk items for the matrix
  const riskItems: RiskItem[] = steps.flatMap(step => step.hazards.map(hazard => ({
    id: `${step.id}-${hazard.id}`,
    hazardId: hazard.id,
    hazardName: hazard.name,
    severity: hazard.severity,
    likelihood: hazard.likelihood,
    afterSeverity: hazard.afterSeverity,
    afterLikelihood: hazard.afterLikelihood
  })));
  return <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Steps column */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{wmsTitle}</h2>
            <Button onClick={handleAddStep}>
              <Plus size={16} className="mr-2" />
              Add Step
            </Button>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
            <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
              {steps.map((step, index) => <SortableStepCard key={step.id} step={step} index={index} onEdit={handleEditStep} onToggleMitigation={handleToggleMitigation} onAddHazard={() => handleAddHazard(step.id)} onEditHazard={hazardId => handleEditHazard(step.id, hazardId)} />)}
            </SortableContext>
          </DndContext>
          {steps.length === 0 && <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
              <p className="text-muted-foreground">
                No steps added yet. Click "Add Step" to get started.
              </p>
            </div>}
        </div>
        {/* Risk matrix column */}
        <div className="w-full lg:w-1/3">
          <RiskMatrix riskItems={riskItems} className="sticky top-4" />
        </div>
      </div>
      {/* Dialogs */}
      <StepDialog open={stepDialogOpen} onOpenChange={setStepDialogOpen} step={editingStep} onSave={handleSaveStep} />
      <HazardDialog open={hazardDialogOpen} onOpenChange={setHazardDialogOpen} hazard={editingHazard.hazard} onSave={handleSaveHazard} />
    </div>;
};