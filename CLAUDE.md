# CLAUDE.md — ארנק זכויות

## מה הפרויקט עושה
כלי לאזרח — בוחר קצבאות שהוא מקבל מביטוח לאומי ורואה זכויות נלוות.
13 סוגי קצבאות, 50+ זכויות ב-8 קטגוריות. מיון לפי רלוונטיות, חיסכון, פופולריות, קלות מימוש.

## סטאק
React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion

## קבצים חשובים
- `src/data/rightsDatabase.ts` — מאגר זכויות (אל תשנה ללא מקור)
- `src/components/BenefitSelector.tsx` — בחירת קצבאות
- `src/components/RightsCarousel.tsx` — הצגת זכויות
- `src/components/RefinementWizard.tsx` — אשף מיקוד
- `src/components/Header.tsx` — header עם branding
- `src/components/FeedbackModal.tsx` — מערכת משוב פיילוט עם localStorage
- `src/pages/Index.tsx` — דף ראשי

## כללי עבודה ל-AI

### מה מותר
- שיפורי UI ואנימציות
- הוספת זכויות חדשות למאגר (עם מקור)
- שיפור חוויית משתמש
- תיקון באגים

### מה אסור
- **אל תשנה** rightsDatabase.ts — הנתונים מדויקים
- **אל תשנה** את הקרדיט: "אביעד יצחקי, מינהל גמלאות"
- **אל תשבור** את RefinementWizard — הלוגיקה עובדת
- **אל תשדרג** ספריות ללא בדיקה

## Build
```
npm install
npm run build
```

## Deploy
GitHub Pages via GitHub Actions
URL: https://aviad1840.github.io/arnak-zchuyot/
