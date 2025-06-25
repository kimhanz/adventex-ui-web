import * as React from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import type { SearchParams } from "nuqs/server"
import { getQueryClient, trpc } from "@/trpc/server"

import { TourBreadcrumbHeader } from "@/modules/tours/studies/components/tour-breadcrumb-header"
import { TourListHeader } from "@/modules/tours/studies/components/tour-list/tour-list-header"
import { FilterPanel } from "@/modules/tours/travels/components/filters/FilterPanel"
import { TourList } from "@/modules/tours/travels/components/tour-list"
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
      <header className="hidden w-full space-y-4 md:block">
        <TourBreadcrumbHeader />
        {/* <TourInformationHeader /> */}
      </header>

      <div className="relative flex flex-col gap-6 md:flex-row">
        <FilterPanel />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <React.Suspense>
            <div className="min-h-svh w-full space-y-4 md:w-3/4">
              <TourListHeader />
              <TourList />
            </div>
          </React.Suspense>
        </HydrationBoundary>
      </div>
    </>
  )
}
