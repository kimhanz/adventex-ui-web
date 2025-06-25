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
          <div>
            <div className="w-full overflow-hidden rounded-md border border-gray-100 shadow-sm">
              <div className="space-y-4 p-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>

          {/* Form Skeleton */}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-32 w-full" />
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-40" />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
              <Skeleton className="h-10 w-full sm:w-32" />
              <Skeleton className="h-10 w-full sm:w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
