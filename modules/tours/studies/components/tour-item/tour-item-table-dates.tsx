"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function formatMonthName(dateStr: string): string {
  const date = new Date(dateStr)

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    timeZone: "Asia/Bangkok",
  }
  const formatter = new Intl.DateTimeFormat("th-TH", options)

  return formatter.format(date)
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    timeZone: "Asia/Bangkok",
  }
  const formatter = new Intl.DateTimeFormat("th-TH", options)

  const formattedStart = formatter.format(start)
  const formattedEnd = formatter.format(end)

  return `${formattedStart} - ${formattedEnd}`
}

function TourItemTableDates({
  departureDates,
}: {
  departureDates?:
    | {
        startDate: string
        endDate: string
        priceOptions?:
          | {
              type: string
              price: number
              id?: string | null
            }[]
          | null
        id?: string | null
      }[]
    | null
    | undefined
}) {
  const [showAllDates, setShowAllDates] = React.useState(false)

  if (!departureDates) return <div>ประกาศรับสมัคร 1 เดือนก่อนเดินทาง</div>

  const sortedDates = [...departureDates].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })

  return (
    <div className="pt-4">
      <div className="relative">
        <div
          className={cn(
            "overflow-hidden transition-all duration-150",
            !showAllDates ? "max-h-16" : "max-h-screen"
          )}
        >
          {sortedDates.map((data, monthIndex) => (
            <div
              key={monthIndex}
              className="border-b last:border-b-0"
            >
              <div className="flex items-center">
                <div className="text-background flex h-5 w-10 items-center justify-center rounded-sm bg-[#1877f2] p-3 text-xs">
                  <span>{formatMonthName(data.startDate)}</span>
                </div>

                <div className="grid grid-cols-5 gap-0 divide-x">
                  <div className="flex-1 p-3 text-center">
                    <div className="text-xs">
                      {formatDateRange(data.startDate, data.endDate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <div
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex h-auto cursor-pointer items-center p-0 text-red-500"
            )}
            onClick={() => setShowAllDates((prev) => !prev)}
          >
            <span>
              {showAllDates ? "ย้อนดูช่วงเวลา" : "แสดงช่วงเวลาทั้งหมด"}
            </span>
            <ChevronDown
              className={cn(
                "ml-1 size-4 transition-transform",
                showAllDates ? "rotate-180" : ""
              )}
            />
          </div>
        </div>

        {!showAllDates && (
          <div className="pointer-events-none absolute inset-0 z-10 h-16 bg-gradient-to-b from-transparent via-transparent to-white" />
        )}
      </div>
    </div>
  )
}

export { TourItemTableDates }
