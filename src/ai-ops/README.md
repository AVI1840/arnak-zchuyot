# BTL AI-Ops — MVP

שכבת UX תפעולית ל-AI workflows בביטוח לאומי.
5 רכיבי core. אפס dependencies חדשים. אפס שינויים בקוד קיים.

---

## Quick Start

```tsx
// 1. טוקנים (פעם אחת בעמוד)
import "@/ai-ops/tokens/ai-ops-tokens.css";

// 2. רכיבים
import {
  AiCaseSummary,
  ConfidenceIndicator,
  HumanReviewActions,
  EligibilityInsight,
  MissingDocuments,
} from "@/ai-ops/components";
```

---

## MVP Components

| רכיב | מה עושה | מתי |
|-------|---------|------|
| `AiCaseSummary` | סיכום תיק AI + edit/approve | כל תיק עם סיכום AI |
| `ConfidenceIndicator` | רמת ביטחון (high/medium/low) | ליד כל המלצת AI |
| `HumanReviewActions` | אישור/דחייה/עריכה/escalation | כל נקודת החלטה |
| `EligibilityInsight` | תובנת זכאות + מקורות | בדיקת זכאות |
| `MissingDocuments` | מסמכים חסרים + פעולות | ביקורת תיק |

### Supporting

| רכיב | מה עושה |
|-------|---------|
| `WorkflowStatusBadge` | תג סטטוס (ממתין/אושר/נדחה/escalated) |

### Secondary (לא ב-barrel export, זמינים לייבוא ישיר)

| רכיב | מתי להשתמש |
|-------|------------|
| `SupervisorEscalation` | כשבונים ממשק מנהל |
| `ExecutiveKpiCard` | כשבונים dashboard מנהלי |

---

## מבנה

```
src/ai-ops/
├── tokens/ai-ops-tokens.css    ← 12 CSS variables
├── components/                  ← 5 core + 1 supporting + 2 secondary
├── layouts/PATTERNS.md          ← דפוסי layout (לא רכיבים)
├── guidelines/
│   ├── AI_TRUST_UX.md          ← 5 כללי אמון
│   └── ACCESSIBILITY_CHECKLIST.md
├── WHY.md                       ← למה ככה
├── REAL_WORLD_CONSTRAINTS.md    ← אילוצי מציאות
└── README.md
```

---

## כללים

1. **אל תשנה קבצים קיימים** — additive only
2. **אל תוסיף packages** — הכל כבר קיים (lucide, tailwind, cn)
3. **אל תבנה מה שלא צריך עכשיו** — הרחב רק מצורך אמיתי
4. **כל AI content מסומן** — badge + confidence + edit
5. **כל החלטה = אישור אנושי** — אין auto-approve
