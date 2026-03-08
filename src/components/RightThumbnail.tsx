import { motion } from 'framer-motion';
import { RightWithScore, Domain, DOMAIN_LABELS, ELIGIBILITY_LEVEL_LABELS, EligibilityLevel } from '@/data/rightsDatabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Heart, 
  Bus, 
  Zap, 
  Wallet, 
  Users, 
  Briefcase, 
  Scale,
  Play,
  Sparkles,
  FileText,
  AlertTriangle
} from 'lucide-react';

interface RightThumbnailProps {
  right: RightWithScore;
  onClick: () => void;
}

const DOMAIN_ICONS: Record<Domain, React.ReactNode> = {
  housing: <Home className="w-10 h-10" />,
  health: <Heart className="w-10 h-10" />,
  transport: <Bus className="w-10 h-10" />,
  utilities: <Zap className="w-10 h-10" />,
  financial: <Wallet className="w-10 h-10" />,
  welfare: <Users className="w-10 h-10" />,
  employment: <Briefcase className="w-10 h-10" />,
  legal: <Scale className="w-10 h-10" />,
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

const DOMAIN_BG_COLORS: Record<Domain, string> = {
  housing: 'bg-[hsl(var(--domain-housing)/0.1)]',
  health: 'bg-[hsl(var(--domain-health)/0.1)]',
  transport: 'bg-[hsl(var(--domain-transport)/0.1)]',
  utilities: 'bg-[hsl(var(--domain-utilities)/0.1)]',
  financial: 'bg-[hsl(var(--domain-financial)/0.1)]',
  welfare: 'bg-[hsl(var(--domain-welfare)/0.1)]',
  employment: 'bg-[hsl(var(--domain-employment)/0.1)]',
  legal: 'bg-[hsl(var(--domain-legal)/0.1)]',
};

const ELIGIBILITY_COLORS: Record<EligibilityLevel, string> = {
  high: 'bg-emerald-500 text-white',
  medium: 'bg-amber-500 text-white',
  low: 'bg-muted text-muted-foreground',
};

export function RightThumbnail({ right, onClick }: RightThumbnailProps) {
  const isOldAgeArnona = right.id === 'arnona_old_age' && right.requires_local_authority_check;
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-[260px] sm:w-[280px] cursor-pointer group flex-shrink-0"
      onClick={onClick}
    >
      <div className="relative bg-card rounded-2xl border border-border shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-secondary/50">
        {/* Top Section - 16:9 Aspect Ratio Visual Area */}
        <div className={cn(
          'relative aspect-video flex items-center justify-center',
          DOMAIN_BG_COLORS[right.domain]
        )}>
          {/* 3D Style Icon with Colored Circle Background */}
          <motion.div
            className={cn(
              'w-20 h-20 rounded-3xl flex items-center justify-center text-primary-foreground shadow-xl',
              DOMAIN_COLORS[right.domain]
            )}
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {DOMAIN_ICONS[right.domain]}
          </motion.div>

          {/* Eligibility Level Badge - Top Right (replaces "100% זכאי") */}
          <div className="absolute top-3 right-3">
            <Badge className={cn(
              'text-xs px-3 py-1 rounded-full font-bold shadow-md',
              ELIGIBILITY_COLORS[right.eligibilityLevel]
            )}>
              {ELIGIBILITY_LEVEL_LABELS[right.eligibilityLevel]}
            </Badge>
          </div>

          {/* Automatic/Manual Badge - Top Left */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant={right.is_automatic ? 'default' : 'outline'}
              className={cn(
                'text-xs px-2 py-1 rounded-full shadow-md gap-1',
                right.is_automatic 
                  ? 'bg-emerald-500/90 text-white border-none' 
                  : 'bg-card/90 text-foreground border-border'
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
          </div>

          {/* Value Badge - Bottom Left */}
          <div className="absolute bottom-3 left-3">
            <Badge className="value-badge text-xs px-3 py-1.5 rounded-full shadow-md">
              {right.value_display}
            </Badge>
          </div>

          {/* Local Authority Warning for Old Age Arnona */}
          {isOldAgeArnona && (
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full shadow-md gap-1">
                <AlertTriangle className="w-3 h-3" />
                בדוק ברשות
              </Badge>
            </div>
          )}

          {/* Hover Overlay - Netflix Style */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
          >
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground font-bold rounded-full px-6 shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <Play className="w-5 h-5 ml-2 fill-current" />
              פרטים נוספים
            </Button>
          </motion.div>
        </div>

        {/* Bottom Section - Text Content */}
        <div className="p-4 space-y-2">
          {/* Domain & Provider Label */}
          <p className="text-xs text-muted-foreground">
            {DOMAIN_LABELS[right.domain]} • {right.provider}
          </p>

          {/* Title - Bold, Dark */}
          <h3 className="font-bold text-foreground text-lg leading-tight line-clamp-2 min-h-[3rem]">
            {right.title}
          </h3>

          {/* Source Verification Notice */}
          {!right.source_verified && (
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              פרטי ההטבה אינם מאומתים רשמית
            </p>
          )}

          {/* Subtle Divider */}
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {right.is_automatic ? 'הטבה אוטומטית' : 'נדרשת פנייה'}
              </span>
              <span className="text-xs font-medium text-secondary">לחץ לפרטים ←</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
