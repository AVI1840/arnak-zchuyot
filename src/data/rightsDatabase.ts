// Rights Database — AUTO-GENERATED from rights_database_spec.json
// Source of truth: data/rights_database_spec.json (98 benefits from NII official data)
// Generated: 2026-03-12
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
  | 'alimony'
  | 'prisoners_of_zion'
  | 'righteous_nations';

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
  prisoners_of_zion: 'אסירי ציון',
  righteous_nations: 'חסידי אומות עולם',
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
  prisoners_of_zion: '✡️',
  righteous_nations: '🕊️',
};

export const RIGHTS_DATABASE: Right[] = [
  {
    id: 'water_disability',
    title: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    provider: 'רשות המים',
    domain: 'utilities' as Domain,
    value_display: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    eligibility_details: 'מקבלי קצבת נכות כללית שנקבעה להם נכות רפואית בשיעור של 70% ומעלה.\nמי שקיבל קצבת נכות כללית והזכאות הופסקה עקב הכנסותיו מעבודה – ימשיך לקבל את ההטבות הנלוות להן היה זכאי כמקבל קצבת נכות, למשך 36 חודשים',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המים רשימות של מי שעשויים להיות זכאים להטבה. כתובת המגורים של הזכאי צריכה להיות מעודכנת במשרד הפנים. ההטבה אמורה להינתן באופן אוטומטי.',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'arnona_disability',
    title: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    eligibility_details: 'מקבלי קצבת נכות כללית בעלי דרגת אי כושר בשיעור של 75% ומעלה וכן מי שנקבעה להם נכות רפואית בשיעור של 90% ומעלה',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'tax_exemption_disability',
    title: 'פטור מתשלום מס הכנסה',
    provider: 'רשות המיסים',
    domain: 'financial' as Domain,
    value_display: 'פטור מתשלום מס הכנסה',
    eligibility_details: 'עיוור או בעל ליקוי ראייה חמור\nנכה שנקבעה לו נכות רפואית בשיעור של 100% \nנכה שנקבעה לו נכות רפואית בשיעור של 90% מפגיעות באיברים לפי חישוב מיוחד \nנכה שנקבעה לו נכות רפואית בשיעור של 89% לצמיתות לפי חיש',
    how_to_apply: 'את הבקשה לפטור יש להגיש לפקיד השומה במקום המגורים. לפרטים יש לפנות  לרשות המסים 4954* או02-5656400',
    applicable_benefits: ['general_disability', 'terror_victim'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 15000,
    popularity_score: 75,
    source_verified: true,
  },
  {
    id: 'tax_purchase_disability',
    title: 'הנחה במס רכישה על דירת מגורים או על קרקע לבניית דירת מגורים, לפי תקנות מס שבח מק',
    provider: 'רשות המיסים - מיסוי מקרקעין',
    domain: 'financial' as Domain,
    value_display: 'הנחה במס רכישה על דירת מגורים או על קרקע לבניית דירת מגורים, לפי תקנות מס שבח מק',
    eligibility_details: 'מקבלי קצבת נכות כללית בעלי דרגת אי כושר לצמיתות בשיעור של 75% לפחות.\nאו מי שנקבעה להם נכות רפואית משוקללת לצמיתות בשיעור של 90% ומעלה.\nאו מי שנקבעה להם נכות רפואית לצמיתות בשיעור של 100%.\nאו מי שנקבעה',
    how_to_apply: 'כדי לבדוק זכאות להנחה, יש לפנות ללשכת מיסוי מקרקעין במשרד האוצר ולצרף אישור מהביטוח הלאומי על הזכאות לקצבת נכות.',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 40000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'parking_tag_disability',
    title: 'תג חניה לנכה ופטור מאגרת רישוי רכב',
    provider: 'משרד התחבורה והבטיחות בדרכים',
    domain: 'transport' as Domain,
    value_display: 'תג חניה לנכה ופטור מאגרת רישוי רכב',
    eligibility_details: 'מי שזקוק לרכב כאמצעי תנועה עקב מגבלות רפואיות ותנועתו ללא רכב בדרכים עלולה לערער את מצב בריאותו',
    how_to_apply: 'ניתן להגיש בקשה לתג חניה לנכה ללא עלות באתר משרד התחבורה. יש לצרף מסמכים רפואיים עדכניים מ-3 החודשים האחרונים המעידים על המצב הבריאות או על המוגבלות בניידות.\nלחילופין ניתן להגיש בקשה בדואר לכתובת: היח',
    applicable_benefits: ['general_disability', 'work_injury', 'special_services', 'terror_victim', 'mobility'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 3000,
    popularity_score: 75,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד'],
  },
  {
    id: 'transport_disability',
    title: '50% הנחה בתעריפי נסיעה בתחבורה ציבורית',
    provider: 'משרד התחבורה והבטיחות בדרכים',
    domain: 'transport' as Domain,
    value_display: '50% הנחה בתעריפי נסיעה בתחבורה ציבורית',
    eligibility_details: 'מקבלי קצבת נכות כללית או נכות מעבודה או נכי פעולות איבה - ובעלי תעודת נכה מביטוח לאומי.\nשימו לב: מי שקיבל קצבת נכות כללית והזכאות הופסקה עקב הכנסותיו מעבודה – הוא ימשיך לקבל את ההטבות הנלוות להן היה ז',
    how_to_apply: 'לקבלת ההנחה יש לעדכן את פרופיל ההנחה בכרטיס רב-קו או ביישומון לתשלום בתחבורה ציבורית (כגון Moovit, פנגו). שימו לב: מגיל 67 יש פטור מלא מתשלום בתחבורה ציבורית.',
    applicable_benefits: ['general_disability', 'terror_victim', 'work_injury', 'old_age', 'nursing', 'survivors', 'old_age_income_support', 'survivors_income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 3000,
    popularity_score: 75,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד'],
  },
  {
    id: 'health_services_disability',
    title: 'פטור מתשלום השתתפות עצמית  עבור שירותים שונים בקופות החולים (רופא מקצועי, התחייב',
    provider: 'קופת חולים',
    domain: 'health' as Domain,
    value_display: 'פטור מתשלום השתתפות עצמית  עבור שירותים שונים בקופות החולים (רופא מקצועי, התחייב',
    eligibility_details: 'מקבלי קצבת נכות כללית, בן/בת זוג וילדיהם עד גיל 18.\nוכןמי שקיבל קצבת נכות כללית והזכאות הופסקה עקב הכנסותיו מעבודה – ימשיך לקבל את ההטבות הנלוות להן היה זכאי כמקבל קצבת נכות, למשך 36 חודשים נוספים.',
    how_to_apply: 'הביטוח הלאומי מעביר לקופות החולים רשימות של מי שעשויים להיות זכאים להטבות. ההטבות אמורות להינתן באופן אוטומטי.\nלבירורים יש לפנות לקופת החולים שבה רשום מקבל קצבת הנכות.',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'land_fees_disability',
    title: 'פטור או הנחה מתשלום דמי הסכמה להעברת מקרקעין שבבעלות מינהל מקרקעי ישראל המוחזקים',
    provider: 'מינהל מקרקעי ישראל',
    domain: 'housing' as Domain,
    value_display: 'פטור או הנחה מתשלום דמי הסכמה להעברת מקרקעין שבבעלות מינהל מקרקעי ישראל המוחזקים',
    eligibility_details: 'מקבלי קצבת נכות כללית שנקבעה להם נכות רפואית לצמיתות בשיעור של 80% לפחות.',
    how_to_apply: 'את הבקשה לפטור או להנחה יש להפנות למינהל מקרקעי ישראל במקום המגורים. לפרטים יש להתקשר 5575*.',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'electricity_special',
    title: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    provider: 'חברת החשמל',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    eligibility_details: 'מקבלי קצבת שירותים מיוחדים',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת החשמל רשימות של מי שעשויים להיות זכאים להטבות. ההנחה אמורה להינתן באופן אוטומטי.\nשים לב שחשבון החשמל חייב להיות על שם הזכאי, ובתעריף ביתי בלבד. אם לזכאי יש יותר מחשבון חשמל א',
    applicable_benefits: ['special_services'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'water_special',
    title: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    provider: 'רשות המים',
    domain: 'utilities' as Domain,
    value_display: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    eligibility_details: 'מקבלי קצבה לשירותים מיוחדים בשיעור 112% ומעלה',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המים רשימות של מי שעשויים להיות זכאים להטבות. כתובת המגורים של הזכאי צריכה להיות מעודכנת במשרד הפנים. ההטבה אמורה להינתן באופן אוטומטי.',
    applicable_benefits: ['special_services'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'housing_special',
    title: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    eligibility_details: 'מקבלי קצבת שירותים מיוחדים בשיעור של 112%, הנמצאים בארץ פחות משנתיים.\n\nלעיתים קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\n\n\n\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון או לאחת החברות הבאות: אלונים (מקבוצת MGROUP), מילגם או מעוף. \n\n לידיעתכם, לאחר הגשת בקשה לאחת החבר',
    applicable_benefits: ['special_services'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'electricity_child',
    title: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    provider: 'חברת החשמל',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    eligibility_details: 'הורים לילדים המקבלים קצבה לילד נכה בשל תלותו בעזרת הזולת או בשל טיפול רפואי מיוחד שהוא זקוק לו.\nשים לב, לא כל מקבלי גמלת ילד נכה זכאים להנחה. הביטוח הלאומי שולח הודעה למי שזכאים להנחה.',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת החשמל רשימות של מי שעשויים להיות זכאים להטבות. ההנחה אמורה להינתן באופן אוטומטי.\nשים לב שחשבון החשמל חייב להיות בתעריף ביתי בלבד ועל שם ההורה המקבל את הקצבה. אם להורה יש יותר',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'tax_credit_child',
    title: 'קבלת שתי נקודות זיכוי במס הכנסה',
    provider: 'רשות המיסים',
    domain: 'financial' as Domain,
    value_display: 'קבלת שתי נקודות זיכוי במס הכנסה',
    eligibility_details: 'הורים לילדים המקבלים קצבה לילד נכה',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המיסים רשימות של מי שעשויים להיות זכאים להטבה.\nלבירורים יש לפנות לרשות המיסים.',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 2,
    estimated_value: 5000,
    popularity_score: 75,
    source_verified: true,
  },
  {
    id: 'pension_tax_child',
    title: 'פטור ממס על משיכה מוקדמת של קופות גמל',
    provider: 'רשות המיסים',
    domain: 'financial' as Domain,
    value_display: 'פטור ממס על משיכה מוקדמת של קופות גמל',
    eligibility_details: 'הורים לילד הזכאי לקצבת ילד נכה יציבה (לצמיתות), יכולים לפנות לביטוח הלאומי לצורך קביעת אחוזים רפואיים לילדם.\n אם תקבע לילד נכות בשיעור של 75% לפחות לצמיתות, עשויים ההורים להיות זכאים לפטור, בתנאי שהנכ',
    how_to_apply: 'את הבקשה יש להגיש באמצעות טופס בל/3533.\nהשירות אינו כרוך בתשלום ואין צורך לצרף מסמכים.\nהביטוח הלאומי מעביר לרשות המסים רשימות של מי שעשויים להיות זכאים להטבות. לבירורים יש לפנות לרשות המסים.',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 15000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'housing_renovation_child',
    title: 'הלוואה לרכישת דירה לחסרי דירה.\nסיוע במימון שיפוצים בדירה.',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'הלוואה לרכישת דירה לחסרי דירה.\nסיוע במימון שיפוצים בדירה.',
    eligibility_details: 'הורים לילדים המקבלים קצבה לילד נכה.  קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון.\n\nלידיעתכם, לאחר הגשת בקשה, משרד השיכון פונה לביטוח הלאומי לקבלת מידע על זכאותכם לקצבאות.',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 40000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'welfare_services_child',
    title: 'מגוון תוכניות, שירותים ומענים לילדים, כגון: שילוב במעונות יום שיקומיים, נופשונים',
    provider: 'משרד הרווחה',
    domain: 'welfare' as Domain,
    value_display: 'מגוון תוכניות, שירותים ומענים לילדים, כגון: שילוב במעונות יום שיקומיים, נופשונים',
    eligibility_details: 'ילד עם מוגבלות והוריו, בהתאם לצרכים ומאפיינים שייבדקו, כמו גיל וסוג המוגבלות.',
    how_to_apply: 'פרטים ומידע לגבי אופן קבלת ההטבות – באתר האינטרנט "קליק לרווחה".\n לבירורים יש לפנות למשרד הרווחה - המחלקה לשירותים חברתיים.',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'school_aide_child',
    title: 'מימון סייעת לגן ולבית הספר',
    provider: 'משרד החינוך',
    domain: 'welfare' as Domain,
    value_display: 'מימון סייעת לגן ולבית הספר',
    eligibility_details: 'מקבלי קצבה לילד נכה מגיל שלוש ומעלה',
    how_to_apply: 'לבירורים יש לפנות למשרד החינוך',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 15000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'parking_tag_child',
    title: 'תו חניה לנכה ופטור מאגרת רישוי לרכב',
    provider: 'משרד התחבורה והבטיחות בדרכים',
    domain: 'transport' as Domain,
    value_display: 'תו חניה לנכה ופטור מאגרת רישוי לרכב',
    eligibility_details: 'הורים לילדים המקבלים קצבה לילד נכה הזקוק לרכב כאמצעי תנועה עקב מגבלות רפואיות ותנועתו ללא רכב בדרכים עלולה לערער את מצב בריאותו.',
    how_to_apply: 'כדי לבחון זכאות לתג חניה לנכה יש להגיש בקשה באופן מקוון באתר משרד התחבורה (באמצעות מערכת ההזדהות הלאומית), ולצרף מסמכים רפואיים עדכניים (מ-3 חודשים אחרונים).\n לחילופין ניתן להגיש בקשה בדואר לכתובת: הי',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 3000,
    popularity_score: 75,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד'],
  },
  {
    id: 'health_services_mobility',
    title: 'פטור מאגרות בעד שירותים רפואיים',
    provider: 'קופת חולים',
    domain: 'health' as Domain,
    value_display: 'פטור מאגרות בעד שירותים רפואיים',
    eligibility_details: 'ילדים עד גיל 18 ו-3 חודשים הזכאים לקצבת ניידות',
    how_to_apply: 'הביטוח הלאומי מעביר לקופות החולים רשימות של מי שעשויים להיות זכאים להטבות. ההטבה אמורה להינתן באופן אוטומטי.\nלבירורים יש לפנות לקופת החולים שבה רשום מקבל הקצבה.',
    applicable_benefits: ['mobility'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1200,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'arnona_child',
    title: 'הנחה במסי ארנונה. את שיעור ההנחה קובעת הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה. את שיעור ההנחה קובעת הרשות המקומית.',
    eligibility_details: 'הורים לילדים המקבלים קצבה לילד נכה',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להטבות.לצורך קבלת ההטבה, יש לפנות לרשות המקומית.',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'water_child',
    title: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    provider: 'רשות המים',
    domain: 'utilities' as Domain,
    value_display: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    eligibility_details: 'הורים לילדים המקבלים קצבה לילד נכה',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המים רשימות של מי שעשויים להיות זכאים להטבות. כתובת המגורים של ההורה מקבל הקצבה צריכה להיות מעודכנת במשרד הפנים.\nההנחה אמורה להינתן באופן אוטומטי.',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'senior_card_old_age',
    title: 'תעודת אזרח ותיק, המזכה בהנחות ובהטבות במוסדות השונים.',
    provider: 'המשרד לשוויון חברתי',
    domain: 'welfare' as Domain,
    value_display: 'תעודת אזרח ותיק, המזכה בהנחות ובהטבות במוסדות השונים.',
    eligibility_details: 'אזרחי ישראל מגיל פרישה ומעלה (נשים מגיל 62 ומעלה, בהתאם לתאריך לידתן,  וגברים מגיל 67 ומעלה)',
    how_to_apply: 'המשרד לשוויון חברתי שולח את התעודה באופן אוטומטי לכתובתו של הזכאי. מתן התעודה אינו מותנה בקבלת קצבת אזרח ותיק. \nטלפון לבקשת התעודה 02-6547025 או 8840*\nניתן להנפיק בטלפון הנייד תעודת אזרח ותיק דיגיטלית',
    applicable_benefits: ['old_age', 'old_age_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'health_services_old_age_is',
    title: 'הנחות ברכישת תרופות הכלולות בסל הבריאות ופטור מתשלום השתתפות עצמית בעבור שירותים',
    provider: 'קופת חולים',
    domain: 'health' as Domain,
    value_display: 'הנחות ברכישת תרופות הכלולות בסל הבריאות ופטור מתשלום השתתפות עצמית בעבור שירותים',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם תוספת השלמת הכנסה, ומקבלי קצבת זקנה עם השלמה לקצבת נכות',
    how_to_apply: 'הביטוח הלאומי מעביר לקופות החולים רשימות של מי שעשויים להיות זכאים להטבות. ההטבות אמורות להינתן באופן אוטומטי.\nלבירורים יש לפנות לקופת החולים שבה רשום מקבל הקצבה.',
    applicable_benefits: ['old_age_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1200,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'phone_old_age_is',
    title: '50% הנחה בדמי שימוש קבועים בתשלום חשבון הטלפון',
    provider: 'חברת "בזק"',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה בדמי שימוש קבועים בתשלום חשבון הטלפון',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם תוספת השלמת הכנסה וכן מקבלי קצבת אזרח ותיק עם השלמה לקצבת נכות',
    how_to_apply: 'החוק אינו חל על מי שמחובר לחברות טלפון אחרות כמו "הוט" ו"נטוויזן". הביטוח הלאומי מעביר לחברת בזק רשימות של מי שעשויים להיות זכאים להטבות. ההנחה אמורה להינתן באופן אוטומטי.\nקו "בזק" צריך להיות בדירה למ',
    applicable_benefits: ['old_age_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 600,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'electricity_old_age_is',
    title: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    provider: 'חברת החשמל',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם תוספת השלמת הכנסה וכן מקבלי קצבת אזרח ותיק עם השלמה לקצבת נכות.',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת החשמל רשימות של מי שעשויים להיות זכאים להטבות. ההנחה אמורה להינתן באופן אוטומטי.\nשים לב שחשבון החשמל חייב להיות על שם הזכאי, ובתעריף ביתי בלבד. אם לזכאי יש יותר מחשבון חשמל א',
    applicable_benefits: ['old_age_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'housing_old_age_is',
    title: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    eligibility_details: 'מקבלי קצבת אזרח ותיק בתוספת השלמת הכנסה\nמקבלי קצבת אזרח ותיק לנכה (השלמה לקצבת נכות)\n\nלידיעתכם, קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון או לאחת החברות הבאות: אלונים (מקבוצת MGROUP), מילגם או מעוף.\nלידיעתכם, לאחר הגשת בקשה לאחת החברות, מש',
    applicable_benefits: ['old_age_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'arnona_old_age',
    title: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    eligibility_details: 'מקבלי קצבת אזרח ותיק עם תוספת השלמת הכנסה, וכן מקבלי קצבת אזרח ותיק עם השלמה לקצבת נכות\n\nמקבלי קצבת אזרח ותיק מגיל פרישה ומעלה (נשים מגיל 62 וגברים מגיל 67),\n\n\nמקבלי הבטחת הכנסה שהם מעל גיל פרישה, גם ',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['old_age', 'old_age_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'electricity_survivors_is',
    title: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    provider: 'חברת החשמל',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    eligibility_details: 'מקבלי השלמת הכנסה מתחת לגיל פרישה שיש עימהם שלושה ילדים (ילד משמעו על פי הגדרת ילד)\nאו  מקבלי קצבת שארים עם תוספת השלמת הכנסה שמעל לגיל הפרישה',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת החשמל רשימות של מי שעשויים להיות זכאים להטבות.\nשים לב שחשבון החשמל חייב להיות על שם הזכאי, ובתעריף ביתי בלבד. אם לזכאי יש יותר מחשבון חשמל אחד על שמו, עליו להסדיר את קבלת ההנ',
    applicable_benefits: ['survivors_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'housing_survivors_is',
    title: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    eligibility_details: 'מקבלי קצבת שאירים עם תוספת השלמת הכנסה.\n\n קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון או לאחת החברות הבאות: אלונים (מקבוצת MGROUP), מילגם או מעוף.\nלידיעתכם, לאחר הגשת בקשה לאחת החברות, מש',
    applicable_benefits: ['survivors_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'health_services_survivors_is',
    title: 'הנחה ברכישת תרופות ופטור מאגרות בעד שירותים רפואיים',
    provider: 'קופת חולים',
    domain: 'health' as Domain,
    value_display: 'הנחה ברכישת תרופות ופטור מאגרות בעד שירותים רפואיים',
    eligibility_details: 'מקבלי קצבת שאירים מעל גיל פרישה המקבלים תוספת השלמת הכנסה',
    how_to_apply: 'הביטוח הלאומי מעביר לקופות החולים רשימות של מי שעשויים להיות זכאים להטבות. \n\nלבירורים יש לפנות לקופת החולים שבה רשום הזכאי.',
    applicable_benefits: ['survivors_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1200,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'arnona_survivors_is',
    title: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    eligibility_details: 'מקבלי קצבת שאירים מעל גיל פרישה בתוספת השלמת הכנסה,\n וכן מי שמקבל קצבת שאירים מתחת גיל פרישה בתוספת להשלמת הכנסה אשר היו זכאים להשלמת הכנסה בחודש דצמבר 2002 ולא היתה הפסקה של שישה חודשים רצופים בזכאות',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['survivors_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'phone_survivors_is',
    title: '50% הנחה עבור דמי שימוש קבועים בתשלום חשבון הטלפון',
    provider: 'חברת "בזק"',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור דמי שימוש קבועים בתשלום חשבון הטלפון',
    eligibility_details: 'מקבלי קצבת שאירים עם תוספת השלמת הכנסה',
    how_to_apply: 'החוק אינו חל על מי שמחובר לחברות טלפון אחרות כמו "הוט" ו"נטוויזן". הביטוח הלאומי מעביר לחברת בזק רשימות של מי שעשויים להיות זכאים להטבות. ההנחה אמורה להינתן באופן אוטומטי.\nקו "בזק" צריך להיות בדירה למ',
    applicable_benefits: ['survivors_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 600,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'legal_aid_work_injury',
    title: 'ייעוץ משפטי חינם, הנחות בחנויות, מפעלים ועוד',
    provider: 'ארגון הנכים',
    domain: 'welfare' as Domain,
    value_display: 'ייעוץ משפטי חינם, הנחות בחנויות, מפעלים ועוד',
    eligibility_details: 'מקבלי קצבת נכות מעבודה בעלי דרגת נכות קבועה של 20% ומעלה, וכן אלמן/ה של נכה מעבודה המקבל קצבה מביטוח לאומי.',
    how_to_apply: 'דמי החברות לארגון מנוכים מדי חודש מקצבתו של הנכה . אם ברצונך  לבטל את הניכוי לארגון הנכים, עליך לפנות בכתב  לביטוח הלאומי ולבקש לבטלו.',
    applicable_benefits: ['work_injury'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'life_insurance_work_injury',
    title: 'ביטוח חיים',
    provider: 'ביטוח חיים הדדי',
    domain: 'financial' as Domain,
    value_display: 'ביטוח חיים',
    eligibility_details: 'מקבלי קצבת נכות מעבודה בעלי דרגת נכות קבועה בלבד של 20% ומעלה',
    how_to_apply: 'דמי הביטוח מנוכים בכל חודש מקצבתו של הנכה. במקרה של פטירה, יש לברר את הזכויות לתשלום עם חברת הביטוח. אם בדעתך לבטל את הניכוי , עליך לפנות בבקשה בכתב אל הביטוח הלאומי.',
    applicable_benefits: ['work_injury'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 2000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'arnona_work_injury',
    title: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    eligibility_details: 'מי שהוכר כנפגע עבודה על ידי הביטוח הלאומי ואשר נקבעה לו דרגת נכות זמנית או קבועה  של 90% לפחות.מקבלי קצבת נכות מעבודה מעל גיל פרישה',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['work_injury'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'tax_exemption_work_injury',
    title: 'הנחה או פטור מתשלום מס הכנסה',
    provider: 'רשות המיסים',
    domain: 'financial' as Domain,
    value_display: 'הנחה או פטור מתשלום מס הכנסה',
    eligibility_details: 'מי שנקבעה לו נכות רפואית בשיעור של 90% לפחות .\nלתשומת לב - אם נקבעה לו נכות רפואית בשיעור 90% כתוצאה מחישוב משוקלל של כמה ליקויים, אחד מהליקויים צריך להיות בשיעור 40% לפחות.',
    how_to_apply: 'את הבקשה ניתן לעשות באמצעות עריכת תיאום מס מקוון לשנה הנוכחית באתר רשות המיסים.\nאו להגיש בקשה בכתב בצירוף אישורים רלוונטיים לפקיד השומה הקרוב למקום מגוריך. לפרטים יש לפנות  לרשות המסים בטלפון 4954* או',
    applicable_benefits: ['work_injury'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 15000,
    popularity_score: 75,
    source_verified: true,
  },
  {
    id: 'tax_purchase_work_injury',
    title: 'הנחה במס רכישה',
    provider: 'רשות המיסים - מיסוי מקרקעין',
    domain: 'financial' as Domain,
    value_display: 'הנחה במס רכישה',
    eligibility_details: 'מי שנקבעה לו דרגת נכות רפואית לצמיתות בשיעור של ‎ 100%או נכות של ‎90%  על-פי חישוב משוקלל, בשל צבירת נכויות באיברים שונים\nמי שהוא קטוע יד או רגל, או משותק, ובשל הפגיעה נקבעה לו דרגת נכות לצמיתות של ‎5',
    how_to_apply: 'יש להגיש בקשה לפטור חלקי ממס רכישה ללשכת מיסוי מקרקעין ולצרף אליה מסמכים רלוונטיים. מידע נוסף ניתן למצוא באתר רשות המיסים.',
    applicable_benefits: ['work_injury'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 40000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'health_services_work_injury',
    title: 'פטור מתשלום אגרות שונות בעת רישום פעולות ועסקאות במקרקעין.',
    provider: 'משרד המשפטים - אגף רשם מקרקעין',
    domain: 'legal' as Domain,
    value_display: 'פטור מתשלום אגרות שונות בעת רישום פעולות ועסקאות במקרקעין.',
    eligibility_details: 'מקבלי קצבת נכות מעבודה',
    how_to_apply: 'יש לפנות לאגף רשם מקרקעין במשרד המשפטים עם אישור מהביטוח הלאומי על הזכאות לקצבת נכות מעבודה.',
    applicable_benefits: ['work_injury'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'towing_mobility',
    title: 'שגריר שרותי דרך וגרירה',
    provider: 'שרותי גרירה',
    domain: 'transport' as Domain,
    value_display: 'שגריר שרותי דרך וגרירה',
    eligibility_details: 'מוגבל בניידות שרכש רכב באמצעות הלוואה עומדת ומקבל קצבת ניידות, זכאי לשירותי גרירה, ללא רכב חלופי.',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת הגרירה, בהתחלת כל רבעון, רשימות של מי שעשויים להיות זכאים לשירותי גרירה.\n\n מספר הטלפון של מוקד הגרירה:\n8888*',
    applicable_benefits: ['mobility'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד'],
  },
  {
    id: 'water_mobility',
    title: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    provider: 'רשות המים',
    domain: 'utilities' as Domain,
    value_display: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    eligibility_details: 'מקבלי קצבת ניידות',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המים רשימות של מי שעשויים להיות זכאים להטבה. כתובת המגורים של הזכאי צריכה להיות מעודכנת במשרד הפנים. ההטבה אמורה להינתן באופן אוטומטי.',
    applicable_benefits: ['mobility'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'arnona_alimony',
    title: 'הנחה במיסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במיסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    eligibility_details: 'מקבלות דמי מזונות מהביטוח הלאומי',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['alimony'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'alimony_enforce_alimony',
    title: 'אפשר לפנות להוצאה לפועל, כדי לגבות את ההפרשים שלא שולמו על ידי החייב.',
    provider: 'הוצאה לפועל',
    domain: 'legal' as Domain,
    value_display: 'אפשר לפנות להוצאה לפועל, כדי לגבות את ההפרשים שלא שולמו על ידי החייב.',
    eligibility_details: 'מקבלות דמי מזונות מהביטוח הלאומי',
    how_to_apply: 'יש לפנות להוצאה לפועל ולהציג אישור מהביטוח הלאומי כדי לגבות את ההפרשים.',
    applicable_benefits: ['alimony'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'electricity_alimony',
    title: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    provider: 'חברת החשמל',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    eligibility_details: 'מקבלות דמי מזונות מהביטוח הלאומי,  שהן הורה יחיד -  ולהן 3 ילדים או יותר\nאו שאינן הורה יחיד ולהן 4 ילדים  או יותר.',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת החשמל רשימות של מי שעשויים להיות זכאים להנחה. ההנחה אמורה להינתן באופן אוטומטי.\nשים לב שחשבון החשמל חייב להיות על שם הזכאי, ובתעריף ביתי בלבד. אם לזכאי יש יותר מחשבון חשמל אח',
    applicable_benefits: ['alimony'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'housing_income_support',
    title: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    eligibility_details: 'חסרי דירה המקבלים קצבת הבטחת הכנסה. קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון או לאחת החברות הבאות: אלונים (מקבוצת MGROUP), מילגם או מעוף.\nלידיעתכם, לאחר הגשת בקשה לאחת החברות, מש',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'employment_income_support',
    title: 'סיוע במימון מסגרות לילדים, סל שעות גמיש והכשרה מקצועית.',
    provider: 'משרד העבודה, הרווחה והשירותים החברתיים',
    domain: 'welfare' as Domain,
    value_display: 'סיוע במימון מסגרות לילדים, סל שעות גמיש והכשרה מקצועית.',
    eligibility_details: 'מקבלי גמלת הבטחת הכנסה שהם הורים עצמאיים (משפחות חד הוריות), המעוניינים להשתלב בשוק העבודה.',
    how_to_apply: 'פרטים על התכנית לעידוד תעסוקה להורים יחידים, אפשר למצוא באתר משרד הרווחה או בטלפון: 03-6562310',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'phone_income_support',
    title: '50% הנחה בעבור דמי שימוש קבועים בתשלום חשבון הטלפון',
    provider: 'חברת "בזק"',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה בעבור דמי שימוש קבועים בתשלום חשבון הטלפון',
    eligibility_details: 'מקבלי גמלה  להבטחת הכנסה',
    how_to_apply: 'החוק אינו חל על מי שמחובר לחברות טלפון אחרות כמו "הוט" ו"נטוויזן". הביטוח הלאומי מעביר לחברת בזק רשימות של מי שעשויים להיות זכאים להטבות. ההנחה אמורה להינתן באופן אוטומטי.\nקו "בזק" צריך להיות בדירה למ',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 600,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'electricity_income_support',
    title: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    provider: 'חברת החשמל',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    eligibility_details: 'מקבלי גמלה להבטחת הכנסה או השלמת הכנסה שהם הורה יחיד ל- 3 ילדים ומעלה או משפחה בת 4 ילדים ומעלה\nנשים מעל גיל 62 המקבלות גמלה להבטחת הכנסה',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת החשמל רשימות של מי שעשויים להיות זכאים להטבות. ההטבה אמורה להינתן באופן אוטומטי.\nשים לב שחשבון החשמל חייב להיות על שם הזכאי, ובתעריף ביתי בלבד. אם לזכאי יש יותר מחשבון חשמל א',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'child_development_income_support',
    title: 'פטור מתשלום בעבור ביקור במכונים להתפתחות הילד בקופות החולים.',
    provider: 'קופת חולים',
    domain: 'health' as Domain,
    value_display: 'פטור מתשלום בעבור ביקור במכונים להתפתחות הילד בקופות החולים.',
    eligibility_details: 'מקבלי גמלה להבטחת הכנסה שהם הורים לילד עד גיל 9.',
    how_to_apply: 'הביטוח הלאומי מעביר לקופות החולים רשימות של מי שעשויים להיות זכאים להטבות. \n\nלבירורים יש לפנות לקופת החולים בה חבר הזכאי.',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'benefit_income_support',
    title: 'הנחה בתשלום עבור מעונות יום ומשפחתונים מוכרים',
    provider: 'מעונות יום ובתי ספר',
    domain: 'welfare' as Domain,
    value_display: 'הנחה בתשלום עבור מעונות יום ומשפחתונים מוכרים',
    eligibility_details: 'ילדים שהוריהם מקבלים גמלת הבטחת הכנסה',
    how_to_apply: 'לבירורים יש לפנות למשרד הרווחה',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'housing_alimony',
    title: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    eligibility_details: 'מקבלות דמי מזונות מהביטוח הלאומי. קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון או לאחת החברות הבאות: אלונים (מקבוצת MGROUP), מילגם או מעוף.\nלידיעתכם, לאחר הגשת בקשה לאחת החברות, מש',
    applicable_benefits: ['alimony'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'transport_income_support',
    title: '50% הנחה בתעריפי נסיעהבתחבורה הציבורית',
    provider: 'משרד התחבורה והבטיחות בדרכים',
    domain: 'transport' as Domain,
    value_display: '50% הנחה בתעריפי נסיעהבתחבורה הציבורית',
    eligibility_details: 'מקבלי גמלת הבטחת הכנסה',
    how_to_apply: 'ההנחה ניתנת למימוש באמצעות כרטיס רב-קו או יישומון לתשלום בתחבורה ציבורית (כגון Moovit, פנגו). יש לעדכן את פרופיל ההנחה בכרטיס.',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 3000,
    popularity_score: 75,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד'],
  },
  {
    id: 'foreign_worker_nursing',
    title: 'העסקת עובד זר',
    provider: 'משרד הפנים - רשות האוכלוסין וההגירה',
    domain: 'welfare' as Domain,
    value_display: 'העסקת עובד זר',
    eligibility_details: 'מקבל גמלת סיעוד ברמה 3 ומעלה וכן מי שנקבעה לו גמלה בשיעור זה והגמלה הופחתה עקב הכנסות.\nמקבל גמלת סיעוד שצבר בהערכת התלות 4.5 נקודות\nמקבל גמלת סיעוד "בודד" שצבר 4 נקודות בהערכת התלות\nמקבל גמלת סיעוד בן',
    how_to_apply: 'תוצאות בדיקת התלות של המבוטח נמסרות ישירות מהביטוח הלאומי לרשות ההגירה. שים לב, רשות ההגירה מסתמכת על נקודות התלות שנקבעו על ידי הביטוח הלאומי.',
    applicable_benefits: ['nursing'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'electricity_nursing',
    title: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    provider: 'חברת החשמל',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי',
    eligibility_details: 'מקבלי גמלת סיעוד ברמה 5 או ברמה 6, וכן מקבלי גמלת סיעוד ברמה 4 שמלאו להם 90 שנים, וכן מי שנקבעה להם גמלה בשיעור זה, אבל הגמלה הופחתה עקב הכנסות.',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת החשמל רשימות של מי שעשויים להיות זכאים להנחה. ההנחה אמורה להינתן באופן אוטומטי.\nשים לב שחשבון החשמל חייב להיות על שם הזכאי, ובתעריף ביתי בלבד. אם לזכאי יש יותר מחשבון חשמל אח',
    applicable_benefits: ['nursing'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'hospitalization_nursing',
    title: 'עזרה במימון מטפל/ת ל-50 שעות טיפול בלבד למשך חודשיים מיום השחרור מאשפוז. המטפל/ת',
    provider: 'קרן לרווחת ניצולי השואה',
    domain: 'welfare' as Domain,
    value_display: 'עזרה במימון מטפל/ת ל-50 שעות טיפול בלבד למשך חודשיים מיום השחרור מאשפוז. המטפל/ת',
    eligibility_details: 'ניצול שואה שהשתחרר מאשפוז בבית חולים ואינו מקבל גמלת סיעוד או גמלת שירותים מיוחדים מביטוח לאומי, ובתנאי שההכנסה החודשית של הניצול אינה עולה על סכום ההכנסה המקסימאלי שנקבע על ידי הרשות לזכויות ניצולי ש',
    how_to_apply: 'בזמן האשפוז יש להגיש בקשה באמצעות העובד הסוציאלי בבית החולים בו הניצול מאושפז.',
    applicable_benefits: ['nursing'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'water_nursing',
    title: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    provider: 'רשות המים',
    domain: 'utilities' as Domain,
    value_display: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    eligibility_details: 'מקבלי גמלת סיעוד ברמה 3 ומעלה, וכן מי שנקבעה לו גמלה בשיעור הזה, אבל הגמלה הופחתה עקב הכנסות',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המים את הרשימות של מי שעשויים להיות זכאים להטבה. כתובת המגורים של הזכאי צריכה להיות מעודכנת במשרד הפנים. ההטבה אמורה להינתן באופן אוטומטי.',
    applicable_benefits: ['nursing'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'tax_purchase_terror',
    title: 'הנחה במס רכישה על דירת מגורים או על קרקע לבניית דירת מגורים, לפי תקנות מס שבח מק',
    provider: 'רשות המיסים - מיסוי מקרקעין',
    domain: 'financial' as Domain,
    value_display: 'הנחה במס רכישה על דירת מגורים או על קרקע לבניית דירת מגורים, לפי תקנות מס שבח מק',
    eligibility_details: 'אלמנים, הורים שכולים, יתומים עד גיל 40 ונכים בעלי דרגות נכות בשיעור 19% ומעלה לצמיתות.',
    how_to_apply: 'כדי לקבל את ההטבה יש לפנות למחלקת נפגעי איבה בסניף הביטוח הלאומי ולקבל מהם אישור על קבלת תגמולים מהביטוח הלאומי. את האישור יש להגיש ללשכת מיסוי מקרקעין בנציבות מס הכנסה.',
    applicable_benefits: ['terror_victim'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 40000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'mortgage_terror',
    title: 'פטור מאגרת רישום משכנתא',
    provider: 'משרד המשפטים - אגף רשם מקרקעין',
    domain: 'legal' as Domain,
    value_display: 'פטור מאגרת רישום משכנתא',
    eligibility_details: 'נכים מפעולת איבה בעלי דרגת נכות בשיעור של 20% ויותר לצמיתות \n נכים מפעולת איבה בעלי דרגת נכות בשיעור של 10% ויותר שהוכרו כנפגעי איבה לפני 01.01.1996.\nבני/בנות זוג של הנפגעים',
    how_to_apply: 'כדי לקבל את ההטבה יש לפנות למחלקת נפגעי איבה בסניף הביטוח הלאומי ולקבל מהם אישור על קבלת תגמולים מהביטוח הלאומי. את האישור יש להגיש ללשכת רישום מקרקעין.',
    applicable_benefits: ['terror_victim'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'land_fees_terror',
    title: 'פטור או הנחה בתשלום דמי הסכמה להעברת מקרקעין שבבעלות מינהל מקרקעי ישראל המוחזקים',
    provider: 'מינהל מקרקעי ישראל',
    domain: 'housing' as Domain,
    value_display: 'פטור או הנחה בתשלום דמי הסכמה להעברת מקרקעין שבבעלות מינהל מקרקעי ישראל המוחזקים',
    eligibility_details: 'נכים מפעולת איבה בעלי דרגת נכות של 50% או יותר, אלמנים, יתומים עד גיל 21, יתומים ששכלו את שני ההורים בפעולות איבה\n(ללא הגבלת גיל) והורים שכולים',
    how_to_apply: 'כדי לקבל את ההטבה יש לפנות למחלקת נפגעי איבה בסניף הביטוח הלאומי ולקבל מהם אישור על קבלת תגמולים מהביטוח הלואמי. את האישור יש להגיש למינהל מקרקעי ישראל.',
    applicable_benefits: ['terror_victim'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'benefit_terror',
    title: 'פטור מחובת תשלום אגרה בעד פעולות הרשם לענייני ירושה',
    provider: 'רשם לענייני ירושה',
    domain: 'legal' as Domain,
    value_display: 'פטור מחובת תשלום אגרה בעד פעולות הרשם לענייני ירושה',
    eligibility_details: 'אלמנים/ות, יתומים, אחים והורים שכולים של מי שנפטרו מפיגוע איבה',
    how_to_apply: 'כדי לקבל את ההטבה הזו, יש לפנות למחלקת נפגעי איבה בסניף הביטוח הלאומי הקרוב למקום המגורים ולקבל אישור על קבלת תגמולים מהביטוח הלאומי. את האישור יש לשלוח לרשם לענייני ירושה.',
    applicable_benefits: ['terror_victim'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'tax_income_income_support',
    title: 'מענק הכנסה ("מס הכנסה שלילי").',
    provider: 'רשות המיסים',
    domain: 'financial' as Domain,
    value_display: 'מענק הכנסה ("מס הכנסה שלילי").',
    eligibility_details: 'עובדים המשתכרים עד רמת שכר מסויימת.',
    how_to_apply: 'לפרטים נוספים ניתן לפנות למוקד הטלפוני של רשות המסים שמספרו 02-5656400, 4954* או באתר האינטרנט של רשות המסים בישראל.',
    applicable_benefits: ['income_support', 'general_disability', 'alimony', 'survivors', 'old_age', 'old_age_income_support', 'survivors_income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 1000,
    popularity_score: 75,
    source_verified: true,
  },
  {
    id: 'water_old_age_is',
    title: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    provider: 'רשות המים',
    domain: 'utilities' as Domain,
    value_display: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך',
    eligibility_details: 'מקבלי קצבת אזרח ותיק לנכה (השלמה לקצבת נכות)\n\nמקבלי קצבת אזרח ותיק בתוספת השלמת הכנסה',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המים את רשימות מי שעשויים להיות זכאים להטבה. כתובת המגורים של הזכאי צריכה להיות מעודכנת במשרד הפנים.  ההנחה אמורה להינתן באופן אוטומטי.',
    applicable_benefits: ['old_age_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'arnona_nursing',
    title: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    eligibility_details: 'מקבלי גמלת סיעוד',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['nursing'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_mobility',
    title: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית.',
    eligibility_details: 'מי שנקבעה לו דרגת מוגבלות בניידות של 90% לפחות',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['mobility'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'arnona_income_support',
    title: 'הנחה במיסי ארנונה. \nאת שיעור ההנחה  קובעת הרשות המקומית.',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במיסי ארנונה. \nאת שיעור ההנחה  קובעת הרשות המקומית.',
    eligibility_details: 'מקבלי גמלה להבטחת הכנסה אשר היו זכאים לקצבה בחודש דצמבר 2002 ולא היתה להם הפסקה של 6 חודשים רצופים בקבלת הקצבה.',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להטבה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית. לצורך קבלת ההטבה יש לפנות לרשות המקומית.',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'tax_purchase_child',
    title: 'הנחה במס רכישה על קניית דירה.',
    provider: 'רשות המיסים',
    domain: 'financial' as Domain,
    value_display: 'הנחה במס רכישה על קניית דירה.',
    eligibility_details: 'הורים לילד הזכאי לקצבת ילד נכה יציבה (לצמיתות), יכולים לפנות לביטוח הלאומי לצורך קביעת אחוזים רפואיים לילדם.\n אם תקבע לילד נכות רפואית בשיעור של 100% (או 90% נכות רפואית משוקללת מכמה ליקויים). \nזכאי ל',
    how_to_apply: 'את הבקשה יש להגיש באמצעות טופס בל/3533.\nהשירות אינו כרוך בתשלום ואין צורך לצרף מסמכים.\nהביטוח הלאומי מעביר לרשות המסים רשימות של מי שעשויים להיות זכאים להטבות. לבירורים יש לפנות ללשכת מיסוי מקרקעין.',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 40000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'tuition_alimony',
    title: 'השתתפות בשכר לימוד, במעונות יום, במשפחתונים ובצהרונים',
    provider: 'משרד העבודה',
    domain: 'employment' as Domain,
    value_display: 'השתתפות בשכר לימוד, במעונות יום, במשפחתונים ובצהרונים',
    eligibility_details: 'מקבלות דמי מזונות מהביטוח הלאומי',
    how_to_apply: 'לבדיקת הזכאות יש למלא באתר האישי הממשלתי "בקשה מקוונת לקבלת דרגה והשתתפות במימון". לבירורים וסיוע במילוי הבקשה ניתן להתקשר למוקד מעונות יום, משפחתונים וצהרונים בטלפון 12222969 או*2969',
    applicable_benefits: ['alimony'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'arnona_terror',
    title: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית',
    eligibility_details: 'נכי איבה בעלי דרגת נכות בשיעור של 10% או יותראלמנים/ות, יתומים משני הורים והורים שכולים של נפגעי פעולות איבה',
    how_to_apply: 'הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['terror_victim'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
  {
    id: 'housing_mobility',
    title: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    eligibility_details: 'מוגבלים בניידות הזקוקים/רתוקים לכיסא גלגלים. קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון או לאחת החברות הבאות: אלונים (מקבוצת MGROUP), מילגם או מעוף.\nלידיעתכם, לאחר הגשת בקשה לאחת החברות, מש',
    applicable_benefits: ['mobility'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'tax_purchase_mobility',
    title: 'הנחה במס רכישה על דירת מגורים או על קרקע לבניית דירת מגורים, לפי תקנות מס שבח מק',
    provider: 'רשות המיסים - מיסוי מקרקעין',
    domain: 'financial' as Domain,
    value_display: 'הנחה במס רכישה על דירת מגורים או על קרקע לבניית דירת מגורים, לפי תקנות מס שבח מק',
    eligibility_details: 'נכה משיתוק או קטוע יד או קטוע רגל המוגבל בניידות בשיעור 50% לפחות',
    how_to_apply: 'כדי לקבל את ההטבה יש לפנות ללשכת מיסוי מקרקעין בנציבות מס הכנסה.',
    applicable_benefits: ['mobility'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 40000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'foreign_worker_special',
    title: 'העסקת עובד זר',
    provider: 'משרד הפנים - רשות האוכלוסין וההגירה',
    domain: 'welfare' as Domain,
    value_display: 'העסקת עובד זר',
    eligibility_details: 'מקבלי קצבת שירותים מיוחדים',
    how_to_apply: 'תוצאות בדיקת התלות של המבוטח נמסרות ישירות מהביטוח הלאומי לרשות ההגירה. שים לב, רשות ההגירה מסתמכת על נקודות התלות שנקבעו על ידי הביטוח הלאומי.',
    applicable_benefits: ['special_services'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'rehabilitation_mobility',
    title: 'סיוע במימון מכשירי שיקום וניידות (תותבות שונות, כסאות גלגלים, הליכונים מיוחדים, ',
    provider: 'משרד הבריאות',
    domain: 'health' as Domain,
    value_display: 'סיוע במימון מכשירי שיקום וניידות (תותבות שונות, כסאות גלגלים, הליכונים מיוחדים, ',
    eligibility_details: 'תושבים בעלי נכות קבועה וזקוקים למכשירי שיקום וניידות עשויים להיות זכאים לסיוע במימון המכשירים.',
    how_to_apply: 'את הבקשה לסיוע יש להגיש לפני ביצוע רכישת המכשיר. \nיש לפנות לרופא המשפחה בקופת החולים בה חבר המבקש. \nלפרטים נוספים ניתן לפנות גם ללשכת הבריאות המחוזית הקרובה לאזור מגוריו של המבקש.',
    applicable_benefits: ['mobility', 'child_disability', 'general_disability', 'nursing', 'special_services'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 5000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'health_services_child',
    title: 'פטור מאגרות בעד שירותים רפואיים',
    provider: 'קופת חולים',
    domain: 'health' as Domain,
    value_display: 'פטור מאגרות בעד שירותים רפואיים',
    eligibility_details: 'ילדים הזכאים לקצבת ילד נכה',
    how_to_apply: 'הביטוח הלאומי מעביר לקופות החולים רשימות של מי שעשויים להיות זכאים להטבות. ההטבה אמורה להינתן באופן אוטומטי.\nלבירורים יש לפנות לקופת החולים שבה חבר הילד הזכאי לקצבה.',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1200,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'water_income_support',
    title: 'הכרה כחייל בודד בעת הגיוס לצה"ל, המזכה בתשלומים מוגדלים וזכויות אחרות.',
    provider: 'צה"ל',
    domain: 'employment' as Domain,
    value_display: 'הכרה כחייל בודד בעת הגיוס לצה"ל, המזכה בתשלומים מוגדלים וזכויות אחרות.',
    eligibility_details: 'מקבלי קצבה מיוחדת בהבטחת הכנסה',
    how_to_apply: 'יש לפנות למוקד "בודדים" בטלפון 03-7375200',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'driving_income_support',
    title: 'מימון ליווי של מורה מוסמך בתקופה שלאחר קבלת הרישיון.​',
    provider: 'משרד התחבורה והבטיחות בדרכים',
    domain: 'transport' as Domain,
    value_display: 'מימון ליווי של מורה מוסמך בתקופה שלאחר קבלת הרישיון.​',
    eligibility_details: 'נהג חדש צעיר, הזכאי לקצבה מיוחדת בהבטחת הכנסה,  שאין לו מי שילווה אותו​.',
    how_to_apply: 'יש לפנות למשרד התחבורה. פרטים באתר משרד התחבורהwww.mot.gov.il /נהג חדש ומלווה',
    applicable_benefits: ['income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד'],
  },
  {
    id: 'water_survivors_is',
    title: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך​',
    provider: 'רשות המים',
    domain: 'utilities' as Domain,
    value_display: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך​',
    eligibility_details: 'מקבלי קצבת שאירים מעל גיל פרישה המקבלים תוספת השלמת הכנסה​',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המים רשימות של מי שעשויים להיות זכאים להטבות. כתובת המגורים של הזכאי צריכה להיות מעודכנת במשרד הפנים. ההטבה אמורה להינתן באופן אוטומטי.\n​',
    applicable_benefits: ['survivors_income_support'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'water_terror',
    title: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך​',
    provider: 'רשות המים',
    domain: 'utilities' as Domain,
    value_display: 'כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך​',
    eligibility_details: 'נכים מפעולת איבה בעלי דרגת נכות בשיעור של 50% ומעלה או המקבלים מהביטוח הלאומי תשלומי מחייה קבועים (תשלומי מחייה קבועים הינם לשלוש שנים לפחות).',
    how_to_apply: 'הביטוח הלאומי מעביר לרשות המים רשימות של מי שעשויים להיות זכאים להטבות. כתובת המגורים של הזכאי צריכה להיות מעודכנת במשרד הפנים. ההטבה אמורה להינתן באופן אוטומטי.\n​',
    applicable_benefits: ['terror_victim'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'welfare_services_child_78',
    title: 'מגוון תוכניות שירותים ומענים לילדים כגון: שילוב במעונות יום שיקומיים, נופשונים ו',
    provider: 'משרד הרווחה',
    domain: 'welfare' as Domain,
    value_display: 'מגוון תוכניות שירותים ומענים לילדים כגון: שילוב במעונות יום שיקומיים, נופשונים ו',
    eligibility_details: 'ילדים עם מוגבלות והוריהם, בהתאם לצרכים ומאפיינים שייבדקו, כמו גיל וסוג המוגבלות.​',
    how_to_apply: 'פרטים ומידע לגבי אופן קבלת ההטבות – באתר האינטרנט "קליק לרווחה".\n לבירורים יש לפנות למשרד הרווחה - המחלקה לשירותים חברתיים.​',
    applicable_benefits: ['child_disability'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'electricity_terror',
    title: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל​ החודשי',
    provider: 'חברת החשמל',
    domain: 'utilities' as Domain,
    value_display: '50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל​ החודשי',
    eligibility_details: 'נכים מפעולת איבה בעלי דרגת נכות בשיעור של 50% ומעלה או המקבלים מהביטוח הלאומי תשלומי מחיה קבועים (תשלומי מחיה קבועים הינם לשלוש שנים לפחות).',
    how_to_apply: 'הביטוח הלאומי מעביר לחברת החשמל רשימות של מי שעשויים להיות זכאים להטבות. ההנחה אמורה להינתן באופן אוטומטי.\nשים לב שחשבון החשמל חייב להיות בתעריף ביתי בלבד ועל שם ההורה המקבל את הקצבה. אם להורה יש יותר',
    applicable_benefits: ['terror_victim'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 2400,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'water_child_80',
    title: 'הורה רשאי להיעדר מעבודתו עד 18 ימים בשנה על חשבון ימי מחלה לצורך סיוע אישי לילד ',
    provider: 'כללי',
    domain: 'welfare' as Domain,
    value_display: 'הורה רשאי להיעדר מעבודתו עד 18 ימים בשנה על חשבון ימי מחלה לצורך סיוע אישי לילד ',
    eligibility_details: 'מי שעובד לפחות שנה אצל אותו מעסיק והוא הורה או אפוטרופוס או הורה אומנה לילד או לבוגר עם מוגבלות קבועה שנמצא בחזקתו, והזכות להיעדרות מהעבודה באותו יום לא נוצלה על ידי ההורה השני.​',
    how_to_apply: 'על העובד לפנות ישירות למעסיק לצורך מימוש הזכאות.\nהמעסיק רשאי לבקש מהעובד הצהרות ואישורים רלוונטיים.\n​',
    applicable_benefits: ['child_disability', 'mobility', 'general_disability', 'work_injury', 'terror_victim'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'housing_disability',
    title: 'סל שיקום\n(סל שירותים מקיף, הכולל  שירותי ייעוץ, ליווי ותמיכה בתחומי חיים שונים: ',
    provider: 'משרד הבריאות',
    domain: 'health' as Domain,
    value_display: 'סל שיקום\n(סל שירותים מקיף, הכולל  שירותי ייעוץ, ליווי ותמיכה בתחומי חיים שונים: ',
    eligibility_details: 'מקבלי קצבת נכות כללית שנקבע להם ליקוי רפואי נפשי בשיעור 40% ומעלה.​',
    how_to_apply: 'לצורך קבלת סיוע ניתן להיעזר, בין היתר, באחד מהגורמים הבאים:\nמרפאת בריאות הנפש\nמחלקה לשירותים חברתיים\nגורם מטפל (רופא, פסיכיאטר, עובד סוציאלי, פסיכולוג)',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 5000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'housing_renovation_work_injury',
    title: 'סיוע במימון שיפוצים ושינויים בדירה, החיוניים לניידות בדירה ולדרכי הגישה אליה​',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'סיוע במימון שיפוצים ושינויים בדירה, החיוניים לניידות בדירה ולדרכי הגישה אליה​',
    eligibility_details: 'מקבלי קצבת נכות מעבודה המוגבלים בתנועה​ ולא מקבלים מימון להתאמת הדירה מביטוח לאומי או ממשרד הבטחון. קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\n\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון.',
    applicable_benefits: ['work_injury'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'nii_exempt_disability',
    title: 'פטור מתשלום דמי ביטוח לאומי​',
    provider: 'ביטוח לאומי',
    domain: 'financial' as Domain,
    value_display: 'פטור מתשלום דמי ביטוח לאומי​',
    eligibility_details: 'מקבל קצבת נכות כללית שאין לו הכנסה\nמקבל קצבת נכות כללית בשיעור של 75% ומעלה לצמיתות או לתקופה רצופה של שנה לפחות שיש לו הכנסות - פטור מתשלום דמי ביטוח לאומי בתקופת קבלת  הקצבה. שימו לב:\nעובד שכיר - המ',
    how_to_apply: 'עובד שכיר צריך להציג למעסיק אישור מהביטוח הלאומי על פטור מתשלום דמי ביטוח. לכל השאר הפטור ניתן באופן אוטומטי.',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'nii_exempt_work_injury',
    title: 'פטור מתשלום דמי ביטוח לאומי​',
    provider: 'ביטוח לאומי',
    domain: 'financial' as Domain,
    value_display: 'פטור מתשלום דמי ביטוח לאומי​',
    eligibility_details: 'מקבל קצבת נכות מעבודה בשיעור של 100% לצמיתות פטור מתשלום דמי ביטוח לאומי בתקופה שבה הוא מקבל את הקצבה, גם אם יש לו הכנסה שלא מעבודה.\nאולם אם הוא עובד שכיר - המעסיק חייב לשלם עבורו דמי ביטוח לאומי לענפ',
    how_to_apply: 'עובד שכיר צריך להציג למעסיק אישור מהביטוח הלאומי על פטור מתשלום דמי ביטוח. לכל השאר הפטור ניתן באופן אוטומטי.​',
    applicable_benefits: ['work_injury'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'tax_credit_disability',
    title: '​קבלת שתי נקודות זיכוי במס הכנסה',
    provider: 'רשות המיסים',
    domain: 'financial' as Domain,
    value_display: '​קבלת שתי נקודות זיכוי במס הכנסה',
    eligibility_details: '​הורים לילדים בגירים שנקבעה להם דרגת אי כושר של 74% ומעלה לצמיתות, והילדים תלויים בהורים.',
    how_to_apply: '​לקבלת ההטבה יש לפנות למשרד מס הכנסה בבקשה לתיאום מס לשנה הנוכחית או בקשה להחזר מס עבור שנים קודמות.',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 5000,
    popularity_score: 75,
    source_verified: true,
  },
  {
    id: 'benefit_nursing',
    title: 'הגדלת גמלת סיעוד בשווי 9 שעות סיעוד​',
    provider: 'קרן לרווחת ניצולי השואה',
    domain: 'welfare' as Domain,
    value_display: 'הגדלת גמלת סיעוד בשווי 9 שעות סיעוד​',
    eligibility_details: 'ניצולי שואה שזכאים לגמלת סיעוד ברמה 4 ומעלה וכן ניצולי שואה נקבעו להם 6 נקודות בהערכת התלות.​',
    how_to_apply: 'יש לפנות ישירות לקרן לרווחת ניצולי שואה עם אישור מהביטוח הלאומי על הזכאות לגמלת סיעוד​',
    applicable_benefits: ['nursing'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'bank_fees_disability',
    title: 'הנחה בגביית עמלות עבור 4 פעולות בחודש שבוצעו על-ידי פקיד הבנק, ויחושבו כמו 4 פעו',
    provider: 'בנקים',
    domain: 'financial' as Domain,
    value_display: 'הנחה בגביית עמלות עבור 4 פעולות בחודש שבוצעו על-ידי פקיד הבנק, ויחושבו כמו 4 פעו',
    eligibility_details: 'מי שנקבעה לו דרגת נכות בשיעור 40% ומעלה על ידי הביטוח הלאומי או על ידי משרד הביטחון​',
    how_to_apply: 'לצורך קבלת ההטבה יש לפנות לבנק בו מתנהל חשבונך ולהציג אישור מביטוח לאומי או משרד הביטחון על אחוזי הנכות שנקבעו.\nלבירורים ותלונות, ניתן לפנות אל המחלקה לפניות הציבור של הבנק.\nלתשומת לב - ההטבה לא תקפה ',
    applicable_benefits: ['general_disability', 'work_injury', 'terror_victim', 'special_services'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'transport_old_age',
    title: 'פטור מתשלום בתחבורה ציבורית',
    provider: 'משרד התחבורה והבטיחות בדרכים',
    domain: 'transport' as Domain,
    value_display: 'פטור מתשלום בתחבורה ציבורית',
    eligibility_details: 'אזרחים ותיקים מגיל 67 ומעלה (לפי חודש הלידה)',
    how_to_apply: 'לקבלת הפטור יש לעדכן פרופיל "זהב-קו" בכרטיס רב-קו או ביישומון לתשלום בתחבורה ציבורית (כגון Moovit, פנגו).',
    applicable_benefits: ['old_age', 'nursing', 'old_age_income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 2,
    estimated_value: 3000,
    popularity_score: 75,
    source_verified: true,
    transport_providers: ['רב-קו', 'רכבת ישראל', 'דן', 'אגד'],
  },
  {
    id: 'water_old_age',
    title: 'טיפולי שיניים משמרים, מונעים ומשקמים במסגרת סל הבריאות. חלק מהטיפולים ניתנים בחי',
    provider: 'קופת חולים',
    domain: 'health' as Domain,
    value_display: 'טיפולי שיניים משמרים, מונעים ומשקמים במסגרת סל הבריאות. חלק מהטיפולים ניתנים בחי',
    eligibility_details: 'אזרחים ותיקים שמלאו להם 72 ומעלה​',
    how_to_apply: 'השירות ניתן במרפאות השיניים של קופות החולים ובמרפאות שבהסדר עם קופות החולים.על פי הצורך מטופלים יופנו גם לטיפולים מסוימים בבתי חולים. לשם כך צריך לקבל מקופת החולים הפניה וטופס התחייבות (טופס 17).\n​',
    applicable_benefits: ['old_age', 'nursing', 'old_age_income_support'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 1,
    estimated_value: 500,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'employment_alimony',
    title: '​הכשרה מקצועית',
    provider: 'משרד העבודה',
    domain: 'employment' as Domain,
    value_display: '​הכשרה מקצועית',
    eligibility_details: '​מקבלות דמי מזונות מהביטוח הלאומי',
    how_to_apply: '​לבירורים לגבי תוכניות רלוונטיות יש לפנות ללשכת שירותי התעסוקה.',
    applicable_benefits: ['alimony'] as BenefitType[],
    is_automatic: false,
    primary_display_priority: 3,
    estimated_value: 1000,
    popularity_score: 60,
    source_verified: true,
  },
  {
    id: 'housing_disability_96',
    title: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    provider: 'משרד הבינוי והשיכון',
    domain: 'housing' as Domain,
    value_display: 'סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו',
    eligibility_details: 'מקבלי קצבת נכות בעלי דרגת אי כושר בשיעור של 75% ומעלה. לידיעתכם, קבלת ההטבה מותנית בתנאים נוספים.',
    how_to_apply: 'ההטבה אינה ניתנת באופן אוטומטי.\nלבירור תנאי הזכאות ולהגשת בקשה לסיוע יש לפנות למשרד הבינוי והשיכון או לאחת החברות הבאות: אלונים (מקבוצת MGROUP), מילגם או מעוף.\nלידיעתכם, לאחר הגשת בקשה לאחת החברות, מש',
    applicable_benefits: ['general_disability'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 12000,
    popularity_score: 90,
    source_verified: true,
  },
  {
    id: 'arnona_survivors',
    title: 'הנחה במסי ארנונה, גובה ההנחה נקבע על ידי הרשות המקומית',
    provider: 'רשות מקומית',
    domain: 'utilities' as Domain,
    value_display: 'הנחה במסי ארנונה, גובה ההנחה נקבע על ידי הרשות המקומית',
    eligibility_details: '​מקבלי קצבת שארים מעל גיל פרישה בתוספת השלמת הכנסה',
    how_to_apply: '​הביטוח הלאומי מעביר לרשויות המקומיות רשימות של מי שעשויים להיות זכאים להנחה.\n\nההנחה ניתנת על פי הכללים הקיימים של כל רשות מקומית, לפיכך לקבלת ההנחה יש לפנות לרשות המקומית.',
    applicable_benefits: ['survivors'] as BenefitType[],
    is_automatic: true,
    primary_display_priority: 1,
    estimated_value: 3500,
    popularity_score: 90,
    source_verified: true,
    requires_local_authority_check: true,
  },
];

import type { UserMetrics } from '@/types/userProfile';

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

function checkRightEligibility(right: Right, context: EligibilityContext): { eligible: boolean; matchScore: number } {
  const { benefits, metrics } = context;
  
  const hasBenefit = right.applicable_benefits.some(benefit => benefits.includes(benefit));
  if (!hasBenefit) {
    return { eligible: false, matchScore: 0 };
  }

  let matchScore = 50; // Base score for having the benefit

  // כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך — requires ≥70% medical disability
  if (right.id === 'water_disability') {
    if (metrics.medical_disability_pct >= 70) {
      matchScore = 90;
    } else {
      return { eligible: false, matchScore: 0 };
    }
  }

  // הנחה במסי ארנונה — requires ≥75% incapacity OR ≥90% medical disability
  if (right.id === 'arnona_disability') {
    if (metrics.incapacity_pct >= 75 || metrics.medical_disability_pct >= 90) {
      matchScore = 90;
    } else {
      return { eligible: false, matchScore: 0 };
    }
  }

  // פטור מתשלום מס הכנסה — requires ≥90% medical disability
  if (right.id === 'tax_exemption_disability') {
    if (metrics.medical_disability_pct >= 90) {
      matchScore = 90;
    } else {
      return { eligible: false, matchScore: 0 };
    }
  }

  // הנחה במס רכישה — requires ≥75% incapacity OR ≥90% medical disability
  if (right.id === 'tax_purchase_disability') {
    if (metrics.incapacity_pct >= 75 || metrics.medical_disability_pct >= 90) {
      matchScore = 90;
    } else {
      return { eligible: false, matchScore: 0 };
    }
  }

  // פטור או הנחה מתשלום דמי הסכמה להעברת מקרקעין שבבעלות מינהל מקרקעי ישראל המוחזקים
  if (right.id === 'land_fees_disability') {
    if (metrics.medical_disability_pct >= 80) {
      matchScore = 90;
    } else if (metrics.medical_disability_pct >= 56) {
      matchScore = 60;
    }
  }

  // הנחות ברכישת תרופות הכלולות בסל הבריאות ופטור מתשלום השתתפות עצמית בעבור שירותים — requires income support
  if (right.id === 'health_services_old_age_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // 50% הנחה בדמי שימוש קבועים בתשלום חשבון הטלפון — requires income support
  if (right.id === 'phone_old_age_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // 50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי — requires income support
  if (right.id === 'electricity_old_age_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו — requires income support
  if (right.id === 'housing_old_age_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית. — requires income support
  if (right.id === 'arnona_old_age') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // 50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי — requires income support
  if (right.id === 'electricity_survivors_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // סיוע בתשלום שכר דירה לשכירת דירה בשוק החופשי (שלא מבני משפחה) או סיוע בדיור ציבו — requires income support
  if (right.id === 'housing_survivors_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // הנחה ברכישת תרופות ופטור מאגרות בעד שירותים רפואיים — requires income support
  if (right.id === 'health_services_survivors_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // הנחה במסי ארנונה. גובה ההנחה נקבע על ידי הרשות המקומית. — requires income support
  if (right.id === 'arnona_survivors_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // 50% הנחה עבור דמי שימוש קבועים בתשלום חשבון הטלפון — requires income support
  if (right.id === 'phone_survivors_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // הנחה או פטור מתשלום מס הכנסה
  if (right.id === 'tax_exemption_work_injury') {
    if (metrics.medical_disability_pct >= 90) {
      matchScore = 90;
    } else if (metrics.medical_disability_pct >= 62) {
      matchScore = 60;
    }
  }

  // הנחה במס רכישה
  if (right.id === 'tax_purchase_work_injury') {
    if (metrics.medical_disability_pct >= 100) {
      matchScore = 90;
    } else if (metrics.medical_disability_pct >= 70) {
      matchScore = 60;
    }
  }

  // 50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי — requires income support
  if (right.id === 'electricity_income_support') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // 50% הנחה עבור 400 קוט"ש ראשונים בתשלום חשבון החשמל החודשי — requires nursing level ≥4
  if (right.id === 'electricity_nursing') {
    if (metrics.nursing_level >= 4) {
      matchScore = 90;
    } else {
      return { eligible: false, matchScore: 0 };
    }
  }

  // הנחה במס רכישה על דירת מגורים או על קרקע לבניית דירת מגורים, לפי תקנות מס שבח מק
  if (right.id === 'tax_purchase_terror') {
  }

  // פטור או הנחה בתשלום דמי הסכמה להעברת מקרקעין שבבעלות מינהל מקרקעי ישראל המוחזקים
  if (right.id === 'land_fees_terror') {
  }

  // כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך — requires income support
  if (right.id === 'water_old_age_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // הנחה במס רכישה על קניית דירה.
  if (right.id === 'tax_purchase_child') {
    if (metrics.medical_disability_pct >= 100) {
      matchScore = 90;
    } else if (metrics.medical_disability_pct >= 70) {
      matchScore = 60;
    }
  }

  // כמות מים נוספת של עד 3.5 מ"ק לחודש בתעריף הנמוך​ — requires income support
  if (right.id === 'water_survivors_is') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // פטור מתשלום דמי ביטוח לאומי — requires ≥75% incapacity
  if (right.id === 'nii_exempt_disability') {
    if (metrics.incapacity_pct >= 75) {
      matchScore = 90;
    } else {
      return { eligible: false, matchScore: 0 };
    }
  }

  // הנחה במסי ארנונה, גובה ההנחה נקבע על ידי הרשות המקומית — requires income support
  if (right.id === 'arnona_survivors') {
    if (!metrics.is_income_support) {
      return { eligible: false, matchScore: 0 };
    }
    matchScore = 90;
  }

  // Old age benefits that require income support
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
      age: 0,
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
