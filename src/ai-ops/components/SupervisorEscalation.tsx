/**
 * SupervisorEscalation — באנר העברה למנהל
 * ==========================================
 * מוצג כשתיק דורש התערבות מנהל — בגלל ביטחון נמוך,
 * חריגה מנהלים, או בקשת עובד.
 *
 * עקרונות:
 * - בולט אך לא מפחיד
 * - מסביר למה הועבר
 * - מציג מי העביר ומתי
 * - מאפשר פעולה מהירה למנהל
 *
 * נגישות: role="alert" (polite), semantic structure
 * RTL: מלא
 */

import { cn } from "@/lib/utils";
import { ArrowUpCircle, User, Clock, MessageSquare } from "lucide-react";

interface SupervisorEscalationProps {
  /** סיבת ההעברה */
  reason: string;
  /** שם המעביר */
  escalatedBy: string;
  /** חותמת זמן */
  escalatedAt: string;
  /** הערה נוספת */
  note?: string;
  /** רמת דחיפות */
  urgency?: "high" | "normal";
  /** callback לקבלת התיק */
  onAccept?: () => void;
  /** className נוסף */
  className?: string;
}

export function SupervisorEscalation({
  reason,
  escalatedBy,
  escalatedAt,
  note,
  urgency = "normal",
  onAccept,
  className,
}: SupervisorEscalationProps) {
  const isUrgent = urgency === "high";

  return (
    <div
      className={cn(
        "rounded-lg border-2 p-4",
        isUrgent
          ? "border-[hsl(var(--priority-critical)/0.5)] bg-[hsl(var(--priority-critical)/0.04)]"
          : "border-[hsl(var(--wf-escalated)/0.4)] bg-[hsl(var(--wf-escalated)/0.04)]",
        className
      )}
      dir="rtl"
      role="alert"
      aria-live="polite"
      aria-label={`תיק הועבר לטיפול מנהל — ${reason}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <ArrowUpCircle
          className={cn(
            "h-5 w-5 shrink-0 mt-0.5",
            isUrgent
              ? "text-[hsl(var(--priority-critical))]"
              : "text-[hsl(var(--wf-escalated))]"
          )}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <h4
            className={cn(
              "text-sm font-semibold",
              isUrgent
                ? "text-[hsl(var(--priority-critical))]"
                : "text-[hsl(var(--wf-escalated))]"
            )}
          >
            {isUrgent ? "⚠️ דורש טיפול דחוף" : "הועבר לטיפול מנהל"}
          </h4>
          <p className="text-sm text-foreground/85 mt-1">{reason}</p>
        </div>
      </div>

      {/* Note */}
      {note && (
        <div className="flex items-start gap-2 mb-3 ps-8">
          <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <p className="text-xs text-muted-foreground italic">"{note}"</p>
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 ps-8 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" aria-hidden="true" />
          {escalatedBy}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {new Date(escalatedAt).toLocaleString("he-IL", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Accept action */}
      {onAccept && (
        <div className="mt-3 ps-8">
          <button
            onClick={onAccept}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md",
              "bg-primary text-primary-foreground",
              "hover:opacity-90 transition-opacity focus-ring"
            )}
            aria-label="קבל תיק לטיפול"
          >
            קבלת התיק
          </button>
        </div>
      )}
    </div>
  );
}
