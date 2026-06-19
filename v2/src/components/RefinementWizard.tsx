import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, Heart, Percent, Coins, Calendar, Accessibility } from 'lucide-react';
import { BenefitType, BENEFIT_LABELS, UserMetrics } from '@/data/types';
import './RefinementWizard.css';

interface WizardQuestion {
  id: string;
  benefit: BenefitType;
  question: string;
  type: 'toggle' | 'select';
  metricKey: keyof UserMetrics;
  options?: { value: number; label: string }[];
  icon: React.ReactNode;
}

const WIZARD_QUESTIONS: WizardQuestion[] = [
  { id: 'medical_pct', benefit: 'general_disability', question: 'מהו אחוז הנכות הרפואית שנקבע לך בוועדה?', type: 'select', metricKey: 'medical_disability_pct', options: [{ value: 40, label: 'פחות מ-70%' }, { value: 70, label: '70%-79%' }, { value: 80, label: '80%-89%' }, { value: 90, label: '90%-99%' }, { value: 100, label: '100%' }], icon: <Heart size={20} /> },
  { id: 'incapacity_pct', benefit: 'general_disability', question: 'מהי דרגת אי-הכושר שנקבעה לך?', type: 'select', metricKey: 'incapacity_pct', options: [{ value: 60, label: '60%' }, { value: 65, label: '65%' }, { value: 74, label: '74%' }, { value: 75, label: '75%' }, { value: 100, label: '100%' }], icon: <Percent size={20} /> },
  { id: 'old_age_income_support', benefit: 'old_age', question: 'האם אתה מקבל השלמת הכנסה?', type: 'toggle', metricKey: 'is_income_support', icon: <Coins size={20} /> },
  { id: 'age_question', benefit: 'old_age', question: 'באיזה טווח גילאים אתה?', type: 'select', metricKey: 'age', options: [{ value: 67, label: '67-71' }, { value: 72, label: '72-89' }, { value: 90, label: '90+' }], icon: <Calendar size={20} /> },
  { id: 'old_age_is_age', benefit: 'old_age_income_support', question: 'באיזה טווח גילאים אתה?', type: 'select', metricKey: 'age', options: [{ value: 67, label: '67-71' }, { value: 72, label: '72-89' }, { value: 90, label: '90+' }], icon: <Calendar size={20} /> },
  { id: 'nursing_level', benefit: 'nursing', question: 'מהי רמת גמלת הסיעוד שנקבעה לך?', type: 'select', metricKey: 'nursing_level', options: [{ value: 1, label: 'רמה 1' }, { value: 2, label: 'רמה 2' }, { value: 3, label: 'רמה 3' }, { value: 4, label: 'רמה 4' }, { value: 5, label: 'רמה 5' }, { value: 6, label: 'רמה 6' }], icon: <Heart size={20} /> },
  { id: 'nursing_age', benefit: 'nursing', question: 'באיזה טווח גילאים אתה?', type: 'select', metricKey: 'age', options: [{ value: 67, label: '67-71' }, { value: 72, label: '72-89' }, { value: 90, label: '90+' }], icon: <Calendar size={20} /> },
  { id: 'mobility_pct', benefit: 'mobility', question: 'מהי דרגת המוגבלות בניידות?', type: 'select', metricKey: 'mobility_pct', options: [{ value: 40, label: 'פחות מ-50%' }, { value: 50, label: '50%-79%' }, { value: 80, label: '80%-89%' }, { value: 90, label: '90%' }, { value: 100, label: '100%' }], icon: <Accessibility size={20} /> },
  { id: 'wheelchair', benefit: 'mobility', question: 'האם אתה משתמש בכיסא גלגלים?', type: 'toggle', metricKey: 'uses_wheelchair', icon: <Accessibility size={20} /> },
  { id: 'special_services_rate', benefit: 'special_services', question: 'מהו שיעור גמלת השירותים המיוחדים?', type: 'select', metricKey: 'special_services_rate', options: [{ value: 50, label: '50%' }, { value: 112, label: '112%' }, { value: 188, label: '188%' }, { value: 235, label: '235%' }], icon: <Heart size={20} /> },
  { id: 'survivors_income', benefit: 'survivors', question: 'האם אתה מקבל השלמת הכנסה?', type: 'toggle', metricKey: 'is_income_support', icon: <Coins size={20} /> },
  { id: 'work_injury_pct', benefit: 'work_injury', question: 'מהו אחוז הנכות הרפואית מעבודה?', type: 'select', metricKey: 'medical_disability_pct', options: [{ value: 10, label: 'פחות מ-20%' }, { value: 20, label: '20%-89%' }, { value: 90, label: '90%-99%' }, { value: 100, label: '100%' }], icon: <Heart size={20} /> },
  { id: 'terror_pct', benefit: 'terror_victim', question: 'מהו אחוז הנכות כנפגע איבה?', type: 'select', metricKey: 'medical_disability_pct', options: [{ value: 10, label: '10%-18%' }, { value: 19, label: '19%-49%' }, { value: 50, label: '50%-99%' }, { value: 100, label: '100%' }], icon: <Heart size={20} /> },
  { id: 'child_disability_pct', benefit: 'child_disability', question: 'מהו אחוז הנכות הרפואית של הילד?', type: 'select', metricKey: 'medical_disability_pct', options: [{ value: 40, label: 'פחות מ-75%' }, { value: 75, label: '75%-89%' }, { value: 90, label: '90%' }, { value: 100, label: '100%' }], icon: <Heart size={20} /> },
];

export function benefitNeedsRefinement(benefit: BenefitType): boolean {
  return WIZARD_QUESTIONS.some(q => q.benefit === benefit);
}

export function getQuestionCount(selectedBenefits: BenefitType[]): number {
  return WIZARD_QUESTIONS.filter(q => selectedBenefits.includes(q.benefit)).length;
}

interface RefinementWizardProps {
  selectedBenefits: BenefitType[];
  userMetrics: UserMetrics;
  onComplete: (metrics: UserMetrics) => void;
  onClose: () => void;
}

export function RefinementWizard({ selectedBenefits, userMetrics, onComplete, onClose }: RefinementWizardProps) {
  const relevantQuestions = useMemo(() => {
    let askedAge = false;
    return WIZARD_QUESTIONS.filter((q) => {
      if (!selectedBenefits.includes(q.benefit)) return false;
      if (q.id === 'old_age_income_support' && selectedBenefits.includes('old_age_income_support')) return false;
      if (q.id === 'survivors_income' && selectedBenefits.includes('survivors_income_support')) return false;
      if (q.metricKey === 'age') { if (askedAge) return false; askedAge = true; }
      return true;
    });
  }, [selectedBenefits]);

  const [currentStep, setCurrentStep] = useState(0);
  const [metrics, setMetrics] = useState<UserMetrics>({ ...userMetrics });

  const totalSteps = relevantQuestions.length;
  const currentQuestion = relevantQuestions[currentStep];

  if (!currentQuestion) return null;

  const handleMetricChange = (key: keyof UserMetrics, value: number | boolean) => {
    setMetrics((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(s => s + 1);
    else onComplete(metrics);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  return (
    <div className="wizard">
      <div className="wizard__header">
        <Sparkles size={18} />
        <h4 className="wizard__title">שאלות לדיוק התוצאות</h4>
        <span className="wizard__count">({totalSteps} שאלות)</span>
      </div>

      <div className="wizard__question">
        <div className="wizard__benefit-tag">
          {currentQuestion.icon}
          <span>{BENEFIT_LABELS[currentQuestion.benefit]}</span>
        </div>
        <h3 className="wizard__question-text">{currentQuestion.question}</h3>

        <div className="wizard__input-area">
          {currentQuestion.type === 'toggle' && (
            <div className="wizard__toggle-grid">
              <button
                className={`wizard__toggle-option ${metrics[currentQuestion.metricKey] === true ? 'wizard__toggle-option--active-yes' : ''}`}
                onClick={() => handleMetricChange(currentQuestion.metricKey, true)}
                aria-pressed={metrics[currentQuestion.metricKey] === true}
              >
                <Check size={24} />
                <span>כן</span>
              </button>
              <button
                className={`wizard__toggle-option ${metrics[currentQuestion.metricKey] === false ? 'wizard__toggle-option--active-no' : ''}`}
                onClick={() => handleMetricChange(currentQuestion.metricKey, false)}
                aria-pressed={metrics[currentQuestion.metricKey] === false}
              >
                <span className="wizard__x-icon">✕</span>
                <span>לא</span>
              </button>
            </div>
          )}

          {currentQuestion.type === 'select' && currentQuestion.options && (
            <div className="wizard__select-grid">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  className={`wizard__select-option ${metrics[currentQuestion.metricKey] === option.value ? 'wizard__select-option--active' : ''}`}
                  onClick={() => handleMetricChange(currentQuestion.metricKey, option.value)}
                  aria-pressed={metrics[currentQuestion.metricKey] === option.value}
                >
                  {option.label}
                  {metrics[currentQuestion.metricKey] === option.value && (
                    <span className="wizard__select-check"><Check size={12} /></span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="wizard__footer">
        <button className="btn btn-ghost" onClick={handlePrevious} disabled={currentStep === 0}>
          <ChevronRight size={16} /> הקודם
        </button>
        <span className="wizard__progress">{currentStep + 1} / {totalSteps}</span>
        <button className="btn btn-primary" onClick={handleNext}>
          {currentStep === totalSteps - 1
            ? <><Check size={16} /> סיום והצגת תוצאות</>
            : <>הבא <ChevronLeft size={16} /></>
          }
        </button>
      </div>
    </div>
  );
}
