import { useState } from 'react';
import {
  Home, Heart, Bus, Zap, Wallet, Users, Briefcase, Scale,
  Sparkles, FileText, Info, ExternalLink, Copy, Check, Building2
} from 'lucide-react';
import { RightWithScore, Domain, DOMAIN_LABELS } from '@/data/types';
import './RightCard.css';

interface RightCardProps {
  right: RightWithScore;
  onClick: () => void;
}

const DOMAIN_ICONS: Record<Domain, React.ReactNode> = {
  housing: <Home size={18} />,
  health: <Heart size={18} />,
  transport: <Bus size={18} />,
  utilities: <Zap size={18} />,
  financial: <Wallet size={18} />,
  welfare: <Users size={18} />,
  employment: <Briefcase size={18} />,
  legal: <Scale size={18} />,
};

export function RightCard({ right, onClick }: RightCardProps) {
  return (
    <article
      className="right-card card-elevated"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`${right.title} - לחץ לפרטים`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div className="right-card__header">
        <div className={`right-card__domain-icon right-card__domain-icon--${right.domain}`}>
          {DOMAIN_ICONS[right.domain]}
        </div>
        <div className="right-card__meta">
          <div className="right-card__badges">
            <span className={`badge ${right.is_automatic ? 'badge-success' : 'badge-primary'}`}>
              {right.is_automatic ? <><Sparkles size={10} /> אוטומטית</> : <><FileText size={10} /> מצריכה הגשה</>}
            </span>
            {right.eligibilityLevel === 'needs_info' && (
              <span className="badge badge-warning">
                <Info size={10} /> בדקו זכאותכם
              </span>
            )}
          </div>
          <p className="right-card__provider">{DOMAIN_LABELS[right.domain]} • {right.provider}</p>
        </div>
      </div>

      <h3 className="right-card__title">{right.title}</h3>

      <div className="right-card__footer">
        <span className="right-card__cta">לפרטים ←</span>
      </div>
    </article>
  );
}
