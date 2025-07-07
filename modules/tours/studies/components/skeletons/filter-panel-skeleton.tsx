import { Skeleton } from "@/components/ui/skeleton"

import { FilterSectionSkeleton } from "./filter-section-skeleton"
import { PriceRangeFilterSkeleton } from "./price-range-filter-skeleton"

function FilterPanelSkeleton() {
  return (
    <aside className="hidden w-full space-y-4 md:block md:w-72">
      {/* Header and clear button */}
      <div className="bg-background flex items-end justify-between rounded-lg border p-4">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-5 w-14" />
      </div>

      <PriceRangeFilterSkeleton />

      <FilterSectionSkeleton
        title={{ width: 20 }}
        items={{ count: 4, width: "3/4" }}
      />

      <FilterSectionSkeleton
        title={{ width: 24 }}
        items={{ count: 4, width: "3/4" }}
      />

      <FilterSectionSkeleton
        title={{ width: 20 }}
        items={{ count: 3, width: "2/3" }}
      />

      <FilterSectionSkeleton
        title={{ width: 20 }}
        items={{ count: 6, width: "1/2" }}
      />
    </aside>
  )
}

export { FilterPanelSkeleton }
