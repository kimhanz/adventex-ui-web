import { CSSProperties } from "react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

function FilterSectionSkeleton({
  title,
  items,
  className,
}: {
  title: {
    width: number
    height?: 4 | 5 | 6 | 7
  }
  items: {
    count: number
    width: "full" | "3/4" | "2/3" | "1/2"
    height?: 4 | 5 | 6
  }
  className?: string
}) {
  return (
    <div
      className={cn("bg-background space-y-4 rounded-lg border p-4", className)}
    >
      <Skeleton
        style={
          { "--skeleton-width": `${title.width}px` } as React.CSSProperties
        }
        className={cn(
          "w-[var(--skeleton-width)]",
          title.height === 4 && "h-4",
          title.height === 5 && "h-5",
          title.height === 6 && "h-6",
          title.height === 7 && "h-7",
          !title.height && "h-5" // default height
        )}
      />
      <div className="space-y-3">
        {Array.from({ length: items.count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2"
          >
            <Skeleton className="h-4 w-4" /> {/* Checkbox skeleton */}
            <Skeleton
              style={
                {
                  "--item-width":
                    items.width === "full"
                      ? "100%"
                      : items.width === "3/4"
                        ? "75%"
                        : items.width === "2/3"
                          ? "66.666667%"
                          : "50%",
                } as CSSProperties
              }
              className={cn(
                "w-[var(--item-width)]",
                items.height === 4 && "h-4",
                items.height === 5 && "h-5",
                items.height === 6 && "h-6",
                !items.height && "h-4" // default height
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export { FilterSectionSkeleton }
