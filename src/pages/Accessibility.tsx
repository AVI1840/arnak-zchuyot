import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowRight className="w-4 h-4" />
            חזרה לדף הראשי
          </Button>
        </Link>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">הצהרת נגישות</h1>
              <p className="text-sm text-muted-foreground">ארנק זכויות — ביטוח לאומי</p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">מחויבות לנגישות</h2>
            <p className="text-muted-foreground leading-relaxed">
              אנו מחויבים להנגיש את אתר "ארנק זכויות" לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות,
              בהתאם לתקן הישראלי ת"י 5568 ולהנחיות WCAG 2.1 ברמה AA.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">התאמות הנגישות באתר</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>ניווט מלא באמצעות מקלדת (Tab, Enter, Escape)</li>
              <li>קישור "דילוג לתוכן" לניווט מהיר</li>
              <li>תמיכה בקוראי מסך (ARIA labels, aria-live)</li>
              <li>אפשרות הגדלת טקסט (A+/A-)</li>
              <li>ניגודיות צבע מינימלית 4.5:1</li>
              <li>תמיכה בביטול אנימציות (prefers-reduced-motion)</li>
              <li>אזורי לחיצה מינימליים 44x44 פיקסלים</li>
              <li>כיוון RTL מלא בכל הממשק</li>
              <li>תצוגה מותאמת למובייל</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">טכנולוגיות</h2>
            <p className="text-muted-foreground leading-relaxed">
              האתר נבנה בטכנולוגיות HTML5, CSS3, React ו-TypeScript עם תמיכה מלאה בתקני נגישות.
              הממשק מבוסס על ספריית Radix UI הנגישה מובנית.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">דפדפנים נתמכים</h2>
            <p className="text-muted-foreground leading-relaxed">
              האתר נתמך בגרסאות העדכניות של Chrome, Firefox, Safari ו-Edge.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">פנייה בנושא נגישות</h2>
            <p className="text-muted-foreground leading-relaxed">
              אם נתקלתם בבעיית נגישות באתר, נשמח לשמוע ולטפל.
              ניתן לפנות באמצעות כפתור "משוב לשיפור" בראש העמוד.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">עדכון אחרון</h2>
            <p className="text-muted-foreground">הצהרה זו עודכנה לאחרונה: מאי 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
