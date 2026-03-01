import { Skeleton } from "@/components/ui/skeleton";

export function ChatListSkeleton() {
  return (
    <div className="w-96 h-full border-r border-border/50 flex flex-col bg-card/50">
      {/* Header Skeleton */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="h-9 w-9 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      {/* Chat Items Skeleton */}
      <div className="flex-1 overflow-hidden py-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-4 py-3.5 flex items-start gap-3.5">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatWindowSkeleton() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header Skeleton */}
      <div className="h-20 border-b border-border/50 flex items-center px-6 gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-64' : 'w-48'} rounded-lg`} />
          </div>
        ))}
      </div>

      {/* Input Skeleton */}
      <div className="border-t border-border/50 p-4 flex gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}
