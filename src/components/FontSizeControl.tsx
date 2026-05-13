import { useState, useEffect } from 'react';
import { Plus, Minus, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FONT_SIZES = [14, 16, 18, 20];
const STORAGE_KEY = 'arnak-font-size';

export function FontSizeControl() {
  const [sizeIndex, setSizeIndex] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? parseInt(stored) : 1; // default 16px = index 1
    } catch { return 1; }
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${FONT_SIZES[sizeIndex]}px`;
    localStorage.setItem(STORAGE_KEY, String(sizeIndex));
  }, [sizeIndex]);

  const increase = () => setSizeIndex(prev => Math.min(prev + 1, FONT_SIZES.length - 1));
  const decrease = () => setSizeIndex(prev => Math.max(prev - 1, 0));

  return (
    <div className="flex items-center gap-1 bg-card border border-border rounded-full px-2 py-1 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={decrease}
        disabled={sizeIndex === 0}
        className="w-7 h-7 rounded-full"
        aria-label="הקטן טקסט"
      >
        <Minus className="w-3 h-3" />
      </Button>
      <Type className="w-4 h-4 text-muted-foreground" />
      <Button
        variant="ghost"
        size="icon"
        onClick={increase}
        disabled={sizeIndex === FONT_SIZES.length - 1}
        className="w-7 h-7 rounded-full"
        aria-label="הגדל טקסט"
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}
