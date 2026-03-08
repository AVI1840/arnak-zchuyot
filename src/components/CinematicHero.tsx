import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Plus, Sparkles, TrendingUp } from 'lucide-react';

interface CinematicHeroProps {
  totalSavings: string;
  topRight: { title: string; value: string } | null;
  hasResults: boolean;
  onStartClaiming: () => void;
  userName?: string;
}

export function CinematicHero({
  totalSavings,
  topRight,
  hasResults,
  onStartClaiming,
  userName = 'אורח',
}: CinematicHeroProps) {
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'בוקר טוב';
    if (hour < 17) return 'צהריים טובים';
    if (hour < 21) return 'ערב טוב';
    return 'לילה טוב';
  };

  return (
    <section className="relative min-h-[45vh] rounded-3xl overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated Mesh Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="white" opacity="0.3" />
              <circle cx="0" cy="0" r="1" fill="white" opacity="0.2" />
              <circle cx="60" cy="60" r="1" fill="white" opacity="0.2" />
            </pattern>
            <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.1" />
              <stop offset="50%" stopColor="white" stopOpacity="0.05" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          <rect width="100%" height="100%" fill="url(#fade-gradient)" />
        </svg>
      </div>

      {/* Floating Geometric Shapes */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-32 h-32 rounded-full bg-secondary/20 blur-2xl"
      />
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/30 blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-value/20 blur-2xl"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full min-h-[45vh] p-8 sm:p-12 lg:p-16">
        {hasResults ? (
          <div className="max-w-2xl space-y-6">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-primary-foreground/80"
            >
              {getGreeting()}, {userName}
            </motion.p>

            {/* Main Headline - Updated per spec */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
                מיצוי זכויות
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-semibold text-primary-foreground/90">
                סיוע בהכוונה ובמיצוי הזכויות הרלוונטיות
              </p>
            </motion.div>

            {/* Subtitle description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-primary-foreground/80 max-w-lg"
            >
              נלווה אותך בתהליך זיהוי הזכויות וקבלת המידע למיצוי הזכויות.
              <span className="block text-sm mt-1 text-primary-foreground/60">
                סכומים וחישובים הם משוערים בלבד ויש לאמת מול הגורם המוסמך.
              </span>
            </motion.p>

            {/* Removed: Estimated Savings - per requirements, no unreliable savings display */}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={onStartClaiming}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-lg font-bold shadow-2xl"
                aria-label="התחל בבדיקת זכויות"
              >
                <Play className="w-5 h-5 ml-2 fill-current" />
                התחל לבדיקה
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 py-6 text-lg font-medium"
              >
                <Plus className="w-5 h-5 ml-2" />
                הוסף לרשימה
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-2xl space-y-6">
            {/* Welcome Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-primary-foreground/80"
            >
              {getGreeting()}, {userName}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight"
            >
              מיצוי זכויות
              <br />
              <span className="text-value">סיוע בהכוונה ובמיצוי</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-primary-foreground/80 max-w-lg"
            >
              סמן את הקצבאות שאתה מקבל וגלה את הזכויות הנוספות הרלוונטיות עבורך.
              <span className="block text-sm mt-1 text-primary-foreground/60">
                סכומים וחישובים הם משוערים בלבד ויש לאמת מול הגורם המוסמך.
              </span>
            </motion.p>

            {/* Quick Stats - removed guaranteed amounts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6 pt-2"
            >
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Sparkles className="w-5 h-5 text-value" />
                <span className="font-medium">100+ זכויות במאגר</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <Button
                size="lg"
                onClick={onStartClaiming}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-10 py-6 text-lg font-bold shadow-2xl"
                aria-label="התחל בבדיקת זכויות"
              >
                <Play className="w-5 h-5 ml-2 fill-current" />
                התחל לבדיקה
              </Button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
