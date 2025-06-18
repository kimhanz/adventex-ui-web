import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function BlogFiltersSkeleton() {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4">
      <div className="flex flex-wrap gap-2">
        {/* Simulate 6 category badges */}
        {[...Array(6)].map((_, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-default"
          >
            <Skeleton className="h-4 w-16" />
          </Badge>
        ))}
      </div>
    </div>
  )
}
