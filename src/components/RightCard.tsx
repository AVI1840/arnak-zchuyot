import { motion } from 'framer-motion';
import { Right, Domain, DOMAIN_LABELS, RightWithScore } from '@/data/rightsDatabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Copy, Check, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

interface RightCardProps {
  right: Right & { grantingBenefit?: string };
  index: number;
}

const DOMAIN_ICONS: Record<Domain, string> = {
  housing: '🏠',
  health: '💊',
  transport: '🚌',
  utilities: '💡',
  financial: '💰',
  welfare: '🤝',
  employment: '💼',
  legal: '⚖️',
};

export function RightCard({ right, index }: RightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullText = [
      right.title,
      right.provider,
      right.eligibility_details,
      right.how_to_apply,
      right.notes,
    ].filter(Boolean).join('\n');
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    toast.success('הועתק ללוח!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className="card-hover overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={cn('text-xs font-normal', `domain-badge-${right.domain}`)}
                >
                  <span className="ml-1" role="img" aria-hidden="true">
                    {DOMAIN_ICONS[right.domain]}
                  </span>
                  {DOMAIN_LABELS[right.domain]}
                </Badge>
                <Badge variant="secondary" className="eligible-badge text-xs font-medium">
                  <Check className="w-3 h-3 ml-1" />
                  זכאי
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{right.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Building2 className="w-3 h-3" />
                {right.provider}
              </CardDescription>
              {right.grantingBenefit && (
                <p className="text-xs text-muted-foreground mt-1 font-medium">
                  מכוח: {right.grantingBenefit}
                </p>
              )}
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {right.value_display}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">{right.eligibility_details}</p>
          
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-border space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-1">אופן קבלת ההטבה:</h4>
                <p className="text-sm text-muted-foreground">{right.how_to_apply}</p>
              </div>
              {right.notes && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">הערות:</h4>
                  <p className="text-sm text-muted-foreground">{right.notes}</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 ml-1" />
                  פחות פרטים
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 ml-1" />
                  פרטים נוספים
                </>
              )}
            </Button>
            <div className="flex-1" />
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="w-4 h-4 ml-1" />
              ) : (
                <Copy className="w-4 h-4 ml-1" />
              )}
              {copied ? 'הועתק' : 'העתק'}
            </Button>
            {right.action_link && (
              <Button size="sm" asChild>
                <a
                  href={right.action_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 ml-1" />
                  למימוש
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
