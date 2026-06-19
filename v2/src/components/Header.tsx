import { useState } from 'react';
import { Shield, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';
import './Header.css';

interface HeaderProps {
  onSearchOpen?: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <header className="header" role="banner">
        <div className="header__container container">
          <div className="header__brand" role="link" aria-label="חזרה לדף הבית">
            <div className="header__logo">
              <Shield size={24} />
            </div>
            <div className="header__title-group">
              <h1 className="header__title">ארנק זכויות</h1>
              <p className="header__subtitle">גלה את כל הזכויות שמגיעות לך</p>
            </div>
          </div>

          <nav className="header__actions" aria-label="פעולות">
            {onSearchOpen && (
              <button
                className="header__action-btn"
                onClick={onSearchOpen}
                aria-label="חיפוש זכויות"
              >
                <Search size={20} />
              </button>
            )}
            <button
              className="header__feedback-btn"
              onClick={() => setFeedbackOpen(true)}
            >
              <MessageCircle size={16} />
              <span className="header__feedback-text">משוב</span>
            </button>
            <button className="header__action-btn" aria-label="עזרה">
              <HelpCircle size={20} />
            </button>
          </nav>
        </div>
      </header>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}
