import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number; // 1, 2, or 3
}

const STEPS = [
  { number: 1, label: 'בחירת קצבאות' },
  { number: 2, label: 'שאלות מיקוד' },
  { number: 3, label: 'תוצאות' },
];

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-3" dir="rtl">
      {STEPS.map((step, i) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center gap-1 sm:gap-2">
            {/* Step circle */}
            <div className={cn(
              'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all',
              isCompleted && 'bg-emerald-500 text-white',
              isCurrent && 'bg-secondary text-white ring-2 ring-secondary/30',
              !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
            )}>
              {isCompleted ? <Check className="w-4 h-4" /> : step.number}
            </div>
            {/* Label */}
            <span className={cn(
              'text-xs sm:text-sm font-medium hidden xs:inline',
              isCurrent && 'text-secondary',
              isCompleted && 'text-emerald-600',
              !isCompleted && !isCurrent && 'text-muted-foreground'
            )}>
              {step.label}
            </span>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className={cn(
                'w-6 sm:w-10 h-0.5 mx-1',
                currentStep > step.number ? 'bg-emerald-500' : 'bg-border'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
