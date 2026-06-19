/**
 * Rights Database — Imports and processes the v1.1 JSON data
 * Source of truth: data/rights_database_delivery_v1.1.json (102 benefits)
 */

import type { Right, RightWithScore, BenefitType, Domain, UserMetrics, EligibilityLevel } from './types';
import rightsJson from './rights_database_delivery_v1.1.json';

// Transform JSON records into Right objects
export const RIGHTS_DATABASE: Right[] = (rightsJson.rights as any[]).map((r) => ({
  id: r.id,
  title: r.title,
  provider: r.provider,
  domain: r.domain as Domain,
  value_display: r.title,
  eligibility_details: r.eligibility_text || '',
  how_to_apply: r.how_to_apply || '',
  notes: r.notes || undefined,
  action_link: r.action_link || undefined,
  applicable_benefits: r.applicable_benefits as BenefitType[],
  is_automatic: r.is_automatic ?? false,
  primary_display_priority: r.primary_display_priority ?? 3,
  estimated_value: r.estimated_value ?? 0,
  popularity_score: r.popularity_score ?? 50,
  source_verified: r.source_verified ?? false,
  transport_providers: r.transport_providers || undefined,
  requires_local_authority_check: r.requires_local_authority_check || undefined,
}));

// Scoring weights
const SCORING_WEIGHTS = {
  user_match: 0.5,
  estimated_value: 0.25,
  popularity: 0.15,
  ease_of_access: 0.10,
};

function getEligibilityLevel(matchScore: number, hasMetrics: boolean): EligibilityLevel {
  if (!hasMetrics || matchScore < 80) return 'needs_info';
  return 'eligible';
}

interface EligibilityContext {
  benefits: BenefitType[];
  metrics: UserMetrics;
}

function checkRightEligibility(right: Right, context: EligibilityContext): { eligible: boolean; matchScore: number } {
  const { benefits, metrics } = context;
  const hasBenefit = right.applicable_benefits.some(benefit => benefits.includes(benefit));
  if (!hasBenefit) return { eligible: false, matchScore: 0 };

  const hasMetrics = metrics.medical_disability_pct > 0 || metrics.incapacity_pct > 0 ||
    metrics.mobility_pct > 0 || metrics.special_services_rate > 0 || metrics.nursing_level > 0 ||
    metrics.is_income_support || metrics.age > 0;

  let matchScore = 80;

  // General Disability
  if (right.id === 'water_disability') {
    if (!hasMetrics) matchScore = 70;
    else if (metrics.medical_disability_pct >= 70) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'arnona_disability') {
    if (!hasMetrics) matchScore = 70;
    else if (metrics.incapacity_pct >= 75 || metrics.medical_disability_pct >= 90) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'tax_exemption_disability') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 90) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'tax_purchase_disability') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.incapacity_pct >= 75 || metrics.medical_disability_pct >= 90) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'land_fees_disability') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 80) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'housing_disability_96') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.incapacity_pct >= 75) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'nii_exempt_disability') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.incapacity_pct >= 75) matchScore = 95;
    else matchScore = 50;
  }
  if (right.id === 'tax_credit_disability') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.incapacity_pct >= 74) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'housing_disability') {
    if (!hasMetrics) matchScore = 50;
    else if (metrics.medical_disability_pct >= 40) matchScore = 60;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'bank_fees_disability') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 40) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }

  // Special Services
  if (right.id === 'water_special') {
    if (!hasMetrics) matchScore = 70;
    else if (metrics.special_services_rate >= 112) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'housing_special') {
    if (!hasMetrics) matchScore = 50;
    else if (metrics.special_services_rate >= 112) matchScore = 60;
    else return { eligible: false, matchScore: 0 };
  }

  // Mobility
  if (right.id === 'arnona_mobility') {
    if (!hasMetrics) matchScore = 70;
    else if (metrics.mobility_pct >= 90) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'tax_purchase_mobility') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.mobility_pct >= 50) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'housing_mobility') {
    if (metrics.uses_wheelchair) matchScore = 90;
    else matchScore = 50;
  }

  // Transport
  if (right.id === 'transport_disability') {
    if (metrics.age >= 67) return { eligible: false, matchScore: 0 };
    matchScore = 90;
  }
  if (right.id === 'transport_old_age') {
    if (metrics.age >= 67) matchScore = 95;
    else if (!hasMetrics) matchScore = 70;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'transport_income_support') matchScore = 90;
  if (right.id === 'parking_tag_disability' || right.id === 'parking_tag_child') matchScore = 60;

  // Old Age
  if (right.id === 'arnona_old_age') {
    if (benefits.includes('old_age_income_support') || metrics.is_income_support) matchScore = 95;
    else matchScore = 80;
  }
  if (['health_services_old_age_is', 'phone_old_age_is', 'electricity_old_age_is', 'housing_old_age_is', 'water_old_age_is'].includes(right.id)) {
    if (benefits.includes('old_age_income_support')) matchScore = 95;
    else if (metrics.is_income_support) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'water_old_age') {
    if (metrics.age >= 72) matchScore = 95;
    else if (!hasMetrics) matchScore = 60;
    else return { eligible: false, matchScore: 0 };
  }

  // Survivors
  if (['electricity_survivors_is', 'housing_survivors_is', 'health_services_survivors_is', 'arnona_survivors_is', 'phone_survivors_is', 'water_survivors_is', 'arnona_survivors'].includes(right.id)) {
    if (benefits.includes('survivors_income_support')) matchScore = 95;
    else if (metrics.is_income_support) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }

  // Work Injury
  if (right.id === 'arnona_work_injury' || right.id === 'tax_exemption_work_injury') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 90) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'tax_purchase_work_injury') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 90) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'legal_aid_work_injury' || right.id === 'life_insurance_work_injury') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 20) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'nii_exempt_work_injury') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 100) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }

  // Nursing
  if (right.id === 'electricity_nursing') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.nursing_level >= 5) matchScore = 95;
    else if (metrics.nursing_level === 4 && metrics.age >= 90) matchScore = 95;
    else if (metrics.nursing_level === 4) matchScore = 50;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'water_nursing') {
    if (!hasMetrics) matchScore = 70;
    else if (metrics.nursing_level >= 3) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'foreign_worker_nursing') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.nursing_level >= 3) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }

  // Terror
  if (right.id === 'water_terror' || right.id === 'electricity_terror') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 50) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'tax_purchase_terror') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 19) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'arnona_terror') {
    if (!hasMetrics) matchScore = 70;
    else if (metrics.medical_disability_pct >= 10) matchScore = 95;
    else return { eligible: false, matchScore: 0 };
  }

  // Income Support
  if (right.id === 'electricity_income_support') {
    if (benefits.includes('income_support') || metrics.is_income_support) matchScore = 90;
    else return { eligible: false, matchScore: 0 };
  }

  // Child Disability
  if (right.id === 'tax_purchase_child') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 100) matchScore = 95;
    else if (metrics.medical_disability_pct >= 90) matchScore = 80;
    else return { eligible: false, matchScore: 0 };
  }
  if (right.id === 'pension_tax_child') {
    if (!hasMetrics) matchScore = 60;
    else if (metrics.medical_disability_pct >= 75) matchScore = 90;
    else matchScore = 50;
  }

  return { eligible: true, matchScore };
}

function calculateRightScore(right: Right, matchScore: number): number {
  const userMatchNorm = matchScore;
  const valueNorm = Math.min(((right.estimated_value || 0) / 40000) * 100, 100);
  const popularityNorm = right.popularity_score || 50;
  const easeNorm = right.is_automatic ? 100 : 50;
  const priorityBoost = right.primary_display_priority === 1 ? 20 :
    right.primary_display_priority === 2 ? 10 : 0;

  return (
    (SCORING_WEIGHTS.user_match * userMatchNorm) +
    (SCORING_WEIGHTS.estimated_value * valueNorm) +
    (SCORING_WEIGHTS.popularity * popularityNorm) +
    (SCORING_WEIGHTS.ease_of_access * easeNorm) +
    priorityBoost
  );
}

export function getEligibleRights(
  selectedBenefits: BenefitType[],
  metrics?: UserMetrics
): RightWithScore[] {
  if (selectedBenefits.length === 0) return [];

  const defaultMetrics: UserMetrics = {
    medical_disability_pct: 0, incapacity_pct: 0, mobility_pct: 0,
    special_services_rate: 0, nursing_level: 0, is_income_support: false,
    owns_apartment: false, uses_wheelchair: false, age: 0,
  };
  const resolvedMetrics = metrics || defaultMetrics;
  const hasMetrics = resolvedMetrics.medical_disability_pct > 0 || resolvedMetrics.incapacity_pct > 0 ||
    resolvedMetrics.mobility_pct > 0 || resolvedMetrics.special_services_rate > 0 || resolvedMetrics.nursing_level > 0 ||
    resolvedMetrics.is_income_support || resolvedMetrics.age > 0;

  const context: EligibilityContext = { benefits: selectedBenefits, metrics: resolvedMetrics };
  const eligibleRights: RightWithScore[] = [];

  for (const right of RIGHTS_DATABASE) {
    const { eligible, matchScore } = checkRightEligibility(right, context);
    if (eligible) {
      const totalScore = calculateRightScore(right, matchScore);
      eligibleRights.push({
        ...right,
        matchScore,
        eligibilityLevel: getEligibilityLevel(matchScore, hasMetrics),
        totalScore,
      });
    }
  }

  eligibleRights.sort((a, b) => b.totalScore - a.totalScore);

  // Deduplicate by title
  const byTitle = new Map<string, RightWithScore>();
  for (const right of eligibleRights) {
    const existing = byTitle.get(right.title);
    if (!existing || right.totalScore > existing.totalScore) {
      byTitle.set(right.title, right);
    }
  }

  return Array.from(byTitle.values());
}

export function countRightsByDomain(rights: RightWithScore[]): Record<Domain, number> {
  const counts: Record<Domain, number> = {
    housing: 0, health: 0, transport: 0, utilities: 0,
    financial: 0, welfare: 0, employment: 0, legal: 0,
  };
  for (const right of rights) counts[right.domain]++;
  return counts;
}
