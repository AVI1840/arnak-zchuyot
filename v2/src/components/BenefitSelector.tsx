import {
  Activity, HeartHandshake, Car, Baby, Sun, Coins,
  Heart, Flower2, HardHat, Shield, Wallet, Users,
  ArrowLeft, Check
} from 'lucide-react';
import { BenefitType, BENEFIT_LABELS, BENEFIT_TOOLTIPS, ALL_BENEFITS } from '@/data/types';
import './BenefitSelector.css';

interface BenefitSelectorProps {
  selectedBenefits: BenefitType[];
  onToggleBenefit: (benefit: BenefitType) => void;
  onContinue?: () => void;
}

const BENEFIT_ICONS: Record<BenefitType, React.ReactNode> = {
  general_disability: <Activity size={22} />,
  special_services: <HeartHandshake size={22} />,
  mobility: <Car size={22} />,
  child_disability: <Baby size={22} />,
  old_age: <Sun size={22} />,
  old_age_income_support: <Coins size={22} />,
  nursing: <Heart size={22} />,
  survivors: <Flower2 size={22} />,
  survivors_income_support: <Flower2 size={22} />,
  work_injury: <HardHat size={22} />,
  terror_victim: <Shield size={22} />,
  income_support: <Wallet size={22} />,
  alimony: <Users size={22} />,
  prisoners_of_zion: <Shield size={22} />,
  righteous_nations: <Heart size={22} />,
};

export function BenefitSelector({ selectedBenefits, onToggleBenefit, onContinue }: BenefitSelectorProps) {
  const isSelected = (benefit: BenefitType) => selectedBenefits.includes(benefit);
  const selectedCount = selectedBenefits.length;

  return (
    <div className="benefit-selector">
      <div className="benefit-selector__grid" role="group" aria-label="בחירת קצבאות">
        {ALL_BENEFITS.map((benefit) => (
          <button
            key={benefit}
            type="button"
            onClick={() => onToggleBenefit(benefit)}
            className={`benefit-selector__item ${isSelected(benefit) ? 'benefit-selector__item--selected' : ''}`}
            aria-pressed={isSelected(benefit)}
            aria-label={`${BENEFIT_LABELS[benefit]} - ${isSelected(benefit) ? 'נבחר' : 'לא נבחר'}`}
            title={BENEFIT_TOOLTIPS[benefit]}
          >
            {isSelected(benefit) && (
              <span className="benefit-selector__check" aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </span>
            )}
            <span className="benefit-selector__icon" aria-hidden="true">
              {BENEFIT_ICONS[benefit]}
            </span>
            <span className="benefit-selector__label">
              {BENEFIT_LABELS[benefit]}
            </span>
          </button>
        ))}
      </div>

      {selectedCount > 0 && (
        <div className="benefit-selector__action-bar">
          <div className="benefit-selector__action-bar-inner container">
            <span className="benefit-selector__count">
              <Check size={16} />
              {selectedCount === 1 ? 'קצבה אחת נבחרה' : `${selectedCount} קצבאות נבחרו`}
            </span>
            <button
              className="btn btn-primary benefit-selector__continue"
              onClick={onContinue}
            >
              המשך לפרטים
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
