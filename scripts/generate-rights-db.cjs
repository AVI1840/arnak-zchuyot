#!/usr/bin/env node
/**
 * Generate rightsDatabase.ts from the spec JSON (source of truth: 98 benefits)
 * Run: node scripts/generate-rights-db.js
 * 
 * IMPORTANT: This preserves the exact API contract that components depend on:
 * - Types: Domain, BenefitType, EligibilityLevel, SortOption, Right, RightWithScore, RightCondition, RightLogic, ScoringWeights
 * - Constants: DOMAIN_LABELS, ELIGIBILITY_LEVEL_LABELS, BENEFIT_LABELS, BENEFIT_ICONS
 * - Functions: getEligibleRights, sortRights, countRightsByDomain, getRightsByDomain, getEligibilityLevel
 */
const fs = require('fs');
const path = require('path');

const specPath = path.join(__dirname, '..', 'data', 'rights_database_spec.json');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'rightsDatabase.ts');

const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

// Valid benefit types
const validBenefits = new Set([
  'general_disability', 'special_services', 'mobility', 'child_disability',
  'old_age', 'old_age_income_support', 'nursing', 'survivors',
  'survivors_income_support', 'work_injury', 'terror_victim',
  'income_support', 'alimony'
]);

// Estimate values based on benefit type
function estimateValue(item) {
  const title = item.title || '';
  if (title.includes('מס רכישה') || title.includes('הלוואה')) return 40000;
  if (title.includes('שכר דירה') || title.includes('דיור ציבורי')) return 12000;
  if (title.includes('פטור ממס') || title.includes('פטור מתשלום מס')) return 15000;
  if (title.includes('ארנונה')) return 3500;
  if (title.includes('חשמל')) return 2400;
  if (title.includes('מים')) return 500;
  if (title.includes('טלפון') || title.includes('בזק')) return 600;
  if (title.includes('תחבורה') || title.includes('נסיעה') || title.includes('הנחה בנסיעות')) return 3000;
  if (title.includes('חניה') || title.includes('תג')) return 3000;
  if (title.includes('שיניים')) return 2000;
  if (title.includes('תרופות') || title.includes('רפואי')) return 1200;
  if (title.includes('שיקום')) return 5000;
  if (title.includes('מעון') || title.includes('סייעת')) return 15000;
  if (title.includes('ביטוח חיים')) return 2000;
  if (title.includes('נקודות זיכוי')) return 5000;
  if (title.includes('גרירה')) return 1000;
  if (title.includes('רכב')) return 8000;
  if (title.includes('עזרה בלימודים') || title.includes('לימודים')) return 4000;
  return 1000;
}

function estimatePopularity(item) {
  const p = item.primary_display_priority || 3;
  if (p === 1) return 90;
  if (p === 2) return 75;
  return 60;
}

function escapeStr(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// ============ BUILD OUTPUT ============

let output = `// Rights Database — AUTO-GENERATED from rights_database_spec.json
// Source of truth: data/rights_database_spec.json (${spec.length} benefits from NII official data)
// Generated: ${new Date().toISOString().split('T')[0]}
// DO NOT EDIT MANUALLY — run: node scripts/generate-rights-db.js

export type Domain = 
  | 'housing' 
  | 'health' 
  | 'transport' 
  | 'utilities' 
  | 'financial' 
  | 'welfare' 
  | 'employment' 
  | 'legal';

export type BenefitType = 
  | 'general_disability' 
  | 'special_services' 
  | 'mobility' 
  | 'child_disability' 
  | 'old_age' 
  | 'old_age_income_support'
  | 'nursing' 
  | 'survivors' 
  | 'survivors_income_support'
  | 'work_injury' 
  | 'terror_victim' 
  | 'income_support'
  | 'alimony';

export type EligibilityLevel = 'high' | 'medium' | 'low';

export interface RightCondition {
  benefit?: BenefitType;
  min_medical_disability?: number;
  min_incapacity?: number;
  min_mobility?: number;
  min_nursing_level?: number;
  min_special_services_rate?: number;
  is_income_support?: boolean;
  owns_apartment?: boolean;
  value?: number;
}

export interface RightLogic {
  operator: 'OR' | 'AND' | 'MAX_VALUE';
  conditions: RightCondition[];
}

export interface Right {
  id: string;
  title: string;
  provider: string;
  domain: Domain;
  value_display: string;
  eligibility_details: string;
  how_to_apply: string;
  notes?: string;
  action_link?: string;
  applicable_benefits: BenefitType[];
  is_automatic: boolean;
  primary_display_priority: number;
  estimated_value?: number;
  popularity_score?: number;
  source_verified: boolean;
  transport_providers?: string[];
  requires_local_authority_check?: boolean;
}

export const DOMAIN_LABELS: Record<Domain, string> = {
  housing: 'דיור',
  health: 'בריאות',
  transport: 'תחבורה',
  utilities: 'תשתיות',
  financial: 'כספים ומיסים',
  welfare: 'רווחה',
  employment: 'תעסוקה',
  legal: 'משפטי',
};

export const ELIGIBILITY_LEVEL_LABELS: Record<EligibilityLevel, string> = {
  high: 'סבירות גבוהה',
  medium: 'סבירות בינונית',
  low: 'סבירות נמוכה',
};

export const BENEFIT_LABELS: Record<BenefitType, string> = {
  general_disability: 'נכות כללית',
  special_services: 'שירותים מיוחדים',
  mobility: 'ניידות',
  child_disability: 'ילד נכה',
  old_age: 'אזרח ותיק',
  old_age_income_support: 'אזרח ותיק + השלמת הכנסה',
  nursing: 'סיעוד',
  survivors: 'שארים',
  survivors_income_support: 'שארים + השלמת הכנסה',
  work_injury: 'נכות מעבודה',
  terror_victim: 'נפגעי איבה',
  income_support: 'הבטחת הכנסה',
  alimony: 'מזונות',
};

export const BENEFIT_ICONS: Record<BenefitType, string> = {
  general_disability: '♿',
  special_services: '🤝',
  mobility: '🚗',
  child_disability: '👶',
  old_age: '👴',
  old_age_income_support: '👴💰',
  nursing: '🏥',
  survivors: '💐',
  survivors_income_support: '💐💰',
  work_injury: '⚠️',
  terror_victim: '🎗️',
  income_support: '💵',
  alimony: '👨‍👩‍👧',
};

`;

// ============ GENERATE RIGHTS ARRAY ============

output += `export const RIGHTS_DATABASE: Right[] = [\n`;

let count = 0;
for (const item of spec) {
  const benefits = (item.applicable_benefits || []).filter(b => validBenefits.has(b));
  if (benefits.length === 0) continue;

  const domain = item.domain || 'welfare';
  const title = item.title || '';
  const eligText = item.eligibility_text || '';
  const howTo = item.how_to_apply || '';
  const isAuto = item.is_automatic === true;
  const priority = item.primary_display_priority || 3;
  const estValue = estimateValue(item);
  const popScore = estimatePopularity(item);
  const isTransport = domain === 'transport';
  const isArnona = title.includes('ארנונה');

  output += `  {\n`;
  output += `    id: '${escapeStr(item.id)}',\n`;
  output += `    title: '${escapeStr(title)}',\n`;
  output += `    provider: '${escapeStr(item.provider || '')}',\n`;
  output += `    domain: '${domain}' as Domain,\n`;
  output += `    value_display: '${escapeStr(title)}',\n`;
  output += `    eligibility_details: '${escapeStr(eligText)}',\n`;
  output += `    how_to_apply: '${escapeStr(howTo)}',\n`;
  output += `    applicable_benefits: [${benefits.map(b => `'${b}'`).join(', ')}] as BenefitType[],\n`;
  output += `    is_automatic: ${isAuto},\n`;
  output += `    primary_display_priority: ${priority},\n`;
  output += `    estimated_value: ${estValue},\n`;
  output += `    popularity_score: ${popScore},\n`;
  output += `    source_verified: true,\n`;
  if (isArnona) {
    output += `    requires_local_authority_check: true,\n`;
  }
  if (isTransport) {
    output += `    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד'],\n`;
  }
  output += `  },\n`;
  count++;
}

output += `];\n\n`;

// ============ SCORING & ELIGIBILITY FUNCTIONS ============
// These MUST match the existing API exactly

output += `import type { UserMetrics } from '@/types/userProfile';

// Scoring weights for smart sorting
export interface ScoringWeights {
  user_match: number;
  estimated_value: number;
  popularity: number;
  ease_of_access: number;
}

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  user_match: 0.5,
  estimated_value: 0.25,
  popularity: 0.15,
  ease_of_access: 0.10,
};

interface EligibilityContext {
  benefits: BenefitType[];
  metrics: UserMetrics;
}

export function getEligibilityLevel(matchScore: number): EligibilityLevel {
  if (matchScore >= 80) return 'high';
  if (matchScore >= 50) return 'medium';
  return 'low';
}

`;

// Build eligibility logic from spec
// Collect all IDs that have eligibility_logic in the spec
const logicEntries = spec.filter(item => item.eligibility_logic);

output += `function checkRightEligibility(right: Right, context: EligibilityContext): { eligible: boolean; matchScore: number } {
  const { benefits, metrics } = context;
  
  const hasBenefit = right.applicable_benefits.some(benefit => benefits.includes(benefit));
  if (!hasBenefit) {
    return { eligible: false, matchScore: 0 };
  }

  let matchScore = 50; // Base score for having the benefit

`;

// Generate specific eligibility checks from spec's eligibility_logic
for (const item of logicEntries) {
  const logic = item.eligibility_logic;
  const id = item.id;
  
  if (logic.min_medical_disability && !logic.operator) {
    output += `  // ${escapeStr(item.title)}\n`;
    output += `  if (right.id === '${escapeStr(id)}') {\n`;
    output += `    if (metrics.medical_disability_pct >= ${logic.min_medical_disability}) {\n`;
    output += `      matchScore = 90;\n`;
    output += `    } else if (metrics.medical_disability_pct >= ${Math.floor(logic.min_medical_disability * 0.7)}) {\n`;
    output += `      matchScore = 60;\n`;
    output += `    }\n`;
    output += `  }\n\n`;
  }
  
  if (logic.operator === 'OR' && logic.conditions) {
    output += `  // ${escapeStr(item.title)}\n`;
    output += `  if (right.id === '${escapeStr(id)}') {\n`;
    const checks = [];
    for (const cond of logic.conditions) {
      if (cond.min_incapacity) checks.push(`metrics.incapacity_pct >= ${cond.min_incapacity}`);
      if (cond.min_medical_disability) checks.push(`metrics.medical_disability_pct >= ${cond.min_medical_disability}`);
      if (cond.min_mobility) checks.push(`metrics.mobility_pct >= ${cond.min_mobility}`);
      if (cond.min_nursing_level) checks.push(`metrics.nursing_level >= ${cond.min_nursing_level}`);
      if (cond.min_special_services_rate) checks.push(`metrics.special_services_rate >= ${cond.min_special_services_rate}`);
      if (cond.is_income_support === true) checks.push(`metrics.is_income_support`);
    }
    if (checks.length > 0) {
      output += `    if (${checks.join(' || ')}) {\n`;
      output += `      matchScore = 90;\n`;
      output += `    } else {\n`;
      output += `      matchScore = 40;\n`;
      output += `    }\n`;
    }
    output += `  }\n\n`;
  }

  if (logic.operator === 'AND' && logic.conditions) {
    output += `  // ${escapeStr(item.title)}\n`;
    output += `  if (right.id === '${escapeStr(id)}') {\n`;
    const checks = [];
    for (const cond of logic.conditions) {
      if (cond.min_incapacity) checks.push(`metrics.incapacity_pct >= ${cond.min_incapacity}`);
      if (cond.min_medical_disability) checks.push(`metrics.medical_disability_pct >= ${cond.min_medical_disability}`);
      if (cond.min_mobility) checks.push(`metrics.mobility_pct >= ${cond.min_mobility}`);
      if (cond.min_nursing_level) checks.push(`metrics.nursing_level >= ${cond.min_nursing_level}`);
      if (cond.min_special_services_rate) checks.push(`metrics.special_services_rate >= ${cond.min_special_services_rate}`);
      if (cond.is_income_support === true) checks.push(`metrics.is_income_support`);
    }
    if (checks.length > 0) {
      output += `    if (${checks.join(' && ')}) {\n`;
      output += `      matchScore = 90;\n`;
      output += `    } else {\n`;
      output += `      matchScore = 30;\n`;
      output += `    }\n`;
    }
    output += `  }\n\n`;
  }

  // Handle income_support requirement
  if (logic.requires_income_support) {
    output += `  // ${escapeStr(item.title)} — requires income support\n`;
    output += `  if (right.id === '${escapeStr(id)}') {\n`;
    output += `    if (!metrics.is_income_support) {\n`;
    output += `      return { eligible: false, matchScore: 0 };\n`;
    output += `    }\n`;
    output += `    matchScore = 90;\n`;
    output += `  }\n\n`;
  }
}

output += `  // Old age benefits that require income support
  if ((right.id === 'electricity_old_age' || right.id === 'water_old_age') && 
      right.applicable_benefits.includes('old_age_income_support')) {
    if (!benefits.includes('old_age_income_support') && !metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = metrics.is_income_support ? 90 : 50;
  }

  return { eligible: true, matchScore };
}

function calculateRightScore(right: Right, matchScore: number, weights: ScoringWeights): number {
  const userMatchNorm = matchScore;
  const valueNorm = Math.min((right.estimated_value || 0) / 500, 100);
  const popularityNorm = right.popularity_score || 50;
  const easeNorm = right.is_automatic ? 100 : 50;
  
  const priorityBoost = right.primary_display_priority === 1 ? 20 : 
                        right.primary_display_priority === 2 ? 10 : 0;
  
  const score = 
    (weights.user_match * userMatchNorm) +
    (weights.estimated_value * valueNorm) +
    (weights.popularity * popularityNorm) +
    (weights.ease_of_access * easeNorm) +
    priorityBoost;
  
  return score;
}

export interface RightWithScore extends Right {
  matchScore: number;
  eligibilityLevel: EligibilityLevel;
  totalScore: number;
}

export function getEligibleRights(
  selectedBenefits: BenefitType[], 
  metrics?: UserMetrics,
  weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS
): RightWithScore[] {
  if (selectedBenefits.length === 0) return [];
  
  const context: EligibilityContext = {
    benefits: selectedBenefits,
    metrics: metrics || {
      medical_disability_pct: 0,
      incapacity_pct: 0,
      mobility_pct: 0,
      special_services_rate: 0,
      nursing_level: 0,
      is_income_support: false,
      owns_apartment: false,
      uses_wheelchair: false,
    },
  };

  const eligibleRights: RightWithScore[] = [];
  
  for (const right of RIGHTS_DATABASE) {
    const { eligible, matchScore } = checkRightEligibility(right, context);
    if (eligible) {
      const totalScore = calculateRightScore(right, matchScore, weights);
      eligibleRights.push({
        ...right,
        matchScore,
        eligibilityLevel: getEligibilityLevel(matchScore),
        totalScore,
      });
    }
  }

  eligibleRights.sort((a, b) => b.totalScore - a.totalScore);

  // Deduplicate by title
  const uniqueRights = new Map<string, RightWithScore>();
  for (const right of eligibleRights) {
    if (!uniqueRights.has(right.title)) {
      uniqueRights.set(right.title, right);
    }
  }

  return Array.from(uniqueRights.values());
}

export type SortOption = 'score' | 'value' | 'popularity' | 'automatic';

export function sortRights(rights: RightWithScore[], sortBy: SortOption): RightWithScore[] {
  const sorted = [...rights];
  
  switch (sortBy) {
    case 'score':
      return sorted.sort((a, b) => b.totalScore - a.totalScore);
    case 'value':
      return sorted.sort((a, b) => (b.estimated_value || 0) - (a.estimated_value || 0));
    case 'popularity':
      return sorted.sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0));
    case 'automatic':
      return sorted.sort((a, b) => {
        if (a.is_automatic === b.is_automatic) return b.totalScore - a.totalScore;
        return a.is_automatic ? -1 : 1;
      });
    default:
      return sorted;
  }
}

export function getRightsByDomain(rights: RightWithScore[]): Record<Domain, RightWithScore[]> {
  const grouped: Record<Domain, RightWithScore[]> = {
    housing: [], health: [], transport: [], utilities: [],
    financial: [], welfare: [], employment: [], legal: [],
  };
  for (const right of rights) {
    grouped[right.domain].push(right);
  }
  return grouped;
}

export function countRightsByDomain(rights: RightWithScore[]): Record<Domain, number> {
  const counts: Record<Domain, number> = {
    housing: 0, health: 0, transport: 0, utilities: 0,
    financial: 0, welfare: 0, employment: 0, legal: 0,
  };
  for (const right of rights) {
    counts[right.domain]++;
  }
  return counts;
}
`;

fs.writeFileSync(outputPath, output, 'utf8');
console.log(`✅ Generated ${count} rights from ${spec.length} spec entries`);
console.log(`   Output: ${outputPath}`);
