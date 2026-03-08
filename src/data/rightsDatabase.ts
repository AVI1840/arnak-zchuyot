// Rights Database based on NII (Bituach Leumi) official data
// Domain categories for filtering

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

// Eligibility probability levels (instead of percentages)
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
  // New fields from requirements
  is_automatic: boolean; // Whether benefit is automatic or requires application
  primary_display_priority: number; // 1 = highest priority (arnona, electricity, etc.)
  estimated_value?: number; // Numeric value for sorting
  popularity_score?: number; // 0-100
  source_verified: boolean; // Whether data is officially verified
  transport_providers?: string[]; // For transport benefits - list of supported providers
  requires_local_authority_check?: boolean; // For benefits that depend on local authority
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

// Master Rights Database with enhanced fields
export const RIGHTS_DATABASE: Right[] = [
  // UTILITIES - High Priority
  {
    id: 'water_discount_disability',
    title: 'הנחה בתעריף מים',
    provider: 'רשות המים',
    domain: 'utilities',
    value_display: 'תוספת עד 3.5 מ״ק בתעריף נמוך',
    eligibility_details: 'מקבלי קצבת נכות כללית עם נכות רפואית 70% ומעלה',
    how_to_apply: 'ההטבה ניתנת אוטומטית. יש לוודא שכתובת המגורים מעודכנת במשרד הפנים.',
    notes: 'הזכאות נמשכת 36 חודשים גם אם הקצבה הופסקה עקב הכנסות מעבודה.',
    applicable_benefits: ['general_disability'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 85,
    source_verified: true,
  },
  {
    id: 'water_discount_special_services',
    title: 'הנחה בתעריף מים',
    provider: 'רשות המים',
    domain: 'utilities',
    value_display: 'תוספת עד 3.5 מ״ק בתעריף נמוך',
    eligibility_details: 'מקבלי קצבת שירותים מיוחדים בשיעור 112% ומעלה',
    how_to_apply: 'ההטבה ניתנת אוטומטית. יש לוודא שכתובת המגורים מעודכנת במשרד הפנים.',
    applicable_benefits: ['special_services'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 80,
    source_verified: true,
  },
  {
    id: 'water_discount_mobility',
    title: 'הנחה בתעריף מים',
    provider: 'רשות המים',
    domain: 'utilities',
    value_display: 'תוספת עד 3.5 מ״ק בתעריף נמוך',
    eligibility_details: 'מקבלי קצבת ניידות',
    how_to_apply: 'ההטבה ניתנת אוטומטית. יש לוודא שכתובת המגורים מעודכנת במשרד הפנים.',
    applicable_benefits: ['mobility'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 80,
    source_verified: true,
  },
  {
    id: 'water_discount_child',
    title: 'הנחה בתעריף מים',
    provider: 'רשות המים',
    domain: 'utilities',
    value_display: 'תוספת עד 3.5 מ״ק בתעריף נמוך',
    eligibility_details: 'הורים לילדים המקבלים קצבת ילד נכה',
    how_to_apply: 'ההטבה ניתנת אוטומטית. יש לוודא שכתובת המגורים מעודכנת במשרד הפנים.',
    applicable_benefits: ['child_disability'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 80,
    source_verified: true,
  },
  {
    id: 'water_discount_nursing',
    title: 'הנחה בתעריף מים',
    provider: 'רשות המים',
    domain: 'utilities',
    value_display: 'תוספת עד 3.5 מ״ק בתעריף נמוך',
    eligibility_details: 'מקבלי גמלת סיעוד ברמה 3 ומעלה',
    how_to_apply: 'ההטבה ניתנת אוטומטית. יש לוודא שכתובת המגורים מעודכנת במשרד הפנים.',
    applicable_benefits: ['nursing'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 80,
    source_verified: true,
  },
  {
    id: 'water_discount_old_age',
    title: 'הנחה בתעריף מים',
    provider: 'רשות המים',
    domain: 'utilities',
    value_display: 'תוספת עד 3.5 מ״ק בתעריף נמוך',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם השלמת הכנסה',
    how_to_apply: 'ההטבה ניתנת אוטומטית. יש לוודא שכתובת המגורים מעודכנת במשרד הפנים.',
    applicable_benefits: ['old_age_income_support'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 85,
    source_verified: true,
  },
  {
    id: 'water_discount_survivors',
    title: 'הנחה בתעריף מים',
    provider: 'רשות המים',
    domain: 'utilities',
    value_display: 'תוספת עד 3.5 מ״ק בתעריף נמוך',
    eligibility_details: 'מקבלי קצבת שארים מעל גיל פרישה עם השלמת הכנסה',
    how_to_apply: 'ההטבה ניתנת אוטומטית. יש לוודא שכתובת המגורים מעודכנת במשרד הפנים.',
    applicable_benefits: ['survivors_income_support'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 75,
    source_verified: true,
  },
  {
    id: 'water_discount_terror',
    title: 'הנחה בתעריף מים',
    provider: 'רשות המים',
    domain: 'utilities',
    value_display: 'תוספת עד 3.5 מ״ק בתעריף נמוך',
    eligibility_details: 'נכי איבה בעלי נכות 50% ומעלה',
    how_to_apply: 'ההטבה ניתנת אוטומטית. יש לוודא שכתובת המגורים מעודכנת במשרד הפנים.',
    applicable_benefits: ['terror_victim'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 75,
    source_verified: true,
  },
  {
    id: 'electricity_special_services',
    title: '50% הנחה בחשמל',
    provider: 'חברת החשמל',
    domain: 'utilities',
    value_display: '50% עד 400 קוט״ש',
    eligibility_details: 'מקבלי קצבת שירותים מיוחדים',
    how_to_apply: 'ההנחה ניתנת אוטומטית. חשבון החשמל חייב להיות על שם הזכאי בתעריף ביתי.',
    notes: 'לבירורים: מוקד 103',
    action_link: 'https://www.iec.co.il/content/tariffs/contentpages/socialtariff',
    applicable_benefits: ['special_services'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 95,
    source_verified: true,
  },
  {
    id: 'electricity_child',
    title: '50% הנחה בחשמל',
    provider: 'חברת החשמל',
    domain: 'utilities',
    value_display: '50% עד 400 קוט״ש',
    eligibility_details: 'הורים לילדים המקבלים קצבת ילד נכה (בגין תלות בעזרת הזולת או טיפול רפואי מיוחד)',
    how_to_apply: 'ההנחה ניתנת אוטומטית. חשבון החשמל חייב להיות על שם ההורה.',
    notes: 'לא כל מקבלי גמלת ילד נכה זכאים. הביטוח הלאומי שולח הודעה למי שזכאים.',
    action_link: 'https://www.iec.co.il/content/tariffs/contentpages/socialtariff',
    applicable_benefits: ['child_disability'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'electricity_nursing',
    title: '50% הנחה בחשמל',
    provider: 'חברת החשמל',
    domain: 'utilities',
    value_display: '50% עד 400 קוט״ש',
    eligibility_details: 'מקבלי גמלת סיעוד ברמה 4-6 (או רמה 4 לגיל 90+)',
    how_to_apply: 'ההנחה ניתנת אוטומטית. חשבון החשמל חייב להיות על שם הזכאי בתעריף ביתי.',
    notes: 'לבירורים: מוקד 103',
    action_link: 'https://www.iec.co.il/content/tariffs/contentpages/socialtariff',
    applicable_benefits: ['nursing'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'electricity_old_age',
    title: '50% הנחה בחשמל',
    provider: 'חברת החשמל',
    domain: 'utilities',
    value_display: '50% עד 400 קוט״ש',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם השלמת הכנסה',
    how_to_apply: 'ההנחה ניתנת אוטומטית. חשבון החשמל חייב להיות על שם הזכאי בתעריף ביתי.',
    notes: 'לבירורים: מוקד 103',
    action_link: 'https://www.iec.co.il/content/tariffs/contentpages/socialtariff',
    applicable_benefits: ['old_age_income_support'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 95,
    source_verified: true,
  },
  {
    id: 'electricity_survivors',
    title: '50% הנחה בחשמל',
    provider: 'חברת החשמל',
    domain: 'utilities',
    value_display: '50% עד 400 קוט״ש',
    eligibility_details: 'מקבלי קצבת שארים עם השלמת הכנסה (3+ ילדים או מעל גיל פרישה)',
    how_to_apply: 'ההנחה ניתנת אוטומטית. חשבון החשמל חייב להיות על שם הזכאי בתעריף ביתי.',
    notes: 'לבירורים: מוקד 103',
    action_link: 'https://www.iec.co.il/content/tariffs/contentpages/socialtariff',
    applicable_benefits: ['survivors_income_support'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 85,
    source_verified: true,
  },
  {
    id: 'electricity_terror',
    title: '50% הנחה בחשמל',
    provider: 'חברת החשמל',
    domain: 'utilities',
    value_display: '50% עד 400 קוט״ש',
    eligibility_details: 'נכי איבה בעלי נכות 50% ומעלה',
    how_to_apply: 'ההנחה ניתנת אוטומטית. חשבון החשמל חייב להיות על שם הזכאי בתעריף ביתי.',
    notes: 'לבירורים: מוקד 103',
    action_link: 'https://www.iec.co.il/content/tariffs/contentpages/socialtariff',
    applicable_benefits: ['terror_victim'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 85,
    source_verified: true,
  },
  {
    id: 'electricity_income_support',
    title: '50% הנחה בחשמל',
    provider: 'חברת החשמל',
    domain: 'utilities',
    value_display: '50% עד 400 קוט״ש',
    eligibility_details: 'מקבלי הבטחת הכנסה (הורה יחיד 3+ ילדים או משפחה 4+ ילדים)',
    how_to_apply: 'ההנחה ניתנת אוטומטית. חשבון החשמל חייב להיות על שם הזכאי בתעריף ביתי.',
    notes: 'לבירורים: מוקד 103',
    action_link: 'https://www.iec.co.il/content/tariffs/contentpages/socialtariff',
    applicable_benefits: ['income_support'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 85,
    source_verified: true,
  },
  {
    id: 'phone_discount_old_age',
    title: '50% הנחה בטלפון בזק',
    provider: 'חברת בזק',
    domain: 'utilities',
    value_display: '50% הנחה בדמי שימוש קבועים',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם השלמת הכנסה',
    how_to_apply: 'ההנחה ניתנת אוטומטית. קו בזק חייב להיות על שם הזכאי בדירת מגורים.',
    notes: 'לא חל על חברות אחרות. הצטרפות למסלול מוזל מבטלת את ההנחה. לבירורים: 199',
    applicable_benefits: ['old_age_income_support'],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 600,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'phone_discount_survivors',
    title: '50% הנחה בטלפון בזק',
    provider: 'חברת בזק',
    domain: 'utilities',
    value_display: '50% הנחה בדמי שימוש קבועים',
    eligibility_details: 'מקבלי קצבת שארים עם השלמת הכנסה',
    how_to_apply: 'ההנחה ניתנת אוטומטית. קו בזק חייב להיות על שם הזכאי בדירת מגורים.',
    notes: 'לא חל על חברות אחרות. הצטרפות למסלול מוזל מבטלת את ההנחה. לבירורים: 199',
    applicable_benefits: ['survivors_income_support'],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 600,
    popularity_score: 55,
    source_verified: true,
  },
  {
    id: 'phone_discount_income_support',
    title: '50% הנחה בטלפון בזק',
    provider: 'חברת בזק',
    domain: 'utilities',
    value_display: '50% הנחה בדמי שימוש קבועים',
    eligibility_details: 'מקבלי גמלת הבטחת הכנסה',
    how_to_apply: 'ההנחה ניתנת אוטומטית. קו בזק חייב להיות על שם הזכאי בדירת מגורים.',
    notes: 'לא חל על חברות אחרות. הצטרפות למסלול מוזל מבטלת את ההנחה. לבירורים: 199',
    applicable_benefits: ['income_support'],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 600,
    popularity_score: 55,
    source_verified: true,
  },

  // HOUSING - High Priority
  {
    id: 'arnona_disability',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'הנחה לפי כללי הרשות',
    eligibility_details: 'מקבלי קצבת נכות כללית עם דרגת אי-כושר 75%+ או נכות רפואית 90%+',
    how_to_apply: 'הביטוח הלאומי מעביר רשימות לרשויות. יש לפנות לרשות המקומית.',
    notes: 'גובה ההנחה נקבע על ידי הרשות המקומית ומשתנה בין רשויות.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['general_disability'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 4000,
    popularity_score: 98,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_child',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'הנחה לפי כללי הרשות',
    eligibility_details: 'הורים לילדים המקבלים קצבת ילד נכה',
    how_to_apply: 'הביטוח הלאומי מעביר רשימות לרשויות. יש לפנות לרשות המקומית.',
    notes: 'גובה ההנחה נקבע על ידי הרשות המקומית ומשתנה בין רשויות.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['child_disability'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 2000,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_old_age',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'תלוי רשות - בדוק ברשות המקומית',
    eligibility_details: 'מקבלי קצבת אזרח ותיק - ההנחה תלויה בכללי הרשות המקומית',
    how_to_apply: 'יש לפנות ישירות לרשות המקומית לבירור הזכאות והאחוזים.',
    notes: 'אין להציג אחוזי הנחה אוטומטיים - גובה ההנחה משתנה בין רשויות ותלוי בקריטריונים מקומיים.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['old_age', 'old_age_income_support'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 3000,
    popularity_score: 95,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_survivors',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'הנחה לפי כללי הרשות',
    eligibility_details: 'מקבלי קצבת שארים מעל גיל פרישה עם השלמת הכנסה',
    how_to_apply: 'הביטוח הלאומי מעביר רשימות לרשויות. יש לפנות לרשות המקומית.',
    notes: 'גובה ההנחה נקבע על ידי הרשות המקומית.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['survivors_income_support'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 85,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_mobility',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'הנחה לפי כללי הרשות',
    eligibility_details: 'מי שנקבעה לו דרגת מוגבלות בניידות 90% ומעלה',
    how_to_apply: 'הביטוח הלאומי מעביר רשימות לרשויות. יש לפנות לרשות המקומית.',
    notes: 'גובה ההנחה נקבע על ידי הרשות המקומית.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['mobility'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 4000,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_work_injury',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'הנחה לפי כללי הרשות',
    eligibility_details: 'נפגעי עבודה עם נכות 90% ומעלה או מעל גיל פרישה',
    how_to_apply: 'הביטוח הלאומי מעביר רשימות לרשויות. יש לפנות לרשות המקומית.',
    notes: 'גובה ההנחה נקבע על ידי הרשות המקומית.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['work_injury'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 4000,
    popularity_score: 85,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_nursing',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'הנחה לפי כללי הרשות',
    eligibility_details: 'מקבלי גמלת סיעוד',
    how_to_apply: 'הביטוח הלאומי מעביר רשימות לרשויות. יש לפנות לרשות המקומית.',
    notes: 'גובה ההנחה נקבע על ידי הרשות המקומית.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['nursing'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 88,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_terror',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'הנחה לפי כללי הרשות',
    eligibility_details: 'נכי איבה בעלי נכות 10% ומעלה, אלמנים, יתומים והורים שכולים',
    how_to_apply: 'הביטוח הלאומי מעביר רשימות לרשויות. יש לפנות לרשות המקומית.',
    notes: 'גובה ההנחה נקבע על ידי הרשות המקומית.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['terror_victim'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 85,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_alimony',
    title: 'הנחה בארנונה',
    provider: 'רשות מקומית',
    domain: 'housing',
    value_display: 'הנחה לפי כללי הרשות',
    eligibility_details: 'מקבלות דמי מזונות מהביטוח הלאומי',
    how_to_apply: 'יש לפנות לרשות המקומית עם אישור מהביטוח הלאומי.',
    notes: 'גובה ההנחה נקבע על ידי הרשות המקומית.',
    action_link: 'https://www.gov.il/he/service/arnona_discount_request',
    applicable_benefits: ['alimony'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 2500,
    popularity_score: 75,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'housing_assistance_old_age',
    title: 'סיוע בשכר דירה',
    provider: 'משרד השיכון',
    domain: 'housing',
    value_display: 'סבסוד שכר דירה',
    eligibility_details: 'מקבלי קצבת אזרח ותיק ששוכרים דירה ומצבם הכלכלי מזכה בסיוע',
    how_to_apply: 'הגשת בקשה למשרד השיכון או דרך אתר משרד הבינוי והשיכון.',
    notes: 'גובה הסיוע תלוי במצב המשפחתי, מיקום הדירה וגובה השכירות.',
    action_link: 'https://www.gov.il/he/departments/ministry_of_construction_and_housing',
    applicable_benefits: ['old_age', 'old_age_income_support'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 80,
    source_verified: true,
  },
  {
    id: 'housing_assistance_disability',
    title: 'סיוע בשכר דירה',
    provider: 'משרד השיכון',
    domain: 'housing',
    value_display: 'סבסוד שכר דירה',
    eligibility_details: 'מקבלי קצבת נכות כללית ששוכרים דירה ומצבם הכלכלי מזכה בסיוע',
    how_to_apply: 'הגשת בקשה למשרד השיכון או דרך אתר משרד הבינוי והשיכון.',
    notes: 'גובה הסיוע תלוי במצב המשפחתי, מיקום הדירה וגובה השכירות.',
    action_link: 'https://www.gov.il/he/departments/ministry_of_construction_and_housing',
    applicable_benefits: ['general_disability'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 85,
    source_verified: true,
  },

  // HEALTH - High Priority for Kupat Cholim
  {
    id: 'kupat_cholim_disability',
    title: 'פטור מתשלומי קופת חולים',
    provider: 'קופות החולים',
    domain: 'health',
    value_display: 'פטור מתשלומים',
    eligibility_details: 'מקבלי קצבת נכות כללית עם השלמת הכנסה',
    how_to_apply: 'פטור אוטומטי לזכאים. יש לוודא בקופה.',
    applicable_benefits: ['general_disability'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 1200,
    popularity_score: 88,
    source_verified: true,
  },
  {
    id: 'kupat_cholim_old_age',
    title: 'פטור מתשלומי קופת חולים',
    provider: 'קופות החולים',
    domain: 'health',
    value_display: 'פטור מתשלומים',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם השלמת הכנסה',
    how_to_apply: 'פטור אוטומטי לזכאים. יש לוודא בקופה.',
    applicable_benefits: ['old_age_income_support'],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 1200,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'dental_child',
    title: 'טיפולי שיניים',
    provider: 'קופות החולים',
    domain: 'health',
    value_display: 'טיפולים ללא עלות',
    eligibility_details: 'ילדים עד גיל 18 המקבלים קצבת ילד נכה',
    how_to_apply: 'פנייה לקופת החולים לקביעת תור.',
    notes: 'כולל טיפולים משמרים ומונעים.',
    applicable_benefits: ['child_disability'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 2000,
    popularity_score: 85,
    source_verified: true,
  },
  {
    id: 'dental_old_age',
    title: 'טיפולי שיניים מסובסדים',
    provider: 'משרד הבריאות',
    domain: 'health',
    value_display: 'טיפולים מסובסדים',
    eligibility_details: 'מקבלי קצבת אזרח ותיק',
    how_to_apply: 'פנייה לקופת החולים לבירור זכאות.',
    applicable_benefits: ['old_age', 'old_age_income_support'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 3000,
    popularity_score: 75,
    source_verified: true,
  },
  {
    id: 'rehabilitation_basket',
    title: 'סל שיקום',
    provider: 'משרד הבריאות',
    domain: 'health',
    value_display: 'שירותי שיקום',
    eligibility_details: 'מקבלי קצבת נכות כללית',
    how_to_apply: 'פנייה לעובד סוציאלי בקופת החולים או לביטוח הלאומי.',
    notes: 'כולל עזרה במציאת דיור, תעסוקה ופנאי.',
    applicable_benefits: ['general_disability'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 5000,
    popularity_score: 70,
    source_verified: true,
  },

  // TRANSPORT - Enhanced with more providers
  {
    id: 'transport_disability',
    title: 'נסיעה חינם בתחבורה ציבורית',
    provider: 'משרד התחבורה',
    domain: 'transport',
    value_display: '50-100% הנחה',
    eligibility_details: 'מקבלי קצבת נכות כללית',
    how_to_apply: 'יש להנפיק כרטיס רב-קו מוזל בתחנה מרכזית עם אישור מהביטוח הלאומי.',
    notes: 'הנחה באוטובוסים ורכבת. אפשר גם להשתמש באפליקציות תחבורה חכמה נוספות.',
    applicable_benefits: ['general_disability'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 3000,
    popularity_score: 85,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד', 'מטרופולין', 'קווים', 'אפיקים'],
  },
  {
    id: 'transport_old_age',
    title: 'נסיעה מוזלת בתחבורה ציבורית',
    provider: 'משרד התחבורה',
    domain: 'transport',
    value_display: '50% הנחה',
    eligibility_details: 'מקבלי קצבת אזרח ותיק',
    how_to_apply: 'יש להנפיק כרטיס רב-קו מוזל בתחנה מרכזית עם תעודת זהות.',
    notes: 'ההנחה חלה על כל סוגי התחבורה הציבורית.',
    applicable_benefits: ['old_age', 'old_age_income_support'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 1500,
    popularity_score: 92,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד', 'מטרופולין', 'קווים', 'אפיקים'],
  },
  {
    id: 'transport_blind',
    title: 'נסיעה חינם בתחבורה ציבורית',
    provider: 'משרד התחבורה',
    domain: 'transport',
    value_display: '100% הנחה',
    eligibility_details: 'עיוורים ולקויי ראייה',
    how_to_apply: 'יש להנפיק כרטיס רב-קו מוזל עם אישור מהביטוח הלאומי.',
    notes: 'כולל מלווה בנסיעות.',
    applicable_benefits: ['general_disability', 'special_services'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 4000,
    popularity_score: 80,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד', 'מטרופולין', 'קווים', 'אפיקים'],
  },
  {
    id: 'disabled_parking',
    title: 'תג חניה לנכה',
    provider: 'משרד התחבורה',
    domain: 'transport',
    value_display: 'חניה ללא תשלום',
    eligibility_details: 'מוגבלי ניידות המקבלים קצבת ניידות או קצבת שירותים מיוחדים',
    how_to_apply: 'הגשת בקשה למשרד הרישוי עם אישורים רפואיים.',
    notes: 'מאפשר חניה במקומות שמורים ופטור מתשלום בחניונים.',
    action_link: 'https://www.gov.il/he/service/disabled_person_parking_permit',
    applicable_benefits: ['mobility', 'special_services'],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 3000,
    popularity_score: 95,
    source_verified: true,
  },
  {
    id: 'mobility_grant',
    title: 'הלוואה עומדת לרכישת רכב',
    provider: 'הביטוח הלאומי',
    domain: 'transport',
    value_display: 'הלוואה לרכב',
    eligibility_details: 'מקבלי קצבת ניידות בעלי רישיון נהיגה',
    how_to_apply: 'הגשת בקשה לביטוח הלאומי עם מסמכים נדרשים.',
    notes: 'ההלוואה ניתנת לרכישת רכב חדש או משומש.',
    applicable_benefits: ['mobility'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 40000,
    popularity_score: 75,
    source_verified: true,
  },

  // FINANCIAL
  {
    id: 'tax_exemption_disability',
    title: 'פטור ממס הכנסה',
    provider: 'רשות המסים',
    domain: 'financial',
    value_display: 'פטור מלא או חלקי',
    eligibility_details: 'מקבלי קצבת נכות כללית עם נכות רפואית 100% או נכות לצמיתות 90%+',
    how_to_apply: 'הגשת בקשה לרשות המסים עם אישורים רפואיים.',
    notes: 'הפטור תקף להכנסות עד תקרה מסוימת.',
    action_link: 'https://www.gov.il/he/service/tax_exemption_for_disabled_person',
    applicable_benefits: ['general_disability'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 15000,
    popularity_score: 88,
    source_verified: true,
  },
  {
    id: 'tax_exemption_blind',
    title: 'פטור ממס הכנסה לעיוורים',
    provider: 'רשות המסים',
    domain: 'financial',
    value_display: 'פטור מלא',
    eligibility_details: 'עיוורים לפי הגדרת הביטוח הלאומי',
    how_to_apply: 'הגשת בקשה לרשות המסים עם אישור עיוורון.',
    action_link: 'https://www.gov.il/he/service/tax_exemption_for_disabled_person',
    applicable_benefits: ['general_disability', 'special_services'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 20000,
    popularity_score: 85,
    source_verified: true,
  },
  {
    id: 'tax_credit_old_age',
    title: 'נקודות זיכוי במס',
    provider: 'רשות המסים',
    domain: 'financial',
    value_display: 'נקודות זיכוי',
    eligibility_details: 'אזרחים ותיקים העובדים ומשלמים מס הכנסה',
    how_to_apply: 'נקודות הזיכוי מחושבות אוטומטית על ידי המעסיק.',
    applicable_benefits: ['old_age', 'old_age_income_support'],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 5000,
    popularity_score: 70,
    source_verified: true,
  },

  // WELFARE
  {
    id: 'supplement_old_age',
    title: 'תוספת השלמת הכנסה',
    provider: 'הביטוח הלאומי',
    domain: 'welfare',
    value_display: 'תוספת חודשית',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם הכנסות נמוכות',
    how_to_apply: 'הגשת בקשה לביטוח הלאומי עם מסמכי הכנסה.',
    applicable_benefits: ['old_age'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 24000,
    popularity_score: 85,
    source_verified: true,
  },
  {
    id: 'social_worker',
    title: 'ליווי עובד סוציאלי',
    provider: 'משרד הרווחה',
    domain: 'welfare',
    value_display: 'ייעוץ וליווי',
    eligibility_details: 'מקבלי קצבאות הזקוקים לסיוע',
    how_to_apply: 'פנייה למחלקת הרווחה ברשות המקומית.',
    applicable_benefits: ['general_disability', 'old_age', 'old_age_income_support', 'nursing', 'income_support'],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 0,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'daycare_subsidy',
    title: 'סבסוד מעון יום',
    provider: 'משרד הרווחה',
    domain: 'welfare',
    value_display: 'סבסוד מעון',
    eligibility_details: 'הורים לילדים המקבלים קצבת ילד נכה',
    how_to_apply: 'פנייה למחלקת הרווחה עם אישור הביטוח הלאומי.',
    applicable_benefits: ['child_disability'],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 15000,
    popularity_score: 80,
    source_verified: true,
  },

  // EMPLOYMENT
  {
    id: 'employment_support',
    title: 'סיוע בתעסוקה',
    provider: 'שירות התעסוקה',
    domain: 'employment',
    value_display: 'ליווי לתעסוקה',
    eligibility_details: 'מקבלי קצבת נכות כללית המעוניינים בעבודה',
    how_to_apply: 'פנייה לסניף שירות התעסוקה הקרוב.',
    notes: 'כולל הכשרות מקצועיות והשמה.',
    applicable_benefits: ['general_disability'],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 10000,
    popularity_score: 65,
    source_verified: true,
  },
  {
    id: 'protected_employment',
    title: 'תעסוקה מוגנת',
    provider: 'משרד הרווחה',
    domain: 'employment',
    value_display: 'מסגרת תעסוקה',
    eligibility_details: 'מקבלי קצבת נכות כללית עם יכולת עבודה מוגבלת',
    how_to_apply: 'פנייה לעובד סוציאלי במחלקת הרווחה.',
    applicable_benefits: ['general_disability', 'special_services'],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 20000,
    popularity_score: 55,
    source_verified: true,
  },

  // LEGAL
  {
    id: 'work_absence',
    title: 'היעדרות מעבודה לסיוע לילד עם מוגבלות',
    provider: 'כללי',
    domain: 'legal',
    value_display: 'עד 18 ימים + 52 שעות',
    eligibility_details: 'הורה שעובד לפחות שנה אצל אותו מעסיק ויש לו ילד עם מוגבלות קבועה',
    how_to_apply: 'יש לפנות ישירות למעסיק. המעסיק רשאי לבקש הצהרות ואישורים.',
    notes: '18 ימים על חשבון ימי מחלה + 52 שעות ללא ניכוי מהשכר.',
    applicable_benefits: ['child_disability', 'mobility', 'general_disability', 'work_injury', 'terror_victim'],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 5000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'alimony_collection',
    title: 'גביית הפרשי מזונות',
    provider: 'הוצאה לפועל',
    domain: 'legal',
    value_display: 'גביית חובות',
    eligibility_details: 'מקבלות דמי מזונות מהביטוח הלאומי',
    how_to_apply: 'יש לפנות להוצאה לפועל עם אישור מהביטוח הלאומי.',
    applicable_benefits: ['alimony'],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 0,
    popularity_score: 50,
    source_verified: true,
  },
  {
    id: 'legal_aid',
    title: 'סיוע משפטי חינם',
    provider: 'משרד המשפטים',
    domain: 'legal',
    value_display: 'ייצוג משפטי',
    eligibility_details: 'מקבלי קצבאות בעלי הכנסות נמוכות',
    how_to_apply: 'פנייה ללשכת הסיוע המשפטי במחוז.',
    action_link: 'https://www.gov.il/he/departments/legalaid',
    applicable_benefits: ['general_disability', 'old_age', 'old_age_income_support', 'income_support', 'alimony'],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 10000,
    popularity_score: 55,
    source_verified: true,
  },
];

import type { UserMetrics } from '@/types/userProfile';

// Scoring weights for smart sorting
export interface ScoringWeights {
  user_match: number;      // w1 - relevance to user
  estimated_value: number; // w2 - monetary value
  popularity: number;      // w3 - popularity score
  ease_of_access: number;  // w4 - is_automatic bonus
}

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  user_match: 0.5,
  estimated_value: 0.25,
  popularity: 0.15,
  ease_of_access: 0.10,
};

// Eligibility check with granular metrics
interface EligibilityContext {
  benefits: BenefitType[];
  metrics: UserMetrics;
}

// Calculate eligibility level based on match score
export function getEligibilityLevel(matchScore: number): EligibilityLevel {
  if (matchScore >= 80) return 'high';
  if (matchScore >= 50) return 'medium';
  return 'low';
}

// Check if a specific right meets eligibility criteria based on user metrics
function checkRightEligibility(right: Right, context: EligibilityContext): { eligible: boolean; matchScore: number } {
  const { benefits, metrics } = context;
  
  // Basic check: does user have any of the applicable benefits?
  const hasBenefit = right.applicable_benefits.some(benefit => benefits.includes(benefit));
  if (!hasBenefit) {
    return { eligible: false, matchScore: 0 };
  }

  // Granular eligibility checks based on right requirements
  let matchScore = 50; // Base score for having the benefit
  
  // Arnona for disability - no percentage shown for old_age
  if (right.id === 'arnona_disability') {
    const meetsHighCriteria = metrics.medical_disability_pct >= 90 || metrics.incapacity_pct >= 75;
    if (meetsHighCriteria) {
      matchScore = 90; // High probability, not 100%
    } else if (metrics.medical_disability_pct >= 70 || metrics.incapacity_pct >= 60) {
      matchScore = 70;
    } else {
      matchScore = 50;
    }
  }

  // Special handling for old age arnona - never show automatic percentages
  if (right.id === 'arnona_old_age' && (benefits.includes('old_age') || benefits.includes('old_age_income_support'))) {
    matchScore = 70; // Medium probability - must check with local authority
  }
  
  // Arnona for mobility requires 90%+
  if (right.id === 'arnona_mobility') {
    if (metrics.mobility_pct >= 90) {
      matchScore = 90;
    } else if (metrics.mobility_pct >= 60) {
      matchScore = 60;
    } else {
      matchScore = 40;
    }
  }

  // Water discount for special services requires 112%+
  if (right.id === 'water_discount_special_services') {
    matchScore = metrics.special_services_rate >= 112 ? 90 : 50;
  }

  // Electricity discount for nursing requires level 4-6
  if (right.id === 'electricity_nursing') {
    if (metrics.nursing_level >= 4) {
      matchScore = 90;
    } else if (metrics.nursing_level >= 3) {
      matchScore = 70;
    } else {
      matchScore = 40;
    }
  }

  // Water discount for nursing requires level 3+
  if (right.id === 'water_discount_nursing') {
    matchScore = metrics.nursing_level >= 3 ? 90 : 50;
  }

  // Old age with income support bonuses
  if (right.id === 'electricity_old_age') {
    matchScore = metrics.is_income_support ? 90 : 0;
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
  }

  return { eligible: true, matchScore };
}

// Calculate comprehensive score for sorting
function calculateRightScore(right: Right, matchScore: number, weights: ScoringWeights): number {
  // Normalize values to 0-100 range
  const userMatchNorm = matchScore;
  const valueNorm = Math.min((right.estimated_value || 0) / 500, 100); // Normalize by max expected value
  const popularityNorm = right.popularity_score || 50;
  const easeNorm = right.is_automatic ? 100 : 50;
  
  // Priority boost: primary_display_priority 1 gets significant boost
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

// Extended Right type with calculated fields
export interface RightWithScore extends Right {
  matchScore: number;
  eligibilityLevel: EligibilityLevel;
  totalScore: number;
}

// Function to get unique rights for a user based on their benefits and metrics
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

  // Sort by total score (highest first)
  eligibleRights.sort((a, b) => b.totalScore - a.totalScore);

  // Deduplicate by title (for rights that appear for multiple benefits)
  const uniqueRights = new Map<string, RightWithScore>();
  for (const right of eligibleRights) {
    if (!uniqueRights.has(right.title)) {
      uniqueRights.set(right.title, right);
    }
  }

  return Array.from(uniqueRights.values());
}

// Get rights grouped by domain
export function getRightsByDomain(rights: RightWithScore[]): Record<Domain, RightWithScore[]> {
  const grouped: Record<Domain, RightWithScore[]> = {
    housing: [],
    health: [],
    transport: [],
    utilities: [],
    financial: [],
    welfare: [],
    employment: [],
    legal: [],
  };

  for (const right of rights) {
    grouped[right.domain].push(right);
  }

  return grouped;
}

// Count rights per domain
export function countRightsByDomain(rights: RightWithScore[]): Record<Domain, number> {
  const counts: Record<Domain, number> = {
    housing: 0,
    health: 0,
    transport: 0,
    utilities: 0,
    financial: 0,
    welfare: 0,
    employment: 0,
    legal: 0,
  };

  for (const right of rights) {
    counts[right.domain]++;
  }

  return counts;
}

// Sort options for user interface
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
