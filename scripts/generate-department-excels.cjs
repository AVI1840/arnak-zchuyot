/**
 * Generate unified Department Excel for rights verification
 * Creates ONE workbook with separate sheets per department
 * Styled per BTL (Bituach Leumi) Design System
 *
 * Usage: node scripts/generate-department-excels.cjs
 */

const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// ═══════ BTL Design System Colors ═══════
const BTL = {
  primary: 'FF0368B0',       // כחול ראשי
  primaryDark: 'FF025A8F',   // כחול כהה
  textPrimary: 'FF0C3058',   // טקסט ראשי
  textSecondary: 'FF266794', // טקסט משני
  infoBg: 'FFE8F3FF',        // רקע מידע
  white: 'FFFFFFFF',
  lightGray: 'FFF5F9FF',     // רקע בהיר
  border: 'FFD0D5DD',
  success: 'FF10B981',       // ירוק
  successBg: 'FFD1FAE5',
  warning: 'FFF59E0B',       // צהוב
  warningBg: 'FFFEF3C7',
  error: 'FFEF4444',         // אדום
  errorBg: 'FFFEE2E2',
  infoBadge: 'FF3B82F6',     // כחול בהיר
  grayBg: 'FFF3F4F6',
};

// ═══════ Data ═══════
const specPath = path.join(__dirname, '..', 'data', 'rights_database_spec.json');
const rights = JSON.parse(fs.readFileSync(specPath, 'utf-8'));

const DEPARTMENTS = [
  { name: 'אגף נכות (כולל ילד נכה)', shortName: 'נכות', benefits: ['general_disability', 'special_services', 'mobility', 'child_disability'] },
  { name: 'אגף אזרח ותיק ושארים', shortName: 'אז״ו ושארים', benefits: ['old_age', 'old_age_income_support', 'survivors', 'survivors_income_support'] },
  { name: 'אגף סיעוד', shortName: 'סיעוד', benefits: ['nursing'] },
  { name: 'אגף נפגעי עבודה', shortName: 'נפגעי עבודה', benefits: ['work_injury'] },
  { name: 'אגף איבה', shortName: 'איבה', benefits: ['terror_victim'] },
  { name: 'אגף הבטחת הכנסה', shortName: 'הבטחת הכנסה', benefits: ['income_support', 'alimony'] },
  { name: 'אגף משפחה', shortName: 'משפחה', benefits: ['child_disability', 'prisoners_of_zion', 'righteous_nations'] },
  { name: 'אגף שיקום', shortName: 'שיקום', benefits: [], filterByDomain: ['welfare', 'employment'] },
  { name: 'אגף ועדות רפואיות', shortName: 'ועדות רפואיות', benefits: [], filterByThresholds: true },
  { name: 'אגף מחליפות שכר', shortName: 'מחליפות שכר', benefits: [], filterByDomain: ['employment'] },
  { name: 'אגף תכנון תיאום ובקרה', shortName: 'תכנון ובקרה', benefits: [], includeAll: true },
  { name: 'אגף שירות', shortName: 'שירות', benefits: [], includeAll: true },
];

const BENEFIT_LABELS = {
  general_disability: 'נכות כללית', special_services: 'שירותים מיוחדים', mobility: 'ניידות',
  child_disability: 'ילד נכה', old_age: 'אזרח ותיק', old_age_income_support: 'אזרח ותיק + השלמת הכנסה',
  nursing: 'סיעוד', survivors: 'שארים', survivors_income_support: 'שארים + השלמת הכנסה',
  work_injury: 'נכות מעבודה', terror_victim: 'נפגעי איבה', income_support: 'הבטחת הכנסה',
  alimony: 'מזונות', prisoners_of_zion: 'אסירי ציון', righteous_nations: 'חסידי אומות עולם',
};

const DOMAIN_LABELS = {
  housing: 'דיור', health: 'בריאות', transport: 'תחבורה', utilities: 'תשתיות',
  financial: 'כספים ומיסים', welfare: 'רווחה', employment: 'תעסוקה', legal: 'משפטי',
};

const WIZARD_QUESTIONS = [
  { id: 'medical_pct', benefit: 'general_disability', question: 'מהו אחוז הנכות הרפואית שנקבע לך בוועדה?', explanation: '70%+ מזכה בהנחה במים. 80%+ מזכה בהנחה בדמי הסכמה. 90%+ מזכה בפטור ממס הכנסה.', options: 'פחות מ-70% | 70%-79% | 80%-89% | 90%-99% | 100%' },
  { id: 'incapacity_pct', benefit: 'general_disability', question: 'מהי דרגת אי-הכושר שנקבעה לך?', explanation: '74%+ מזכה בנקודות זיכוי מס. 75%+ מזכה בהנחה בארנונה, סיוע בדיור ופטור מדמי ביטוח.', options: '60% | 65% | 74% | 75% | 100%' },
  { id: 'old_age_income_support', benefit: 'old_age', question: 'האם אתה מקבל השלמת הכנסה?', explanation: 'השלמת הכנסה מזכה בהנחה בחשמל, מים, טלפון, ארנונה מלאה ועוד.', options: 'כן / לא' },
  { id: 'age_question', benefit: 'old_age', question: 'באיזה טווח גילאים אתה?', explanation: 'מגיל 67 פטור מלא מתחבורה ציבורית. מגיל 72 זכאות לטיפולי שיניים בסל הבריאות.', options: '67-71 | 72-89 | 90+' },
  { id: 'old_age_is_age', benefit: 'old_age_income_support', question: 'באיזה טווח גילאים אתה?', explanation: 'מגיל 67 פטור מלא מתחבורה ציבורית. מגיל 72 זכאות לטיפולי שיניים.', options: '67-71 | 72-89 | 90+' },
  { id: 'nursing_level', benefit: 'nursing', question: 'מהי רמת גמלת הסיעוד שנקבעה לך?', explanation: 'רמה 3+ הנחת מים + עובד זר. רמה 5-6 הנחת חשמל. רמה 4 חשמל רק מגיל 90.', options: 'רמה 1 | רמה 2 | רמה 3 | רמה 4 | רמה 5 | רמה 6' },
  { id: 'nursing_age', benefit: 'nursing', question: 'באיזה טווח גילאים אתה?', explanation: 'רמת סיעוד 4 מזכה בחשמל רק מגיל 90. מגיל 67 פטור מתחבורה ציבורית.', options: '67-71 | 72-89 | 90+' },
  { id: 'mobility_pct', benefit: 'mobility', question: 'מהי דרגת המוגבלות בניידות?', explanation: '90%+ הנחה בארנונה. 50%+ הנחה במס רכישה.', options: 'פחות מ-50% | 50%-79% | 80%-89% | 90% | 100%' },
  { id: 'wheelchair_question', benefit: 'mobility', question: 'האם אתה משתמש בכיסא גלגלים?', explanation: 'שימוש בכיסא גלגלים מזכה בסיוע בדיור מותאם.', options: 'כן / לא' },
  { id: 'special_services_rate', benefit: 'special_services', question: 'מהו שיעור גמלת השירותים המיוחדים?', explanation: '112%+ הנחת מים וסיוע בדיור.', options: '50% | 112% | 188% | 235%' },
  { id: 'survivors_income_support', benefit: 'survivors', question: 'האם אתה מקבל השלמת הכנסה?', explanation: 'השלמת הכנסה לשארים מזכה בהנחות חשמל, מים, טלפון, ארנונה.', options: 'כן / לא' },
  { id: 'work_injury_medical_pct', benefit: 'work_injury', question: 'מהו אחוז הנכות הרפואית מעבודה?', explanation: '20%+ חברות בארגון + ביטוח חיים. 90%+ פטור מס הכנסה + ארנונה.', options: 'פחות מ-20% | 20%-89% | 90%-99% | 100%' },
  { id: 'terror_medical_pct', benefit: 'terror_victim', question: 'מהו אחוז הנכות כנפגע איבה?', explanation: '10%+ ארנונה. 19%+ מס רכישה. 50%+ חשמל + מים.', options: '10%-18% | 19%-49% | 50%-99% | 100%' },
  { id: 'child_disability_medical_pct', benefit: 'child_disability', question: 'מהו אחוז הנכות הרפואית של הילד?', explanation: '75%+ לצמיתות = פטור מס קופות גמל. 90%+ משוקללת או 100% = הנחת מס רכישה.', options: 'פחות מ-75% | 75%-89% | 90% (משוקללת) | 100%' },
];

// ═══════ Helpers ═══════

function extractThresholds(logic) {
  if (!logic) return {};
  const result = {};
  if (logic.min_medical_disability) result.medical_disability_pct = logic.min_medical_disability;
  if (logic.min_incapacity) result.incapacity_pct = logic.min_incapacity;
  if (logic.min_mobility) result.mobility_pct = logic.min_mobility;
  if (logic.min_nursing_level) result.nursing_level = logic.min_nursing_level;
  if (logic.min_special_services_rate) result.special_services_rate = logic.min_special_services_rate;
  if (logic.conditions) {
    for (const cond of logic.conditions) {
      Object.assign(result, extractThresholds(cond));
    }
  }
  return result;
}

function getRightsForDepartment(dept) {
  if (dept.includeAll) return rights;
  let filtered = [];
  if (dept.benefits.length > 0) {
    filtered = rights.filter(r => r.applicable_benefits.some(b => dept.benefits.includes(b)));
  }
  if (dept.filterByDomain) {
    const domainRights = rights.filter(r => dept.filterByDomain.includes(r.domain));
    filtered = [...new Map([...filtered, ...domainRights].map(r => [r.id, r])).values()];
  }
  if (dept.filterByThresholds) {
    const thresholdRights = rights.filter(r => {
      if (!r.eligibility_logic) return false;
      return Object.keys(extractThresholds(r.eligibility_logic)).length > 0;
    });
    filtered = [...new Map([...filtered, ...thresholdRights].map(r => [r.id, r])).values()];
  }
  return filtered;
}

function estimateValue(right) {
  const title = (right.title || '').toLowerCase();
  if (title.includes('מס רכישה')) return 40000;
  if (title.includes('מס הכנסה')) return 15000;
  if (title.includes('ארנונה')) return 5000;
  if (title.includes('דיור') || title.includes('דירה') || title.includes('שיכון')) return 12000;
  if (title.includes('חשמל')) return 2400;
  if (title.includes('מים')) return 500;
  if (title.includes('טלפון')) return 1200;
  if (title.includes('תחבורה') || title.includes('נסיעה')) return 3000;
  return 1000;
}

// ═══════ BTL Styled header ═══════

function styleBTLHeader(row, height = 35) {
  row.height = height;
  row.font = { bold: true, color: { argb: BTL.white }, size: 11, name: 'Arial' };
  row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BTL.primary } };
  row.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  row.eachCell(cell => {
    cell.border = {
      top: { style: 'thin', color: { argb: BTL.primaryDark } },
      bottom: { style: 'thin', color: { argb: BTL.primaryDark } },
      left: { style: 'thin', color: { argb: BTL.primaryDark } },
      right: { style: 'thin', color: { argb: BTL.primaryDark } },
    };
  });
}

function styleDataRow(row, isEven) {
  row.font = { size: 10, name: 'Arial', color: { argb: BTL.textPrimary } };
  row.alignment = { wrapText: true, vertical: 'top', horizontal: 'right' };
  if (isEven) {
    row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BTL.lightGray } };
  }
  row.eachCell(cell => {
    cell.border = {
      bottom: { style: 'thin', color: { argb: BTL.border } },
      left: { style: 'hair', color: { argb: BTL.border } },
      right: { style: 'hair', color: { argb: BTL.border } },
    };
  });
}

// ═══════ Main Generation ═══════

async function generateUnifiedExcel() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ארנק זכויות — המוסד לביטוח לאומי';
  workbook.created = new Date();

  // ────────── Cover Sheet ──────────
  const coverSheet = workbook.addWorksheet('שער', { views: [{ rightToLeft: true }] });
  coverSheet.columns = [{ width: 60 }, { width: 30 }];

  const coverData = [
    ['ארנק זכויות — מסמך תיקוף לאגפים', ''],
    ['המוסד לביטוח לאומי', ''],
    ['', ''],
    [`תאריך הפקה: ${new Date().toLocaleDateString('he-IL')}`, ''],
    ['', ''],
    ['מטרה:', ''],
    ['כלי "ארנק זכויות" מאתר למבוטחים את הזכויות הנלוות שלהם לפי הקצבאות שהם מקבלים מביטוח לאומי.', ''],
    ['הכלי מיועד לשמש כמחשבון באתר ביטוח לאומי וכן להתאמה אישית באזור האישי לפי פרופיל המבוטח.', ''],
    ['', ''],
    ['הנחיות מילוי:', ''],
    ['1. כל אגף יעבור על הגיליון שלו ויוודא שכל הנתונים מדויקים.', ''],
    ['2. בעמודה "סטטוס אימות" — סמנו: מאומת / דורש תיקון / שגוי / חסר / למחיקה.', ''],
    ['3. בעמודה "הערות המאמת" — רשמו מה לתקן.', ''],
    ['4. ספקו קישור רלוונטי לכל הטבה (עמודה "קישור רלוונטי").', ''],
    ['5. ודאו שעמודה "מה נדרש להגיש" ברורה וחד-משמעית.', ''],
    ['6. עברו על גיליון "שאלות מיקוד" וודאו שהשאלות ואפשרויות התשובה נכונות.', ''],
    ['', ''],
    ['חשוב:', ''],
    ['- האגף אחראי לעדכן את הנתונים בכל שינוי מדיניות, חקיקה או נוהל.', ''],
    ['- נתונים שגויים עלולים להטעות מבוטחים — אנא הקפידו על דיוק מרבי.', ''],
    ['- הערכים הכספיים המשוערים דורשים אישור — אם לא ידוע, יש לציין "לבדיקה".', ''],
    ['', ''],
    ['מפתח סטטוס:', ''],
    ['מאומת', 'המידע נכון ומדויק'],
    ['דורש תיקון', 'יש מה לתקן (רשמו הערה)'],
    ['שגוי', 'המידע שגוי לחלוטין'],
    ['חסר', 'חסרה הטבה שצריכה להיות'],
    ['למחיקה', 'הטבה שאינה רלוונטית או בוטלה'],
    ['', ''],
    ['רשימת גיליונות:', ''],
  ];

  coverData.forEach((row, i) => {
    const r = coverSheet.addRow(row);
    r.font = { size: 11, name: 'Arial', color: { argb: BTL.textPrimary } };
    r.alignment = { horizontal: 'right', wrapText: true };

    if (i === 0) { r.font = { bold: true, size: 18, name: 'Arial', color: { argb: BTL.primary } }; }
    if (i === 1) { r.font = { bold: true, size: 14, name: 'Arial', color: { argb: BTL.textSecondary } }; }
    if ([5, 9, 17, 22, 29].includes(i)) { r.font = { bold: true, size: 12, name: 'Arial', color: { argb: BTL.primaryDark } }; }

    // Color status key
    if (i === 23) r.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BTL.successBg } };
    if (i === 24) r.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BTL.warningBg } };
    if (i === 25) r.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BTL.errorBg } };
    if (i === 26) r.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BTL.infoBg } };
  });

  // Add department list to cover
  DEPARTMENTS.forEach((dept, i) => {
    const deptRights = getRightsForDepartment(dept);
    const r = coverSheet.addRow([`${i + 1}. ${dept.name}`, `${deptRights.length} זכויות`]);
    r.font = { size: 11, name: 'Arial', color: { argb: BTL.textSecondary } };
    r.alignment = { horizontal: 'right' };
  });

  // ────────── Department Data Sheets ──────────
  for (const dept of DEPARTMENTS) {
    const deptRights = getRightsForDepartment(dept);
    const sheetName = dept.shortName.substring(0, 31); // Excel max 31 chars

    const sheet = workbook.addWorksheet(sheetName, {
      views: [{ state: 'frozen', ySplit: 1, rightToLeft: true }],
    });

    sheet.columns = [
      { header: 'מזהה', key: 'id', width: 28 },
      { header: 'כותרת ההטבה', key: 'title', width: 45 },
      { header: 'גורם מבצע', key: 'provider', width: 18 },
      { header: 'תחום', key: 'domain', width: 14 },
      { header: 'קצבאות קשורות', key: 'benefits', width: 28 },
      { header: 'תנאי זכאות', key: 'eligibility', width: 55 },
      { header: 'סף נכות %', key: 'medical_pct', width: 12 },
      { header: 'סף אי-כושר %', key: 'incapacity_pct', width: 13 },
      { header: 'סף ניידות %', key: 'mobility_pct', width: 12 },
      { header: 'רמת סיעוד', key: 'nursing_level', width: 11 },
      { header: 'שיעור שמ"מ', key: 'special_rate', width: 12 },
      { header: 'גיל מינ\'', key: 'min_age', width: 10 },
      { header: 'השלמת הכנסה?', key: 'income_support', width: 13 },
      { header: 'ערך שנתי (ש"ח)', key: 'value', width: 15 },
      { header: 'אוטומטי/הגשה', key: 'auto_manual', width: 15 },
      { header: 'מה נדרש להגיש', key: 'how_to_apply', width: 55 },
      { header: 'קישור רלוונטי', key: 'link', width: 35 },
      { header: 'סטטוס אימות', key: 'status', width: 16 },
      { header: 'הערות המאמת', key: 'verifier_notes', width: 35 },
      { header: 'תאריך אימות', key: 'date', width: 14 },
    ];

    styleBTLHeader(sheet.getRow(1));

    deptRights.forEach((right, i) => {
      const thresholds = extractThresholds(right.eligibility_logic);
      const row = sheet.addRow({
        id: right.id,
        title: right.title,
        provider: right.provider,
        domain: DOMAIN_LABELS[right.domain] || right.domain,
        benefits: (right.applicable_benefits || []).map(b => BENEFIT_LABELS[b] || b).join(', '),
        eligibility: right.eligibility_text || '',
        medical_pct: thresholds.medical_disability_pct || '',
        incapacity_pct: thresholds.incapacity_pct || '',
        mobility_pct: thresholds.mobility_pct || '',
        nursing_level: thresholds.nursing_level || '',
        special_rate: thresholds.special_services_rate || '',
        min_age: '',
        income_support: '',
        value: estimateValue(right),
        auto_manual: right.is_automatic ? 'אוטומטי' : 'מצריך הגשה',
        how_to_apply: right.how_to_apply || '',
        link: right.action_link || '',
        status: '',
        verifier_notes: '',
        date: '',
      });
      styleDataRow(row, i % 2 === 0);
    });

    // Data validation — status dropdown
    for (let i = 2; i <= deptRights.length + 1; i++) {
      sheet.getCell(i, 18).dataValidation = {
        type: 'list', allowBlank: true,
        formulae: ['"מאומת,דורש תיקון,שגוי,חסר,למחיקה"'],
      };
      sheet.getCell(i, 15).dataValidation = {
        type: 'list', allowBlank: false,
        formulae: ['"אוטומטי,מצריך הגשה"'],
      };
    }

    // Conditional formatting for status column
    const lastRow = deptRights.length + 1;
    sheet.addConditionalFormatting({
      ref: `R2:R${lastRow}`,
      rules: [
        { type: 'containsText', operator: 'containsText', text: 'מאומת', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: BTL.successBg } } }, priority: 1 },
        { type: 'containsText', operator: 'containsText', text: 'דורש תיקון', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: BTL.warningBg } } }, priority: 2 },
        { type: 'containsText', operator: 'containsText', text: 'שגוי', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: BTL.errorBg } } }, priority: 3 },
        { type: 'containsText', operator: 'containsText', text: 'למחיקה', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: BTL.grayBg } } }, priority: 4 },
      ],
    });
  }

  // ────────── Questions Sheet ──────────
  const qSheet = workbook.addWorksheet('שאלות מיקוד', {
    views: [{ state: 'frozen', ySplit: 1, rightToLeft: true }],
  });

  qSheet.columns = [
    { header: 'מזהה שאלה', key: 'id', width: 25 },
    { header: 'קצבה קשורה', key: 'benefit', width: 25 },
    { header: 'נוסח השאלה', key: 'question', width: 50 },
    { header: 'הסבר למשתמש', key: 'explanation', width: 55 },
    { header: 'אפשרויות תשובה', key: 'options', width: 40 },
    { header: 'סטטוס אימות', key: 'status', width: 16 },
    { header: 'הערות', key: 'notes', width: 35 },
  ];

  styleBTLHeader(qSheet.getRow(1));

  WIZARD_QUESTIONS.forEach((q, i) => {
    const row = qSheet.addRow({
      id: q.id,
      benefit: BENEFIT_LABELS[q.benefit] || q.benefit,
      question: q.question,
      explanation: q.explanation,
      options: q.options,
      status: '',
      notes: '',
    });
    styleDataRow(row, i % 2 === 0);
  });

  for (let i = 2; i <= WIZARD_QUESTIONS.length + 1; i++) {
    qSheet.getCell(i, 6).dataValidation = {
      type: 'list', allowBlank: true,
      formulae: ['"מאומת,דורש תיקון,שגוי"'],
    };
  }

  // ────────── Save ──────────
  const outputDir = path.join(__dirname, '..', 'data', 'department-sheets');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const filePath = path.join(outputDir, 'ארנק_זכויות_תיקוף_אגפים.xlsx');
  await workbook.xlsx.writeFile(filePath);

  return filePath;
}

async function main() {
  console.log('');
  console.log('  ═══════════════════════════════════════');
  console.log('  המוסד לביטוח לאומי');
  console.log('  ארנק זכויות — ייצור מסמך תיקוף שיתופי');
  console.log('  ═══════════════════════════════════════');
  console.log('');

  const filePath = await generateUnifiedExcel();

  console.log(`  ✅ קובץ נוצר בהצלחה:`);
  console.log(`     ${filePath}`);
  console.log('');
  console.log('  גיליונות:');
  DEPARTMENTS.forEach((dept, i) => {
    const count = getRightsForDepartment(dept).length;
    console.log(`     ${i + 1}. ${dept.shortName} (${count} זכויות)`);
  });
  console.log(`     + שאלות מיקוד (${WIZARD_QUESTIONS.length} שאלות)`);
  console.log('');
  console.log('  ═══════════════════════════════════════');
}

main().catch(console.error);
