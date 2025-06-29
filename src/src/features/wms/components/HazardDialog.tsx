import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { Hazard } from './StepCard';
const hazardSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Hazard name must be at least 3 characters'),
  severity: z.coerce.number().int().min(1).max(5),
  likelihood: z.coerce.number().int().min(1).max(5),
  mitigation: z.string().min(5, 'Mitigation must be at least 5 characters'),
  afterSeverity: z.coerce.number().int().min(1).max(5),
  afterLikelihood: z.coerce.number().int().min(1).max(5),
  fileUrl: z.string().optional(),
  mitigationComplete: z.boolean().default(false)
});
type HazardFormValues = z.infer<typeof hazardSchema>;
type HazardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hazard: Hazard | null;
  onSave: (hazard: Hazard) => void;
};
export const HazardDialog = ({
  open,
  onOpenChange,
  hazard,
  onSave
}: HazardDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset,
    watch
  } = useForm<HazardFormValues>({
    resolver: zodResolver(hazardSchema),
    defaultValues: hazard ? {
      id: hazard.id,
      name: hazard.name,
      severity: hazard.severity,
      likelihood: hazard.likelihood,
      mitigation: hazard.mitigation,
      afterSeverity: hazard.afterSeverity,
      afterLikelihood: hazard.afterLikelihood,
      fileUrl: hazard.fileUrl || '',
      mitigationComplete: hazard.mitigationComplete
    } : {
      name: '',
      severity: 3,
      likelihood: 3,
      mitigation: '',
      afterSeverity: 2,
      afterLikelihood: 2,
      fileUrl: '',
      mitigationComplete: false
    }
  });
  useEffect(() => {
    if (open) {
      reset(hazard ? {
        id: hazard.id,
        name: hazard.name,
        severity: hazard.severity,
        likelihood: hazard.likelihood,
        mitigation: hazard.mitigation,
        afterSeverity: hazard.afterSeverity,
        afterLikelihood: hazard.afterLikelihood,
        fileUrl: hazard.fileUrl || '',
        mitigationComplete: hazard.mitigationComplete
      } : {
        name: '',
        severity: 3,
        likelihood: 3,
        mitigation: '',
        afterSeverity: 2,
        afterLikelihood: 2,
        fileUrl: '',
        mitigationComplete: false
      });
    }
  }, [open, hazard, reset]);
  // Calculate risk scores
  const severity = watch('severity');
  const likelihood = watch('likelihood');
  const afterSeverity = watch('afterSeverity');
  const afterLikelihood = watch('afterLikelihood');
  const preRiskScore = severity * likelihood;
  const postRiskScore = afterSeverity * afterLikelihood;
  const getRiskLevel = (score: number) => {
    if (score <= 4) return {
      level: 'Low',
      color: 'text-green-600'
    };
    if (score <= 9) return {
      level: 'Medium',
      color: 'text-yellow-600'
    };
    if (score <= 16) return {
      level: 'High',
      color: 'text-orange-600'
    };
    return {
      level: 'Extreme',
      color: 'text-red-600'
    };
  };
  const preRisk = getRiskLevel(preRiskScore);
  const postRisk = getRiskLevel(postRiskScore);
  const onSubmit = (data: HazardFormValues) => {
    onSave({
      id: data.id || Date.now().toString(),
      name: data.name,
      severity: data.severity,
      likelihood: data.likelihood,
      mitigation: data.mitigation,
      afterSeverity: data.afterSeverity,
      afterLikelihood: data.afterLikelihood,
      fileUrl: data.fileUrl,
      mitigationComplete: data.mitigationComplete
    });
  };
  if (!open) return null;
  return <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background">
          <h3 className="text-lg font-semibold">
            {hazard ? 'Edit Hazard' : 'Add New Hazard'}
          </h3>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X size={18} />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Hazard Name
              </label>
              <Input {...register('name')} placeholder="e.g., Equipment failure" />
              {errors.name && <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Initial Severity (1-5)
                </label>
                <Input type="number" min="1" max="5" {...register('severity')} />
                {errors.severity && <p className="mt-1 text-sm text-red-600">
                    {errors.severity.message}
                  </p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Initial Likelihood (1-5)
                </label>
                <Input type="number" min="1" max="5" {...register('likelihood')} />
                {errors.likelihood && <p className="mt-1 text-sm text-red-600">
                    {errors.likelihood.message}
                  </p>}
              </div>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm font-medium mb-1">
                Pre-mitigation Risk Score:
                <span className={`ml-2 font-bold ${preRisk.color}`}>
                  {preRiskScore} ({preRisk.level})
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mitigation Plan
              </label>
              <textarea {...register('mitigation')} className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Describe how this hazard will be mitigated..." />
              {errors.mitigation && <p className="mt-1 text-sm text-red-600">
                  {errors.mitigation.message}
                </p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Supporting Document URL (optional)
              </label>
              <Input {...register('fileUrl')} placeholder="https://example.com/document.pdf" />
              {errors.fileUrl && <p className="mt-1 text-sm text-red-600">
                  {errors.fileUrl.message}
                </p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Residual Severity (1-5)
                </label>
                <Input type="number" min="1" max="5" {...register('afterSeverity')} />
                {errors.afterSeverity && <p className="mt-1 text-sm text-red-600">
                    {errors.afterSeverity.message}
                  </p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Residual Likelihood (1-5)
                </label>
                <Input type="number" min="1" max="5" {...register('afterLikelihood')} />
                {errors.afterLikelihood && <p className="mt-1 text-sm text-red-600">
                    {errors.afterLikelihood.message}
                  </p>}
              </div>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm font-medium mb-1">
                Post-mitigation Risk Score:
                <span className={`ml-2 font-bold ${postRisk.color}`}>
                  {postRiskScore} ({postRisk.level})
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="mitigationComplete" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" {...register('mitigationComplete')} />
              <label htmlFor="mitigationComplete" className="ml-2 text-sm">
                Mitigation has been implemented and verified
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {hazard ? 'Update Hazard' : 'Add Hazard'}
            </Button>
          </div>
        </form>
      </div>
    </div>;
};