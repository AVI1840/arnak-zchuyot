import { Target, Zap, FileText } from 'lucide-react';
import { RightWithScore } from '@/data/types';
import './StatsBar.css';

interface StatsBarProps {
  rights: RightWithScore[];
}

export function StatsBar({ rights }: StatsBarProps) {
  const total = rights.length;
  const automatic = rights.filter(r => r.is_automatic).length;
  const manual = total - automatic;

  if (total === 0) return null;

  const stats = [
    { icon: <Target size={20} />, value: total, label: 'זכויות נמצאו', className: 'stats-bar__item--primary' },
    { icon: <Zap size={20} />, value: automatic, label: 'אוטומטיות', className: 'stats-bar__item--success' },
    { icon: <FileText size={20} />, value: manual, label: 'דורשות פנייה', className: 'stats-bar__item--warning' },
  ];

  return (
    <div className="stats-bar" role="region" aria-label="סטטיסטיקות">
      {stats.map((stat) => (
        <div key={stat.label} className={`stats-bar__item ${stat.className}`}>
          <div className="stats-bar__icon">{stat.icon}</div>
          <p className="stats-bar__value">{stat.value}</p>
          <p className="stats-bar__label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
