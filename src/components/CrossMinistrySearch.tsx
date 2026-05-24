import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, Sparkles } from 'lucide-react';

interface SearchStep {
  text: string;
  icon: string;
  delay: number;
}

interface CrossMinistrySearchProps {
  onComplete: () => void;
  steps?: SearchStep[];
}

const DEFAULT_STEPS: SearchStep[] = [
  { text: 'שומר את הפרופיל שלך...', icon: '💾', delay: 0 },
  { text: 'מתחבר למשרדי ממשלה ורשויות...', icon: '🏛️', delay: 1500 },
  { text: 'סורק זכויות בביטוח לאומי, רשויות מקומיות וקופות חולים...', icon: '🔍', delay: 3000 },
  { text: 'נמצאו זכויות נוספות!', icon: '✨', delay: 4500 },
];

export function CrossMinistrySearch({ onComplete, steps = DEFAULT_STEPS }: CrossMinistrySearchProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  // Respect reduced motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    // Activate steps one by one
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((step, i) => {
      timers.push(setTimeout(() => setActiveIndex(i), step.delay));
    });

    // Complete after last step + 1s
    const lastDelay = steps[steps.length - 1].delay;
    timers.push(setTimeout(() => setIsComplete(true), lastDelay + 1000));
    timers.push(setTimeout(() => onComplete(), lastDelay + 2000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete, steps]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" dir="rtl">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Main animated circle */}
        <div className="relative flex items-center justify-center">
          {/* Ripple effects */}
          {!isComplete && (
            <>
              <motion.div
                className="absolute w-32 h-32 rounded-full border-4 border-secondary/30"
                animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-32 h-32 rounded-full border-4 border-secondary/20"
                animate={{ scale: [1, 1.5, 2], opacity: [0.4, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
              />
            </>
          )}

          {/* Center icon */}
          <motion.div
            className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center hero-gradient shadow-xl"
            animate={isComplete ? { scale: [1, 1.1, 1] } : {}}
            transition={{ type: 'spring', damping: 10 }}
          >
            <AnimatePresence mode="wait">
              {isComplete ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12 }}
                >
                  <CheckCircle2 className="w-14 h-14 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Search className="w-14 h-14 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Progress steps */}
        <div className="space-y-3 max-w-sm mx-auto">
          {steps.map((step, i) => {
            const isActive = activeIndex === i;
            const isCompleted = activeIndex > i;
            const isVisible = activeIndex >= i;

            return (
              <AnimatePresence key={i}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-colors ${
                      isCompleted
                        ? 'bg-emerald-50 border-emerald-200'
                        : isActive
                        ? 'bg-primary/5 border-primary/20'
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <span className="text-xl shrink-0">{step.icon}</span>
                    <span className={`text-sm font-medium flex-1 text-right ${
                      isCompleted ? 'text-emerald-700' : isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.text}
                    </span>
                    <div className="shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isActive ? (
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full bg-secondary"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      ) : null}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Completion card */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 justify-center"
            >
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <div className="text-right">
                <p className="font-bold text-emerald-800">מעולה!</p>
                <p className="text-sm text-emerald-600">מעביר אותך לרשימת הזכויות שלך...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
