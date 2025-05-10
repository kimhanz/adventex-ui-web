import { buttonVariants } from "@/components/ui/button"

import { TourViewSkeleton } from "./TourViewSkeleton"

function TourSectionSkeleton() {
  return (
    <div className="w-full space-y-4 md:w-3/4">
      <div className="flex flex-col items-start justify-between max-sm:items-center sm:items-center md:flex-row">
        <h1 className="text-2xl font-bold">
          ทัวร์จีน{" "}
          <span className="text-muted-foreground font-normal">(0 รายการ)</span>
        </h1>

        <div className="hidden items-center gap-2 md:flex">
          <div className="font-semibold">เรียงตาม:</div>
          <div
            className={buttonVariants({
              size: "sm",
              variant: "link",
              className: "cursor-pointer px-px!",
            })}
          >
            ทัวร์แนะนำ
          </div>
          <div
            className={buttonVariants({
              size: "sm",
              variant: "link",
              className: "cursor-pointer px-px!",
            })}
          >
            ช่วงเวลา
          </div>
          <div
            className={buttonVariants({
              size: "sm",
              variant: "link",
              className: "cursor-pointer px-px!",
            })}
          >
            ราคา
          </div>
        </div>
      </div>

      {Array.from({ length: 3 }, (_, i) => {
        return <TourViewSkeleton key={i} />
      })}
    </div>
  )
}

export { TourSectionSkeleton }
