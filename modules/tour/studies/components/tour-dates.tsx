"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ClockIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
    year: "numeric", // Use Gregorian year for simplicity
  }
  const formatter = new Intl.DateTimeFormat("th-TH", options)

  const formattedStart = formatter.format(start)
  const formattedEnd = formatter.format(end)

  // Check if start and end dates fall on the exact same day (ignoring time)
  if (start.toDateString() === end.toDateString()) return formattedStart

  return `${formattedStart} - ${formattedEnd}`
}

// Helper function to format currency using Intl
function formatPrice(price: number | undefined): string {
  if (price === undefined) return "-" // Or handle as needed

  // Option 1: Standard currency format (e.g., ฿14,900)
  // const formatter = new Intl.NumberFormat("th-TH", {
  //   style: "currency",
  //   currency: "THB",
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 0,
  // })

  // return formatter.format(price)

  // Option 2: Decimal format with manual suffix (e.g., 14,900 บาท)
  const formatter = new Intl.NumberFormat("th-TH", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `${formatter.format(price)} บาท`
}

function TourDates({
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
  const router = useRouter()

  const handleBook = (dateId: string | null | undefined) => {
    if (!dateId) return
    // Get the current URL path
    const path = window.location.pathname
    // Extract the tour code from the path
    const tourCode = path.split("/").pop()
    router.push(`/tours/studies/${tourCode}/booking?departureId=${dateId}`)
  }

  return (
    <div className="border border-r-0 border-l-0 py-4">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="py-4 text-left font-medium">
              เลือกวันที่เดินทางและกดจอง:
            </TableHead>
            <TableHead className="py-4 text-center font-medium">
              <div>ห้องพักคู่</div>
              <div className="text-muted-foreground text-sm">(ราคาต่อคน)</div>
            </TableHead>
            <TableHead className="py-4 text-center font-medium">
              <div>ห้องพักเดี่ยว</div>
              <div className="text-muted-foreground text-sm">(ราคาต่อคน)</div>
            </TableHead>
            <TableHead className="py-4 text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(departureDates || []).length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground py-4 text-center"
              >
                ไม่มีข้อมูลวันที่เดินทาง
              </TableCell>
            </TableRow>
          )}
          {(departureDates || []).map((item, index) => {
            // Explicitly find prices for double and single rooms
            const priceDouble = item.priceOptions?.find(
              (p) =>
                p.type?.toLowerCase().includes("double") ||
                p.type?.toLowerCase().includes("คู่")
            )?.price
            const priceSingle = item.priceOptions?.find(
              (p) =>
                p.type?.toLowerCase().includes("single") ||
                p.type?.toLowerCase().includes("เดี่ยว")
            )?.price

            return (
              <TableRow
                key={index}
                className="border-b"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                      <ClockIcon className="text-muted-foreground h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Use the updated helper function */}
                      {formatDateRange(item.startDate, item.endDate)}
                    </div>
                  </div>
                </TableCell>
                {/* Cell for Double Room Price */}
                <TableCell className="py-4 text-center">
                  {priceDouble ? formatPrice(priceDouble) : "ยังไม่มีให้บริการ"}
                </TableCell>
                {/* Cell for Single Room Price */}
                <TableCell className="py-4 text-center">
                  {priceSingle ? formatPrice(priceSingle) : "ยังไม่มีให้บริการ"}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <Button
                    variant="outline"
                    onClick={() => handleBook(item.id)}
                    className="bg-[#DC2626] hover:bg-red-700"
                  >
                    <p className="text-white">จอง</p>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export { TourDates }
