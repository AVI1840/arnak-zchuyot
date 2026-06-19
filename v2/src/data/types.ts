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
  | 'alimony'
  | 'prisoners_of_zion'
  | 'righteous_nations';

export type EligibilityLevel = 'eligible' | 'needs_info';

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

export interface RightWithScore extends Right {
  matchScore: number;
  eligibilityLevel: EligibilityLevel;
  totalScore: number;
}

export interface UserMetrics {
  medical_disability_pct: number;
  incapacity_pct: number;
  mobility_pct: number;
  special_services_rate: number;
  nursing_level: number;
  is_income_support: boolean;
  owns_apartment: boolean;
  uses_wheelchair: boolean;
  age: number;
}

export const DEFAULT_METRICS: UserMetrics = {
  medical_disability_pct: 0,
  incapacity_pct: 0,
  mobility_pct: 0,
  special_services_rate: 0,
  nursing_level: 0,
  is_income_support: false,
  owns_apartment: false,
  uses_wheelchair: false,
  age: 0,
};

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
  prisoners_of_zion: 'אסירי ציון',
  righteous_nations: 'חסידי אומות עולם',
};

export const BENEFIT_TOOLTIPS: Record<BenefitType, string> = {
  old_age: 'קצבה חודשית לגברים מגיל 67 ולנשים מגיל 62-65',
  old_age_income_support: 'קצבת אזרח ותיק עם תוספת השלמת הכנסה למי שהכנסתו נמוכה',
  nursing: 'גמלה למי שזקוק לעזרה בפעולות יום-יום בגלל מצב בריאותי',
  general_disability: 'קצבה למי שכושר ההשתכרות שלו נפגע בגלל מצב רפואי',
  special_services: 'גמלה למי שזקוק לעזרת הזולת בפעולות יום-יום',
  mobility: 'קצבה למי שמוגבל בניידות ונזקק לרכב',
  child_disability: 'גמלה להורים לילד עם מוגבלות הזקוק לטיפול מיוחד',
  work_injury: 'קצבה למי שנפגע בתאונת עבודה או מחלת מקצוע',
  survivors: 'קצבה לבני משפחה של מבוטח שנפטר',
  survivors_income_support: 'קצבת שארים עם תוספת השלמת הכנסה',
  terror_victim: 'קצבה למי שנפגע בפעולת איבה',
  income_support: 'קצבה למי שאין לו הכנסה מספקת להתקיים',
  alimony: 'תשלום מזונות מהביטוח הלאומי כשהחייב לא משלם',
  prisoners_of_zion: 'תגמול לאסירי ציון ובני משפחותיהם',
  righteous_nations: 'תגמול לחסידי אומות העולם',
};

export const ALL_BENEFITS: BenefitType[] = [
  'old_age',
  'old_age_income_support',
  'nursing',
  'general_disability',
  'special_services',
  'mobility',
  'child_disability',
  'work_injury',
  'survivors',
  'survivors_income_support',
  'terror_victim',
  'income_support',
  'alimony',
  'prisoners_of_zion',
  'righteous_nations',
];
