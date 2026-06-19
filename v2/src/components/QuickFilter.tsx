import { Home, Heart, Bus, Zap, Wallet, Users, Briefcase, Scale, Sparkles } from 'lucide-react';
import { Domain, DOMAIN_LABELS } from '@/data/types';
import './QuickFilter.css';

interface QuickFilterProps {
  activeFilter: Domain | 'all';
  onFilterChange: (filter: Domain | 'all') => void;
  availableDomains: Domain[];
}

const FILTER_ICONS: Record<Domain | 'all', React.ReactNode> = {
  all: <Sparkles size={14} />,
  housing: <Home size={14} />,
  health: <Heart size={14} />,
  transport: <Bus size={14} />,
  utilities: <Zap size={14} />,
  financial: <Wallet size={14} />,
  welfare: <Users size={14} />,
  employment: <Briefcase size={14} />,
  legal: <Scale size={14} />,
};

export function QuickFilter({ activeFilter, onFilterChange, availableDomains }: QuickFilterProps) {
  const filters: (Domain | 'all')[] = ['all', ...availableDomains];

  return (
    <div className="quick-filter" role="tablist" aria-label="סינון לפי קטגוריה">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`quick-filter__chip ${activeFilter === filter ? 'quick-filter__chip--active' : ''}`}
          role="tab"
          aria-selected={activeFilter === filter}
        >
          {FILTER_ICONS[filter]}
          <span>{filter === 'all' ? 'הכל' : DOMAIN_LABELS[filter]}</span>
        </button>
      ))}
    </div>
  );
}
