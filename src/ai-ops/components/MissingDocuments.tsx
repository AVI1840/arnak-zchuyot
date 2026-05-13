/**
 * MissingDocuments — מסמכים חסרים
 * =================================
 * מציג רשימת מסמכים חסרים שזוהו על ידי AI,
 * עם רמת חשיבות ואפשרות לסמן כהתקבל.
 *
 * עקרונות:
 * - ברור מה חסר ולמה זה חשוב
 * - מאפשר פעולה מהירה (סימון, בקשה מהאזרח)
 * - מציג מה ההשפעה של המסמך החסר על הזכאות
 *
 * נגישות: list semantics, actionable items
 * RTL: מלא
 */

import { cn } from "@/lib/utils";
import { FileX, FileCheck, AlertTriangle, Send } from "lucide-react";

interface MissingDocument {
  /** שם המסמך */
  name: string;
  /** למה נדרש */
  reason?: string;
  /** רמת חשיבות */
  importance: "critical" | "recommended" | "optional";
  /** האם התקבל */
  received?: boolean;
}

interface MissingDocumentsProps {
  /** רשימת מסמכים חסרים */
  documents: MissingDocument[];
  /** callback כשמסמנים מסמך כהתקבל */
  onMarkReceived?: (index: number) => void;
  /** callback לשליחת בקשה לאזרח */
  onRequestFromCitizen?: () => void;
  /** className נוסף */
  className?: string;
}

const IMPORTANCE_CONFIG = {
  critical: {
    label: "חובה",
    className: "text-[hsl(var(--priority-critical))] bg-[hsl(var(--priority-critical)/0.08)]",
  },
  recommended: {
    label: "מומלץ",
    className: "text-[hsl(var(--priority-high))] bg-[hsl(var(--priority-high)/0.08)]",
  },
  optional: {
    label: "אופציונלי",
    className: "text-muted-foreground bg-muted",
  },
};

export function MissingDocuments({
  documents,
  onMarkReceived,
  onRequestFromCitizen,
  className,
}: MissingDocumentsProps) {
  const pendingCount = documents.filter((d) => !d.received).length;
  const criticalCount = documents.filter(
    (d) => !d.received && d.importance === "critical"
  ).length;

  return (
    <div
      className={cn("rounded-lg border border-border bg-card p-4", className)}
      dir="rtl"
      aria-label={`מסמכים חסרים — ${pendingCount} ממתינים`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileX className="h-4 w-4 text-[hsl(var(--wf-pending))]" aria-hidden="true" />
          <h4 className="text-sm font-semibold text-foreground">
            מסמכים חסרים
          </h4>
          <span className="text-xs text-muted-foreground">
            ({pendingCount} ממתינים)
          </span>
        </div>

        {criticalCount > 0 && (
          <span className="flex items-center gap-1 text-xs font-medium text-[hsl(var(--priority-critical))]">
            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
            {criticalCount} קריטיים
          </span>
        )}
      </div>

      {/* Document List */}
      <ul className="space-y-2 mb-3" role="list">
        {documents.map((doc, i) => (
          <li
            key={i}
            className={cn(
              "flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm",
              doc.received
                ? "bg-[hsl(var(--wf-approved)/0.05)] border-[hsl(var(--wf-approved)/0.2)] opacity-60"
                : "bg-card border-border"
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              {doc.received ? (
                <FileCheck
                  className="h-4 w-4 shrink-0 text-[hsl(var(--wf-approved))]"
                  aria-hidden="true"
                />
              ) : (
                <FileX
                  className="h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              <div className="min-w-0">
                <span
                  className={cn(
                    "block truncate font-medium",
                    doc.received && "line-through"
                  )}
                >
                  {doc.name}
                </span>
                {doc.reason && !doc.received && (
                  <span className="block text-xs text-muted-foreground truncate">
                    {doc.reason}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Importance badge */}
              {!doc.received && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    IMPORTANCE_CONFIG[doc.importance].className
                  )}
                >
                  {IMPORTANCE_CONFIG[doc.importance].label}
                </span>
              )}

              {/* Mark received */}
              {!doc.received && onMarkReceived && (
                <button
                  onClick={() => onMarkReceived(i)}
                  className="text-xs px-2 py-1 rounded border border-border hover:bg-accent transition-colors focus-ring"
                  aria-label={`סמן "${doc.name}" כהתקבל`}
                >
                  התקבל
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Request from citizen */}
      {onRequestFromCitizen && pendingCount > 0 && (
        <button
          onClick={onRequestFromCitizen}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
                     rounded-md border border-[hsl(var(--secondary)/0.3)] text-[hsl(var(--secondary))]
                     bg-[hsl(var(--secondary)/0.05)] hover:bg-[hsl(var(--secondary)/0.1)]
                     transition-colors focus-ring"
          aria-label="שלח בקשת מסמכים לאזרח"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          שלח בקשה לאזרח
        </button>
      )}
    </div>
  );
}
