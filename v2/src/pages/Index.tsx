import { useMemo, useCallback, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { BenefitSelector } from '@/components/BenefitSelector';
import { RefinementWizard, benefitNeedsRefinement, getQuestionCount } from '@/components/RefinementWizard';
import { QuickFilter } from '@/components/QuickFilter';
import { StatsBar } from '@/components/StatsBar';
import { ProgressSteps } from '@/components/ProgressSteps';
import { RightCard } from '@/components/RightCard';
import { RightDetailModal } from '@/components/RightDetailModal';
import { getEligibleRights, countRightsByDomain } from '@/data/rightsDatabase';
import { BenefitType, Domain, RightWithScore, DOMAIN_LABELS, BENEFIT_LABELS, UserMetrics, DEFAULT_METRICS } from '@/data/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { RotateCcw, Filter, ChevronDown, ChevronUp, Shield, Info, Sparkles, Search, X } from 'lucide-react';
import './Index.css';

const Index = () => {
  const [selectedBenefits, setSelectedBenefits] = useLocalStorage<BenefitType[]>('arnak-v2-benefits', []);
  const [userMetrics, setUserMetrics] = useLocalStorage<UserMetrics>('arnak-v2-metrics', DEFAULT_METRICS);
  const [isRefined, setIsRefined] = useLocalStorage<boolean>('arnak-v2-refined', false);
  const [isSelectorExpanded, setIsSelectorExpanded] = useState(true);
  const [selectedRight, setSelectedRight] = useState<RightWithScore | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Domain | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const needsRefinement = useMemo(() => {
    return selectedBenefits.some(b => benefitNeedsRefinement(b)) && !isRefined;
  }, [selectedBenefits, isRefined]);

  const questionCount = useMemo(() => getQuestionCount(selectedBenefits), [selectedBenefits]);

  const handleToggleBenefit = useCallback((benefit: BenefitType) => {
    setSelectedBenefits((prev) => {
      const newBenefits = prev.includes(benefit) ? prev.filter(b => b !== benefit) : [...prev, benefit];
      setIsRefined(false);
      return newBenefits;
    });
  }, [setSelectedBenefits, setIsRefined]);

  const handleReset = useCallback(() => {
    setSelectedBenefits([]);
    setUserMetrics(DEFAULT_METRICS);
    setIsRefined(false);
    setIsSelectorExpanded(true);
    setActiveFilter('all');
    setSearchQuery('');
  }, [setSelectedBenefits, setUserMetrics, setIsRefined]);

  const handleWizardComplete = useCallback((metrics: UserMetrics) => {
    setUserMetrics(metrics);
    setIsRefined(true);
    setIsSelectorExpanded(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
  }, [setUserMetrics, setIsRefined]);

  const handleShowResults = useCallback(() => {
    setIsSelectorExpanded(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
  }, []);

  const eligibleRights = useMemo(
    () => getEligibleRights(selectedBenefits, isRefined ? userMetrics : undefined),
    [selectedBenefits, userMetrics, isRefined]
  );

  const availableDomains = useMemo(() => {
    const domains = new Set<Domain>();
    eligibleRights.forEach(r => domains.add(r.domain));
    return Array.from(domains);
  }, [eligibleRights]);

  const filteredRights = useMemo(() => {
    let rights = activeFilter === 'all' ? eligibleRights : eligibleRights.filter(r => r.domain === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      rights = rights.filter(r => r.title.toLowerCase().includes(q) || r.provider.toLowerCase().includes(q));
    }
    return rights;
  }, [eligibleRights, activeFilter, searchQuery]);

  // Group by domain
  const rightsByDomain = useMemo(() => {
    const grouped: Record<Domain, RightWithScore[]> = { housing: [], health: [], transport: [], utilities: [], financial: [], welfare: [], employment: [], legal: [] };
    filteredRights.forEach(r => grouped[r.domain].push(r));
    return grouped;
  }, [filteredRights]);

  const hasResults = eligibleRights.length > 0;
  const currentStep = hasResults ? 3 : (selectedBenefits.length > 0 && needsRefinement ? 2 : 1);

  const handleStartClaiming = () => {
    if (selectedBenefits.length > 0) {
      if (needsRefinement && questionCount > 0) {
        setIsSelectorExpanded(true);
      } else {
        handleShowResults();
      }
    } else {
      setIsSelectorExpanded(true);
    }
  };

  return (
    <div className="page">
      <a href="#main-content" className="skip-link">דילוג לתוכן</a>
      <Header />

      <main id="main-content" className="container page__main">
        {/* Hero */}
        <Hero hasResults={hasResults} rightsCount={eligibleRights.length} onStartClaiming={handleStartClaiming} />

        {/* Progress */}
        <ProgressSteps currentStep={currentStep} />

        {/* Benefit Selector Panel */}
        <section className="selector-panel card">
          <button
            className="selector-panel__toggle"
            onClick={() => setIsSelectorExpanded(!isSelectorExpanded)}
            aria-expanded={isSelectorExpanded}
          >
            <div className="selector-panel__toggle-info">
              <div className="selector-panel__toggle-icon">
                <Filter size={20} />
              </div>
              <div>
                <h2 className="selector-panel__title">הקצבאות שלי</h2>
                <p className="selector-panel__subtitle">
                  {selectedBenefits.length === 0
                    ? 'בחר את הקצבאות שאתה מקבל'
                    : `${selectedBenefits.length} קצבאות נבחרו • ${eligibleRights.length} זכויות נמצאו`
                  }
                </p>
              </div>
            </div>
            <div className="selector-panel__toggle-actions">
              {selectedBenefits.length > 0 && (
                <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); handleReset(); }}>
                  <RotateCcw size={14} /> איפוס
                </button>
              )}
              {isSelectorExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>

          {isSelectorExpanded && (
            <div className="selector-panel__content">
              <BenefitSelector
                selectedBenefits={selectedBenefits}
                onToggleBenefit={handleToggleBenefit}
                onContinue={() => {
                  if (needsRefinement && questionCount > 0) { /* wizard shown below */ }
                  else handleShowResults();
                }}
              />

              {/* Refinement Wizard */}
              {selectedBenefits.length > 0 && needsRefinement && questionCount > 0 && (
                <div className="selector-panel__wizard">
                  <RefinementWizard
                    selectedBenefits={selectedBenefits}
                    userMetrics={userMetrics}
                    onComplete={handleWizardComplete}
                    onClose={handleShowResults}
                  />
                </div>
              )}

              {/* Refined badge */}
              {isRefined && (
                <div className="selector-panel__refined">
                  <Sparkles size={16} />
                  <span>התוצאות מותאמות אישית לפי הפרטים שלך</span>
                </div>
              )}

              {/* Disclaimer */}
              <div className="selector-panel__disclaimer">
                <Info size={16} />
                <p>המידע המוצג באתר זה הוא למטרות מידע כללי בלבד ואינו מהווה ייעוץ משפטי.</p>
              </div>
            </div>
          )}
        </section>

        {/* Results */}
        {hasResults && (
          <div ref={resultsRef} className="results">
            {/* Stats */}
            <StatsBar rights={eligibleRights} />

            {/* Filter Bar */}
            <div className="results__filter-bar">
              <div className="results__search">
                <Search size={16} />
                <input
                  type="search"
                  className="results__search-input"
                  placeholder="חיפוש זכויות..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="חיפוש זכויות"
                />
                {searchQuery && (
                  <button className="results__search-clear" onClick={() => setSearchQuery('')} aria-label="נקה חיפוש">
                    <X size={14} />
                  </button>
                )}
              </div>
              <QuickFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} availableDomains={availableDomains} />
            </div>

            {/* Filtered notice */}
            {activeFilter !== 'all' && (
              <div className="results__notice">
                <p>מציג <strong>{filteredRights.length}</strong> זכויות בקטגוריה: <strong>{DOMAIN_LABELS[activeFilter]}</strong></p>
                <button className="btn btn-ghost btn-sm" onClick={() => setActiveFilter('all')}>הצג הכל</button>
              </div>
            )}

            {/* Rights by domain */}
            {Object.entries(rightsByDomain).map(([domain, rights]) => {
              if (rights.length === 0) return null;
              return (
                <section key={domain} className="results__domain-section">
                  <div className="results__domain-header">
                    <h3>{DOMAIN_LABELS[domain as Domain]}</h3>
                    <span className="results__domain-count">{rights.length} זכויות</span>
                  </div>
                  <div className="results__grid">
                    {rights.map((right) => (
                      <RightCard key={right.id} right={right} onClick={() => { setSelectedRight(right); setIsModalOpen(true); }} />
                    ))}
                  </div>
                </section>
              );
            })}

            {filteredRights.length === 0 && (
              <div className="results__empty">
                <Search size={40} />
                <h3>לא נמצאו תוצאות</h3>
                <p>נסה לחפש במילים אחרות או לבחור קטגוריה אחרת</p>
              </div>
            )}

            {/* Reset */}
            <div className="results__footer">
              <button className="btn btn-secondary" onClick={handleReset}>
                <RotateCcw size={18} /> איפוס וחיפוש מחדש
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasResults && (
          <div className="empty-state">
            <div className="empty-state__icon">
              <Shield size={48} />
            </div>
            <h2>סמן את הקצבאות שאתה מקבל</h2>
            <p>בחר לפחות קצבה אחת מהרשימה למעלה כדי לגלות את הזכויות הנוספות שמגיעות לך</p>
            <p className="empty-state__hint">💡 הקצבאות הנפוצות: נכות כללית, אזרח ותיק, סיעוד</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <Shield size={18} />
            <span>ארנק זכויות</span>
          </div>
          <p className="footer__disclaimer">
            <strong>כתב ויתור:</strong> המידע המוצג הוא לצורך הכוונה ואינפורמציה כללית בלבד. אינו מהווה ייעוץ משפטי, הבטחת זכאות או התחייבות מצד הביטוח הלאומי.
          </p>
          <p className="footer__credit">אביעד יצחקי, מינהל גמלאות | ביטוח לאומי | v2.0</p>
        </div>
      </footer>

      {/* Modal */}
      <RightDetailModal right={selectedRight} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Screen reader announcements */}
      <div aria-live="polite" className="sr-only">
        {hasResults && `נמצאו ${filteredRights.length} זכויות`}
      </div>
    </div>
  );
};

export default Index;
