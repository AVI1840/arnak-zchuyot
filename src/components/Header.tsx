import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CircleHelp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FeedbackModal } from '@/components/FeedbackModal';

export function Header() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1B3A5C, #2A5A8C)' }}
        className="text-white sticky top-0 z-50 shadow-md"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ארנק זכויות</h1>
                <p className="text-xs opacity-80">גלה את כל הזכויות שמגיעות לך</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFeedbackOpen(true)}
                className="gap-1 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/60"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">משוב פיילוט</span>
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="עזרה" className="text-white hover:bg-white/10">
                    <CircleHelp className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs text-right">
                  <p className="font-semibold mb-1">איך להשתמש?</p>
                  <p className="text-sm">
                    סמן את הקצבאות שאתה מקבל מהביטוח הלאומי, והמערכת תציג לך את כל
                    הזכויות וההטבות הנוספות שמגיעות לך.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </motion.header>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}
