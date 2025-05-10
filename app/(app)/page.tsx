import * as React from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient, trpc } from "@/trpc/server"

import { FeaturedTour } from "@/modules/web/components/featured-tours"
import { GalleryShowcase } from "@/modules/web/components/gallery-showcase"
import { HeroCarousel } from "@/modules/web/components/hero-carousel"
import { SearchDestination } from "@/modules/web/components/search-destination"
import { Testimonials } from "@/modules/web/components/testimonials"

export default function Home() {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.tourStudies.listReccommended.queryOptions()
  )

  return (
    <>
      <HeroCarousel />
      <SearchDestination />

      <div className="space-y-16 py-16">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <FeaturedTour />
          </React.Suspense>
        </HydrationBoundary>

        <Testimonials />
        <GalleryShowcase />
      </div>
    </>
  )
}
