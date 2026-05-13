/**
 * ExecutiveKpiCard — כרטיס KPI למנהלים
 * =======================================
 * כרטיס מדד ביצוע למנהלים בכירים.
 * מציג מספר מרכזי, מגמה, והשוואה לתקופה קודמת.
 *
 * עקרונות:
 * - מספר אחד גדול וברור
 * - מגמה ויזואלית (עלייה/ירידה/יציב)
 * - הבנה תוך 3 שניות
 * - ללא רעש ויזואלי
 *
 * נגישות: semantic values, aria-labels descriptive
 * RTL: מלא
 */

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Trend = "up" | "down" | "stable";

interface ExecutiveKpiCardProps {
  /** שם המדד */
  label: string;
  /** ערך מרכזי */
  value: string | number;
  /** יחידה (%, תיקים, ₪) */
  unit?: string;
  /** מגמה */
  trend?: Trend;
  /** שינוי באחוזים */
  changePercent?: number;
  /** תיאור תקופת השוואה */
  comparisonLabel?: string;
  /** אייקון (React node) */
  icon?: React.ReactNode;
  /** className נוסף */
  className?: string;
}

const TREND_CONFIG: Record<Trend, { icon: typeof TrendingUp; colorClass: string; label: string }> = {
  up: { icon: TrendingUp, colorClass: "text-[hsl(var(--success))]", label: "עלייה" },
  down: { icon: TrendingDown, colorClass: "text-[hsl(var(--destructive))]", label: "ירידה" },
  stable: { icon: Minus, colorClass: "text-muted-foreground", label: "יציב" },
};

export function ExecutiveKpiCard({
  label,
  value,
  unit,
  trend,
  changePercent,
  comparisonLabel = "לעומת חודש קודם",
  icon,
  className,
}: ExecutiveKpiCardProps) {
  const trendConfig = trend ? TREND_CONFIG[trend] : null;
  const TrendIcon = trendConfig?.icon;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 flex flex-col gap-2",
        className
      )}
      dir="rtl"
      aria-label={`${label}: ${value}${unit ? ` ${unit}` : ""}`}
    >
      {/* Label + Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        {icon && (
          <span className="text-muted-foreground/60" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-foreground tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground">{unit}</span>
        )}
      </div>

      {/* Trend */}
      {trendConfig && (
        <div className="flex items-center gap-1.5">
          {TrendIcon && (
            <TrendIcon
              className={cn("h-3.5 w-3.5", trendConfig.colorClass)}
              aria-hidden="true"
            />
          )}
          {changePercent != null && (
            <span className={cn("text-xs font-medium", trendConfig.colorClass)}>
              {changePercent > 0 ? "+" : ""}
              {changePercent}%
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {comparisonLabel}
          </span>
        </div>
      )}
    </div>
  );
}
