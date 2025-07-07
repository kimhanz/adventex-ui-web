import * as React from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/app"
import { getQueryClient, trpc } from "@/trpc/server"

import { Skeleton } from "@/components/ui/skeleton"
import { TourBookingWidget } from "@/modules/tour/travels/components/tour-booking-widget"
import { TourBreadcrumb } from "@/modules/tour/travels/components/tour-breadcrumb"
import { TourDates } from "@/modules/tour/travels/components/tour-dates"
import { TourDetails } from "@/modules/tour/travels/components/tour-details"
import { TourHeader } from "@/modules/tour/travels/components/tour-header"
import { TourImageGallery } from "@/modules/tour/travels/components/tour-image-gallery"
import { ToursRecommended } from "@/modules/tour/travels/components/tour-recommended"
import { TourTabs } from "@/modules/tour/travels/components/tour-tabs"

export default async function TourCode(props: {
  params: Promise<{ tourCode: string }>
}) {
  const { tourCode } = await props.params

  const caller = appRouter.createCaller(createTRPCContext)
  const tour = await caller.tourTravels.get({
    code: tourCode,
  })

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.tourTravels.listReccommended.queryOptions()
  )

  const images: { url: string; alt: string }[] = []
  tour.gallery?.forEach((gal) => {
    const image: { url: string; alt: string } = {
      url: gal.image.url || "/placeholder.svg",
      alt: gal.image.alt || "",
    }
    images.push(image)
  })

  return (
    <div className="space-y-6">
      <TourBreadcrumb name={tour.name} />

      <TourHeader
        name={tour.name}
        code={tour.code}
      />

      <TourImageGallery
        images={[
          {
            url: tour.image.url || "/placeholder.svg",
            alt: tour.image.alt || "",
          },
          ...images,
        ]}
      />

      <TourDates departureDates={tour.departureDates} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <TourDetails highlights={tour.highlights} />
          <TourTabs brochure={tour.brochure} />
        </div>

        <div className="hidden lg:col-span-1 lg:block">
          <TourBookingWidget departureDates={tour.departureDates} />
        </div>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Suspense
          fallback={
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
          }
        >
          <ToursRecommended />
        </React.Suspense>
      </HydrationBoundary>
    </div>
  )
}
