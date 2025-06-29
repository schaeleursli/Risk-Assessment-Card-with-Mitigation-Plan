import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { Step } from './StepCard';
const stepSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  equipment: z.string().transform(val => val.split(',').map(item => item.trim()).filter(item => item.length > 0))
});
type StepFormValues = z.infer<typeof stepSchema>;
type StepDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: Step | null;
  onSave: (step: Step) => void;
};
export const StepDialog = ({
  open,
  onOpenChange,
  step,
  onSave
}: StepDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm<StepFormValues>({
    resolver: zodResolver(stepSchema),
    defaultValues: step ? {
      id: step.id,
      title: step.title,
      description: step.description,
      equipment: step.equipment.join(', ')
    } : {
      title: '',
      description: '',
      equipment: ''
    }
  });
  useEffect(() => {
    if (open) {
      reset(step ? {
        id: step.id,
        title: step.title,
        description: step.description,
        equipment: step.equipment.join(', ')
      } : {
        title: '',
        description: '',
        equipment: ''
      });
    }
  }, [open, step, reset]);
  const onSubmit = (data: StepFormValues) => {
    onSave({
      id: data.id || Date.now().toString(),
      title: data.title,
      description: data.description,
      equipment: data.equipment,
      hazards: step?.hazards || []
    });
  };
  if (!open) return null;
  return <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            {step ? 'Edit Step' : 'Add New Step'}
          </h3>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X size={18} />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Step Title
              </label>
              <Input {...register('title')} placeholder="e.g., Equipment inspection" />
              {errors.title && <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea {...register('description')} className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Describe the work step in detail..." />
              {errors.description && <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Equipment (comma separated)
              </label>
              <Input {...register('equipment')} placeholder="e.g., Crane, Lifting slings, Shackles" />
              {errors.equipment && <p className="mt-1 text-sm text-red-600">
                  {errors.equipment.message}
                </p>}
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{step ? 'Update Step' : 'Add Step'}</Button>
          </div>
        </form>
      </div>
    </div>;
};