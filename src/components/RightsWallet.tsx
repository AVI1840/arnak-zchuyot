import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RightWithScore, Domain, DOMAIN_LABELS, countRightsByDomain } from '@/data/rightsDatabase';
import { RightCard } from './RightCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, X, Wallet, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RightsWalletProps {
  rights: RightWithScore[];
}

const DOMAIN_ICONS: Record<Domain, string> = {
  housing: '🏠',
  health: '💊',
  transport: '🚌',
  utilities: '💡',
  financial: '💰',
  welfare: '🤝',
  employment: '💼',
  legal: '⚖️',
};

const ALL_DOMAINS: Domain[] = [
  'housing',
  'health',
  'transport',
  'utilities',
  'financial',
  'welfare',
  'employment',
  'legal',
];

export function RightsWallet({ rights }: RightsWalletProps) {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const domainCounts = useMemo(() => countRightsByDomain(rights), [rights]);

  const filteredRights = useMemo(() => {
    let filtered = rights;

    if (selectedDomain) {
      filtered = filtered.filter((r) => r.domain === selectedDomain);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.provider.toLowerCase().includes(query) ||
          r.eligibility_details.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [rights, selectedDomain, searchQuery]);

  const activeDomains = ALL_DOMAINS.filter((d) => domainCounts[d] > 0);

  if (rights.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Wallet className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">הארנק שלך ריק</h3>
        <p className="text-muted-foreground max-w-md">
          סמן את הקצבאות שאתה מקבל מהביטוח הלאומי כדי לגלות את כל הזכויות וההטבות שמגיעות לך.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">הזכויות שלך</h2>
            <p className="text-muted-foreground">
              נמצאו{' '}
              <span className="font-semibold text-primary">{rights.length}</span>{' '}
              זכויות והטבות
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="חיפוש זכויות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
            aria-label="חיפוש זכויות"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="נקה חיפוש"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedDomain === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedDomain(null)}
          className="rounded-full"
        >
          <Filter className="w-4 h-4 ml-1" />
          הכל ({rights.length})
        </Button>
        {activeDomains.map((domain) => (
          <Button
            key={domain}
            variant={selectedDomain === domain ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDomain(domain === selectedDomain ? null : domain)}
            className="rounded-full"
          >
            <span className="ml-1" role="img" aria-hidden="true">
              {DOMAIN_ICONS[domain]}
            </span>
            {DOMAIN_LABELS[domain]} ({domainCounts[domain]})
          </Button>
        ))}
      </div>

      {/* Rights Grid */}
      <AnimatePresence mode="popLayout">
        {filteredRights.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {filteredRights.map((right, index) => (
              <RightCard key={right.id} right={right} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">לא נמצאו תוצאות</h3>
            <p className="text-muted-foreground">
              נסה לחפש במילים אחרות או לבחור קטגוריה אחרת
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
