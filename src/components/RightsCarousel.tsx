import { motion } from 'framer-motion';
import { RightWithScore } from '@/data/rightsDatabase';
import { RightThumbnail } from './RightThumbnail';

interface RightsCarouselProps {
  title: string;
  rights: RightWithScore[];
  onRightClick: (right: RightWithScore) => void;
  toggleBookmark?: (id: string) => void;
  isBookmarked?: (id: string) => boolean;
}

export function RightsCarousel({ title, rights, onRightClick, toggleBookmark, isBookmarked }: RightsCarouselProps) {
  if (rights.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">{rights.length} זכויות</span>
      </div>

      {/* Vertical grid — all cards visible, no horizontal scroll */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {rights.map((right, index) => (
          <motion.div
            key={right.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.25 }}
          >
            <RightThumbnail
              right={right}
              onClick={() => onRightClick(right)}
              toggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
