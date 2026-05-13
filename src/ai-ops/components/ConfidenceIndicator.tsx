/**
 * ConfidenceIndicator — מציג רמת ביטחון AI
 * ==========================================
 * מציג ויזואלית את רמת הביטחון של המלצת AI.
 * חובה להציג בכל מקום שבו AI מייצר תוכן או המלצה.
 *
 * נגישות: aria-label מתאר את הרמה, צבע + טקסט (לא צבע בלבד)
 * RTL: תומך מלא, logical properties
 */

import { cn } from "@/lib/utils";

export type ConfidenceLevel = "high" | "medium" | "low";

interface ConfidenceIndicatorProps {
  /** רמת ביטחון: high / medium / low */
  level: ConfidenceLevel;
  /** אחוז ביטחון (0-100), אופציונלי */
  score?: number;
  /** הצגה מינימלית — רק נקודה + טקסט קצר */
  compact?: boolean;
  /** className נוסף */
  className?: string;
}

const CONFIDENCE_CONFIG: Record<
  ConfidenceLevel,
  { label: string; description: string; colorClass: string; dotColor: string }
> = {
  high: {
    label: "ביטחון גבוה",
    description: "המערכת בטוחה בהמלצה זו",
    colorClass: "text-[hsl(var(--ai-confidence-high))]",
    dotColor: "bg-[hsl(var(--ai-confidence-high))]",
  },
  medium: {
    label: "ביטחון בינוני",
    description: "מומלץ לבדוק ידנית",
    colorClass: "text-[hsl(var(--ai-confidence-medium))]",
    dotColor: "bg-[hsl(var(--ai-confidence-medium))]",
  },
  low: {
    label: "ביטחון נמוך",
    description: "נדרשת בדיקה אנושית",
    colorClass: "text-[hsl(var(--ai-confidence-low))]",
    dotColor: "bg-[hsl(var(--ai-confidence-low))]",
  },
};

export function ConfidenceIndicator({
  level,
  score,
  compact = false,
  className,
}: ConfidenceIndicatorProps) {
  const config = CONFIDENCE_CONFIG[level];

  if (compact) {
    return (
      <span
        className={cn("inline-flex items-center gap-1.5 text-sm", className)}
        aria-label={`${config.label}${score != null ? ` — ${score}%` : ""}`}
        role="status"
      >
        <span
          className={cn("h-2 w-2 rounded-full shrink-0", config.dotColor)}
          aria-hidden="true"
        />
        <span className={cn("font-medium", config.colorClass)}>
          {config.label}
        </span>
        {score != null && (
          <span className="text-muted-foreground text-xs">({score}%)</span>
        )}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border px-3 py-2",
        "bg-[hsl(var(--ai-generated-bg))] border-[hsl(var(--ai-generated-border))]",
        className
      )}
      role="status"
      aria-label={`רמת ביטחון AI: ${config.label}${score != null ? ` — ${score}%` : ""}`}
    >
      {/* נקודת צבע */}
      <span
        className={cn("h-3 w-3 rounded-full shrink-0", config.dotColor)}
        aria-hidden="true"
      />

      {/* טקסט */}
      <div className="flex flex-col min-w-0">
        <span className={cn("text-sm font-semibold leading-tight", config.colorClass)}>
          {config.label}
          {score != null && (
            <span className="text-muted-foreground font-normal me-1">
              {" "}({score}%)
            </span>
          )}
        </span>
        <span className="text-xs text-muted-foreground leading-tight">
          {config.description}
        </span>
      </div>
    </div>
  );
}
