import { Check } from 'lucide-react';
import './ProgressSteps.css';

interface ProgressStepsProps {
  currentStep: number;
}

const STEPS = [
  { number: 1, label: 'בחירת קצבאות' },
  { number: 2, label: 'שאלות מיקוד' },
  { number: 3, label: 'תוצאות' },
];

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="progress-steps" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3}>
      {STEPS.map((step, i) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;

        return (
          <div key={step.number} className="progress-steps__step">
            <div
              className={`progress-steps__circle ${isCompleted ? 'progress-steps__circle--completed' : ''} ${isCurrent ? 'progress-steps__circle--current' : ''}`}
            >
              {isCompleted ? <Check size={14} /> : step.number}
            </div>
            <span
              className={`progress-steps__label ${isCurrent ? 'progress-steps__label--current' : ''} ${isCompleted ? 'progress-steps__label--completed' : ''}`}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`progress-steps__connector ${isCompleted ? 'progress-steps__connector--completed' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
