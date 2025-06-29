"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ArrowRight } from "lucide-react"
import { useQueryState } from "nuqs"
import { useTRPC } from "@/trpc/client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BookingBreadcrumb } from "@/modules/booking/components/ui/BookingBreadcrumb"
import { BookingInformation } from "@/modules/booking/components/ui/BookingInformation"
import { StepIndicator } from "@/modules/booking/components/ui/StepIndicator"
import { useBooking } from "@/modules/booking/hooks/BookingContext"

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

  const formatter = new Intl.NumberFormat("th-TH", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `${formatter.format(price)} บาท`
}

export default function Step1(props: {
  params: Promise<{ tourCode: string }>
}) {
  const { tourCode } = use(props.params)
  const [departureId, setDepartureId] = useQueryState("departureId")
  const router = useRouter()
  const { bookingData, updateBookingData } = useBooking()

  // Initialize quantities from booking data if available
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    if (bookingData.quantities?.length) {
      return bookingData.quantities.reduce(
        (acc, item) => ({
          ...acc,
          [item.optionId]: item.quantity,
        }),
        {}
      )
    }
    return {}
  })

  const trpc = useTRPC()
  const { data, isLoading } = useQuery(
    trpc.toursStudies.get.queryOptions({ code: tourCode })
  )

  // Use departureId from query params if available, otherwise from bookingData
  const [selectedDateId, setSelectedDateId] = useState<string>(
    departureId || bookingData.departureId || ""
  )

  // When departureId changes in URL, update selectedDateId
  useEffect(() => {
    if (departureId) {
      setSelectedDateId(departureId)
      setQuantities({}) // Only reset quantities if coming from URL param
    }
  }, [departureId])

  const selectedDeparture = data?.departureDates?.find(
    (date) => date.id === selectedDateId
  )

  // Calculate totals
  const totalPeople = Object.values(quantities).reduce((a, b) => a + b, 0)
  const totalPrice =
    selectedDeparture?.priceOptions?.reduce((total, option) => {
      const quantity = quantities[option.id ?? ""] || 0
      return total + quantity * (option.price || 0)
    }, 0) || 0

  const handleQuantityChange = (optionId: string, value: string) => {
    setQuantities((prev) => ({
      ...prev,
      [optionId]: parseInt(value),
    }))
  }

  const handleContinue = () => {
    if (!selectedDateId || totalPeople === 0) return

    const selectedQuantities = Object.entries(quantities)
      .map(([optionId, quantity]) => ({
        optionId,
        quantity,
      }))
      .filter((q) => q.quantity > 0)

    updateBookingData({
      tourCode,
      departureId: selectedDateId,
      quantities: selectedQuantities,
    })

    router.push(`/tours/travels/${tourCode}/booking/step-2`)
  }

  if (isLoading) {
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

  return (
    <>
      <header>
        <BookingBreadcrumb name={data?.name || "N/A"} />
        <BookingInformation
          name={data?.name || "N/A"}
          code={data?.code || "N/A"}
          image={data?.image}
        />
      </header>

      <div className="py-4 sm:py-8">
        <StepIndicator currentStep={1} />

        <div className="mt-6 flex h-full w-full flex-col sm:mt-8">
          <h1 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl">
            ขั้นตอนที่ 1: ระบุวันที่และจำนวนผู้เดินทาง
          </h1>

          <div className="mb-6 sm:mb-8">
            <label className="mb-2 block text-sm sm:text-base">
              เลือกวันที่:
            </label>
            <div className="relative">
              <Select
                value={selectedDateId}
                onValueChange={(value) => {
                  setDepartureId(value)
                  setSelectedDateId(value)
                  setQuantities({}) // Reset quantities when date changes
                }}
              >
                <SelectTrigger className="w-full sm:w-80">
                  <SelectValue placeholder="เลือกวันที่" />
                </SelectTrigger>
                <SelectContent>
                  {data?.departureDates?.map((date) => (
                    <SelectItem
                      key={date.id}
                      value={date.id || ""}
                    >
                      {formatDateRange(date.startDate, date.endDate)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow className="bg-neutral-100">
                  <TableHead className="w-[100px] py-3 text-left text-xs sm:text-sm">
                    จำนวน
                  </TableHead>
                  <TableHead className="py-3 text-left text-xs sm:text-sm">
                    ประเภทห้องพัก
                  </TableHead>
                  <TableHead className="py-3 text-right text-xs sm:text-sm">
                    ราคาต่อคน
                  </TableHead>
                  <TableHead className="py-3 text-right text-xs sm:text-sm">
                    รวมราคา
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDeparture?.priceOptions?.map((option) => {
                  const quantity = quantities[option.id || ""] || 0
                  const totalOptionPrice = quantity * (option.price || 0)

                  return (
                    <TableRow key={option.id}>
                      <TableCell className="py-2 sm:py-3">
                        <Select
                          value={quantity.toString()}
                          onValueChange={(value) =>
                            handleQuantityChange(option.id || "", value)
                          }
                        >
                          <SelectTrigger className="w-16 sm:w-20">
                            <SelectValue placeholder="0" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <SelectItem
                                key={num}
                                value={num.toString()}
                              >
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="py-2 text-xs sm:py-3 sm:text-sm">
                        {option.type}
                      </TableCell>
                      <TableCell className="py-2 text-right text-xs sm:py-3 sm:text-sm">
                        {formatPrice(option.price ?? undefined)}
                      </TableCell>
                      <TableCell className="py-2 text-right text-xs sm:py-3 sm:text-sm">
                        {formatPrice(totalOptionPrice)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex flex-col items-start justify-between border-t py-3 sm:mt-6 sm:flex-row sm:items-center sm:py-4">
            <div className="mb-2 text-sm sm:mb-0 sm:text-lg">
              {totalPeople} คน
            </div>
            <div className="text-lg font-bold sm:text-xl">
              {formatPrice(totalPrice)}
            </div>
          </div>

          <div className="mt-4 flex flex-col items-end justify-between text-xs text-neutral-600 sm:mt-6 sm:flex-row sm:text-sm">
            <p>
              สอบถามเกี่ยวกับการจองทัวร์ โทร.{" "}
              <span className="text-[#1877f2]">0841057598</span>
            </p>

            <Button
              onClick={handleContinue}
              disabled={!selectedDateId || totalPeople === 0}
              className="group flex w-full items-center justify-center rounded-md bg-red-500 px-4 text-white hover:bg-red-600 sm:w-auto sm:px-6"
            >
              <span>หน้าถัดไป</span>
              <ArrowRight className="-mt-0.5 transition-transform duration-150 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
