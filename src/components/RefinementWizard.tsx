import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BenefitType, BENEFIT_LABELS } from '@/data/rightsDatabase';
import { UserProfile } from '@/types/userProfile';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Sparkles,
  Heart,
  Percent,
  Accessibility,
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardQuestion {
  id: string;
  benefit: BenefitType;
  question: string;
  explanation: string;
  type: 'slider' | 'toggle' | 'select';
  metricKey: keyof UserProfile['metrics'];
  options?: { value: number; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  icon: React.ReactNode;
}

// Define all wizard questions based on NII logic
const WIZARD_QUESTIONS: WizardQuestion[] = [
  // General Disability Questions
  {
    id: 'medical_pct',
    benefit: 'general_disability',
    question: 'מהו אחוז הנכות הרפואית שלך?',
    explanation: 'נתון זה יקבע אם מגיע לך פטור ממס הכנסה והנחה בארנונה.',
    type: 'slider',
    metricKey: 'medical_disability_pct',
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 'incapacity_pct',
    benefit: 'general_disability',
    question: 'מהי דרגת אי-הכושר שנקבעה לך?',
    explanation: 'דרגת אי-כושר של 75% ומעלה מזכה בהנחות מיוחדות בארנונה ובמים.',
    type: 'select',
    metricKey: 'incapacity_pct',
    options: [
      { value: 60, label: '60%' },
      { value: 65, label: '65%' },
      { value: 74, label: '74%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ],
    icon: <Percent className="w-6 h-6" />,
  },
  // Old Age Questions
  {
    id: 'old_age_income_support',
    benefit: 'old_age',
    question: 'האם אתה מקבל השלמת הכנסה?',
    explanation: 'השלמת הכנסה מזכה בהנחה בחשמל ובהטבות נוספות. שים לב: הנחה בארנונה לאזרחים ותיקים תלויה ברשות המקומית ואינה מחושבת כאן - יש לפנות לרשות המקומית שלך.',
    type: 'toggle',
    metricKey: 'is_income_support',
    icon: <Coins className="w-6 h-6" />,
  },
  // Nursing Questions
  {
    id: 'nursing_level',
    benefit: 'nursing',
    question: 'איזו רמת זכאות סיעוד נקבעה לך?',
    explanation: 'רמת סיעוד 3 ומעלה מזכה בהנחה במים. רמה 4-6 מזכה בהנחה בחשמל.',
    type: 'select',
    metricKey: 'nursing_level',
    options: [
      { value: 1, label: 'רמה 1' },
      { value: 2, label: 'רמה 2' },
      { value: 3, label: 'רמה 3' },
      { value: 4, label: 'רמה 4' },
      { value: 5, label: 'רמה 5' },
      { value: 6, label: 'רמה 6' },
    ],
    icon: <Heart className="w-6 h-6" />,
  },
  // Mobility Questions
  {
    id: 'mobility_pct',
    benefit: 'mobility',
    question: 'מהו אחוז המוגבלות בניידות שנקבע לך?',
    explanation: 'ניידות 90% ומעלה מזכה בהנחה בארנונה.',
    type: 'slider',
    metricKey: 'mobility_pct',
    min: 0,
    max: 100,
    step: 10,
    unit: '%',
    icon: <Accessibility className="w-6 h-6" />,
  },
  // Special Services Questions
  {
    id: 'special_services_rate',
    benefit: 'special_services',
    question: 'מהו שיעור גמלת השירותים המיוחדים שלך?',
    explanation: 'שיעור 112% ומעלה מזכה בהנחה בתעריף מים.',
    type: 'select',
    metricKey: 'special_services_rate',
    options: [
      { value: 50, label: '50%' },
      { value: 100, label: '100%' },
      { value: 112, label: '112%' },
      { value: 150, label: '150%' },
      { value: 188, label: '188%' },
    ],
    icon: <Heart className="w-6 h-6" />,
  },
  // Survivors Questions
  {
    id: 'survivors_income_support',
    benefit: 'survivors',
    question: 'האם אתה מקבל השלמת הכנסה?',
    explanation: 'השלמת הכנסה לשארים מזכה בהנחות נוספות בחשמל ובארנונה.',
    type: 'toggle',
    metricKey: 'is_income_support',
    icon: <Coins className="w-6 h-6" />,
  },
];

interface RefinementWizardProps {
  selectedBenefits: BenefitType[];
  userMetrics: UserProfile['metrics'];
  onComplete: (metrics: UserProfile['metrics']) => void;
  onClose: () => void;
}

// Helper to check if a benefit needs refinement questions
export function benefitNeedsRefinement(benefit: BenefitType): boolean {
  return WIZARD_QUESTIONS.some(q => q.benefit === benefit);
}

// Get question count for selected benefits
export function getQuestionCount(selectedBenefits: BenefitType[]): number {
  return WIZARD_QUESTIONS.filter(q => selectedBenefits.includes(q.benefit)).length;
}

export function RefinementWizard({
  selectedBenefits,
  userMetrics,
  onComplete,
  onClose,
}: RefinementWizardProps) {
  // Get relevant questions based on selected benefits
  const relevantQuestions = useMemo(() => {
    return WIZARD_QUESTIONS.filter((q) => selectedBenefits.includes(q.benefit));
  }, [selectedBenefits]);

  const [currentStep, setCurrentStep] = useState(0);
  const [metrics, setMetrics] = useState<UserProfile['metrics']>({ ...userMetrics });

  const totalSteps = relevantQuestions.length;
  const currentQuestion = relevantQuestions[currentStep];
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  const handleMetricChange = useCallback(
    (key: keyof UserProfile['metrics'], value: number | boolean) => {
      setMetrics((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(metrics);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    onComplete(metrics);
  };

  // If no questions needed, auto-complete
  if (relevantQuestions.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Wizard Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl border border-border overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-l from-primary to-secondary p-6 text-primary-foreground">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors focus:ring-2 focus:ring-primary-foreground/50"
              aria-label="סגור"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium text-sm">התאמה אישית</span>
            </div>
          </div>

          <h2 className="text-xl font-bold">רק עוד {totalSteps - currentStep} שאלות...</h2>
          <p className="text-primary-foreground/80 text-sm mt-1">
            לחישוב הזכויות המדויקות שלך
          </p>

          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-2 bg-primary-foreground/20" />
            <div className="flex justify-between mt-2 text-xs text-primary-foreground/70">
              <span>שלב {currentStep + 1} מתוך {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Benefit Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {currentQuestion.icon}
                <span>{BENEFIT_LABELS[currentQuestion.benefit]}</span>
              </div>

              {/* Question */}
              <h3 className="text-2xl font-bold text-foreground leading-tight">
                {currentQuestion.question}
              </h3>

              {/* Explanation */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {currentQuestion.explanation}
              </p>

              {/* Input Area */}
              <div className="py-6">
                {currentQuestion.type === 'slider' && (
                  <SliderInput
                    value={metrics[currentQuestion.metricKey] as number}
                    onChange={(val) => handleMetricChange(currentQuestion.metricKey, val)}
                    min={currentQuestion.min || 0}
                    max={currentQuestion.max || 100}
                    step={currentQuestion.step || 1}
                    unit={currentQuestion.unit || ''}
                  />
                )}

                {currentQuestion.type === 'toggle' && (
                  <ToggleInput
                    value={metrics[currentQuestion.metricKey] as boolean}
                    onChange={(val) => handleMetricChange(currentQuestion.metricKey, val)}
                  />
                )}

                {currentQuestion.type === 'select' && currentQuestion.options && (
                  <SelectInput
                    value={metrics[currentQuestion.metricKey] as number}
                    options={currentQuestion.options}
                    onChange={(val) => handleMetricChange(currentQuestion.metricKey, val)}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              הקודם
            </Button>

            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              דלג לתוצאות
            </Button>

            <Button
              onClick={handleNext}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-1"
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  סיום
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  הבא
                  <ChevronLeft className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Slider Input Component - FIXED: 0% on left, 100% on right
interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

function SliderInput({ value, onChange, min, max, step, unit }: SliderInputProps) {
  return (
    <div className="space-y-6">
      {/* Value Display */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 border-4 border-secondary">
          <span className="text-3xl font-bold text-foreground">
            {value}{unit}
          </span>
        </div>
      </div>

      {/* Slider - Direction fixed: min on left, max on right */}
      <div className="px-2" dir="ltr">
        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={min}
          max={max}
          step={step}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  );
}

// Toggle Input Component (Yes/No Cards)
interface ToggleInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function ToggleInput({ value, onChange }: ToggleInputProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onChange(true)}
        className={cn(
          'relative p-6 rounded-2xl border-2 transition-all duration-200 text-center',
          'focus:ring-2 focus:ring-primary focus:ring-offset-2',
          value
            ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
            : 'border-border bg-card hover:border-primary/50'
        )}
        aria-pressed={value}
        aria-label="כן"
      >
        <div className={cn(
          'w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center',
          value ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'
        )}>
          <Check className="w-8 h-8" />
        </div>
        <span className={cn(
          'font-bold text-lg',
          value ? 'text-emerald-600' : 'text-foreground'
        )}>
          כן
        </span>
        {value && (
          <motion.div
            layoutId="toggle-indicator"
            className="absolute top-2 left-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onChange(false)}
        className={cn(
          'relative p-6 rounded-2xl border-2 transition-all duration-200 text-center',
          'focus:ring-2 focus:ring-primary focus:ring-offset-2',
          !value
            ? 'border-muted-foreground bg-muted/50 shadow-lg'
            : 'border-border bg-card hover:border-primary/50'
        )}
        aria-pressed={!value}
        aria-label="לא"
      >
        <div className={cn(
          'w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center',
          !value ? 'bg-muted-foreground text-background' : 'bg-muted text-muted-foreground'
        )}>
          <X className="w-8 h-8" />
        </div>
        <span className={cn(
          'font-bold text-lg',
          !value ? 'text-foreground' : 'text-foreground'
        )}>
          לא
        </span>
        {!value && (
          <motion.div
            layoutId="toggle-indicator"
            className="absolute top-2 left-2 w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-background" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}

// Select Input Component (Option Cards)
interface SelectInputProps {
  value: number;
  options: { value: number; label: string }[];
  onChange: (value: number) => void;
}

function SelectInput({ value, options, onChange }: SelectInputProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative p-4 rounded-xl border-2 transition-all duration-200 text-center',
            'focus:ring-2 focus:ring-primary focus:ring-offset-2',
            value === option.value
              ? 'border-secondary bg-secondary/10 shadow-lg shadow-secondary/10'
              : 'border-border bg-card hover:border-primary/50'
          )}
          aria-pressed={value === option.value}
          aria-label={option.label}
        >
          <span className={cn(
            'font-bold text-lg',
            value === option.value ? 'text-secondary' : 'text-foreground'
          )}>
            {option.label}
          </span>
          {value === option.value && (
            <motion.div
              layoutId="select-indicator"
              className="absolute top-1 left-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-secondary-foreground" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
