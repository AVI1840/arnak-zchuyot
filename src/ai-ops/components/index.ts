/**
 * BTL AI-Ops — MVP Components
 * =============================
 * Core MVP: 5 components that deliver immediate operational value.
 * Secondary components (SupervisorEscalation, ExecutiveKpiCard) remain
 * in the folder but are NOT exported here until needed.
 */

// ─── CORE MVP ────────────────────────────────────────────
export { ConfidenceIndicator } from "./ConfidenceIndicator";
export type { ConfidenceLevel } from "./ConfidenceIndicator";

export { AiCaseSummary } from "./AiCaseSummary";

export { HumanReviewActions } from "./HumanReviewActions";
export type { ReviewAction } from "./HumanReviewActions";

export { EligibilityInsight } from "./EligibilityInsight";
export type { EligibilityStatus } from "./EligibilityInsight";

export { MissingDocuments } from "./MissingDocuments";

// ─── SUPPORTING (used by core components) ────────────────
export { WorkflowStatusBadge } from "./WorkflowStatusBadge";
export type { WorkflowStatus } from "./WorkflowStatusBadge";

// ─── SECONDARY (available but not promoted) ──────────────
// import directly if needed:
//   import { SupervisorEscalation } from "@/ai-ops/components/SupervisorEscalation";
//   import { ExecutiveKpiCard } from "@/ai-ops/components/ExecutiveKpiCard";
