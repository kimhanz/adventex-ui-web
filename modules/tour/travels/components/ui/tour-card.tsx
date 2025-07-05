import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { TourStudiesRecommended } from "../../types"

function TourCardImage({
  name,
  code,
  url,
  alt,
}: {
  name: string
  code: string
  url: string
  alt: string
}) {
  return (
    <div>
      <Link
        title={name}
        href={`/tours/studies/${code}`}
      >
        <Image
          src={url}
          width={400}
          height={200}
          alt={alt}
          className="h-auto w-full object-contain"
        />
      </Link>
    </div>
  )
}

function TourCardDetailsGrid({
  code,
  duration,
}: {
  code: string
  duration: string
}) {
  return (
    <div className="divide-border grid grid-cols-2">
      <div className="rounded-md border-none bg-gray-100 p-1 px-px text-center">
        <div className="text-muted-foreground text-xs">จำนวนวัน</div>
        <div className="text-xs font-bold">{duration}</div>
      </div>

      <div className="rounded-md border-none bg-gray-100 p-1 px-px text-center">
        <div className="text-muted-foreground text-xs">รหัสทัวร์</div>
        <div className="text-xs">{code}</div>
      </div>
    </div>
  )
}

function TourCardDates({
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
  if (!departureDates) {
    return (
      <div className="space-y-1">
        <div className="text-muted-foreground text-xs">No dates available</div>
      </div>
    )
  }

  const datesByMonth = departureDates.reduce(
    (acc, departure) => {
      const start = new Date(departure.startDate || "")
      const end = new Date(departure.endDate || "")

      const startMonth = start.toLocaleDateString("th-TH", { month: "short" })
      const startDay = start.toLocaleDateString("th-TH", { day: "numeric" })
      const endDay = end.toLocaleDateString("th-TH", { day: "numeric" })

      // Format the date string: show range if start/end dates differ
      let dateString = startDay
      // Check if dates are different (ignoring time part)
      if (start.toDateString() !== end.toDateString()) {
        // Optionally add end month if it differs? For simplicity, just days for now.
        // const endMonth = end.toLocaleDateString("th-TH", { month: "short" });
        // if (startMonth !== endMonth) { ... }
        dateString += `-${endDay}`
      }

      if (!acc[startMonth]) {
        acc[startMonth] = []
      }
      acc[startMonth].push({ rawStartDate: start, display: dateString })

      // Sort ranges within the month based on their start date
      acc[startMonth].sort(
        (a, b) => a.rawStartDate.getTime() - b.rawStartDate.getTime()
      )

      return acc
    },
    {} as Record<string, { rawStartDate: Date; display: string }[]>
  )

  const sortedMonths = Object.keys(datesByMonth)
    // Optional: Sort months chronologically if needed
    .sort((a, b) => {
      // A simple sort based on typical Thai month order might be needed
      // Or convert back to a date object based on the first entry to sort
      const monthAFirstDate = datesByMonth[a][0]?.rawStartDate
      const monthBFirstDate = datesByMonth[b][0]?.rawStartDate
      if (!monthAFirstDate || !monthBFirstDate) return 0 // Should not happen if arrays aren't empty
      return monthAFirstDate.getMonth() - monthBFirstDate.getMonth()
    })

  return (
    <div className="space-y-1">
      {sortedMonths.length > 0 ? (
        sortedMonths.map((month) => (
          <div
            key={month}
            className="flex items-start gap-1"
          >
            <div className="text-background mx-1 inline-block flex-shrink-0 border-none bg-[#1877f2] px-1.5 py-px text-xs">
              {month}
            </div>
            <div className="flex flex-wrap gap-x-1">
              {datesByMonth[month].map((dateInfo, dayIdx) => (
                <div
                  key={dayIdx}
                  className="text-muted-foreground text-xs"
                >
                  {dateInfo.display}
                  {dayIdx < datesByMonth[month].length - 1 ? (
                    <span className="ml-1">/</span>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-muted-foreground text-xs">No dates available</div>
      )}
    </div>
  )
}

function TourCardFooter({
  name,
  code,
  price,
}: {
  name: string
  code: string
  price: number
}) {
  return (
    <div className="bg-muted mt-auto flex items-center justify-between px-2 py-2.5">
      <div className="flex items-end gap-x-2">
        <div className="text-muted-foreground pb-1 text-sm">เริ่มต้นที่</div>
        <div className="text-2xl font-bold text-[#DC2626]">
          {price.toLocaleString()}
        </div>
      </div>

      <Button
        asChild
        className="text-background bg-linear-to-b from-red-500 to-red-700 bg-[length:100%_100%] bg-[bottom] inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all group-hover:bg-[length:100%_150%]"
      >
        <Link
          title={name}
          href={`/tours/studies/${code}`}
        >
          <span>ดูรายละเอียด</span>
          <ArrowRight className="transform transition-transform duration-150 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  )
}

function TourCard({ tour }: { tour: TourStudiesRecommended }) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-lg border">
      <TourCardImage
        name={tour.name}
        code={tour.code}
        url={tour.image.url || "/placeholder.svg"}
        alt={tour.image.alt || "Tour Image"}
      />

      <div className="min-h-37 space-y-3 p-2">
        <Link
          title={tour.name}
          href={`/tours/studies/${tour.code}`}
        >
          <h3 className="line-clamp-2 h-12 font-bold">{tour.name}</h3>
        </Link>

        <TourCardDetailsGrid
          duration={tour.duration || "N/A"}
          code={tour.code}
        />
        <TourCardDates departureDates={tour.departureDates} />
      </div>

      <TourCardFooter
        name={tour.name}
        code={tour.code}
        price={tour.basePrice || 0}
      />
    </div>
  )
}

export { TourCard }
