/**
 * HumanReviewActions — פעולות אישור אנושי
 * ==========================================
 * בר פעולות לביקורת אנושית על המלצת AI.
 * תמיד מציג: אישור, דחייה, עריכה, העברה למנהל.
 *
 * עקרונות:
 * - כל החלטה קריטית חייבת לעבור דרך רכיב זה
 * - הפעולות ברורות ומובחנות ויזואלית
 * - אין "אישור אוטומטי" — תמיד נדרש קליק מודע
 * - escalation תמיד זמין
 *
 * נגישות: role="toolbar", keyboard navigation, aria-labels
 * RTL: logical properties, flex-row-reverse לא נדרש (RTL גלובלי)
 */

import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Edit3,
  ArrowUpCircle,
  Loader2,
} from "lucide-react";

export type ReviewAction = "approve" | "reject" | "edit" | "escalate";

interface HumanReviewActionsProps {
  /** callback לכל פעולה */
  onAction: (action: ReviewAction) => void;
  /** פעולה שנמצאת בטעינה */
  loading?: ReviewAction | null;
  /** פעולות מושבתות */
  disabled?: boolean;
  /** הסתר פעולות ספציפיות */
  hideActions?: ReviewAction[];
  /** טקסט מותאם לכפתור אישור */
  approveLabel?: string;
  /** טקסט מותאם לכפתור דחייה */
  rejectLabel?: string;
  /** className נוסף */
  className?: string;
}

export function HumanReviewActions({
  onAction,
  loading = null,
  disabled = false,
  hideActions = [],
  approveLabel = "אישור",
  rejectLabel = "דחייה",
  className,
}: HumanReviewActionsProps) {
  const isLoading = (action: ReviewAction) => loading === action;
  const isHidden = (action: ReviewAction) => hideActions.includes(action);

  return (
    <div
      className={cn(
        "flex items-center gap-2 flex-wrap",
        className
      )}
      role="toolbar"
      aria-label="פעולות ביקורת"
    >
      {/* אישור */}
      {!isHidden("approve") && (
        <button
          onClick={() => onAction("approve")}
          disabled={disabled || isLoading("approve")}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md",
            "bg-[hsl(var(--wf-approved))] text-white",
            "hover:opacity-90 transition-opacity",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus-ring"
          )}
          aria-label={approveLabel}
        >
          {isLoading("approve") ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          )}
          {approveLabel}
        </button>
      )}

      {/* דחייה */}
      {!isHidden("reject") && (
        <button
          onClick={() => onAction("reject")}
          disabled={disabled || isLoading("reject")}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md",
            "bg-[hsl(var(--wf-rejected))] text-white",
            "hover:opacity-90 transition-opacity",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus-ring"
          )}
          aria-label={rejectLabel}
        >
          {isLoading("reject") ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <XCircle className="h-4 w-4" aria-hidden="true" />
          )}
          {rejectLabel}
        </button>
      )}

      {/* עריכה */}
      {!isHidden("edit") && (
        <button
          onClick={() => onAction("edit")}
          disabled={disabled || isLoading("edit")}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md",
            "border border-border bg-card text-foreground",
            "hover:bg-accent transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus-ring"
          )}
          aria-label="עריכה לפני אישור"
        >
          {isLoading("edit") ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Edit3 className="h-4 w-4" aria-hidden="true" />
          )}
          עריכה
        </button>
      )}

      {/* העברה למנהל */}
      {!isHidden("escalate") && (
        <button
          onClick={() => onAction("escalate")}
          disabled={disabled || isLoading("escalate")}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md",
            "border border-[hsl(var(--wf-escalated)/0.4)] bg-[hsl(var(--wf-escalated)/0.08)]",
            "text-[hsl(var(--wf-escalated))]",
            "hover:bg-[hsl(var(--wf-escalated)/0.15)] transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus-ring"
          )}
          aria-label="העבר למנהל"
        >
          {isLoading("escalate") ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowUpCircle className="h-4 w-4" aria-hidden="true" />
          )}
          העברה למנהל
        </button>
      )}
    </div>
  );
}
