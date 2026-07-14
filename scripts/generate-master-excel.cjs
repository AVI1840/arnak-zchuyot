/**
 * Generate the master Excel file from current JSON data
 * 
 * Usage: node scripts/generate-master-excel.cjs
 * Output: data/rights_master.xlsx
 * 
 * Requires: npm install xlsx
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const JSON_PATH = path.join(DATA_DIR, 'rights_database_delivery_v1.2.json');
const OUT_PATH = path.join(DATA_DIR, 'rights_master.xlsx');

function main() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error('v1.2 JSON not found. Run: node scripts/generate-v12.cjs first');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  
  // Convert to flat rows for Excel
  const rows = data.rights.map(r => ({
    id: r.id,
    title: r.title,
    provider: r.provider,
    domain: r.domain,
    applicable_benefits: r.applicable_benefits.join(', '),
    eligibility_text: r.eligibility_text || '',
    eligibility_logic: r.eligibility_logic ? JSON.stringify(r.eligibility_logic) : '',
    how_to_apply: r.how_to_apply || '',
    is_automatic: r.is_automatic ? 'כן' : 'לא',
    action_link: r.action_link || '',
    dedup_group: r.dedup_group || '',
    estimated_value: r.estimated_value || '',
    primary_display_priority: r.primary_display_priority || 3,
    status: 'active',
    last_reviewed: '2026-07-14',
    notes: '',
  }));

  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Main sheet
  const ws = XLSX.utils.json_to_sheet(rows);
  
  // Set column widths
  ws['!cols'] = [
    { wch: 30 },  // id
    { wch: 50 },  // title
    { wch: 25 },  // provider
    { wch: 12 },  // domain
    { wch: 40 },  // applicable_benefits
    { wch: 60 },  // eligibility_text
    { wch: 30 },  // eligibility_logic
    { wch: 60 },  // how_to_apply
    { wch: 10 },  // is_automatic
    { wch: 50 },  // action_link
    { wch: 20 },  // dedup_group
    { wch: 12 },  // estimated_value
    { wch: 10 },  // priority
    { wch: 10 },  // status
    { wch: 12 },  // last_reviewed
    { wch: 30 },  // notes
  ];
  
  XLSX.utils.book_append_sheet(wb, ws, 'זכויות');

  // Links sheet
  const linksRows = data.rights
    .filter(r => r.action_link)
    .map(r => ({
      id: r.id,
      action_link: r.action_link,
      status: 'valid',
      last_checked: '2026-07-14',
    }));
  const wsLinks = XLSX.utils.json_to_sheet(linksRows);
  XLSX.utils.book_append_sheet(wb, wsLinks, 'קישורים');

  // Changelog sheet
  const wsLog = XLSX.utils.json_to_sheet([
    { date: '2026-07-14', name: 'אביעד', action: 'יצירה', id: '*', details: 'יצירת קובץ מאסטר מ-v1.2' }
  ]);
  XLSX.utils.book_append_sheet(wb, wsLog, 'שינויים');

  // Write
  XLSX.writeFile(wb, OUT_PATH);
  console.log(`✅ Created ${OUT_PATH}`);
  console.log(`   ${rows.length} rights in main sheet`);
  console.log(`   ${linksRows.length} links in links sheet`);
}

main();
