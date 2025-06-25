import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="py-4 sm:py-8">
      {/* Step Indicator Skeleton */}
      <div className="mx-auto max-w-3xl">
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="mt-6 sm:mt-8">
        {/* Title Skeleton */}
        <Skeleton className="mb-6 h-8 w-64 sm:mb-8" />

        {/* Date Selection Skeleton */}
        <div className="mb-6 sm:mb-8">
          <Skeleton className="mb-2 h-5 w-24" />
          <Skeleton className="h-10 w-80" />
        </div>

        {/* Table Skeleton */}
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="min-w-[640px] space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>

            {/* Table Rows */}
            {[1, 2].map((i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4"
              >
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-4 flex flex-col items-start justify-between border-t py-3 sm:mt-6 sm:flex-row sm:items-center sm:py-4">
          <Skeleton className="mb-2 h-6 w-24 sm:mb-0" />
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Footer Section */}
        <div className="mt-4 flex items-end justify-between sm:mt-6">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}
