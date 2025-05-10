"use client"

import { Fragment } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { Skeleton } from "@/components/ui/skeleton"

import { useBooking } from "../../hooks/BookingContext"

// Helper function to format the date range using Intl
function formatDateRange(
  startDate?: string | null,
  endDate?: string | null
): string {
  const start = new Date(startDate || 0)
  const end = new Date(endDate || 0)

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
  const formatter = new Intl.DateTimeFormat("th-TH", options)

  const formattedStart = formatter.format(start)
  const formattedEnd = formatter.format(end)

  if (start.toDateString() === end.toDateString()) return formattedStart

  return `${formattedStart} - ${formattedEnd}`
}

// Helper function to format currency using Intl
function formatPrice(price: number | undefined): string {
  if (price === undefined) return "-"

  const formatter = new Intl.NumberFormat("th-TH", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `${formatter.format(price)} บาท`
}

interface PriceSummaryProps {
  isLoading?: boolean
}

function PriceSummary({ isLoading = false }: PriceSummaryProps) {
  const { bookingData } = useBooking()
  const trpc = useTRPC()
  const { data: tourData, isLoading: isTourLoading } = useQuery(
    trpc.toursStudies.get.queryOptions({ code: bookingData.tourCode || "" })
  )

  const selectedDeparture = tourData?.departureDates?.find(
    (date) => date.id === bookingData.departureId
  )

  const totalPrice =
    selectedDeparture?.priceOptions?.reduce((total, option) => {
      const quantity =
        bookingData.quantities?.find((q) => q.optionId === option.id)
          ?.quantity || 0
      return total + quantity * (option.price || 0)
    }, 0) || 0

  if (isLoading || isTourLoading) {
    return (
      <div className="w-full overflow-hidden rounded-md border border-neutral-100 shadow-sm">
        <div className="bg-red-500 p-3 text-white sm:p-4">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="space-y-3 p-4 sm:p-6">
          <div>
            <Skeleton className="mb-1 h-5 w-24" />
            <Skeleton className="h-5 w-40" />
          </div>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-4 gap-2 text-xs sm:gap-4 sm:text-sm">
              {[1, 2].map((i) => (
                <Fragment key={i}>
                  <div>
                    <Skeleton className="mb-1 h-4 w-12" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <div>
                    <Skeleton className="mb-1 h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="mb-1 ml-auto h-4 w-16" />
                    <Skeleton className="ml-auto h-4 w-20" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="mb-1 ml-auto h-4 w-16" />
                    <Skeleton className="ml-auto h-4 w-20" />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="mt-3 text-right">
            <Skeleton className="ml-auto h-8 w-32 sm:h-10" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-md border border-neutral-100 shadow-sm">
      <div className="flex items-start justify-between bg-[#1877f2] p-3 text-white sm:p-4">
        <div>
          <h3 className="mb-2 text-sm font-bold sm:text-base">
            ราคาสุทธิที่ต้องชำระ:
          </h3>
          <p className="text-sm sm:text-base">
            {formatDateRange(
              selectedDeparture?.startDate,
              selectedDeparture?.endDate
            )}
          </p>
        </div>

        <div className="mt-3 text-right text-base font-bold sm:mt-4 sm:text-xl md:text-2xl">
          {formatPrice(totalPrice)}
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-6">
        <h3 className="text-sm font-bold sm:text-base">รายละเอียด:</h3>

        <div className="grid grid-cols-4 gap-2 text-xs sm:gap-4 sm:text-sm">
          {bookingData.quantities?.map((qty) => {
            const option = selectedDeparture?.priceOptions?.find(
              (opt) => opt.id === qty.optionId
            )
            if (!option || qty.quantity === 0) return null

            const lineTotal = (option.price || 0) * qty.quantity

            return (
              <Fragment key={qty.optionId}>
                <div>
                  <div>จำนวน</div>
                  {qty.quantity}
                </div>
                <div>
                  <div>ประเภทห้องพัก</div>
                  {option.type}
                </div>
                <div className="text-right">
                  ราคาต่อคน
                  <div>{formatPrice(option.price ?? undefined)}</div>
                </div>
                <div className="text-right">
                  รวมราคา
                  <div>{formatPrice(lineTotal)}</div>
                </div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { PriceSummary }
