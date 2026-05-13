/**
 * AI-Ops Demo — ביקורת תיק סיעוד
 * ==================================
 * עמוד demo תפעולי שמדמה ביקורת תיק סיעוד אמיתי.
 * 
 * תרחיש: מבוטחת בת 78, בקשה לגמלת סיעוד.
 * AI סיכם את התיק, זיהה מסמכים חסרים, והמליץ על זכאות חלקית.
 * ביטחון בינוני — כי יש סתירה בין הערכות רפואיות.
 * העובד צריך לבדוק, לערוך, ולהחליט.
 */

import { useState } from "react";
import "@/ai-ops/tokens/ai-ops-tokens.css";
import {
  AiCaseSummary,
  ConfidenceIndicator,
  HumanReviewActions,
  EligibilityInsight,
  MissingDocuments,
  WorkflowStatusBadge,
} from "@/ai-ops/components";
import type { ReviewAction } from "@/ai-ops/components";
import { User, Calendar, Phone, MapPin, FileText, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// ═══════════════════════════════════════════════════════════
// MOCK DATA — תרחיש אמיתי של תיק סיעוד
// ═══════════════════════════════════════════════════════════

const CASE = {
  id: "SIU-2026-44871",
  citizenName: "רחל אברהמי",
  citizenId: "028-4451-7",
  age: 78,
  city: "באר שבע",
  phone: "050-8834-***",
  requestDate: "2026-04-28",
  requestType: "גמלת סיעוד — בקשה ראשונה",
  assignedTo: "מיכל לוי",
  branch: "סניף באר שבע",
};

const AI_SUMMARY = {
  content: `המבוטחת רחל אברהמי, בת 78, מתגוררת לבדה בבאר שבע. הגישה בקשה לגמלת סיעוד לראשונה ב-28.4.2026.

מהמסמכים שהוגשו עולה תמונה מעורבת: הערכת ADL מ-12.3.2026 מצביעה על תלות חלקית בפעולות יומיומיות (ניקוד 4.5/6), אך מכתב רופא המשפחה מ-2.2.2026 מתאר מצב תפקודי טוב יחסית. הפער עשוי לנבוע מהידרדרות בין התאריכים או מהבדלי הערכה.

אין הערכת מעריך מוסמך עדכנית בתיק — מסמך חובה לקביעת רמת גמלה.`,
  keyPoints: [
    "ניקוד ADL: 4.5/6 — תלות חלקית (הערכה מ-12.3.2026)",
    "מכתב רופא משפחה (2.2.2026) — מתאר מצב תפקודי טוב יותר",
    "פער בין הערכות — ייתכן הידרדרות או הבדלי שיטה",
    "חסרה הערכת מעריך מוסמך — נדרשת לקביעת רמת גמלה",
    "מתגוררת לבדה — גורם סיכון לבידוד",
  ],
  generatedAt: "2026-05-11T08:42:00Z",
};

const MISSING_DOCS = [
  {
    name: "הערכת מעריך מוסמך",
    reason: "נדרשת לקביעת רמת גמלה — חובה לפי תקנות",
    importance: "critical" as const,
    received: false,
  },
  {
    name: "אישור מגורים עדכני",
    reason: "לאימות מגורים לבד — משפיע על רמת הגמלה",
    importance: "recommended" as const,
    received: false,
  },
  {
    name: "מכתב רופא מומחה (גריאטר)",
    reason: "להבהרת הפער בין ההערכות",
    importance: "recommended" as const,
    received: false,
  },
  {
    name: "טופס ויתור סודיות רפואית",
    reason: "הוגש ב-28.4.2026",
    importance: "critical" as const,
    received: true,
  },
];

// ═══════════════════════════════════════════════════════════

export default function AiOpsDemo() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"pending" | "approved" | "rejected" | "escalated">("pending");
  const [summaryApproved, setSummaryApproved] = useState(false);
  const [docs, setDocs] = useState(MISSING_DOCS);
  const [actionLoading, setActionLoading] = useState<ReviewAction | null>(null);

  const handleReviewAction = (action: ReviewAction) => {
    setActionLoading(action);

    setTimeout(() => {
      setActionLoading(null);

      switch (action) {
        case "approve":
          setStatus("approved");
          toast({ title: "✅ התיק אושר", description: "הבקשה אושרה ותועבר להמשך טיפול." });
          break;
        case "reject":
          setStatus("rejected");
          toast({ title: "❌ הבקשה נדחתה", description: "נדרש לצרף נימוק." });
          break;
        case "escalate":
          setStatus("escalated");
          toast({ title: "⬆️ הועבר למנהל", description: "התיק הועבר לביקורת מנהל סניף." });
          break;
        case "edit":
          toast({ title: "✏️ מצב עריכה", description: "ניתן לערוך את הסיכום לפני אישור." });
          break;
      }
    }, 800);
  };

  const handleMarkReceived = (index: number) => {
    setDocs((prev) =>
      prev.map((d, i) => (i === index ? { ...d, received: true } : d))
    );
    toast({ title: "📄 מסמך סומן כהתקבל" });
  };

  const handleRequestFromCitizen = () => {
    toast({
      title: "📨 בקשה נשלחה",
      description: "הודעה נשלחה למבוטחת עם רשימת המסמכים הנדרשים.",
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* ═══ HEADER ═══ */}
      <header className="border-b border-border bg-card px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto">
          {/* Top row — case ID + status */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-bold text-foreground">
                תיק {CASE.id}
              </h1>
              <WorkflowStatusBadge status={status} />
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">
              {CASE.assignedTo} · {CASE.branch}
            </span>
          </div>

          {/* Citizen info row */}
          <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              {CASE.citizenName} ({CASE.age})
            </span>
            <span className="flex items-center gap-1 text-xs">
              <FileText className="h-3 w-3" aria-hidden="true" />
              {CASE.citizenId}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {CASE.city}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Phone className="h-3 w-3" aria-hidden="true" />
              {CASE.phone}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              הוגש {new Date(CASE.requestDate).toLocaleDateString("he-IL")}
            </span>
          </div>

          {/* Request type */}
          <p className="text-xs text-muted-foreground mt-1">
            {CASE.requestType}
          </p>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0">
        {/* ─── Main area ─── */}
        <main className="p-4 sm:p-6 space-y-4" aria-label="תוכן ביקורת תיק">

          {/* Medium confidence warning */}
          <div
            className="flex items-start gap-3 rounded-lg border border-[hsl(var(--ai-confidence-medium)/0.3)] bg-[hsl(var(--ai-confidence-medium)/0.06)] p-3"
            role="alert"
            aria-live="polite"
          >
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--ai-confidence-medium))]" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-foreground">
                ביטחון בינוני — מומלץ לבדוק ידנית
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                זוהה פער בין הערכות רפואיות. יש לוודא את המצב התפקודי העדכני לפני אישור.
              </p>
            </div>
          </div>

          {/* AI Case Summary */}
          <AiCaseSummary
            title="סיכום תיק סיעוד"
            content={AI_SUMMARY.content}
            keyPoints={AI_SUMMARY.keyPoints}
            confidence="medium"
            confidenceScore={67}
            generatedAt={AI_SUMMARY.generatedAt}
            humanReviewed={summaryApproved}
            reviewedBy={summaryApproved ? CASE.assignedTo : undefined}
            onEdit={() => {
              toast({ title: "✏️ מצב עריכה", description: "ניתן לערוך את הסיכום." });
            }}
            onApprove={() => {
              setSummaryApproved(true);
              toast({ title: "✅ סיכום אושר", description: "הסיכום סומן כנבדק." });
            }}
          />

          {/* Eligibility Insight */}
          <EligibilityInsight
            status="unclear"
            benefitName="גמלת סיעוד — רמה ב׳"
            explanation="על בסיס ניקוד ADL של 4.5/6, המבוטחת עשויה להיות זכאית לגמלת סיעוד ברמה ב׳. עם זאת, הפער בין מכתב הרופא להערכת ADL, והיעדר הערכת מעריך מוסמך, לא מאפשרים קביעה סופית."
            confidence="medium"
            confidenceScore={67}
            citations={[
              { label: "חוק ביטוח לאומי", reference: "פרק י׳ — סיעוד" },
              { label: "תקנות הביטוח הלאומי (סיעוד)", reference: "תשמ״ח-1988, סעיף 4" },
              { label: "נוהל פנימי", reference: "קביעת רמת גמלה — 2024/03" },
            ]}
          />

          {/* Confidence detail */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              פירוט רמת ביטחון
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">זיהוי מצב תפקודי</span>
                <ConfidenceIndicator level="high" score={89} compact />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">התאמה לקריטריוני זכאות</span>
                <ConfidenceIndicator level="medium" score={67} compact />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">קביעת רמת גמלה</span>
                <ConfidenceIndicator level="low" score={34} compact />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border">
              הביטחון הנמוך בקביעת רמת הגמלה נובע מהיעדר הערכת מעריך מוסמך ומהפער בין ההערכות הרפואיות.
            </p>
          </div>
        </main>

        {/* ─── Sidebar ─── */}
        <aside
          className="border-t lg:border-t-0 lg:border-s border-border bg-muted/20 p-4 space-y-4"
          aria-label="מסמכים ומידע נוסף"
        >
          {/* Missing Documents */}
          <MissingDocuments
            documents={docs}
            onMarkReceived={handleMarkReceived}
            onRequestFromCitizen={handleRequestFromCitizen}
          />

          {/* Case notes */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              הערות תיק
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="border-b border-border pb-2">
                <span className="font-medium text-foreground">מיכל לוי</span>
                <span className="ms-2">28.4.2026</span>
                <p className="mt-1">בקשה התקבלה. ממתין למסמכים נוספים.</p>
              </div>
              <div className="border-b border-border pb-2">
                <span className="font-medium text-foreground">מערכת</span>
                <span className="ms-2">1.5.2026</span>
                <p className="mt-1">תזכורת נשלחה למבוטחת — מסמכים חסרים.</p>
              </div>
              <div>
                <span className="font-medium text-foreground">מיכל לוי</span>
                <span className="ms-2">11.5.2026</span>
                <p className="mt-1">AI סיכם את התיק. ממתין לביקורת.</p>
              </div>
            </div>
          </div>

          {/* Quick info */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              מידע מהיר
            </h4>
            <dl className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">ימים מהגשה</dt>
                <dd className="font-medium text-foreground">13</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">SLA</dt>
                <dd className="font-medium text-foreground">30 יום (נותרו 17)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">מסמכים בתיק</dt>
                <dd className="font-medium text-foreground">4 מתוך 6</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">תיקים קודמים</dt>
                <dd className="font-medium text-foreground">אין</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {/* ═══ FOOTER — ACTIONS ═══ */}
      <footer
        className="sticky bottom-0 border-t border-border bg-card px-4 sm:px-6 py-3 shadow-[0_-2px_8px_hsl(0_0%_0%/0.05)]"
        aria-label="פעולות ביקורת"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <HumanReviewActions
            onAction={handleReviewAction}
            loading={actionLoading}
            disabled={status !== "pending"}
            approveLabel="אשר זכאות"
            rejectLabel="דחה בקשה"
          />

          {status !== "pending" && (
            <span className="text-sm text-muted-foreground">
              {status === "approved" && "✅ התיק אושר"}
              {status === "rejected" && "❌ הבקשה נדחתה"}
              {status === "escalated" && "⬆️ הועבר למנהל"}
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
