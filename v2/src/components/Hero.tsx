import { Play, Sparkles } from 'lucide-react';
import './Hero.css';

interface HeroProps {
  hasResults: boolean;
  rightsCount: number;
  onStartClaiming: () => void;
}

export function Hero({ hasResults, rightsCount, onStartClaiming }: HeroProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'בוקר טוב';
    if (hour < 17) return 'צהריים טובים';
    if (hour < 21) return 'ערב טוב';
    return 'לילה טוב';
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__greeting">{getGreeting()}</p>
        <h2 id="hero-title" className="hero__title">מיצוי זכויות</h2>
        <p className="hero__subtitle">
          {hasResults
            ? `נמצאו ${rightsCount} זכויות רלוונטיות עבורך`
            : 'סמן את הקצבאות שאתה מקבל וגלה את הזכויות הנוספות הרלוונטיות עבורך'
          }
        </p>
        <p className="hero__disclaimer">
          סכומים וחישובים הם משוערים בלבד ויש לאמת מול הגורם המוסמך.
        </p>

        <div className="hero__stats">
          <div className="hero__stat">
            <Sparkles size={18} />
            <span>100+ זכויות במאגר</span>
          </div>
        </div>

        <button
          className="btn btn-lg hero__cta"
          onClick={onStartClaiming}
          aria-label="התחל בבדיקת זכויות"
        >
          <Play size={20} />
          התחל לבדיקה
        </button>
      </div>
    </section>
  );
}
