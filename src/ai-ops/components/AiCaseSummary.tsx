/**
 * AiCaseSummary — סיכום תיק שנוצר על ידי AI
 * =============================================
 * מציג סיכום תיק שנוצר אוטומטית, עם סימון ברור שזה תוכן AI,
 * רמת ביטחון, ואפשרות לעריכה/אישור אנושי.
 *
 * עקרונות:
 * - תמיד מסומן כ"נוצר על ידי AI"
 * - מציג confidence level
 * - מאפשר עריכה לפני אישור
 * - תומך ב-audit trail (חותמת זמן + מקור)
 *
 * נגישות: landmark region, semantic headings, focus management
 * RTL: מלא — logical properties, text-align start
 */

import { cn } from "@/lib/utils";
import { ConfidenceIndicator, type ConfidenceLevel } from "./ConfidenceIndicator";
import { Bot, Clock, Edit3, CheckCircle2 } from "lucide-react";

interface AiCaseSummaryProps {
  /** כותרת הסיכום */
  title?: string;
  /** תוכן הסיכום — טקסט חופשי או bullet points */
  content: string;
  /** נקודות מפתח (אופציונלי) */
  keyPoints?: string[];
  /** רמת ביטחון */
  confidence: ConfidenceLevel;
  /** אחוז ביטחון */
  confidenceScore?: number;
  /** חותמת זמן יצירה */
  generatedAt?: string;
  /** האם נבדק על ידי אדם */
  humanReviewed?: boolean;
  /** שם הבודק */
  reviewedBy?: string;
  /** callback לעריכה */
  onEdit?: () => void;
  /** callback לאישור */
  onApprove?: () => void;
  /** className נוסף */
  className?: string;
}

export function AiCaseSummary({
  title = "סיכום תיק",
  content,
  keyPoints,
  confidence,
  confidenceScore,
  generatedAt,
  humanReviewed = false,
  reviewedBy,
  onEdit,
  onApprove,
  className,
}: AiCaseSummaryProps) {
  return (
    <section
      className={cn(
        "rounded-lg border-2 p-4",
        "border-[hsl(var(--ai-generated-border))]",
        "bg-[hsl(var(--ai-generated-bg))]",
        className
      )}
      aria-label={`${title} — נוצר על ידי AI`}
      dir="rtl"
    >
      {/* Header — סימון AI + confidence */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium
                        bg-[hsl(var(--ai-generated-accent)/0.1)] text-[hsl(var(--ai-generated-accent))]
                        border border-[hsl(var(--ai-generated-accent)/0.2)]"
            aria-label="תוכן שנוצר על ידי AI"
          >
            <Bot className="h-3.5 w-3.5" aria-hidden="true" />
            <span>נוצר על ידי AI</span>
          </div>

          {humanReviewed && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                          bg-[hsl(var(--ai-human-reviewed)/0.1)] text-[hsl(var(--ai-human-reviewed))]"
              aria-label={`נבדק על ידי ${reviewedBy || "אדם"}`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>נבדק{reviewedBy ? ` — ${reviewedBy}` : ""}</span>
            </div>
          )}
        </div>

        <ConfidenceIndicator
          level={confidence}
          score={confidenceScore}
          compact
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>

      {/* Content */}
      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line mb-3">
        {content}
      </p>

      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && (
        <ul className="space-y-1.5 mb-3 ps-4" aria-label="נקודות מפתח">
          {keyPoints.map((point, i) => (
            <li
              key={i}
              className="text-sm text-foreground/85 leading-relaxed list-disc marker:text-[hsl(var(--ai-generated-accent))]"
            >
              {point}
            </li>
          ))}
        </ul>
      )}

      {/* Footer — timestamp + actions */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[hsl(var(--ai-generated-border))]">
        {/* Timestamp */}
        {generatedAt && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>
              {new Date(generatedAt).toLocaleString("he-IL", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium
                         rounded-md border border-border bg-card text-foreground
                         hover:bg-accent transition-colors focus-ring"
              aria-label="ערוך סיכום"
            >
              <Edit3 className="h-3 w-3" aria-hidden="true" />
              עריכה
            </button>
          )}
          {onApprove && !humanReviewed && (
            <button
              onClick={onApprove}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium
                         rounded-md bg-[hsl(var(--ai-human-reviewed))] text-white
                         hover:opacity-90 transition-opacity focus-ring"
              aria-label="אשר סיכום"
            >
              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
              אישור
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
