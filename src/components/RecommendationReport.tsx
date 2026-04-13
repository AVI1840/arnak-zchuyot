import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RightWithScore, Domain, DOMAIN_LABELS,
  BenefitType, BENEFIT_LABELS,
} from '@/data/rightsDatabase';
import { UserMetrics } from '@/types/userProfile';
import { Download, Share2, Copy, Check, FileText, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface RecommendationReportProps {
  rights: RightWithScore[];
  selectedBenefits: BenefitType[];
  userMetrics: UserMetrics;
  isRefined: boolean;
}

function buildReportText(
  rights: RightWithScore[],
  selectedBenefits: BenefitType[],
  userMetrics: UserMetrics,
  isRefined: boolean,
): string {
  const date = new Date().toLocaleDateString('he-IL');
  const lines: string[] = [];

  lines.push('══════════════════════════════════════');
  lines.push('   דוח המלצות זכויות אישי');
  lines.push('   ארנק זכויות — ביטוח לאומי');
  lines.push(`   תאריך הפקה: ${date}`);
  lines.push('══════════════════════════════════════');
  lines.push('');
  lines.push('⚠️ הבהרה חשובה:');
  lines.push('כלי זה נועד לסייע באיתור זכויות פוטנציאליות בלבד, ואינו מהווה');
  lines.push('אישור זכאות, התחייבות או חוות דעת מקצועית. המערכת נמצאת בשלבי');
  lines.push('פיילוט וייתכנו אי-דיוקים. מימוש הזכויות בפועל כפוף לתנאי');
  lines.push('הזכאות של כל גורם מוסמך (ביטוח לאומי, רשות מקומית, קופ"ח ועוד)');
  lines.push('ובאחריותם. יש לאמת כל הטבה ישירות מול הגורם הרלוונטי.');
  lines.push('');

  lines.push('📋 הקצבאות שנבחרו:');
  selectedBenefits.forEach(b => {
    lines.push(`  • ${BENEFIT_LABELS[b]}`);
  });
  lines.push('');

  if (isRefined) {
    lines.push('📊 פרטים שהוזנו:');
    if (userMetrics.medical_disability_pct > 0)
      lines.push(`  • נכות רפואית: ${userMetrics.medical_disability_pct}%`);
    if (userMetrics.incapacity_pct > 0)
      lines.push(`  • דרגת אי-כושר: ${userMetrics.incapacity_pct}%`);
    if (userMetrics.mobility_pct > 0)
      lines.push(`  • מוגבלות בניידות: ${userMetrics.mobility_pct}%`);
    if (userMetrics.nursing_level > 0)
      lines.push(`  • רמת סיעוד: ${userMetrics.nursing_level}`);
    if (userMetrics.special_services_rate > 0)
      lines.push(`  • שיעור שירותים מיוחדים: ${userMetrics.special_services_rate}%`);
    if (userMetrics.is_income_support)
      lines.push('  • מקבל/ת השלמת הכנסה');
    if (userMetrics.age > 0)
      lines.push(`  • גיל: ${userMetrics.age}+`);
    lines.push('');
  }

  lines.push(`📌 נמצאו ${rights.length} זכויות והטבות:`);
  lines.push('──────────────────────────────────────');
  lines.push('');

  // Group by domain
  const byDomain: Record<string, RightWithScore[]> = {};
  rights.forEach(r => {
    if (!byDomain[r.domain]) byDomain[r.domain] = [];
    byDomain[r.domain].push(r);
  });

  Object.entries(byDomain).forEach(([domain, domainRights]) => {
    lines.push(`📂 ${DOMAIN_LABELS[domain as Domain]} (${domainRights.length})`);
    lines.push('');
    domainRights.forEach((r, i) => {
      const autoTag = r.is_automatic ? '🟢 אוטומטית — אמורה להגיע אליך' : '🟡 נדרשת הגשה';
      lines.push(`  ${i + 1}. ${r.title}`);
      lines.push(`     ספק: ${r.provider}`);
      lines.push(`     ${autoTag}`);
      lines.push(`     תנאי זכאות: ${r.eligibility_details.replace(/\n/g, ' ')}`);
      lines.push(`     אופן מימוש: ${r.how_to_apply.replace(/\n/g, ' ')}`);
      if (r.requires_local_authority_check) {
        lines.push('     ⚠️ תלוי רשות מקומית — יש לבדוק ברשות שלך');
      }
      lines.push('');
    });
  });

  lines.push('──────────────────────────────────────');
  lines.push('');
  lines.push('💡 המלצות:');
  const autoRights = rights.filter(r => r.is_automatic);
  const manualRights = rights.filter(r => !r.is_automatic);
  if (autoRights.length > 0) {
    lines.push(`  ✅ ${autoRights.length} הטבות אוטומטיות — ודא שהן מגיעות אליך`);
  }
  if (manualRights.length > 0) {
    lines.push(`  📝 ${manualRights.length} הטבות שדורשות הגשה — מומלץ לפנות בהקדם`);
  }
  const localAuth = rights.filter(r => r.requires_local_authority_check);
  if (localAuth.length > 0) {
    lines.push(`  🏛️ ${localAuth.length} הטבות תלויות רשות מקומית — פנה לרשות שלך`);
  }
  lines.push('');
  lines.push('══════════════════════════════════════');
  lines.push('הופק על ידי ארנק זכויות — ביטוח לאומי');
  lines.push('');
  lines.push('⚠️ הבהרה: כלי זה נועד לסייע באיתור זכויות פוטנציאליות בלבד.');
  lines.push('המערכת בשלבי פיילוט — אינה מהווה התחייבות או אישור זכאות.');
  lines.push('מימוש ההטבות בפועל כפוף לתנאים של כל גורם מוסמך ובאחריותו.');
  lines.push('══════════════════════════════════════');

  return lines.join('\n');
}

export function RecommendationReport({ rights, selectedBenefits, userMetrics, isRefined }: RecommendationReportProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  if (rights.length === 0) return null;

  const reportText = buildReportText(rights, selectedBenefits, userMetrics, isRefined);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(reportText);
    setCopied(true);
    toast.success('הדוח הועתק ללוח!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob(['\uFEFF' + reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `דוח-זכויות-${new Date().toLocaleDateString('he-IL').replace(/\./g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('הדוח הורד בהצלחה!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'דוח זכויות אישי — ארנק זכויות',
          text: reportText,
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          onClick={() => setShowPreview(true)}
          variant="outline"
          className="gap-2 text-[#0368b0] border-[#0368b0]/30 hover:bg-[#e8f3ff]"
        >
          <FileText className="w-4 h-4" />
          צפה בדוח המלצה
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="gap-2 text-[#0368b0] border-[#0368b0]/30 hover:bg-[#e8f3ff]"
        >
          <Download className="w-4 h-4" />
          הורד דוח
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="gap-2 text-[#0368b0] border-[#0368b0]/30 hover:bg-[#e8f3ff]"
        >
          <Share2 className="w-4 h-4" />
          שתף
        </Button>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0368b0]" />
              דוח המלצות זכויות אישי
            </DialogTitle>
          </DialogHeader>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 space-y-1">
            <p className="font-medium">⚠️ הבהרה חשובה</p>
            <p>כלי זה נועד לסייע באיתור זכויות פוטנציאליות בלבד, ואינו מהווה אישור זכאות או התחייבות. המערכת נמצאת בשלבי פיילוט וייתכנו אי-דיוקים. מימוש ההטבות בפועל כפוף לתנאים של כל גורם מוסמך (ביטוח לאומי, רשות מקומית, קופ"ח ועוד) ובאחריותו.</p>
          </div>

          <div className="space-y-3 py-2">
            <div>
              <h4 className="font-bold text-sm mb-1">קצבאות שנבחרו:</h4>
              <div className="flex flex-wrap gap-1">
                {selectedBenefits.map(b => (
                  <Badge key={b} variant="outline" className="text-xs">{BENEFIT_LABELS[b]}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-1">סיכום:</h4>
              <p className="text-sm text-muted-foreground">
                נמצאו <span className="font-bold text-[#0368b0]">{rights.length}</span> זכויות,
                מתוכן <span className="font-bold text-emerald-600">{rights.filter(r => r.is_automatic).length}</span> אוטומטיות
                ו-<span className="font-bold text-amber-600">{rights.filter(r => !r.is_automatic).length}</span> שדורשות הגשה.
              </p>
            </div>

            <pre className="bg-muted/50 rounded-lg p-4 text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto max-h-[50vh] overflow-y-auto" dir="rtl">
              {reportText}
            </pre>
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <Button onClick={handleDownload} className="flex-1 bg-[#0368b0] hover:bg-[#025a8f] text-white gap-2">
              <Download className="w-4 h-4" />
              הורד קובץ
            </Button>
            <Button onClick={handleCopy} variant="outline" className="gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'הועתק' : 'העתק'}
            </Button>
            <Button onClick={handleShare} variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              שתף
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
