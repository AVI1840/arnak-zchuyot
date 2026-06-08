# Technical Specification — ארנק זכויות | Rights Wallet
## National Insurance Institute of Israel | המוסד לביטוח לאומי

**Version:** 1.0  
**Date:** 2026-06-08  
**Classification:** Internal — For Official Use  
**Status:** Final — For Implementation  

---

## 1. System Overview

### 1.1 תיאור מערכת
"ארנק זכויות" היא אפליקציית SPA (Single Page Application) המציגה לאזרחים מקבלי קצבאות ביטוח לאומי את כלל הזכויות וההטבות הנלוות המגיעות להם, על בסיס פרופיל אישי.

### 1.2 מפרט טכנולוגי

| רכיב | טכנולוגיה | גרסה |
|-------|-----------|-------|
| Framework | React | 18.3.1 |
| Language | TypeScript | 5.8.3 |
| Build Tool | Vite | 5.4.19 |
| CSS | Tailwind CSS | 3.4.17 |
| UI Components | shadcn/ui (Radix) | Latest |
| Animations | Framer Motion | 12.26.2 |
| Icons | Lucide React | 0.462.0 |
| Testing | Vitest + Testing Library | 3.2.4 |

### 1.3 Build Output

| Artifact | Size (Gzipped) | Type |
|----------|----------------|------|
| `index.html` | 0.5KB | Entry point |
| `index-[hash].js` | ~197KB | Application bundle |
| `index-[hash].css` | ~14KB | Styles |
| **Total** | **~212KB** | — |

---

## 2. Data Model

### 2.1 JSON Structure

קובץ המקור: `rights_database_spec.json`

```json
[
  {
    "id": "water_disability",
    "title": "כמות מים נוספת של עד 3.5 מ\"ק לחודש בתעריף הנמוך",
    "provider": "רשות המים",
    "domain": "utilities",
    "applicable_benefits": ["general_disability"],
    "eligibility_text": "מקבלי קצבת נכות כללית שנקבעה להם נכות רפואית בשיעור של 70% ומעלה.",
    "eligibility_logic": { "min_medical_disability": 70 },
    "how_to_apply": "הביטוח הלאומי מעביר לרשות המים רשימות...",
    "is_automatic": true,
    "primary_display_priority": 1,
    "source_verified": true,
    "estimated_value": 500,
    "popularity_score": 90,
    "action_link": "https://example.gov.il/service/...",
    "notes": "הערות נוספות",
    "transport_providers": ["רב-קו", "רכבת ישראל"],
    "requires_local_authority_check": false
  }
]
```

### 2.2 JSON Schema (Draft 2020-12)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://btl.gov.il/schemas/rights-database/v1.0",
  "title": "Rights Database Schema",
  "description": "Schema for ארנק זכויות rights database",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "title", "provider", "domain", "applicable_benefits", "eligibility_text", "how_to_apply", "is_automatic", "primary_display_priority", "source_verified"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$",
        "description": "Unique identifier (snake_case, English)"
      },
      "title": {
        "type": "string",
        "minLength": 5,
        "maxLength": 200,
        "description": "שם הזכות/הטבה בעברית"
      },
      "provider": {
        "type": "string",
        "minLength": 2,
        "description": "שם הגורם המספק"
      },
      "domain": {
        "type": "string",
        "enum": ["housing", "health", "transport", "utilities", "financial", "welfare", "employment", "legal"],
        "description": "קטגוריה ראשית"
      },
      "applicable_benefits": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": ["general_disability", "special_services", "mobility", "child_disability", "old_age", "old_age_income_support", "nursing", "survivors", "survivors_income_support", "work_injury", "terror_victim", "income_support", "alimony", "prisoners_of_zion", "righteous_nations"]
        },
        "minItems": 1,
        "description": "רשימת קצבאות המזכות בזכות זו"
      },
      "eligibility_text": {
        "type": "string",
        "minLength": 10,
        "description": "תיאור תנאי זכאות בשפה חופשית"
      },
      "eligibility_logic": {
        "oneOf": [
          { "type": "null" },
          { "$ref": "#/$defs/eligibility_condition" },
          { "$ref": "#/$defs/eligibility_compound" }
        ],
        "description": "לוגיקת זכאות מובנית (אופציונלי)"
      },
      "how_to_apply": {
        "type": "string",
        "minLength": 10,
        "description": "הנחיות למימוש"
      },
      "is_automatic": {
        "type": "boolean",
        "description": "true = ניתנת ללא פנייה"
      },
      "primary_display_priority": {
        "type": "integer",
        "minimum": 1,
        "maximum": 3,
        "description": "1=גבוהה, 2=בינונית, 3=נמוכה"
      },
      "source_verified": {
        "type": "boolean",
        "description": "האם אומת ממקור רשמי"
      },
      "estimated_value": {
        "type": "number",
        "minimum": 0,
        "description": "ערך שנתי משוער בש\"ח"
      },
      "popularity_score": {
        "type": "integer",
        "minimum": 0,
        "maximum": 100,
        "description": "ציון פופולריות (0-100)"
      },
      "action_link": {
        "type": "string",
        "format": "uri",
        "description": "קישור חיצוני למימוש"
      },
      "notes": {
        "type": "string",
        "description": "הערות נוספות"
      },
      "transport_providers": {
        "type": "array",
        "items": { "type": "string" },
        "description": "ספקי תחבורה רלוונטיים"
      },
      "requires_local_authority_check": {
        "type": "boolean",
        "description": "תלוי ברשות מקומית"
      }
    },
    "additionalProperties": false
  },
  "$defs": {
    "eligibility_condition": {
      "type": "object",
      "properties": {
        "min_medical_disability": { "type": "number" },
        "min_incapacity": { "type": "number" },
        "min_mobility": { "type": "number" },
        "min_nursing_level": { "type": "number" },
        "min_special_services_rate": { "type": "number" },
        "is_income_support": { "type": "boolean" },
        "owns_apartment": { "type": "boolean" },
        "min_age": { "type": "number" },
        "is_blind": { "type": "boolean" }
      }
    },
    "eligibility_compound": {
      "type": "object",
      "required": ["operator", "conditions"],
      "properties": {
        "operator": { "enum": ["OR", "AND", "MAX_VALUE"] },
        "conditions": {
          "type": "array",
          "items": { "$ref": "#/$defs/eligibility_condition" }
        }
      }
    }
  }
}
```

---

## 3. Field Definitions

| # | שדה | טיפוס | חובה | תיאור |
|---|------|--------|------|--------|
| 1 | `id` | string | ✅ | מזהה ייחודי (snake_case, אנגלית) |
| 2 | `title` | string | ✅ | שם הזכות בעברית |
| 3 | `provider` | string | ✅ | שם הספק/גורם מטפל |
| 4 | `domain` | enum | ✅ | קטגוריה (8 ערכים) |
| 5 | `applicable_benefits` | array[enum] | ✅ | קצבאות מזכות (15 ערכים) |
| 6 | `eligibility_text` | string | ✅ | תיאור זכאות חופשי |
| 7 | `eligibility_logic` | object/null | — | לוגיקה מובנית |
| 8 | `how_to_apply` | string | ✅ | אופן מימוש |
| 9 | `is_automatic` | boolean | ✅ | אוטומטית? |
| 10 | `primary_display_priority` | int(1-3) | ✅ | עדיפות תצוגה |
| 11 | `source_verified` | boolean | ✅ | מאומת? |
| 12 | `estimated_value` | number | — | ערך שנתי (₪) |
| 13 | `popularity_score` | int(0-100) | — | פופולריות |
| 14 | `action_link` | URL | — | קישור למימוש |
| 15 | `notes` | string | — | הערות |
| 16 | `transport_providers` | array[string] | — | ספקי תחבורה |
| 17 | `requires_local_authority_check` | boolean | — | תלוי רשות |

---

## 4. Domain & Benefit Definitions

### 4.1 Domains (קטגוריות)

| Value | Label | Description |
|-------|-------|-------------|
| `housing` | דיור | סיוע בדיור, שכירות, משכנתא |
| `health` | בריאות | שירותי בריאות, קופות חולים |
| `transport` | תחבורה | תחבורה ציבורית, חניה, רכב |
| `utilities` | תשתיות | מים, חשמל, ארנונה, טלפון |
| `financial` | כספים ומיסים | מסים, הנחות, מענקים |
| `welfare` | רווחה | שירותים חברתיים, סיוע |
| `employment` | תעסוקה | עבודה, שיקום, הכשרה |
| `legal` | משפטי | סיוע משפטי, ייצוג |

### 4.2 Benefit Types (סוגי קצבאות)

| Value | Label | Population |
|-------|-------|-----------|
| `general_disability` | נכות כללית | ~250K |
| `special_services` | שירותים מיוחדים | ~90K |
| `mobility` | ניידות | ~70K |
| `child_disability` | ילד נכה | ~45K |
| `old_age` | אזרח ותיק | ~1.1M |
| `old_age_income_support` | אזרח ותיק + השלמת הכנסה | ~200K |
| `nursing` | סיעוד | ~200K |
| `survivors` | שארים | ~100K |
| `survivors_income_support` | שארים + השלמת הכנסה | ~30K |
| `work_injury` | נכות מעבודה | ~50K |
| `terror_victim` | נפגעי איבה | ~5K |
| `income_support` | הבטחת הכנסה | ~120K |
| `alimony` | מזונות | ~20K |
| `prisoners_of_zion` | אסירי ציון | ~1K |
| `righteous_nations` | חסידי אומות עולם | <100 |

---

## 5. Eligibility Logic Specification

### 5.1 Simple condition (single field)

```json
{ "min_medical_disability": 70 }
```
Meaning: eligible if `medical_disability_pct >= 70`

### 5.2 Compound condition (OR)

```json
{
  "operator": "OR",
  "conditions": [
    { "min_incapacity": 75 },
    { "min_medical_disability": 90 }
  ]
}
```
Meaning: eligible if `incapacity_pct >= 75` **OR** `medical_disability_pct >= 90`

### 5.3 Null (no structured logic)

```json
"eligibility_logic": null
```
Meaning: eligibility determined by `eligibility_text` (human-readable) only.

### 5.4 Available condition fields

| Field | Type | Unit |
|-------|------|------|
| `min_medical_disability` | number | % (0-100) |
| `min_incapacity` | number | % (0-100) |
| `min_mobility` | number | % (0-100) |
| `min_nursing_level` | number | level (1-6) |
| `min_special_services_rate` | number | % |
| `min_age` | number | years |
| `is_income_support` | boolean | — |
| `owns_apartment` | boolean | — |
| `is_blind` | boolean | — |

---

## 6. Versioning Strategy

```json
{
  "schema_version": "1.0.0",
  "data_version": "1.2.0",
  "last_updated": "2026-06-08",
  "record_count": 98
}
```

| Component | SemVer Rule |
|-----------|-------------|
| `schema_version` | MAJOR = breaking change, MINOR = new field, PATCH = docs |
| `data_version` | MAJOR = bulk restructure, MINOR = add/remove records, PATCH = text fix |

**Note:** Versioning header to be added to JSON file in future release. Currently tracked via Git commits.

---

## 7. Data Quality Rules

| # | Rule | Severity | Auto-check |
|---|------|----------|-----------|
| 1 | All `id` values must be unique | CRITICAL | ✅ |
| 2 | All `domain` values must be from enum | CRITICAL | ✅ |
| 3 | All `applicable_benefits` values must be from enum | CRITICAL | ✅ |
| 4 | `title` must be 5-200 characters | HIGH | ✅ |
| 5 | `eligibility_text` must not be empty | HIGH | ✅ |
| 6 | `how_to_apply` must not be empty | HIGH | ✅ |
| 7 | `action_link` if present must be valid URL | MEDIUM | ✅ |
| 8 | `estimated_value` if present must be > 0 | LOW | ✅ |
| 9 | No duplicate titles | MEDIUM | ✅ |
| 10 | Text fields must not be truncated (no trailing "...") | MEDIUM | ✅ |

---

## 8. Data Quality Findings

| # | ממצא | חומרה | השפעה | המלצה |
|---|------|--------|--------|--------|
| 1 | `holocaust_families` — לא מוגדר ב-Schema (4 רשומות) | HIGH | זכויות לא מוצגות | הוסף ל-enum או מפה ל-`prisoners_of_zion` |
| 2 | `righteous_gentiles` — לא מוגדר ב-Schema (3 רשומות) | HIGH | זכויות לא מוצגות | מפה ל-`righteous_nations` (שם שונה) |
| 3 | `blood_transfusion` — לא מוגדר ב-Schema (3 רשומות) | HIGH | זכויות לא מוצגות | הוסף ל-enum או הסר |
| 4 | שני שדות `eligibility_text` חתוכים (מסתיימים ב-"חיש") | LOW | מידע חלקי | השלם טקסט |
| 5 | שדה `how_to_apply` אחד חתוך (מסתיים ב-"היח") | LOW | מידע חלקי | השלם טקסט |

**סה"כ:** 10 רשומות מושפעות מממצאים קריטיים (10.2% מהמאגר).

---

## 9. Integration Patterns

### 9.1 iframe (Recommended for SharePoint 2013)

```html
<iframe 
  src="/SiteAssets/arnak/index.html"
  style="width:100%; min-height:800px; border:none;"
  title="ארנק זכויות"
  loading="lazy">
</iframe>
```

### 9.2 Umbraco (Future)

- Host static files as Umbraco Media
- Reference via Macro or Rich Text Editor
- JSON can be served from Umbraco Content API

### 9.3 Static Hosting (Any Web Server)

```
/arnak/
├── index.html
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

### 9.4 SPA Embedding (Advanced)

- Mount React app into a specific DOM element
- Requires custom build configuration
- Not recommended for initial deployment

---

## 10. Security Requirements

| Requirement | Status | Notes |
|-------------|--------|-------|
| HTTPS | Required | All environments |
| CSP Headers | Recommended | `script-src 'self'` |
| No PII stored | ✅ Compliant | No user data persisted |
| No API keys | ✅ Compliant | No secrets in code |
| No external calls | ✅ Compliant | Except Google Fonts (optional) |
| npm audit clean | Required | Before each deploy |
| OWASP Top 10 | N/A | No server-side code |

---

## 11. Performance Requirements

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 2s | ~1.2s |
| Total Bundle (gzipped) | < 300KB | ~212KB |
| Time to Interactive | < 3s | ~2s |
| Lighthouse Performance | > 85 | ~90 |
| JSON Parse Time | < 100ms | ~30ms |

---

## 12. Accessibility Requirements

| Standard | Level | Status |
|----------|-------|--------|
| WCAG 2.1 | AA | Implemented |
| IS 5568 | Full | Implemented |
| Keyboard Navigation | Full | ✅ |
| Screen Reader | NVDA/JAWS | ✅ |
| Color Contrast | 4.5:1 | ✅ |
| Touch Targets | 44×44px min | ✅ |
| RTL Support | Full | ✅ |
| Reduced Motion | Supported | ✅ |
| Font Resize | Up to 200% | ✅ |

---

## 13. Deployment Requirements

| Environment | Method | URL |
|-------------|--------|-----|
| Demo | GitHub Pages (auto) | https://avi1840.github.io/arnak-zchuyot/ |
| Production | Upload to SharePoint Document Library | TBD |
| Future | Umbraco Media / CDN | TBD |

### Build for Production:
```bash
# Set base path for target environment
# vite.config.ts: base: '/SiteAssets/arnak/'

npm install
npm run build
# Upload dist/ to target
```

---

## 14. Rollback Strategy

| Scenario | Action | RTO |
|----------|--------|-----|
| Bad deploy | Restore previous dist/ from Git | 5 min |
| Data error | Revert JSON to previous commit | 10 min |
| Critical bug | Revert entire commit | 10 min |

All versions maintained in Git. No database migrations required.

---

## 15. Monitoring Recommendations

| Check | Method | Frequency |
|-------|--------|-----------|
| Site availability | HTTP health check | Hourly |
| Link validity | GitHub Action | Monthly |
| npm vulnerabilities | `npm audit` | Weekly |
| Accessibility regression | axe-core in CI | Per deploy |

---

## 16. Future Scalability Considerations

| Feature | Complexity | Prerequisite |
|---------|-----------|-------------|
| API-served JSON | Low | Backend endpoint |
| User profiles | Medium | Auth + DB |
| AI Agent (Bedrock) | High | AWS account |
| Multi-language (Arabic) | Medium | i18n framework |
| Analytics | Low | Google Analytics / internal |
| Admin panel | Medium | Backend + Auth |

---

*Document End*

**Classification:** Internal — For Official Use  
**Owner:** מינהל גמלאות — ביטוח לאומי  
**Version:** 1.0 | June 2026
