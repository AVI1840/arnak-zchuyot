import { motion } from 'framer-motion';
import { RightWithScore, countRightsByDomain, Domain, DOMAIN_LABELS } from '@/data/rightsDatabase';
import { useMemo } from 'react';
import { TrendingUp, Home, Heart, Car, Zap, Wallet, Users, Briefcase, Scale } from 'lucide-react';

interface StatsBarProps {
  rights: RightWithScore[];
}

const DOMAIN_ICON_COMPONENTS: Record<Domain, React.ComponentType<{ className?: string }>> = {
  housing: Home,
  health: Heart,
  transport: Car,
  utilities: Zap,
  financial: Wallet,
  welfare: Users,
  employment: Briefcase,
  legal: Scale,
};

export function StatsBar({ rights }: StatsBarProps) {
  const counts = useMemo(() => countRightsByDomain(rights), [rights]);
  const activeDomains = (Object.entries(counts) as [Domain, number][])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  if (rights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-l from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6"
    >
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Total Count */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="text-center sm:text-right">
            <p className="text-4xl font-bold text-primary">{rights.length}</p>
            <p className="text-sm text-muted-foreground">זכויות זמינות</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-16 bg-border" />

        {/* Domain Breakdown */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 flex-1">
          {activeDomains.map(([domain, count]) => {
            const Icon = DOMAIN_ICON_COMPONENTS[domain];
            return (
              <motion.div
                key={domain}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border"
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{DOMAIN_LABELS[domain]}</span>
                <span className="text-sm font-bold text-primary">{count}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
