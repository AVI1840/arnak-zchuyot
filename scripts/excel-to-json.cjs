/**
 * Excel → JSON converter for Rights Database
 * 
 * Reads data/rights_master.xlsx and outputs data/rights_database_delivery_v{X}.json
 * 
 * Usage: node scripts/excel-to-json.cjs
 * 
 * Requires: npm install xlsx
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const EXCEL_PATH = path.join(DATA_DIR, 'rights_master.xlsx');

// Valid values for validation
const VALID_DOMAINS = ['housing', 'health', 'transport', 'utilities', 'financial', 'welfare', 'employment', 'legal'];
const VALID_BENEFITS = [
  'general_disability', 'special_services', 'mobility', 'child_disability',
  'old_age', 'old_age_income_support', 'nursing', 'survivors', 'survivors_income_support',
  'work_injury', 'terror_victim', 'income_support', 'alimony', 'prisoners_of_zion', 'righteous_nations'
];

function main() {
  if (!fs.existsSync(EXCEL_PATH)) {
    console.error(`Excel file not found: ${EXCEL_PATH}`);
    console.log('Expected file: data/rights_master.xlsx');
    console.log('Create it with columns: id, title, provider, domain, applicable_benefits, eligibility_text, how_to_apply, is_automatic, action_link, dedup_group, estimated_value, status, last_reviewed, notes');
    process.exit(1);
  }

  const workbook = XLSX.readFile(EXCEL_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  console.log(`Read ${rows.length} rows from Excel`);

  const errors = [];
  const rights = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const lineNum = i + 2; // Excel is 1-indexed + header

    // Skip removed/draft
    if (row.status === 'removed') continue;

    // Validate required fields
    if (!row.id) { errors.push(`Row ${lineNum}: missing id`); continue; }
    if (!row.title) { errors.push(`Row ${lineNum}: missing title`); continue; }
    if (!row.provider) { errors.push(`Row ${lineNum}: missing provider`); continue; }
    if (!row.domain) { errors.push(`Row ${lineNum}: missing domain`); continue; }
    if (!row.applicable_benefits) { errors.push(`Row ${lineNum}: missing applicable_benefits`); continue; }

    // Validate domain
    if (!VALID_DOMAINS.includes(row.domain)) {
      errors.push(`Row ${lineNum}: invalid domain "${row.domain}"`);
    }

    // Parse applicable_benefits (comma-separated)
    const benefits = String(row.applicable_benefits).split(',').map(s => s.trim()).filter(Boolean);
    for (const b of benefits) {
      if (!VALID_BENEFITS.includes(b)) {
        errors.push(`Row ${lineNum}: invalid benefit type "${b}"`);
      }
    }

    // Validate URL if present
    if (row.action_link && !String(row.action_link).startsWith('http')) {
      errors.push(`Row ${lineNum}: invalid URL "${row.action_link}"`);
    }

    const right = {
      id: String(row.id).trim(),
      title: String(row.title).trim(),
      provider: String(row.provider).trim(),
      domain: String(row.domain).trim(),
      applicable_benefits: benefits,
      eligibility_text: row.eligibility_text ? String(row.eligibility_text).trim() : '',
      how_to_apply: row.how_to_apply ? String(row.how_to_apply).trim() : '',
      is_automatic: String(row.is_automatic).trim().toLowerCase() === 'כן' || row.is_automatic === true,
      primary_display_priority: Number(row.primary_display_priority) || 3,
      source_verified: true,
    };

    // Optional fields
    if (row.action_link) right.action_link = String(row.action_link).trim();
    if (row.dedup_group) right.dedup_group = String(row.dedup_group).trim();
    if (row.estimated_value) right.estimated_value = Number(row.estimated_value) || 0;
    if (row.eligibility_logic) {
      try {
        right.eligibility_logic = JSON.parse(row.eligibility_logic);
      } catch (e) {
        // Skip invalid JSON
      }
    }
    if (row.notes) right.notes = String(row.notes).trim();

    rights.push(right);
  }

  // Report errors
  if (errors.length > 0) {
    console.warn(`\n⚠️  ${errors.length} validation warnings:`);
    errors.forEach(e => console.warn(`  ${e}`));
  }

  // Generate output
  const output = {
    _meta: {
      name: 'ארנק זכויות — מאגר זכויות והטבות',
      version: '1.2.0',
      last_updated: new Date().toISOString().split('T')[0],
      record_count: rights.length,
      owner: 'אביעד יצחקי, מינהל גמלאות — ביטוח לאומי',
      generated_from: 'data/rights_master.xlsx',
      generated_at: new Date().toISOString(),
    },
    rights,
  };

  const outPath = path.join(DATA_DIR, 'rights_database_spec.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n✅ Generated ${outPath}`);
  console.log(`   ${rights.length} rights (${rights.filter(r => r.action_link).length} with links, ${rights.filter(r => r.dedup_group).length} with dedup groups)`);

  if (errors.length > 0) {
    process.exit(1); // Fail CI if there are validation errors
  }
}

main();
