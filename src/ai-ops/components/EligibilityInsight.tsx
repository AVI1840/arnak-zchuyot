/**
 * EligibilityInsight — תובנת זכאות AI
 * ======================================
 * מציג המלצת זכאות שנוצרה על ידי AI עם הסבר,
 * מקורות, ורמת ביטחון.
 *
 * עקרונות:
 * - מציג את ההמלצה בצורה ברורה (זכאי / לא זכאי / לא ברור)
 * - מסביר למה — שקיפות מלאה
 * - מציג מקורות (חוק, תקנה, פסיקה)
 * - מאפשר override אנושי
 *
 * נגישות: semantic structure, color + icon (לא צבע בלבד)
 * RTL: מלא
 */

import { cn } from "@/lib/utils";
import { ConfidenceIndicator, type ConfidenceLevel } from "./ConfidenceIndicator";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  Bot,
} from "lucide-react";

export type EligibilityStatus = "eligible" | "ineligible" | "unclear";

interface Citation {
  /** שם המקור */
  label: string;
  /** הפניה (סעיף חוק, מספר תקנה) */
  reference?: string;
}

interface EligibilityInsightProps {
  /** סטטוס זכאות */
  status: EligibilityStatus;
  /** שם הזכאות/הטבה */
  benefitName: string;
  /** הסבר AI */
  explanation: string;
  /** מקורות */
  citations?: Citation[];
  /** רמת ביטחון */
  confidence: ConfidenceLevel;
  /** אחוז */
  confidenceScore?: number;
  /** className נוסף */
  className?: string;
}

const STATUS_CONFIG: Record<
  EligibilityStatus,
  { label: string; icon: typeof CheckCircle2; colorClass: string; bgClass: string; borderClass: string }
> = {
  eligible: {
    label: "זכאי",
    icon: CheckCircle2,
    colorClass: "text-[hsl(var(--wf-approved))]",
    bgClass: "bg-[hsl(var(--wf-approved)/0.08)]",
    borderClass: "border-[hsl(var(--wf-approved)/0.3)]",
  },
  ineligible: {
    label: "לא זכאי",
    icon: XCircle,
    colorClass: "text-[hsl(var(--wf-rejected))]",
    bgClass: "bg-[hsl(var(--wf-rejected)/0.08)]",
    borderClass: "border-[hsl(var(--wf-rejected)/0.3)]",
  },
  unclear: {
    label: "לא ניתן לקבוע",
    icon: HelpCircle,
    colorClass: "text-[hsl(var(--wf-pending))]",
    bgClass: "bg-[hsl(var(--wf-pending)/0.08)]",
    borderClass: "border-[hsl(var(--wf-pending)/0.3)]",
  },
};

export function EligibilityInsight({
  status,
  benefitName,
  explanation,
  citations,
  confidence,
  confidenceScore,
  className,
}: EligibilityInsightProps) {
  const config = STATUS_CONFIG[status];
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        config.bgClass,
        config.borderClass,
        className
      )}
      dir="rtl"
      aria-label={`תובנת זכאות: ${benefitName} — ${config.label}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <StatusIcon
            className={cn("h-5 w-5 shrink-0", config.colorClass)}
            aria-hidden="true"
          />
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {benefitName}
            </h4>
            <span className={cn("text-xs font-medium", config.colorClass)}>
              {config.label}
            </span>
          </div>
        </div>

        <ConfidenceIndicator
          level={confidence}
          score={confidenceScore}
          compact
        />
      </div>

      {/* Explanation */}
      <div className="flex items-start gap-2 mb-3">
        <Bot className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[hsl(var(--ai-generated-accent))]" aria-hidden="true" />
        <p className="text-sm text-foreground/85 leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Citations */}
      {citations && citations.length > 0 && (
        <div className="pt-2 border-t border-[hsl(var(--ai-generated-border))]">
          <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
            <FileText className="h-3 w-3" aria-hidden="true" />
            מקורות
          </p>
          <ul className="space-y-1">
            {citations.map((cite, i) => (
              <li
                key={i}
                className="text-xs text-muted-foreground bg-[hsl(var(--ai-citation-bg))] rounded px-2 py-1 inline-block me-2 mb-1"
              >
                {cite.label}
                {cite.reference && (
                  <span className="text-foreground/60 ms-1">
                    ({cite.reference})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
