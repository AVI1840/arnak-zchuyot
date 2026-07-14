# מנגנון עדכון שוטף — ארנק הזכויות

## המצב היום
- JSON סטטי ב-GitHub (deploy אוטומטי ל-GitHub Pages)
- כל שינוי דורש: עריכת JSON → commit → push → deploy
- רק מפתח יכול לעדכן

## הפתרון המוצע: Excel מאסטר + GitHub Actions

### עקרון פעולה
```
Excel (SharePoint) → CSV export → GitHub Action → JSON → Deploy אוטומטי
```

### תרשים זרימה

```
┌─────────────────────────────────────┐
│  איריס/יהודית מעדכנות Excel         │
│  (SharePoint / OneDrive)            │
└──────────────┬──────────────────────┘
               │ שמירה
               ▼
┌─────────────────────────────────────┐
│  Power Automate Flow (אופציונלי)   │
│  או: upload ידני ל-GitHub           │
└──────────────┬──────────────────────┘
               │ trigger
               ▼
┌─────────────────────────────────────┐
│  GitHub Action: convert-excel.yml   │
│  1. קורא את ה-Excel                │
│  2. ממיר ל-JSON (validate schema)  │
│  3. מריץ בדיקות שפיות             │
│  4. פותח PR לאישור                  │
└──────────────┬──────────────────────┘
               │ merge
               ▼
┌─────────────────────────────────────┐
│  Deploy אוטומטי ל-GitHub Pages     │
│  (deploy.yml — כבר קיים!)          │
└─────────────────────────────────────┘
```

---

## שלב 1: מבנה ה-Excel (מיידי)

### גיליון "זכויות"

| עמודה | שם | סוג | דוגמה |
|-------|-----|------|--------|
| A | id | טקסט | water_disability |
| B | title | טקסט | כמות מים נוספת... |
| C | provider | טקסט | רשות המים |
| D | domain | בחירה | utilities |
| E | applicable_benefits | טקסט (מופרד פסיקים) | general_disability |
| F | eligibility_text | טקסט | מקבלי קצבת נכות... |
| G | how_to_apply | טקסט | הביטוח הלאומי מעביר... |
| H | is_automatic | כן/לא | כן |
| I | action_link | URL | https://... |
| J | dedup_group | טקסט | הנחת מים |
| K | estimated_value | מספר | 500 |
| L | status | בחירה | active / draft / removed |
| M | last_reviewed | תאריך | 14/07/2026 |
| N | notes | טקסט | |

### גיליון "קישורים"
| id | action_link | status | last_checked |
|----|-------------|--------|--------------|

### גיליון "שינויים" (לוג)
| תאריך | שם | פעולה | id | פירוט |
|--------|-----|--------|-----|--------|

---

## שלב 2: Script המרה (כבר קיים חלקית)

הסקריפט `scripts/generate-rights-db.cjs` כבר ממיר JSON ל-TypeScript.
צריך להוסיף:
1. `scripts/excel-to-json.cjs` — ממיר Excel → JSON
2. Validation: בדיקת שדות חובה, URLs תקינים, benefit types חוקיים

---

## שלב 3: GitHub Action (אוטומציה)

```yaml
# .github/workflows/update-data.yml
name: Update Rights Data from Excel

on:
  push:
    paths:
      - 'data/rights_master.xlsx'
  workflow_dispatch:

jobs:
  convert:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: node scripts/excel-to-json.cjs
      - run: node scripts/generate-rights-db.cjs
      - run: npm run build
      - name: Create PR
        uses: peter-evans/create-pull-request@v6
        with:
          title: "data: update rights database from Excel"
          body: "Auto-generated from rights_master.xlsx"
          branch: data-update
```

---

## שלב 4: Power Automate (אופציונלי, שלב 2)

Flow שמופעל כש-Excel ב-SharePoint משתנה:
1. Trigger: File modified
2. Action: Upload to GitHub via API
3. זה יפעיל את ה-GitHub Action אוטומטית

**יתרון:** איריס/יהודית עורכות ב-SharePoint → הכל מתעדכן אוטומטית
**חסרון:** דורש הגדרת Power Automate (אביעד/IT)

---

## תוכנית עבודה

| שלב | מה | מי | מתי |
|------|-----|-----|------|
| 1 | יצירת Excel מאסטר עם 102 הזכויות | אביעד | מיידי |
| 2 | Script המרה excel→json | אביעד (Kiro) | מיידי |
| 3 | GitHub Action לאוטומציה | אביעד | שבוע |
| 4 | Power Automate (SP→GitHub) | אביעד + IT | 23.7 |
| 5 | הדרכה לאיריס/יהודית | אביעד | 23.7 |

---

## יתרונות הפתרון

1. **העסק שולט** — איריס/יהודית מעדכנות Excel מוכר, בלי מחשוב
2. **היסטוריה** — כל שינוי נשמר ב-git, אפשר לחזור אחורה
3. **בטיחות** — PR + validation לפני deploy
4. **פשטות** — Excel + GitHub, ללא מערכות חדשות
5. **עובד מיום 1** — גם ללא Power Automate (upload ידני)

---

## חלופה מהירה (עובד עכשיו)

אם Power Automate לא מוכן עדיין:
1. איריס/יהודית עורכות Excel
2. שולחות לאביעד
3. אביעד מעלה ל-GitHub (drag & drop)
4. GitHub Action ממיר ומעדכן אוטומטית

**זה עובד מיום 1 ללא שום הגדרה נוספת.**
