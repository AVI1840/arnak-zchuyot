import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RightWithScore } from '@/data/rightsDatabase';
import { RightThumbnail } from './RightThumbnail';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RightsCarouselProps {
  title: string;
  rights: RightWithScore[];
  onRightClick: (right: RightWithScore) => void;
}

export function RightsCarousel({ title, rights, onRightClick }: RightsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // RTL: scrollLeft is negative
      setCanScrollLeft(scrollLeft < 0);
      setCanScrollRight(Math.abs(scrollLeft) + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        scrollEl.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [rights]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      // RTL handling
      const amount = direction === 'left' ? scrollAmount : -scrollAmount;
      scrollRef.current.scrollBy({
        left: amount,
        behavior: 'smooth',
      });
    }
  };

  if (rights.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground ml-4">{rights.length} זכויות</span>
          {/* Desktop Navigation Arrows - Large and Visible */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              'hidden sm:flex w-10 h-10 rounded-full border-2 transition-all duration-300',
              'focus:ring-2 focus:ring-primary focus:ring-offset-2',
              canScrollRight 
                ? 'bg-card hover:bg-secondary hover:text-secondary-foreground hover:border-secondary border-border' 
                : 'opacity-40 cursor-not-allowed'
            )}
            aria-label="הבא"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              'hidden sm:flex w-10 h-10 rounded-full border-2 transition-all duration-300',
              'focus:ring-2 focus:ring-primary focus:ring-offset-2',
              canScrollLeft 
                ? 'bg-card hover:bg-secondary hover:text-secondary-foreground hover:border-secondary border-border' 
                : 'opacity-40 cursor-not-allowed'
            )}
            aria-label="הקודם"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Edge Fade Gradients */}
        <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden sm:block" />
        <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden sm:block" />

        {/* Scrollable Content - with peeking on mobile */}
        <div
          ref={scrollRef}
          className="carousel-container -mx-4 px-4 sm:px-8"
          onScroll={checkScrollability}
        >
          {rights.map((right, index) => (
            <motion.div
              key={right.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="carousel-item"
            >
              <RightThumbnail right={right} onClick={() => onRightClick(right)} />
            </motion.div>
          ))}
          {/* Peek indicator for mobile - shows 10% of next card */}
          <div className="w-8 flex-shrink-0 sm:hidden" aria-hidden="true" />
        </div>
      </div>
    </motion.section>
  );
}
