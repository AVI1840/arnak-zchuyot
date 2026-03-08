import { motion } from 'framer-motion';
import { BenefitType, BENEFIT_LABELS, BENEFIT_ICONS } from '@/data/rightsDatabase';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface BenefitSelectorCompactProps {
  selectedBenefits: BenefitType[];
  onToggleBenefit: (benefit: BenefitType) => void;
}

const BENEFITS_LIST: BenefitType[] = [
  'general_disability',
  'special_services',
  'mobility',
  'child_disability',
  'old_age',
  'old_age_income_support',
  'nursing',
  'survivors',
  'survivors_income_support',
  'work_injury',
  'terror_victim',
  'income_support',
  'alimony',
];

export function BenefitSelectorCompact({
  selectedBenefits,
  onToggleBenefit,
}: BenefitSelectorCompactProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {BENEFITS_LIST.map((benefit) => {
        const isSelected = selectedBenefits.includes(benefit);
        return (
          <motion.button
            key={benefit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggleBenefit(benefit)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all font-medium text-sm',
              isSelected
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent'
            )}
            aria-pressed={isSelected}
          >
            <span className="text-base" role="img" aria-hidden="true">
              {BENEFIT_ICONS[benefit]}
            </span>
            <span>{BENEFIT_LABELS[benefit]}</span>
            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-primary-foreground/20 rounded-full p-0.5"
              >
                <Check className="w-3 h-3" />
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
