import { motion } from 'framer-motion';
import { RightWithScore } from '@/data/rightsDatabase';
import { Target, Zap, FileText, TrendingUp } from 'lucide-react';

interface StatsBarProps {
  rights: RightWithScore[];
}

export function StatsBar({ rights }: StatsBarProps) {
  const total = rights.length;
  const automatic = rights.filter(r => r.is_automatic).length;
  const manual = total - automatic;
  const estimatedSavings = rights.reduce((sum, r) => sum + (r.estimated_value || 0), 0);

  if (total === 0) return null;

  const stats = [
    { icon: <Target className="w-5 h-5" />, value: total, label: 'זכויות נמצאו', color: 'text-secondary' },
    { icon: <Zap className="w-5 h-5" />, value: automatic, label: 'אוטומטיות', color: 'text-emerald-600' },
    { icon: <FileText className="w-5 h-5" />, value: manual, label: 'דורשות פנייה', color: 'text-amber-600' },
    { icon: <TrendingUp className="w-5 h-5" />, value: `~₪${(estimatedSavings / 1000).toFixed(0)}K`, label: 'חיסכון שנתי מוערך', color: 'text-primary' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-xl border border-border p-3 sm:p-4 text-center shadow-sm"
        >
          <div className={`flex justify-center mb-1.5 ${stat.color}`}>
            {stat.icon}
          </div>
          <p className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
