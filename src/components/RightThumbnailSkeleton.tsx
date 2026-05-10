import { Skeleton } from '@/components/ui/skeleton';

export function RightThumbnailSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden h-full flex flex-col">
      {/* Header with icon + badges */}
      <div className="p-3 flex items-start gap-2.5">
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex gap-1">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Title */}
      <div className="px-3 pb-2 flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-3/4" />
      </div>

      {/* Footer */}
      <div className="px-3 pb-3 pt-1 border-t border-border/50">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
