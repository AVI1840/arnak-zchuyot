import { motion } from 'framer-motion';
import { RightWithScore, Domain, DOMAIN_LABELS, ELIGIBILITY_LEVEL_LABELS, EligibilityLevel } from '@/data/rightsDatabase';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Home, Heart, Bus, Zap, Wallet, Users, Briefcase, Scale,
  Sparkles, FileText, AlertTriangle
} from 'lucide-react';

interface RightThumbnailProps {
  right: RightWithScore;
  onClick: () => void;
}

const DOMAIN_ICONS: Record<Domain, React.ReactNode> = {
  housing: <Home className="w-5 h-5" />,
  health: <Heart className="w-5 h-5" />,
  transport: <Bus className="w-5 h-5" />,
  utilities: <Zap className="w-5 h-5" />,
  financial: <Wallet className="w-5 h-5" />,
  welfare: <Users className="w-5 h-5" />,
  employment: <Briefcase className="w-5 h-5" />,
  legal: <Scale className="w-5 h-5" />,
};

const DOMAIN_COLORS: Record<Domain, string> = {
  housing: 'bg-[hsl(var(--domain-housing))]',
  health: 'bg-[hsl(var(--domain-health))]',
  transport: 'bg-[hsl(var(--domain-transport))]',
  utilities: 'bg-[hsl(var(--domain-utilities))]',
  financial: 'bg-[hsl(var(--domain-financial))]',
  welfare: 'bg-[hsl(var(--domain-welfare))]',
  employment: 'bg-[hsl(var(--domain-employment))]',
  legal: 'bg-[hsl(var(--domain-legal))]',
};

const ELIGIBILITY_COLORS: Record<EligibilityLevel, string> = {
  high: 'bg-[#0368b0] text-white',
  medium: 'bg-amber-500 text-white',
  low: 'bg-muted text-muted-foreground',
};

export function RightThumbnail({ right, onClick }: RightThumbnailProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group w-full"
      onClick={onClick}
    >
      <div className="relative bg-card rounded-xl border border-border shadow-sm overflow-hidden transition-all duration-200 group-hover:shadow-md group-hover:border-[#0368b0]/40 h-full flex flex-col">
        {/* Compact header with icon + badges */}
        <div className="p-3 flex items-start gap-2.5">
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0', DOMAIN_COLORS[right.domain])}>
            {DOMAIN_ICONS[right.domain]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 flex-wrap mb-1">
              <Badge className={cn('text-[10px] px-1.5 py-0 rounded-full font-medium', ELIGIBILITY_COLORS[right.eligibilityLevel])}>
                {ELIGIBILITY_LEVEL_LABELS[right.eligibilityLevel]}
              </Badge>
              <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0 rounded-full gap-0.5',
                right.is_automatic ? 'bg-[#e8f3ff] text-[#0368b0] border-[#0368b0]/30' : 'text-muted-foreground')}>
                {right.is_automatic ? <><Sparkles className="w-2.5 h-2.5" />אוטומטית</> : <><FileText className="w-2.5 h-2.5" />הגשה</>}
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">{DOMAIN_LABELS[right.domain]} • {right.provider}</p>
          </div>
        </div>

        {/* Title */}
        <div className="px-3 pb-2 flex-1">
          <h3 className="font-semibold text-foreground text-xs leading-snug line-clamp-3">{right.title}</h3>
        </div>

        {/* Footer */}
        <div className="px-3 pb-3 pt-1 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground line-clamp-1 flex-1">{right.value_display}</span>
            <span className="text-[10px] font-medium text-[#0368b0] shrink-0 mr-1">לפרטים ←</span>
          </div>
          {!right.source_verified && (
            <p className="text-[9px] text-amber-600 flex items-center gap-0.5 mt-1">
              <AlertTriangle className="w-2.5 h-2.5" /> לא מאומת
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
