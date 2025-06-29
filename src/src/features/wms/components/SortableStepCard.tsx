import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Edit } from 'lucide-react';
import { StepCard, Step } from './StepCard';
import { Button } from '../../../ui/Button';
type SortableStepCardProps = {
  step: Step;
  index: number;
  onEdit: (stepId: string) => void;
  onToggleMitigation: (stepId: string, hazardId: string) => void;
  onAddHazard: () => void;
  onEditHazard: (hazardId: string) => void;
};
export const SortableStepCard = ({
  step,
  index,
  onEdit,
  onToggleMitigation,
  onAddHazard,
  onEditHazard
}: SortableStepCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: step.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0
  };
  return <div ref={setNodeRef} style={style} className="relative">
      <StepCard step={step} index={index} onEdit={onEdit} onToggleMitigation={onToggleMitigation} dragHandleProps={{
      ...attributes,
      ...listeners
    }} />
      <div className="absolute right-4 -bottom-3 flex space-x-2 z-10">
        <Button variant="outline" size="sm" className="h-6 px-2 bg-background shadow-sm" onClick={onAddHazard}>
          <Plus size={12} className="mr-1" />
          Add Hazard
        </Button>
        {step.hazards.length > 0 && <Button variant="outline" size="sm" className="h-6 px-2 bg-background shadow-sm" onClick={() => onEditHazard(step.hazards[0].id)}>
            <Edit size={12} className="mr-1" />
            Edit Hazards
          </Button>}
      </div>
    </div>;
};