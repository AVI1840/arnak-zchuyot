import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RightWithScore, Domain, DOMAIN_LABELS, ELIGIBILITY_LEVEL_LABELS, EligibilityLevel } from '@/data/rightsDatabase';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Building2,
  Home, 
  Heart, 
  Bus, 
  Zap, 
  Wallet, 
  Users, 
  Briefcase, 
  Scale,
  X,
  Sparkles,
  FileText,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface RightDetailModalProps {
  right: RightWithScore | null;
  isOpen: boolean;
  onClose: () => void;
}

const DOMAIN_ICONS: Record<Domain, React.ReactNode> = {
  housing: <Home className="w-6 h-6" />,
  health: <Heart className="w-6 h-6" />,
  transport: <Bus className="w-6 h-6" />,
  utilities: <Zap className="w-6 h-6" />,
  financial: <Wallet className="w-6 h-6" />,
  welfare: <Users className="w-6 h-6" />,
  employment: <Briefcase className="w-6 h-6" />,
  legal: <Scale className="w-6 h-6" />,
};

const DOMAIN_COLORS: Record<Domain, string> = {
  housing: 'bg-[hsl(var(--domain-housing))]',
  health: 'bg-[hsl(var(--domain-health))]',
  transport: 'bg-[hsl(var(--domain-transport))]',
  utilities: 'bg-[hsl(var(--domain-utilities))]',
  financial: 'bg-[hsl(var(--domain-financial))]',
  welfare: 'bg-[hsl(var(--domain-welfare))]',
  employment: 'bg-[hsl(var(--domain-employment))]',
  legal: 'bg-[hsl(var(--domain-legal))]',
};

const ELIGIBILITY_COLORS: Record<EligibilityLevel, string> = {
  high: 'bg-emerald-500 text-white',
  medium: 'bg-amber-500 text-white',
  low: 'bg-muted text-muted-foreground',
};

export function RightDetailModal({ right, isOpen, onClose }: RightDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!right) return null;

  const handleCopy = async () => {
    // Copy all relevant fields as per requirements
    const copyText = `
📋 ${right.title}

🏢 ספק: ${right.provider}
💰 שווי: ${right.value_display}
📂 קטגוריה: ${DOMAIN_LABELS[right.domain]}
📊 סבירות: ${ELIGIBILITY_LEVEL_LABELS[right.eligibilityLevel]}
⚙️ סוג: ${right.is_automatic ? 'הטבה אוטומטית' : 'נדרשת הגשה'}

📝 תנאי זכאות:
${right.eligibility_details}

🔗 אופן קבלת ההטבה:
${right.how_to_apply}
${right.notes ? `\n💡 הערות:\n${right.notes}` : ''}
${right.action_link ? `\n🔗 קישור: ${right.action_link}` : ''}

---
המידע משוער בלבד - יש לאמת מול הגורם המוסמך.
`.trim();

    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    toast.success('כל פרטי ההטבה הועתקו ללוח!');
    setTimeout(() => setCopied(false), 2000);
  };

  const showLocalAuthorityWarning = right.requires_local_authority_check;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg glass border-border/50 p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="hero-gradient p-6 pb-12 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors focus:ring-2 focus:ring-primary-foreground/50 rounded-full p-1"
            aria-label="סגור"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center text-primary-foreground shadow-lg flex-shrink-0',
                DOMAIN_COLORS[right.domain]
              )}
            >
              {DOMAIN_ICONS[right.domain]}
            </div>
            <div>
              <Badge className="value-badge text-sm px-3 py-1 mb-2">
                {right.value_display}
              </Badge>
              <DialogTitle className="text-xl font-bold text-primary-foreground">
                {right.title}
              </DialogTitle>
              <p className="text-primary-foreground/80 flex items-center gap-1 mt-1">
                <Building2 className="w-4 h-4" />
                {right.provider}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 -mt-6 bg-card rounded-t-2xl relative">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {/* Eligibility Level (not 100% זכאי) */}
            <Badge className={cn(
              'text-sm px-3 py-1',
              ELIGIBILITY_COLORS[right.eligibilityLevel]
            )}>
              {ELIGIBILITY_LEVEL_LABELS[right.eligibilityLevel]}
            </Badge>
            
            {/* Automatic/Manual Badge */}
            <Badge 
              variant={right.is_automatic ? 'default' : 'outline'}
              className={cn(
                'text-sm gap-1',
                right.is_automatic 
                  ? 'bg-emerald-500/90 text-white border-none' 
                  : 'bg-card text-foreground border-border'
              )}
            >
              {right.is_automatic ? (
                <>
                  <Sparkles className="w-3 h-3" />
                  אוטומטית
                </>
              ) : (
                <>
                  <FileText className="w-3 h-3" />
                  נדרשת הגשה
                </>
              )}
            </Badge>
            
            <Badge
              variant="outline"
              className={cn('text-xs', `domain-badge-${right.domain}`)}
            >
              {DOMAIN_LABELS[right.domain]}
            </Badge>
          </div>

          {/* Local Authority Warning for Old Age Arnona */}
          {showLocalAuthorityWarning && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">תלוי רשות - בדוק ברשות המקומית</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  אחוזי ההנחה בארנונה לאזרחים ותיקים משתנים בין רשויות מקומיות. יש לפנות לרשות המקומית שלך לבירור הזכאות המדויקת.
                </p>
                <a 
                  href="https://www.gov.il/he/departments/local_authorities" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 mt-2 font-medium"
                >
                  <MapPin className="w-3 h-3" />
                  מצא את הרשות המקומית שלך
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Source Verification Warning */}
          {!right.source_verified && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-300">
                פרטי ההטבה אינם מאומתים רשמית - יש לאשר מול הגורם המטפל.
              </p>
            </div>
          )}

          {/* Details Section */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">פרטי זכאות</h4>
              <p className="text-muted-foreground">{right.eligibility_details}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">אופן קבלת ההטבה</h4>
              <p className="text-muted-foreground">{right.how_to_apply}</p>
            </div>

            {right.notes && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">💡 הערות חשובות</h4>
                <p className="text-sm text-muted-foreground">{right.notes}</p>
              </div>
            )}

            {/* Transport Providers List */}
            {right.transport_providers && right.transport_providers.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">🚌 ספקי תחבורה נתמכים</h4>
                <div className="flex flex-wrap gap-2">
                  {right.transport_providers.map((provider) => (
                    <Badge key={provider} variant="outline" className="text-xs">
                      {provider}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            {right.action_link && (
              <Button
                size="lg"
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
                asChild
              >
                <a href={right.action_link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  {right.is_automatic ? 'מידע נוסף' : 'מעבר למימוש'}
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              onClick={handleCopy}
              className="sm:w-auto"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 ml-2" />
                  הועתק
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 ml-2" />
                  העתק פרטים
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
