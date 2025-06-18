import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BlogListingSkeleton() {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <Card
          key={index}
          className="border-none p-0 shadow-none"
        >
          {/* Image skeleton */}
          <Skeleton className="aspect-video w-full rounded-t-lg" />

          <CardContent className="p-0 pt-2">
            {/* Date and author skeleton */}
            <div className="mb-3 flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Title skeleton */}
            <Skeleton className="mb-3 h-6 w-3/4" />

            {/* Excerpt skeleton */}
            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            {/* Categories skeleton */}
            <div className="flex flex-wrap gap-2">
              {[...Array(2)].map((_, catIndex) => (
                <Skeleton
                  key={catIndex}
                  className="h-5 w-16 rounded-full"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
