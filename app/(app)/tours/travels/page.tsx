import * as React from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import type { SearchParams } from "nuqs/server"
import { getQueryClient, trpc } from "@/trpc/server"

import { TourSectionSkeleton } from "@/modules/tours/studies/components/skeletons/tour-section-skeleton"
import { TourBreadcrumbHeader } from "@/modules/tours/studies/components/tour-breadcrumb-header"
import { FilterPanel } from "@/modules/tours/travels/components/filters/filter-panel"
import { TourList } from "@/modules/tours/travels/components/tour-list"
import { TourListHeader } from "@/modules/tours/travels/components/tour-list/tour-list-header"
import { loadTourTravelsFilters } from "@/modules/tours/travels/hooks/search-params"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const filters = await loadTourTravelsFilters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.toursTravels.list.queryOptions({
      ...filters,
    })
  )

  return (
    <>
      <header className="hidden w-full space-y-4 px-4 py-4 md:block">
        <TourBreadcrumbHeader />
        {/* <TourInformationHeader /> */}
      </header>

      <div className="relative isolate flex flex-col gap-6 md:flex-row">
        <FilterPanel />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <React.Suspense fallback={<TourSectionSkeleton />}>
            <div className="w-full space-y-4 md:w-3/4">
              <TourListHeader />
              <TourList />
            </div>
          </React.Suspense>
        </HydrationBoundary>
      </div>
    </>
  )
}
