# נגישות — צ'קליסט מהיר

## לפני כל PR

- [ ] ניווט מקלדת עובד (Tab, Enter, Escape)
- [ ] Focus ring נראה על כל אלמנט אינטראקטיבי
- [ ] צבע לא משמש לבד (תמיד + טקסט או אייקון)
- [ ] `aria-label` על כל כפתור ללא טקסט גלוי
- [ ] `role="status"` על badges דינמיים
- [ ] `dir="rtl"` על containers (או יורש מ-html)
- [ ] Headings בסדר הגיוני (h1 → h2 → h3)

## RTL

- [ ] `start`/`end` במקום `left`/`right` ב-padding/margin
- [ ] `border-s`/`border-e` במקום `border-l`/`border-r`
- [ ] מספרים ב-`ltr` (Tailwind: `tabular-nums`)

## AI-Ops ספציפי

- [ ] Confidence indicator: צבע + טקסט + אייקון
- [ ] AI content: `aria-label` שמציין "נוצר על ידי AI"
- [ ] Review actions: `role="toolbar"`
- [ ] Loading: `aria-busy="true"`

> ⚠️ צ'קליסט זה הוא נקודת התחלה. אימות WCAG מלא דורש
> בדיקה ידנית עם טכנולוגיות מסייעות וסקירת מומחה.
