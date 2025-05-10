import { Skeleton } from "@/components/ui/skeleton"

function TourViewSkeleton() {
  return (
    <div className="bg-background overflow-hidden rounded-md">
      <div className="p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative w-full md:w-1/3">
            <Skeleton className="h-[234px] w-full rounded-md" />
          </div>

          <div className="w-full md:w-2/3">
            <Skeleton className="h-7 w-2/3" />

            <div className="divide-border grid grid-cols-2 gap-4 divide-x py-4">
              <div className="text-center">
                <Skeleton className="mx-auto h-4 w-16" />
                <Skeleton className="mx-auto mt-2 h-4 w-20" />
              </div>

              <div className="text-center">
                <Skeleton className="mx-auto h-4 w-16" />
                <Skeleton className="mx-auto mt-2 h-4 w-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="relative">
            <div className="space-y-2">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <Skeleton className="h-8 w-10" />
                  <Skeleton className="h-8 flex-1" />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Skeleton className="h-8 w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted flex flex-col items-end justify-end px-2 py-4 md:flex-row">
        <div className="flex items-center gap-4 pt-4 md:pt-0">
          <div className="inline-flex items-end gap-x-2">
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}

export { TourViewSkeleton }
