# Integration & Deployment Specification
## ארנק זכויות — התאמה לסביבת SharePoint 2013

---

## 1. תיאור מערכת

### 1.1 מטרת המערכת
כלי "ארנק זכויות" מאפשר לאזרחים מקבלי קצבאות ביטוח לאומי לגלות זכויות והטבות נלוות שמגיעות להם ממשרדי ממשלה, רשויות מקומיות וספקי שירות — על בסיס הקצבאות שהם מקבלים ופרטים אישיים.

### 1.2 תהליך עסקי מרכזי
1. אזרח בוחר את הקצבאות שהוא מקבל
2. עונה על שאלות מיקוד (אופציונלי)
3. המערכת מחשבת זכאויות רוחביות
4. מציגה תוצאות מותאמות אישית
5. מאפשרת הורדת דוח, שיתוף, ומעבר למימוש

### 1.3 יכולות עיקריות
- מאגר 98 זכויות מאומתות, 15 סוגי קצבאות, 8 קטגוריות
- מנוע מיצוי עם לוגיקת זכאות (rule-based)
- אשף מיקוד (13 שאלות)
- דוח אישי (Word/העתקה/שיתוף)
- חיפוש גלובלי (Ctrl+K)
- מועדפים (localStorage)
- נגישות (WCAG 2.1 AA)
- רספונסיבי (mobile-first)

---

## 2. ארכיטקטורה קיימת

### 2.1 רכיבי מערכת
```
┌─────────────────────────────────────────┐
│           Frontend (SPA)                 │
│  React 18 + TypeScript + Vite           │
│  Tailwind CSS + shadcn/ui + Framer      │
├─────────────────────────────────────────┤
│           Static Assets                  │
│  HTML + JS Bundle + CSS                  │
│  (dist/ folder after build)             │
├─────────────────────────────────────────┤
│           Data Layer                     │
│  rightsDatabase.ts (embedded JSON)       │
│  localStorage (user preferences)        │
└─────────────────────────────────────────┘
```

### 2.2 זרימת מידע
- **אין Backend** — המערכת 100% client-side
- **אין API calls** — כל הנתונים embedded בקוד
- **אין Database** — localStorage בלבד
- **אין Authentication** — ציבורי לחלוטין
- **Feedback** — נשלח ל-Google Sheets (POST no-cors)

### 2.3 מבנה Frontend
```
src/
├── App.tsx                    # Router + Providers
├── pages/
│   ├── Index.tsx              # Main page (orchestration)
│   ├── Accessibility.tsx      # הצהרת נגישות
│   └── AgentDemo.tsx          # דמו AI (להאקתון)
├── components/
│   ├── Header.tsx
│   ├── CinematicHero.tsx
│   ├── BenefitSelector.tsx
│   ├── RefinementWizard.tsx
│   ├── RightsCarousel.tsx
│   ├── RightThumbnail.tsx
│   ├── RightDetailModal.tsx
│   ├── RecommendationReport.tsx
│   ├── QuickFilter.tsx
│   ├── SearchCommand.tsx
│   ├── StatsBar.tsx
│   ├── ProgressSteps.tsx
│   ├── CrossMinistrySearch.tsx
│   ├── ErrorBoundary.tsx
│   ├── FeedbackModal.tsx
│   ├── FontSizeControl.tsx
│   └── ui/                    # shadcn/ui primitives
├── data/
│   └── rightsDatabase.ts      # 98 rights + logic engine
├── hooks/
│   ├── useLocalStorage.ts
│   └── useBookmarks.ts
├── types/
│   └── userProfile.ts
└── index.css                  # Design system tokens
```

### 2.4 שירותים חיצוניים
| שירות | שימוש | קריטיות |
|--------|--------|---------|
| Google Fonts CDN | Heebo + Rubik | נמוכה (fallback: system fonts) |
| Google Sheets API | משוב פיילוט | נמוכה (לא חוסם) |
| kolzchut.org.il | קישורי מידע | נמוכה (external links) |
| gov.il | קישורי שירות | נמוכה (external links) |
| ravkavonline.co.il | קישור תחבורה | נמוכה (external link) |

**אין תלות קריטית בשירות חיצוני.** המערכת עובדת offline מלא.

---

## 3. סביבת Deployment

### 3.1 מצב נוכחי
- **Hosting:** GitHub Pages (static files)
- **Build:** `npm run build` → `dist/` folder
- **Output:** `index.html` + `assets/index-*.js` + `assets/index-*.css`
- **Size:** ~650KB JS (gzipped ~197KB) + ~81KB CSS (gzipped ~14KB)

### 3.2 דרישות שרתים (SharePoint 2013)
| דרישה | פירוט |
|--------|--------|
| Web Server | SharePoint 2013 (IIS) |
| Static File Hosting | Document Library / Site Assets |
| HTTPS | חובה (mixed content) |
| CORS | לא נדרש (אין API calls) |
| Server-side code | **לא נדרש** |
| Database | **לא נדרש** |
| .NET | **לא נדרש** |

### 3.3 תלויות
| תלות | גרסה | הערה |
|-------|--------|------|
| Modern Browser | Chrome 80+ / Edge 80+ / Firefox 78+ | IE11 **לא נתמך** |
| JavaScript | ES2015+ | Required |
| CSS | CSS3 + CSS Variables | Required |
| localStorage | Standard | For preferences |

### 3.4 Network Requirements
- **Outbound:** Google Fonts CDN (optional), Google Sheets (feedback only)
- **Inbound:** None
- **Ports:** 443 (HTTPS only)
- **Bandwidth:** ~250KB first load (gzipped), then cached

---

## 4. SharePoint 2013 Integration

### 4.1 מודל אינטגרציה מומלץ

**גישה: Embedded SPA via Content Editor Web Part / Page Viewer**

```
┌─────────────────────────────────────────────┐
│         SharePoint 2013 Site                 │
│  ┌───────────────────────────────────────┐  │
│  │     Site Page / Wiki Page              │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  Content Editor Web Part         │  │  │
│  │  │  OR Page Viewer Web Part         │  │  │
│  │  │                                  │  │  │
│  │  │  <iframe src="arnak/index.html"> │  │  │
│  │  │  OR inline <script> + <div>      │  │  │
│  │  │                                  │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
│                                              │
│  Site Assets / Document Library:             │
│  ├── arnak/index.html                        │
│  ├── arnak/assets/index-*.js                 │
│  └── arnak/assets/index-*.css                │
└─────────────────────────────────────────────┘
```

### 4.2 אפשרויות הטמעה (מהמהירה לעמוקה)

#### אפשרות א׳ — iframe (מהירה ביותר, 1 יום)
```html
<iframe 
  src="/sites/btl/SiteAssets/arnak/index.html" 
  width="100%" 
  height="100vh" 
  frameborder="0"
  style="min-height: 800px; border: none;">
</iframe>
```
- **יתרונות:** אפס שינויים בקוד, isolation מלא, deploy מהיר
- **חסרונות:** אין SSO אוטומטי, scrolling issues אפשריים
- **מתאים ל:** פיילוט מהיר

#### אפשרות ב׳ — Content Editor Web Part (2-3 ימים)
- העלאת קבצי dist/ ל-Site Assets
- שינוי `base` path ב-vite.config
- הוספת CEWP שמטעין את ה-JS/CSS
- **יתרונות:** אינטגרציה ויזואלית טובה יותר
- **חסרונות:** דורש התאמת paths, בדיקות תאימות CSS

#### אפשרות ג׳ — SharePoint-hosted App (1-2 שבועות)
- יצירת SharePoint App (Provider-hosted)
- Hosting ב-IIS נפרד או Azure
- SSO דרך SharePoint OAuth
- **יתרונות:** אינטגרציה מלאה, SSO, governance
- **חסרונות:** מורכבות deployment, דורש infra

### 4.3 התאמות נדרשות לקוד

| התאמה | סוג | מורכבות | הכרחי? |
|--------|------|---------|--------|
| שינוי `base` path ב-vite.config | Config | נמוכה | כן |
| הסרת `BrowserRouter basename` | Code (1 שורה) | נמוכה | כן |
| Google Fonts → local fonts | CSS | נמוכה | מומלץ |
| Feedback endpoint → SharePoint List | Code | בינונית | אופציונלי |
| localStorage → SharePoint User Profile | Code | גבוהה | לא (שלב 2) |
| CSP headers compatibility | Config | נמוכה | בדיקה |

### 4.4 מגבלות ידועות — SharePoint 2013

| מגבלה | השפעה | פתרון |
|--------|--------|--------|
| IE11 support | המערכת לא תומכת IE11 | דרישת Edge/Chrome |
| File size limit (50MB) | JS bundle ~650KB — OK | אין בעיה |
| No ES Modules natively | Build output is bundled | אין בעיה |
| MDS (Minimal Download Strategy) | עלול להפריע ל-SPA | Disable MDS on page |
| Custom scripts blocked | אם "NoScript" מופעל | הפעלת Custom Scripts |
| CSS conflicts | SharePoint CSS vs App CSS | iframe isolation / scoped CSS |

### 4.5 נקודות סיכון

| סיכון | סבירות | חומרה | מיטיגציה |
|--------|---------|--------|----------|
| CSS conflicts עם SP theme | בינונית | בינונית | iframe / CSS scoping |
| חסימת Custom Scripts | נמוכה | גבוהה | אישור IT מראש |
| IE11 users | בינונית | גבוהה | הודעה + דרישת Edge |
| Google Fonts blocked | נמוכה | נמוכה | Local fonts fallback |
| localStorage blocked | נמוכה | נמוכה | Graceful degradation |

---

## 5. מבנה Git וקוד

### 5.1 Repository Structure
```
arnak-zchuyot/
├── src/                    # Source code
├── public/                 # Static assets
├── dist/                   # Build output (gitignored)
├── hackathon/              # Hackathon materials
├── docs/                   # Documentation
├── .github/workflows/      # CI/CD
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

### 5.2 Branching
- `main` — production (GitHub Pages deploy)
- `hackathon-demo` — hackathon version
- `sharepoint` — SharePoint adaptation (ליצור)

### 5.3 Build Process
```bash
npm install          # Install dependencies
npm run build        # Build → dist/
npm run test         # Run tests (vitest)
npm run lint         # ESLint
```

### 5.4 Deployment Process (SharePoint)
```bash
# 1. Build with correct base path
# vite.config.ts: base: '/sites/btl/SiteAssets/arnak/'
npm run build

# 2. Upload dist/ contents to SharePoint
# Target: /sites/btl/SiteAssets/arnak/
#   ├── index.html
#   └── assets/
#       ├── index-*.js
#       └── index-*.css

# 3. Create/update SharePoint page with CEWP or iframe
```

---

## 6. Data Management

### 6.1 מקורות נתונים
| מקור | סוג | עדכון | אחריות |
|-------|------|--------|---------|
| rightsDatabase.ts | Embedded JSON | ידני (script) | מינהל גמלאות |
| rights_database_spec.json | Source of truth | ידני | מינהל גמלאות |
| Excel V2/V3/V4 | מקור ראשוני | ידני | אגפים |

### 6.2 תהליך עדכון נתונים
1. עדכון Excel מקור (אגפים)
2. הרצת `node scripts/generate-rights-db.cjs`
3. בדיקת output ב-rightsDatabase.ts
4. Build + Deploy

### 6.3 ולידציה
- TypeScript type checking (compile-time)
- Unit tests (`npm run test`)
- Manual QA (full flow)

### 6.4 אחריות עסקית
- **הנתונים מאומתים ממקורות רשמיים** (NII, gov.il)
- **כתב ויתור מוצג למשתמש** — "אינו מהווה אישור זכאות"
- **אין התחייבות** — הכלי להכוונה בלבד

---

## 7. Security & Governance

### 7.1 הרשאות
| רכיב | הרשאה נדרשת |
|-------|-------------|
| צפייה באתר | כל משתמש (ציבורי) |
| עדכון נתונים | מפתח + מינהל גמלאות |
| Deploy | מפתח + IT |
| SharePoint Site | Read (users) / Contribute (admins) |

### 7.2 Logging & Audit
- **Client-side:** אין logging (privacy)
- **Feedback:** Google Sheets (שם + טקסט בלבד)
- **SharePoint:** Standard SP audit log
- **אין PII נשמר** — localStorage מכיל רק preferences

### 7.3 Data Exposure
- **אין מידע אישי** — המשתמש מזין בעצמו, לא נשמר בשרת
- **אין API keys** — אין backend
- **אין secrets** — הכל client-side
- **Feedback endpoint** — Google Sheets (public, no-cors)

### 7.4 מגבלות אחריות
- הכלי **אינו מהווה אישור זכאות**
- הכלי **אינו שומר מידע אישי** בשרת
- הכלי **אינו מחליף** פנייה לביטוח לאומי
- כתב ויתור מוצג בכל עמוד

---

## 8. Operational Model

### 8.1 תחזוקה
| פעולה | תדירות | אחראי |
|--------|---------|--------|
| עדכון זכויות | לפי צורך (חקיקה) | מינהל גמלאות |
| בדיקת קישורים | אוטומטי — 1 לחודש | GitHub Action |
| עדכון תלויות | רבעוני | מפתח |
| בדיקות נגישות | חצי-שנתי | מפתח + QA |

### 8.2 Monitoring
- **GitHub Actions:** Monthly link check (automated)
- **Build status:** GitHub Actions deploy workflow
- **Uptime:** GitHub Pages (99.9% SLA)
- **SharePoint:** Standard SP monitoring

### 8.3 תהליך טיפול בתקלות
1. דיווח דרך כפתור "משוב" / Issue ב-GitHub
2. בדיקה ותיקון ב-branch
3. PR → Review → Merge → Auto-deploy

### 8.4 Roles & Responsibilities
| תפקיד | אחריות |
|--------|---------|
| מינהל גמלאות (אביעד) | תוכן, נתונים, אימות זכויות |
| מפתח | קוד, build, deploy, תחזוקה |
| IT/SharePoint Admin | hosting, הרשאות, network |
| QA | בדיקות flow, נגישות, mobile |

---

## 9. Roadmap להמשך

### 9.1 יכולות שנדחו (לשלב 2+)
- [ ] SSO עם SharePoint (User Profile)
- [ ] שמירת פרופיל בשרת (DynamoDB / SP List)
- [ ] AI Agent (Amazon Bedrock) — שיחה חופשית
- [ ] אזור אישי עם פרופיל מותאם
- [ ] Push notifications על זכויות חדשות
- [ ] אנליטיקס (מה הכי נצפה, conversion)
- [ ] Multi-language (ערבית, רוסית)

### 9.2 המלצות למעבר עתידי
- **SharePoint 2013 → SharePoint Online:** מאפשר Modern Web Parts, SPFx, Azure integration
- **Static → API-based:** כשיהיה backend, אפשר personalization אמיתי
- **Rule-based → AI:** Amazon Bedrock Agent לשיחה חופשית (ראה hackathon demo)

---

## 10. Checklist לעלייה לאוויר

### Pre-deployment
- [ ] Build עובר ללא שגיאות (`npm run build`)
- [ ] Tests עוברים (`npm run test`)
- [ ] Lint נקי (`npm run lint`)
- [ ] בדיקת flow מלא (בחירה → wizard → תוצאות → דוח)
- [ ] בדיקת mobile (375px)
- [ ] בדיקת נגישות (Tab navigation, screen reader)
- [ ] כתב ויתור מוצג

### SharePoint-specific
- [ ] `base` path מותאם ב-vite.config
- [ ] קבצי dist/ הועלו ל-Site Assets
- [ ] CEWP / iframe מוגדר בדף
- [ ] Custom Scripts מופעל באתר
- [ ] CSS לא מתנגש עם SP theme
- [ ] Google Fonts נגיש (או local fallback)
- [ ] localStorage עובד
- [ ] בדיקה ב-Edge (לא IE11)
- [ ] HTTPS פעיל

### Post-deployment
- [ ] בדיקת flow מלא בסביבת SP
- [ ] בדיקת mobile בסביבת SP
- [ ] אישור מינהל גמלאות על התוכן
- [ ] הפצה למשתמשי פיילוט
- [ ] מנגנון משוב פעיל

---

## 11. מיפוי פערים וסיכונים

| # | פער/סיכון | חומרה | סטטוס | פתרון |
|---|-----------|--------|--------|--------|
| 1 | IE11 לא נתמך | גבוהה | ידוע | דרישת Edge/Chrome |
| 2 | CSS conflicts | בינונית | לבדיקה | iframe / scoping |
| 3 | Custom Scripts policy | גבוהה | לאישור | אישור IT |
| 4 | Google Fonts blocked | נמוכה | לבדיקה | Local fonts |
| 5 | SP MDS interference | בינונית | לבדיקה | Disable MDS |
| 6 | File path encoding (Hebrew) | נמוכה | לבדיקה | English paths only |
| 7 | SP page chrome (ribbon, nav) | נמוכה | ידוע | Full-page layout / iframe |

---

*מסמך זה נכתב: מאי 2026*
*גרסה: 1.0*
*מחבר: אביעד יצחקי, מינהל גמלאות — ביטוח לאומי*
