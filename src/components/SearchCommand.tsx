import { useState, useEffect, useCallback } from 'react';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { RIGHTS_DATABASE, DOMAIN_LABELS, RightWithScore, Domain } from '@/data/rightsDatabase';
import { Sparkles, FileText } from 'lucide-react';

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectRight: (right: RightWithScore) => void;
}

function normalizeHebrew(text: string): string {
  return text
    .replace(/[\u0591-\u05C7]/g, '') // remove niqqud
    .replace(/[־–—]/g, ' ')          // normalize dashes
    .toLowerCase()
    .trim();
}

export function SearchCommand({ open, onOpenChange, onSelectRight }: SearchCommandProps) {
  const [query, setQuery] = useState('');

  // Reset query when dialog opens
  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  // Keyboard shortcut: Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const filteredRights = useCallback(() => {
    if (!query.trim()) return RIGHTS_DATABASE.slice(0, 20);
    const normalized = normalizeHebrew(query);
    return RIGHTS_DATABASE.filter(right => {
      const searchable = normalizeHebrew(
        `${right.title} ${right.provider} ${right.eligibility_details} ${right.value_display}`
      );
      return searchable.includes(normalized);
    }).slice(0, 30);
  }, [query]);

  const results = filteredRights();

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="חיפוש זכויות..."
        value={query}
        onValueChange={setQuery}
        dir="rtl"
        className="text-right"
      />
      <CommandList dir="rtl">
        <CommandEmpty>לא נמצאו תוצאות</CommandEmpty>
        <CommandGroup heading={query ? `${results.length} תוצאות` : 'זכויות נפוצות'}>
          {results.map((right) => (
            <CommandItem
              key={right.id}
              value={right.title}
              onSelect={() => {
                onSelectRight(right as RightWithScore);
                onOpenChange(false);
              }}
              className="flex items-center gap-3 py-3 text-right cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{right.title}</p>
                <p className="text-xs text-muted-foreground truncate">{right.provider}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 domain-badge-${right.domain}`}>
                  {DOMAIN_LABELS[right.domain as Domain]}
                </Badge>
                {right.is_automatic && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-emerald-50 text-emerald-700 border-emerald-300 gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    אוטומטית
                  </Badge>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
