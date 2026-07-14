const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'rights_database_delivery_v1.1.json'), 'utf8'));
const links = JSON.parse(fs.readFileSync(path.join(dataDir, 'links_corrected_2026-07-14.json'), 'utf8'));

// Update meta
data._meta.version = '1.2.0';
data._meta.last_updated = '2026-07-14';
data._meta.changes_from_v1_1 = 'תיקון 6 קישורים שבורים, הוספת action_link לכל הזכויות, הוספת dedup_group לקיבוץ כפילויות';

// Dedup group mapping
const DEDUP_GROUPS = [
  ['arnona_', 'הנחה בארנונה'],
  ['water_', 'הנחת מים'],
  ['electricity_', 'הנחת חשמל'],
  ['phone_', 'הנחת טלפון'],
  ['tax_purchase_', 'הנחה במס רכישה'],
  ['health_services_', 'פטור השתתפות עצמית'],
  ['housing_disability_96', 'סיוע בדיור'],
  ['housing_old_age_is', 'סיוע בדיור'],
  ['housing_survivors_is', 'סיוע בדיור'],
  ['housing_income_support', 'סיוע בדיור'],
  ['housing_alimony', 'סיוע בדיור'],
  ['housing_mobility', 'סיוע בדיור'],
  ['housing_special', 'סיוע בדיור'],
  ['transport_disability', 'הנחה בתחבורה'],
  ['transport_income_support', 'הנחה בתחבורה'],
  ['transport_old_age', 'פטור מתחבורה'],
  ['tax_exemption_', 'פטור ממס הכנסה'],
  ['nii_exempt_', 'פטור מדמי ביטוח לאומי'],
  ['foreign_worker_', 'העסקת עובד זר'],
];

for (const right of data.rights) {
  // Add action_link from corrected links
  if (links.valid_links[right.id]) {
    right.action_link = links.valid_links[right.id];
  }
  // Add dedup_group
  for (const [prefix, group] of DEDUP_GROUPS) {
    if (right.id.startsWith(prefix) || right.id === prefix) {
      right.dedup_group = group;
      break;
    }
  }
}

const outPath = path.join(dataDir, 'rights_database_delivery_v1.2.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');

console.log('Created v1.2:');
console.log('  Rights:', data.rights.length);
console.log('  With action_link:', data.rights.filter(r => r.action_link).length);
console.log('  With dedup_group:', data.rights.filter(r => r.dedup_group).length);
