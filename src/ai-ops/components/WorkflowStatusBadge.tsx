/**
 * WorkflowStatusBadge — תג סטטוס תהליך
 * ========================================
 * Badge קומפקטי — רק 4 מצבים שרלוונטיים ל-MVP:
 * ממתין, אושר, נדחה, הועבר למנהל.
 *
 * נגישות: צבע + אייקון + טקסט, role="status"
 * RTL: מלא
 */

import { cn } from "@/lib/utils";
import { Clock, CheckCircle2, XCircle, ArrowUpCircle } from "lucide-react";

export type WorkflowStatus = "pending" | "approved" | "rejected" | "escalated";

interface WorkflowStatusBadgeProps {
  status: WorkflowStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  WorkflowStatus,
  { label: string; icon: typeof Clock; tokenVar: string }
> = {
  pending: { label: "ממתין", icon: Clock, tokenVar: "--wf-pending" },
  approved: { label: "אושר", icon: CheckCircle2, tokenVar: "--wf-approved" },
  rejected: { label: "נדחה", icon: XCircle, tokenVar: "--wf-rejected" },
  escalated: { label: "הועבר למנהל", icon: ArrowUpCircle, tokenVar: "--wf-escalated" },
};

export function WorkflowStatusBadge({
  status,
  className,
}: WorkflowStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium",
        className
      )}
      style={{
        backgroundColor: `hsl(var(${config.tokenVar}) / 0.1)`,
        borderColor: `hsl(var(${config.tokenVar}) / 0.3)`,
        color: `hsl(var(${config.tokenVar}))`,
      }}
      role="status"
      aria-label={config.label}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
}
