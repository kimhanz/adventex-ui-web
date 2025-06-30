import * as React from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import type { SearchParams } from "nuqs/server"
import { getQueryClient, trpc } from "@/trpc/server"

import { FilterPanel } from "@/modules/tours/studies/components/filters/FilterPanel"
import { TourSectionSkeleton } from "@/modules/tours/studies/components/skeletons/TourSectionSkeleton"
import { TourBreadcrumbHeader } from "@/modules/tours/studies/components/tour-breadcrumb-header"
// import { TourInformationHeader } from "@/modules/tours/studies/components/tour-information-header"
import { TourList } from "@/modules/tours/studies/components/tour-list"
import { TourListHeader } from "@/modules/tours/studies/components/tour-list/tour-list-header"
import { loadTourStudiesFilters } from "@/modules/tours/studies/hooks/search-params"

export default async function TourPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const filters = await loadTourStudiesFilters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.toursStudies.list.queryOptions({
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
