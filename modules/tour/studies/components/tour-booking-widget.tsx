"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  MessageCircleIcon,
  MinusIcon,
  Phone,
  PhoneIcon,
  PlusIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Helper function to format the date range using Intl
function formatDateRange(
  startDate?: string | null,
  endDate?: string | null
): string {
  const start = new Date(startDate || "")
  const end = new Date(endDate || "")

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
  if (price === undefined || price === null || isNaN(price)) return "-"

  const formatter = new Intl.NumberFormat("th-TH", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `${formatter.format(price)} บาท`
}

function TourBookingWidget({
  departureDates,
  contactPhoneNumber = "084 105 7598",
  lineId = "@adventexeducation",
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
  contactPhoneNumber?: string
  lineId?: string
}) {
  const router = useRouter()
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0)
  const [adultCount, setAdultCount] = useState<number>(1) // Default to 1 adult
  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined)

  const selectedDeparture = departureDates?.[selectedDateIndex]

  // Recalculate total price when selection changes
  useEffect(() => {
    if (selectedDeparture) {
      // Find the double occupancy price for the selected date
      const priceDouble = selectedDeparture.priceOptions?.find(
        (p) =>
          p.type?.toLowerCase().includes("double") ||
          p.type?.toLowerCase().includes("คู่")
      )?.price

      // Simple calculation: total = adults * double_price.
      // Handle cases where priceDouble might be undefined.
      if (priceDouble !== undefined && adultCount > 0) {
        setTotalPrice(adultCount * (priceDouble || 0))
      } else {
        setTotalPrice(undefined) // Reset if price not found or adults are 0
      }
    } else {
      setTotalPrice(undefined) // Reset if no date selected
    }
  }, [selectedDateIndex, adultCount, selectedDeparture])

  const handleAdultChange = (increment: number) => {
    setAdultCount((prev) => Math.max(1, prev + increment)) // Ensure at least 1 adult
  }

  const handleBooking = () => {
    if (!selectedDeparture?.id) return
    // Get the current URL path
    const path = window.location.pathname
    // Extract the tour code from the path
    const tourCode = path.split("/").pop()
    router.push(
      `/tours/studies/${tourCode}/booking/step-2?departureId=${selectedDeparture.id}`
    )
  }

  return (
    <div className="sticky top-4 rounded-(--card-radius) bg-[#1877f2] p-(--card-padding) outline -outline-offset-1 outline-white/25 [--card-padding:--spacing(2)] [--card-radius:var(--radius-2xl)]">
      <div className="bg-background space-y-4 rounded-[calc(var(--card-radius)-var(--card-padding))] p-4">
        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="mr-3 rounded-md bg-[#DC2626] p-2">
              <PhoneIcon className="text-background h-6 w-6" />
            </div>
            <div>
              <div className="text-muted-foreground">ติดต่อเรา</div>
              <div className="text-xl font-bold text-[#DC2626]">
                {contactPhoneNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection Dropdown */}
        <Select
          value={selectedDateIndex.toString()}
          onValueChange={(value) => setSelectedDateIndex(parseInt(value, 10))}
          disabled={(departureDates || []).length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="เลือกวันที่เดินทาง" />
          </SelectTrigger>
          <SelectContent>
            {(departureDates || []).length > 0 ? (
              departureDates?.map((date, index) => (
                <SelectItem
                  key={index}
                  value={index.toString()}
                >
                  {formatDateRange(date.startDate, date.endDate)}
                </SelectItem>
              ))
            ) : (
              <SelectItem
                value="disabled"
                disabled
              >
                ไม่มีวันที่ว่าง
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {/* Occupancy Selection */}
        <div>
          {/* Adults */}
          <div className="rounded-md border px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">ผู้ใหญ่</span>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleAdultChange(-1)}
                  disabled={adultCount <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center font-bold">{adultCount}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleAdultChange(1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Total Price Display */}
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-xl font-bold">รวม</span>
          <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
        </div>

        {/* Booking Button */}
        <Button
          onClick={handleBooking}
          className="text-background w-full bg-linear-to-b from-red-500 to-red-700 bg-[length:100%_100%] bg-[bottom] py-6 text-xl inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all hover:bg-[length:100%_150%]"
        >
          จองโปรแกรมนี้
        </Button>
      </div>
    </div>
  )
}

export { TourBookingWidget }
