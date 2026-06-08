# ארנק זכויות — מסמך מסירת קובץ נתונים (JSON)
## מסמך טכני לצוות הדיגיטל / פיתוח אתר

---

## 1. סקירה כללית

קובץ `rights_database_spec.json` הוא **מקור הנתונים היחיד** של יישום "ארנק זכויות".
הקובץ מכיל את כל הזכויות וההטבות (כיום 98 רשומות), כולל לוגיקת זכאות, הנחיות מימוש, ומטאדאטה.

היישום קורא את הקובץ ומציג למשתמש תוצאות מותאמות על בסיס הקצבאות שבחר.

---

## 2. פרטי הקובץ

| פרמטר | ערך |
|--------|------|
| שם הקובץ | `rights_database_spec.json` |
| פורמט | JSON (UTF-8, BOM) |
| מבנה | Array של objects |
| מספר רשומות | 98 (נכון למאי 2026) |
| גודל | ~85KB |
| כיוון טקסט | עברית (RTL) |
| Encoding | UTF-8 |

---

## 3. JSON Schema — מבנה רשומה

כל רשומה במערך מכילה את השדות הבאים:

```json
{
  "id": "string (required) — מזהה ייחודי באנגלית, snake_case",
  "title": "string (required) — שם הזכות/הטבה בעברית",
  "provider": "string (required) — הגורם המספק: רשות מקומית, רשות המים, וכו'",
  "domain": "string (required) — קטגוריה. ערכים: housing|health|transport|utilities|financial|welfare|employment|legal",
  "applicable_benefits": ["array of strings (required) — רשימת קצבאות שמזכות בזכות זו"],
  "eligibility_text": "string (required) — תיאור תנאי הזכאות בשפה חופשית",
  "eligibility_logic": "object|null — לוגיקת זכאות מובנית (אופציונלי)",
  "how_to_apply": "string (required) — הנחיות למימוש הזכות",
  "is_automatic": "boolean (required) — true=ניתנת אוטומטית, false=דורשת הגשה",
  "primary_display_priority": "number (1-3) — עדיפות תצוגה",
  "source_verified": "boolean — האם המידע אומת ממקור רשמי",
  "estimated_value": "number|undefined — ערך כספי שנתי משוער בש\"ח",
  "popularity_score": "number|undefined — ציון פופולריות (0-100)",
  "action_link": "string|undefined — קישור חיצוני למימוש",
  "notes": "string|undefined — הערות נוספות",
  "transport_providers": ["array|undefined — ספקי תחבורה (רלוונטי לקטגוריית תחבורה)"],
  "requires_local_authority_check": "boolean|undefined — תלוי רשות מקומית"
}
```

### 3.1 ערכים תקינים ל-`domain`:
| ערך | תצוגה |
|------|--------|
| `housing` | דיור |
| `health` | בריאות |
| `transport` | תחבורה |
| `utilities` | תשתיות |
| `financial` | כספים ומיסים |
| `welfare` | רווחה |
| `employment` | תעסוקה |
| `legal` | משפטי |

### 3.2 ערכים תקינים ל-`applicable_benefits`:
| ערך | תצוגה |
|------|--------|
| `general_disability` | נכות כללית |
| `special_services` | שירותים מיוחדים |
| `mobility` | ניידות |
| `child_disability` | ילד נכה |
| `old_age` | אזרח ותיק |
| `old_age_income_support` | אזרח ותיק + השלמת הכנסה |
| `nursing` | סיעוד |
| `survivors` | שארים |
| `survivors_income_support` | שארים + השלמת הכנסה |
| `work_injury` | נכות מעבודה |
| `terror_victim` | נפגעי איבה |
| `income_support` | הבטחת הכנסה |
| `alimony` | מזונות |
| `prisoners_of_zion` | אסירי ציון |
| `righteous_nations` | חסידי אומות עולם |

### 3.3 מבנה `eligibility_logic` (אופציונלי):

```json
// פשוט — תנאי יחיד:
{ "min_medical_disability": 70 }

// מורכב — OR בין תנאים:
{
  "operator": "OR",
  "conditions": [
    { "min_incapacity": 75 },
    { "min_medical_disability": 90 }
  ]
}

// אם אין לוגיקה מובנית:
null
```

---

## 4. דוגמת רשומה מלאה

```json
{
  "id": "water_disability",
  "title": "כמות מים נוספת של עד 3.5 מ\"ק לחודש בתעריף הנמוך",
  "provider": "רשות המים",
  "domain": "utilities",
  "applicable_benefits": ["general_disability"],
  "eligibility_text": "מקבלי קצבת נכות כללית שנקבעה להם נכות רפואית בשיעור של 70% ומעלה.",
  "eligibility_logic": { "min_medical_disability": 70 },
  "how_to_apply": "הביטוח הלאומי מעביר לרשות המים רשימות של מי שעשויים להיות זכאים להטבה. כתובת המגורים של הזכאי צריכה להיות מעודכנת במשרד הפנים. ההטבה אמורה להינתן באופן אוטומטי.",
  "is_automatic": true,
  "primary_display_priority": 1,
  "source_verified": true,
  "estimated_value": 500,
  "popularity_score": 90
}
```

---

## 5. תהליך עבודה משותף

```
┌─────────────────┐        ┌──────────────────┐        ┌─────────────────┐
│  מינהל גמלאות   │        │    דיגיטל/פיתוח   │        │     אתר חי      │
│  (אביעד)        │        │                    │        │                  │
├─────────────────┤        ├──────────────────┤        ├─────────────────┤
│ 1. עדכון JSON   │──────▶ │ 2. ולידציה       │──────▶ │ 3. באוויר       │
│    (תוכן)       │  שליחה │    + build        │ deploy │    (ציבור)      │
│                 │        │    + deploy       │        │                  │
└─────────────────┘        └──────────────────┘        └─────────────────┘
```

### שלבים:
1. **אביעד (מינהל גמלאות)** — מעדכן את ה-JSON (הוספה/עריכה/מחיקה של רשומות)
2. **שולח** את הקובץ המעודכן לצוות הדיגיטל/פיתוח
3. **דיגיטל/פיתוח** — מוודא תקינות (ולידציה), בונה גרסה חדשה, מעלה לאתר
4. **הזכויות מוצגות** לציבור באתר

### תדירות עדכונים צפויה:
- שינויי חקיקה/נהלים: ~2-4 פעמים בשנה
- תיקוני תוכן/קישורים: לפי צורך
- הוספת זכויות חדשות: לפי צורך

---

## 6. ולידציה

הצוות המקבל יכול לוודא תקינות הקובץ:

### בדיקות בסיסיות:
- [ ] הקובץ הוא JSON תקני (parseable)
- [ ] המבנה הוא Array של objects
- [ ] כל רשומה מכילה: `id`, `title`, `provider`, `domain`, `applicable_benefits`, `eligibility_text`, `how_to_apply`, `is_automatic`
- [ ] ערכי `domain` תקינים (מהרשימה)
- [ ] ערכי `applicable_benefits` תקינים (מהרשימה)
- [ ] אין `id` כפולים
- [ ] Encoding: UTF-8

### סקריפט ולידציה (Node.js):
```javascript
const data = JSON.parse(fs.readFileSync('rights_database_spec.json', 'utf8'));
const validDomains = ['housing','health','transport','utilities','financial','welfare','employment','legal'];
const validBenefits = ['general_disability','special_services','mobility','child_disability','old_age','old_age_income_support','nursing','survivors','survivors_income_support','work_injury','terror_victim','income_support','alimony','prisoners_of_zion','righteous_nations'];

let errors = [];
const ids = new Set();
data.forEach((item, i) => {
  if (!item.id) errors.push(`[${i}] missing id`);
  if (ids.has(item.id)) errors.push(`[${i}] duplicate id: ${item.id}`);
  ids.add(item.id);
  if (!validDomains.includes(item.domain)) errors.push(`[${i}] invalid domain: ${item.domain}`);
  item.applicable_benefits?.forEach(b => {
    if (!validBenefits.includes(b)) errors.push(`[${i}] invalid benefit: ${b}`);
  });
});
console.log(errors.length ? errors : 'Valid ✅');
```

---

## 7. חלוקת אחריות

| תחום | אחראי | פירוט |
|-------|--------|--------|
| **תוכן וזכויות** | מינהל גמלאות (אביעד) | עדכון JSON, אימות מול מקורות רשמיים |
| **Hosting + Deploy** | דיגיטל/פיתוח | העלאה לאתר, ולידציה, monitoring |
| **ממשק משתמש** | דיגיטל/פיתוח | תצוגה, UX, באגים |
| **אבטחה + הרשאות** | דיגיטל/פיתוח | HTTPS, CSP, access control |
| **נגישות** | משותף | תוכן נגיש (אביעד) + קוד נגיש (פיתוח) |

---

## 8. הערות חשובות

- **הקובץ אינו מכיל מידע אישי** — רק הגדרות זכויות כלליות
- **הקובץ הוא self-contained** — אין תלות בקבצים נוספים
- **ה-Schema יציב** — לא ישתנה ללא תיאום מראש
- **כתב ויתור מוצג למשתמש** — היישום אינו מהווה אישור זכאות
- **תאימות Umbraco** — הקובץ agnostic לפלטפורמה, יעבוד בכל מערכת

---

*גרסה: 1.0 | תאריך: מאי 2026 | מחבר: אביעד יצחקי, מינהל גמלאות*
