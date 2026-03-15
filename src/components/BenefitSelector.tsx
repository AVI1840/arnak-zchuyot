import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BenefitType, BENEFIT_LABELS } from '@/data/rightsDatabase';
import { cn } from '@/lib/utils';
import { 
  Check, 
  Activity, 
  Heart, 
  Car, 
  Baby, 
  Sun, 
  Coins, 
  HeartHandshake, 
  Flower2, 
  HardHat, 
  Shield, 
  Wallet, 
  Users,
  ArrowLeft,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BenefitSelectorProps {
  selectedBenefits: BenefitType[];
  onToggleBenefit: (benefit: BenefitType) => void;
  onContinue?: () => void;
}

// Lucide icons for each benefit type - smaller for compact grid
const BENEFIT_LUCIDE_ICONS: Record<BenefitType, React.ReactNode> = {
  general_disability: <Activity />,
  special_services: <HeartHandshake />,
  mobility: <Car />,
  child_disability: <Baby />,
  old_age: <Sun />,
  old_age_income_support: <Coins />,
  nursing: <Heart />,
  survivors: <Flower2 />,
  survivors_income_support: <Flower2 />,
  work_injury: <HardHat />,
  terror_victim: <Shield />,
  income_support: <Wallet />,
  alimony: <Users />,
  prisoners_of_zion: <Shield />,
  righteous_nations: <Heart />,
};

// Benefits ordered logically per requirements
const ALL_BENEFITS: BenefitType[] = [
  'old_age',
  'old_age_income_support',
  'nursing',
  'general_disability',
  'special_services',
  'mobility',
  'child_disability',
  'work_injury',
  'survivors',
  'survivors_income_support',
  'terror_victim',
  'income_support',
  'alimony',
  'prisoners_of_zion',
  'righteous_nations',
];

export function BenefitSelector({ selectedBenefits, onToggleBenefit, onContinue }: BenefitSelectorProps) {
  const isSelected = (benefit: BenefitType) => selectedBenefits.includes(benefit);
  const selectedCount = selectedBenefits.length;

  return (
    <TooltipProvider>
      <div className="space-y-4 pb-20">
        {/* Unified Icon Grid - Smaller buttons for overview, no category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3">
            {ALL_BENEFITS.map((benefit, index) => (
              <motion.button
                key={benefit}
                type="button"
                onClick={() => onToggleBenefit(benefit)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1.5 sm:gap-2',
                  'aspect-square p-2 sm:p-3 rounded-xl',
                  'transition-all duration-200 cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  isSelected(benefit)
                    ? 'bg-[#005792] text-primary-foreground shadow-lg border-2 border-amber-400'
                    : 'bg-card/90 backdrop-blur-sm text-muted-foreground border border-border/50 hover:border-primary/30 hover:bg-card hover:shadow-md'
                )}
                aria-pressed={isSelected(benefit)}
                aria-label={`${BENEFIT_LABELS[benefit]} - ${isSelected(benefit) ? 'נבחר' : 'לא נבחר'}`}
              >
                {/* Checkmark Badge - smaller */}
                <AnimatePresence>
                  {isSelected(benefit) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-sm"
                    >
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-900" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon - smaller */}
                <div className={cn(
                  'transition-colors duration-200',
                  isSelected(benefit) ? 'text-primary-foreground' : 'text-muted-foreground'
                )}>
                  {React.cloneElement(BENEFIT_LUCIDE_ICONS[benefit] as React.ReactElement, {
                    className: 'w-5 h-5 sm:w-6 sm:h-6'
                  })}
                </div>

                {/* Label - smaller */}
                <span className={cn(
                  'font-medium text-[10px] sm:text-xs text-center leading-tight px-0.5 line-clamp-2',
                  isSelected(benefit) ? 'text-primary-foreground' : 'text-foreground'
                )}>
                  {BENEFIT_LABELS[benefit]}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sticky Action Bar */}
        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl"
            >
              <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-foreground">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">
                    {selectedCount === 1 
                      ? 'קצבה אחת נבחרה' 
                      : `${selectedCount} קצבאות נבחרו`
                    }
                  </span>
                </div>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={onContinue}
                      size="lg"
                      className="bg-[#0368b0] hover:bg-[#025a8f] text-white font-bold shadow-lg px-8 gap-2 text-base min-h-[48px]"
                    >
                      המשך לפרטים
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>ממשיך למילוי פרטים ובדיקת זכאות</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}
