import { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { CinematicHero } from '@/components/CinematicHero';
import { BenefitSelector } from '@/components/BenefitSelector';
import { RightsCarousel } from '@/components/RightsCarousel';
import { RightDetailModal } from '@/components/RightDetailModal';
import { QuickFilter } from '@/components/QuickFilter';
import { RefinementWizard, benefitNeedsRefinement, getQuestionCount } from '@/components/RefinementWizard';
import { BenefitType, Domain, RightWithScore, DOMAIN_LABELS, BENEFIT_LABELS, getEligibleRights, sortRights, SortOption } from '@/data/rightsDatabase';
import { UserMetrics, DEFAULT_METRICS } from '@/types/userProfile';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RotateCcw, Info, Shield, ChevronDown, ChevronUp, Filter, Sparkles, ArrowUpDown, AlertCircle } from 'lucide-react';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'score', label: 'רלוונטיות' },
  { value: 'value', label: 'חיסכון משוער' },
  { value: 'popularity', label: 'פופולריות' },
  { value: 'automatic', label: 'קלות מימוש' },
];

const Index = () => {
  const [selectedBenefits, setSelectedBenefits] = useState<BenefitType[]>([]);
  const [userMetrics, setUserMetrics] = useState<UserMetrics>(DEFAULT_METRICS);
  const [isRefined, setIsRefined] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [isSelectorExpanded, setIsSelectorExpanded] = useState(true);
  const [selectedRight, setSelectedRight] = useState<RightWithScore | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Domain | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const resultsRef = useRef<HTMLDivElement>(null);

  // Check if any selected benefit needs refinement
  const needsRefinement = useMemo(() => {
    return selectedBenefits.some(b => benefitNeedsRefinement(b)) && !isRefined;
  }, [selectedBenefits, isRefined]);

  const questionCount = useMemo(() => {
    return getQuestionCount(selectedBenefits);
  }, [selectedBenefits]);

  const handleToggleBenefit = useCallback((benefit: BenefitType) => {
    setSelectedBenefits((prev) => {
      const newBenefits = prev.includes(benefit)
        ? prev.filter((b) => b !== benefit)
        : [...prev, benefit];
      
      // Reset refinement status when benefits change
      setIsRefined(false);
      return newBenefits;
    });
  }, []);

  const handleReset = useCallback(() => {
    setSelectedBenefits([]);
    setUserMetrics(DEFAULT_METRICS);
    setIsRefined(false);
    setIsSelectorExpanded(true);
    setActiveFilter('all');
  }, []);

  const handleWizardComplete = useCallback((metrics: UserMetrics) => {
    setUserMetrics(metrics);
    setIsRefined(true);
    setShowWizard(false);
    setIsSelectorExpanded(false);
    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const eligibleRights = useMemo(
    () => getEligibleRights(selectedBenefits, isRefined ? userMetrics : undefined),
    [selectedBenefits, userMetrics, isRefined]
  );

  // Get unique domains from eligible rights
  const availableDomains = useMemo(() => {
    const domains = new Set<Domain>();
    eligibleRights.forEach((right) => domains.add(right.domain));
    return Array.from(domains);
  }, [eligibleRights]);

  // Filter and sort rights based on active filter and sort option
  const filteredRights = useMemo(() => {
    let rights = activeFilter === 'all' 
      ? eligibleRights 
      : eligibleRights.filter((right) => right.domain === activeFilter);
    
    // Apply sorting
    return sortRights(rights, sortBy);
  }, [eligibleRights, activeFilter, sortBy]);

  // Group rights by domain for carousels (apply sorting within each group)
  const rightsByDomain = useMemo(() => {
    const grouped: Record<Domain, RightWithScore[]> = {
      housing: [],
      health: [],
      transport: [],
      utilities: [],
      financial: [],
      welfare: [],
      employment: [],
      legal: [],
    };
    
    filteredRights.forEach((right) => {
      grouped[right.domain].push(right);
    });
    
    return grouped;
  }, [filteredRights]);

  // Get top sorted results (first 6 items based on current sort)
  const topRecommendations = useMemo(() => {
    return filteredRights.slice(0, 6);
  }, [filteredRights]);

  // Removed: totalSavings calculation - no unreliable savings display per requirements
  // topRight kept for internal use but not displayed as savings
  const topRight = useMemo(() => {
    if (eligibleRights.length === 0) return null;
    return {
      title: eligibleRights[0].title,
      value: eligibleRights[0].value_display,
    };
  }, [eligibleRights]);

  const handleStartClaiming = () => {
    if (selectedBenefits.length > 0) {
      // If benefits need refinement, show wizard first
      if (needsRefinement && questionCount > 0) {
        setShowWizard(true);
      } else {
        setIsSelectorExpanded(false);
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setIsSelectorExpanded(true);
    }
  };

  const handleRightClick = (right: RightWithScore) => {
    setSelectedRight(right);
    setIsModalOpen(true);
  };

  const hasResults = eligibleRights.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Cinematic Hero Section - no savings display */}
        <CinematicHero
          totalSavings=""
          topRight={topRight}
          hasResults={hasResults}
          onStartClaiming={handleStartClaiming}
        />

        {/* Benefit Selector Section */}
        <motion.section
          layout
          className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
        >
          <button
            onClick={() => setIsSelectorExpanded(!isSelectorExpanded)}
            className="w-full flex items-center justify-between p-5 text-right focus-ring rounded-t-2xl hover:bg-accent/50 transition-colors"
            aria-expanded={isSelectorExpanded}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  הקצבאות שלי
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedBenefits.length === 0
                    ? 'בחר את הקצבאות שאתה מקבל'
                    : `${selectedBenefits.length} קצבאות נבחרו • ${eligibleRights.length} זכויות נמצאו`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedBenefits.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                  className="text-muted-foreground"
                >
                  <RotateCcw className="w-4 h-4 ml-1" />
                  איפוס
                </Button>
              )}
              {isSelectorExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isSelectorExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 border-t border-border">
                  <div className="pt-5">
                    <BenefitSelector
                      selectedBenefits={selectedBenefits}
                      onToggleBenefit={handleToggleBenefit}
                      onContinue={() => {
                        if (needsRefinement && questionCount > 0) {
                          setShowWizard(true);
                        } else {
                          setIsSelectorExpanded(false);
                          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    />
                  </div>

                  {/* Refinement Wizard Trigger — show questions immediately */}
                  {selectedBenefits.length > 0 && needsRefinement && questionCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5"
                    >
                      <RefinementWizard
                        selectedBenefits={selectedBenefits}
                        userMetrics={userMetrics}
                        onComplete={handleWizardComplete}
                        onClose={() => {
                          setIsSelectorExpanded(false);
                          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        inline
                      />
                    </motion.div>
                  )}

                  {/* Refinement Complete Badge */}
                  {isRefined && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-5 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-emerald-600">
                          התוצאות מותאמות אישית לפי הפרטים שלך
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowWizard(true)}
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        ערוך
                      </Button>
                    </motion.div>
                  )}

                  {/* Disclaimer */}
                  <div className="mt-5 p-3 bg-muted/50 rounded-lg flex gap-3">
                    <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      המידע המוצג באתר זה הוא למטרות מידע כללי בלבד ואינו מהווה ייעוץ משפטי.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Quick Filter Bar */}
        {hasResults && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-4 space-y-4"
          >
            {/* Filter and Sort Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h3 className="text-sm font-medium text-muted-foreground">סנן לפי קטגוריה:</h3>
              </div>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground hidden sm:inline">מיין לפי:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[140px] h-9 text-sm" aria-label="מיין לפי">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <QuickFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              availableDomains={availableDomains}
            />

            {/* Profile warning removed — questions now inline */}
          </motion.section>
        )}

        {/* Results Section - Horizontal Carousels */}
        <div ref={resultsRef} className="space-y-10 pt-4">
          {/* Results Summary — show user selections before results */}
          {hasResults && isRefined && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#e8f3ff] rounded-xl p-4 border border-[#0368b0]/20"
            >
              <h4 className="font-bold text-[#0c3058] mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                סיכום הבחירות שלך
              </h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedBenefits.map((b) => (
                  <span key={b} className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[#0c3058] text-sm font-medium border border-[#0368b0]/20">
                    {BENEFIT_LABELS[b]}
                  </span>
                ))}
              </div>
              {userMetrics.medical_disability_pct > 0 && (
                <p className="text-sm text-[#266794]">נכות רפואית: {userMetrics.medical_disability_pct}%</p>
              )}
              {userMetrics.incapacity_pct > 0 && (
                <p className="text-sm text-[#266794]">אי-כושר: {userMetrics.incapacity_pct}%</p>
              )}
              {userMetrics.nursing_level > 0 && (
                <p className="text-sm text-[#266794]">רמת סיעוד: {userMetrics.nursing_level}</p>
              )}
              {userMetrics.is_income_support && (
                <p className="text-sm text-[#266794]">מקבל השלמת הכנסה</p>
              )}
              {userMetrics.age > 0 && (
                <p className="text-sm text-[#266794]">גיל: {userMetrics.age}+</p>
              )}
              <p className="text-sm font-medium text-[#0368b0] mt-2">
                נמצאו {eligibleRights.length} זכויות עבורך
              </p>
            </motion.div>
          )}
          {/* Empty State */}
          {!hasResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                סמן את הקצבאות שאתה מקבל
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                בחר לפחות קצבה אחת מהרשימה למעלה כדי לגלות את הזכויות הנוספות שמגיעות לך
              </p>
            </motion.div>
          )}

          {/* Filtered Results Notice */}
          {hasResults && activeFilter !== 'all' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between bg-secondary/10 rounded-xl px-5 py-3 border border-secondary/20"
            >
              <p className="text-sm text-foreground">
                מציג <span className="font-bold">{filteredRights.length}</span> זכויות בקטגוריה:{' '}
                <span className="font-bold text-secondary">{DOMAIN_LABELS[activeFilter]}</span>
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilter('all')}
                className="text-secondary hover:text-secondary"
              >
                הצג הכל
              </Button>
            </motion.div>
          )}

          {/* Top Sorted Results Row (only show when viewing all) */}
          {/* Removed "ממוינים עבורך" per requirements */}

          {/* Domain-based Carousels */}
          {Object.entries(rightsByDomain).map(([domain, rights]) => {
            if (rights.length === 0) return null;
            return (
              <RightsCarousel
                key={domain}
                title={`${DOMAIN_LABELS[domain as Domain]}`}
                rights={rights}
                onRightClick={handleRightClick}
              />
            );
          })}

          {/* Prominent Reset Button at bottom of results */}
          {hasResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-8"
            >
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="gap-2 text-[#0368b0] border-[#0368b0]/30 hover:bg-[#e8f3ff] px-8"
              >
                <RotateCcw className="w-5 h-5" />
                איפוס וחיפוש מחדש
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Right Detail Modal */}
      <RightDetailModal
        right={selectedRight}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Refinement Wizard — now inline, modal removed */}

      {/* Footer with Reset Button */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">ארנק זכויות</span>
            </div>

            {/* Reset Button - per requirements, placed at footer */}
            {selectedBenefits.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground gap-2"
                aria-label="איפוס כל הבחירות"
              >
                <RotateCcw className="w-4 h-4" />
                איפוס בחירות
              </Button>
            )}

            <p className="text-sm text-muted-foreground text-center">
              אביעד יצחקי, מינהל גמלאות | ביטוח לאומי | v1.0 | מרץ 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

