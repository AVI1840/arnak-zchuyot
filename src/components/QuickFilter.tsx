import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Domain, DOMAIN_LABELS } from '@/data/rightsDatabase';
import { 
  Home, 
  Heart, 
  Bus, 
  Wallet, 
  Sparkles,
  Zap,
  Users,
  Briefcase,
  Scale
} from 'lucide-react';

interface QuickFilterProps {
  activeFilter: Domain | 'all';
  onFilterChange: (filter: Domain | 'all') => void;
  availableDomains: Domain[];
}

const FILTER_ICONS: Record<Domain | 'all', React.ReactNode> = {
  all: <Sparkles className="w-4 h-4" />,
  housing: <Home className="w-4 h-4" />,
  health: <Heart className="w-4 h-4" />,
  transport: <Bus className="w-4 h-4" />,
  utilities: <Zap className="w-4 h-4" />,
  financial: <Wallet className="w-4 h-4" />,
  welfare: <Users className="w-4 h-4" />,
  employment: <Briefcase className="w-4 h-4" />,
  legal: <Scale className="w-4 h-4" />,
};

const FILTER_LABELS: Record<Domain | 'all', string> = {
  all: 'הכל',
  ...DOMAIN_LABELS,
};

export function QuickFilter({ activeFilter, onFilterChange, availableDomains }: QuickFilterProps) {
  const filters: (Domain | 'all')[] = ['all', ...availableDomains];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 justify-start"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0',
              'border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isActive
                ? 'bg-secondary text-secondary-foreground border-secondary shadow-lg'
                : 'bg-card text-muted-foreground border-border hover:border-secondary/50 hover:text-foreground hover:bg-accent'
            )}
            aria-pressed={isActive}
          >
            {FILTER_ICONS[filter]}
            <span>{FILTER_LABELS[filter]}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
