import { useState } from 'react';
import {
  X, ExternalLink, Copy, Check, Building2, Sparkles, FileText,
  AlertTriangle, Info, Home, Heart, Bus, Zap, Wallet, Users, Briefcase, Scale
} from 'lucide-react';
import { RightWithScore, Domain, DOMAIN_LABELS } from '@/data/types';
import './RightDetailModal.css';

interface RightDetailModalProps {
  right: RightWithScore | null;
  isOpen: boolean;
  onClose: () => void;
}

const DOMAIN_ICONS: Record<Domain, React.ReactNode> = {
  housing: <Home size={24} />,
  health: <Heart size={24} />,
  transport: <Bus size={24} />,
  utilities: <Zap size={24} />,
  financial: <Wallet size={24} />,
  welfare: <Users size={24} />,
  employment: <Briefcase size={24} />,
  legal: <Scale size={24} />,
};

export function RightDetailModal({ right, isOpen, onClose }: RightDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!right || !isOpen) return null;

  const handleCopy = async () => {
    const text = `📋 ${right.title}\n🏢 ספק: ${right.provider}\n📝 תנאי זכאות: ${right.eligibility_details}\n🔗 אופן קבלה: ${right.how_to_apply}${right.notes ? `\n💡 הערות: ${right.notes}` : ''}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dialog-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="right-detail-title">
      <div className="dialog-content right-detail" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`right-detail__header right-detail__header--${right.domain}`}>
          <button className="right-detail__close" onClick={onClose} aria-label="סגור">
            <X size={20} />
          </button>
          <div className="right-detail__header-content">
            <div className={`right-detail__domain-icon right-detail__domain-icon--${right.domain}`}>
              {DOMAIN_ICONS[right.domain]}
            </div>
            <div>
              <h2 id="right-detail-title" className="right-detail__title">{right.title}</h2>
              <p className="right-detail__provider">
                <Building2 size={14} /> {right.provider}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="right-detail__body">
          {/* Badges */}
          <div className="right-detail__badges">
            <span className={`badge ${right.is_automatic ? 'badge-success' : 'badge-primary'}`}>
              {right.is_automatic ? <><Sparkles size={12} /> ניתנת אוטומטית</> : <><FileText size={12} /> מצריכה הגשה</>}
            </span>
            <span className="badge badge-outline">{DOMAIN_LABELS[right.domain]}</span>
            {right.eligibilityLevel === 'needs_info' && (
              <span className="badge badge-warning"><Info size={12} /> בדקו זכאותכם</span>
            )}
          </div>

          {/* Auto benefit note */}
          {right.is_automatic && (
            <div className="right-detail__info-box right-detail__info-box--success">
              <Sparkles size={18} />
              <p>הטבה זו ניתנת אוטומטית, אין צורך בפנייה. ודאו שאתם מקבלים אותה.</p>
            </div>
          )}

          {/* Local authority warning */}
          {right.requires_local_authority_check && (
            <div className="right-detail__info-box right-detail__info-box--warning">
              <AlertTriangle size={18} />
              <div>
                <p className="right-detail__info-title">תלוי רשות — בדוק ברשות המקומית</p>
                <p>אחוזי ההנחה משתנים בין רשויות מקומיות. יש לפנות לרשות המקומית שלך.</p>
              </div>
            </div>
          )}

          {/* Details */}
          <section className="right-detail__section">
            <h3>תנאי זכאות</h3>
            <p>{right.eligibility_details}</p>
          </section>

          <section className="right-detail__section">
            <h3>{right.is_automatic ? 'מידע נוסף' : 'מה נדרש להגיש?'}</h3>
            <p>{right.how_to_apply}</p>
          </section>

          {right.notes && (
            <section className="right-detail__section right-detail__section--muted">
              <h3>הערות חשובות</h3>
              <p>{right.notes}</p>
            </section>
          )}

          {right.transport_providers && right.transport_providers.length > 0 && (
            <section className="right-detail__section right-detail__section--muted">
              <h3>ספקי תחבורה נתמכים</h3>
              <div className="right-detail__providers">
                {right.transport_providers.map((p) => (
                  <span key={p} className="badge badge-outline">{p}</span>
                ))}
              </div>
            </section>
          )}

          {/* Actions */}
          <div className="right-detail__actions">
            {right.action_link && (
              <a href={right.action_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <ExternalLink size={16} />
                {right.is_automatic ? 'מידע נוסף' : 'מעבר למימוש'}
              </a>
            )}
            <button className="btn btn-secondary" onClick={handleCopy}>
              {copied ? <><Check size={16} /> הועתק</> : <><Copy size={16} /> העתק פרטים</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
