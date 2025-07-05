"use client"

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Facebook } from "lucide-react"
import { useTRPC } from "@/trpc/client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { BookingBreadcrumb } from "@/modules/booking/components/ui/BookingBreadcrumb"
import { BookingInformation } from "@/modules/booking/components/ui/BookingInformation"
import { PriceSummary } from "@/modules/booking/components/ui/PriceSummary"
import { StepIndicator } from "@/modules/booking/components/ui/StepIndicator"
import { useBooking } from "@/modules/booking/hooks/BookingContext"

export default function Step3(props: {
  params: Promise<{ tourCode: string }>
}) {
  const { tourCode } = use(props.params)
  const router = useRouter()
  const { bookingData } = useBooking()

  const trpc = useTRPC()
  const { data, isLoading } = useQuery(
    trpc.toursStudies.get.queryOptions({ code: tourCode })
  )

  // Move redirection logic to useEffect
  useEffect(() => {
    if (!bookingData.departureId || !bookingData.quantities?.length) {
      router.push(`/tours/travels/${tourCode}/booking`)
    }
  }, [bookingData.departureId, bookingData.quantities, router, tourCode])

  // If we don't have booking data, render nothing while the redirect happens
  if (!bookingData.departureId || !bookingData.quantities?.length) {
    return null
  }

  const handleBack = () => {
    router.push(`/tours/travels/${tourCode}/booking/step-2`)
  }

  const handleShare = () => {
    // Implement Facebook sharing
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    )
  }

  if (isLoading) {
    return (
      <div className="container py-4 sm:py-8">
        {/* Step Indicator Skeleton */}
        <div className="mx-auto max-w-3xl">
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="mt-6 sm:mt-8">
          {/* Title Skeleton */}
          <Skeleton className="mb-6 h-8 w-64 sm:mb-8" />

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Price Summary Skeleton */}
            <div className="order-2 md:order-1">
              <div className="w-full overflow-hidden rounded-md border border-gray-100 shadow-sm">
                <div className="space-y-4 p-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </div>

            {/* Confirmation Message Skeleton */}
            <div className="order-1 space-y-4 text-center md:order-2">
              <Skeleton className="mx-auto h-10 w-3/4" />
              <Skeleton className="mx-auto h-6 w-2/3" />
              <Skeleton className="mx-auto h-6 w-1/2" />
              <div className="space-y-2 pt-4">
                <Skeleton className="mx-auto h-4 w-full max-w-md" />
                <Skeleton className="mx-auto h-4 w-full max-w-md" />
                <Skeleton className="mx-auto h-4 w-full max-w-md" />
              </div>
              <div className="mt-6 sm:mt-8">
                <Skeleton className="mx-auto h-10 w-32" />
              </div>
            </div>
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
        <StepIndicator currentStep={3} />

        <div className="mt-6 sm:mt-8">
          <h1 className="text-start text-xl font-bold text-[#DC2626] sm:mb-3 sm:text-2xl">
            ขั้นตอนที่ 3
          </h1>
          <h1 className="sm:text-1xl mb-6 text-start text-xl font-semibold sm:mb-8">
            ส่งคำสั่งจองทัวร์
          </h1>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <div>
              <PriceSummary />
            </div>

            <div className="text-center">
              <div className="mb-6 sm:mb-8">
                <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-xl md:text-2xl">
                  ขอบคุณที่ไว้วางใจ ใช้บริการทัวร์กับ Adventex
                </h2>
                <p className="text-sm sm:text-base md:text-lg">
                  เจ้าหน้าที่กำลังดำเนินการ
                  จะรีบแจ้งให้ทราบหลังดำเนินการเสร็จสิ้น
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <Button
                onClick={handleBack}
                variant="outline"
                className="rounded-md bg-[#DC2626] px-4 py-2 text-white hover:bg-[#DC2626]/80 hover:text-white/80 sm:px-6"
              >
                ย้อนกลับ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
