# Workflow Layout Patterns

תבניות layout קלות — לא רכיבים נוקשים, אלא דפוסי הרכבה.
השתמש ב-Tailwind ישירות. אל תייבא layout components.

---

## Pattern 1: ביקורת תיק (Case Review)

```tsx
{/* עמוד ביקורת תיק — הרכבה ישירה */}
<div className="flex flex-col min-h-screen bg-background" dir="rtl">
  {/* Header — פרטי תיק + סטטוס */}
  <header className="border-b border-border bg-card px-6 py-4">
    <h1>תיק מס׳ 12345 — יוסי כהן</h1>
    <WorkflowStatusBadge status="pending" />
  </header>

  {/* Main — grid responsive */}
  <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px]">
    {/* Content */}
    <main className="p-6 space-y-4">
      <AiCaseSummary ... />
      <EligibilityInsight ... />
    </main>

    {/* Sidebar */}
    <aside className="border-t lg:border-t-0 lg:border-s border-border bg-muted/30 p-4 space-y-4">
      <MissingDocuments ... />
    </aside>
  </div>

  {/* Footer — actions sticky */}
  <footer className="sticky bottom-0 border-t border-border bg-card px-6 py-3">
    <HumanReviewActions onAction={handleAction} />
  </footer>
</div>
```

**עקרונות:**
- Header קומפקטי — שם + מספר + סטטוס
- Main area — סיכום AI + תובנות
- Sidebar — מסמכים חסרים, הערות
- Footer sticky — פעולות תמיד נגישות
- Mobile — sidebar קורס למטה

---

## Pattern 2: רשימת תיקים (Case List)

```tsx
{/* טבלה/רשימה של תיקים */}
<div className="space-y-2">
  {cases.map(c => (
    <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
      <div className="flex-1 min-w-0">
        <span className="font-medium text-sm">{c.citizenName}</span>
        <span className="text-xs text-muted-foreground block">{c.benefitType}</span>
      </div>
      <ConfidenceIndicator level={c.aiConfidence} compact />
      <WorkflowStatusBadge status={c.status} />
    </div>
  ))}
</div>
```

**עקרונות:**
- שורה אחת לתיק — סריקה מהירה
- שם + סוג + confidence + status
- קליק פותח את ביקורת התיק

---

## Pattern 3: שילוב בעמוד קיים

```tsx
{/* הוספת סיכום AI לעמוד קיים — ללא שינוי layout */}
<section className="mt-6 space-y-4">
  <AiCaseSummary
    content="על בסיס הנתונים שהוזנו, המבוטח עומד בתנאי הזכאות..."
    confidence="high"
    confidenceScore={92}
    onEdit={() => setEditing(true)}
    onApprove={() => handleApprove()}
  />
</section>
```

**עקרונות:**
- הרכיבים עובדים בכל container
- לא דורשים layout ספציפי
- פשוט שים אותם בתוך העמוד הקיים
