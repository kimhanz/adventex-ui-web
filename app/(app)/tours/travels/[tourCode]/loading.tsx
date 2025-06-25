import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      {/* Breadcrumb Skeleton */}
      <Skeleton className="mb-4 h-5 w-1/3" />

      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="flex items-end justify-between border-b pb-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-10 w-3/4" />
        </div>

        {/* Image Gallery Skeleton */}
        <div className="grid grid-cols-4 gap-2">
          <Skeleton className="col-span-2 h-[250px] w-full md:h-[400px]" />
          <div className="space-y-2">
            <Skeleton className="h-[121px] w-full md:h-[196px]" />
            <Skeleton className="h-[121px] w-full md:h-[196px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-[121px] w-full md:h-[196px]" />
            <Skeleton className="h-[121px] w-full md:h-[196px]" />
          </div>
        </div>

        {/* Tour Dates Skeleton (simplified) */}
        <Skeleton className="h-20 w-full" />

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column Skeleton (Details/Tabs) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Details Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-48" />
            </div>
            {/* Tabs Skeleton */}
            <div>
              <div className="flex gap-px">
                <Skeleton className="h-12 w-28" />
                <Skeleton className="h-12 w-28" />
                <Skeleton className="h-12 w-28" />
              </div>
              <Skeleton className="mt-4 h-40 w-full" />
            </div>
          </div>

          {/* Right Column Skeleton (Booking Widget) */}
          <div className="lg:col-span-1">
            <Skeleton className="sticky top-4 h-96 w-full" />
          </div>
        </div>

        {/* Recommended/Nearby Tours Skeleton */}
        <div className="space-y-6 py-6">
          <Skeleton className="h-8 w-1/2" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="space-y-2 rounded-lg border p-2"
              >
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
