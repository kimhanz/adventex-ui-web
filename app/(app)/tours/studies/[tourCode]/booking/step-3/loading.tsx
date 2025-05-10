import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-4 sm:py-8">
      {/* Step Indicator Skeleton */}
      <div className="mx-auto max-w-3xl">
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="mt-6 sm:mt-8">
        {/* Title Skeleton */}
        <Skeleton className="mb-6 h-8 w-64 sm:mb-8" />

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {/* Price Summary Skeleton */}
          <div className="order-2 md:order-1">
            <div className="w-full overflow-hidden rounded-md border border-gray-100 shadow-sm">
              <div className="space-y-4 p-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>

          {/* Confirmation Message Skeleton */}
          <div className="order-1 space-y-4 text-center md:order-2">
            <Skeleton className="mx-auto h-10 w-3/4" />
            <Skeleton className="mx-auto h-6 w-2/3" />
            <Skeleton className="mx-auto h-6 w-1/2" />
            <div className="space-y-2 pt-4">
              <Skeleton className="mx-auto h-4 w-full max-w-md" />
              <Skeleton className="mx-auto h-4 w-full max-w-md" />
              <Skeleton className="mx-auto h-4 w-full max-w-md" />
            </div>
            <div className="mt-6 sm:mt-8">
              <Skeleton className="mx-auto h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
