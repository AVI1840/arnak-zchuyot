# ארנק זכויות

כלי אינטראקטיבי לאזרח המציג את כלל הזכויות והקצבאות שהוא זכאי להן מביטוח לאומי.
האזרח בוחר את הקצבאות שהוא מקבל, והמערכת מציגה זכויות נלוות מתוך מאגר של 13 סוגי קצבאות ו-50+ זכויות ב-8 קטגוריות — עם מיון לפי רלוונטיות, חיסכון ופופולריות.

## טכנולוגיה

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Framer Motion

## הרצה מקומית

```bash
npm install
npm run dev
```

## בנייה

```bash
npm run build
```

## מבנה תיקיות

```
src/
├── components/          # רכיבי UI ראשיים
│   ├── ui/              # רכיבי shadcn/ui בסיסיים
│   ├── BenefitSelector.tsx
│   ├── BenefitSelectorCompact.tsx
│   ├── CinematicHero.tsx
│   ├── FeedbackModal.tsx
│   ├── Header.tsx
│   ├── NavLink.tsx
│   ├── QuickFilter.tsx
│   ├── RefinementWizard.tsx
│   ├── RightCard.tsx
│   ├── RightDetailModal.tsx
│   ├── RightsCarousel.tsx
│   ├── RightsWallet.tsx
│   ├── RightThumbnail.tsx
│   └── StatsBar.tsx
├── data/                # נתונים סטטיים
│   └── rightsDatabase.ts
├── hooks/               # React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                 # פונקציות עזר
│   └── utils.ts
├── pages/               # דפים ראשיים
│   ├── Index.tsx
│   └── NotFound.tsx
├── test/                # בדיקות
├── types/               # טיפוסים
│   └── userProfile.ts
├── App.tsx
├── index.css
└── main.tsx
```

---

אביעד יצחקי, מוביל פיתוח, שותפויות ו-AI, מינהלי גמלאות, ביטוח לאומי


---

## 📄 ONE PAGER

- [ONE PAGER (HTML)](https://avi1840.github.io/btl-projects-2026/html/arnak-zchuyot.html)
- [ONE PAGER (Word)](../one-pagers/word/01-arnak-zchuyot.docx)
- [פורטל כל הפרויקטים](https://avi1840.github.io/btl-projects-2026/)

