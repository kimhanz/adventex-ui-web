import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <article>
      {/* Back button skeleton */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="pl-0"
          disabled
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </Button>
      </div>

      {/* Article Header skeleton */}
      <header className="mb-8">
        {/* Categories skeleton */}
        <div className="mb-4 flex flex-wrap gap-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-5 w-20 rounded-full"
            />
          ))}
        </div>

        {/* Title skeleton */}
        <Skeleton className="mb-6 h-12 w-3/4 md:h-14 lg:h-16" />

        {/* Meta info skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </header>

      {/* Featured Image skeleton */}
      <div className="mb-8">
        <Skeleton className="aspect-video w-full rounded-lg" />
      </div>

      {/* Content skeleton */}
      <div className="mb-12 space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="space-y-2"
          >
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ))}
      </div>

      {/* Gallery skeleton */}
      <div className="mb-12">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden border-none p-0 shadow-none"
            >
              <Skeleton className="aspect-square w-full" />
            </Card>
          ))}
        </div>
      </div>

      {/* Tags skeleton */}
      <div className="mb-8">
        <Skeleton className="mb-3 h-6 w-24" />
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-5 w-16 rounded-full"
            />
          ))}
        </div>
      </div>
    </article>
  )
}
