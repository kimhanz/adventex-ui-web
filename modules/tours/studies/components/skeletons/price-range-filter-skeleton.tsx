import { Skeleton } from "@/components/ui/skeleton"

function PriceRangeFilterSkeleton() {
  return (
    <div className="bg-background space-y-4 rounded-lg border p-4">
      <Skeleton className="h-5 w-24" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" /> {/* Slider skeleton */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" /> {/* Min price */}
          <Skeleton className="h-4 w-20" /> {/* Max price */}
        </div>
      </div>
    </div>
  )
}

export { PriceRangeFilterSkeleton }
