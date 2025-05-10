"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourStudiesFilters } from "../../hooks/use-tour-studies-filters"
import { TourItem } from "../tour-item"

function TourList() {
  const [filters] = useTourStudiesFilters()

  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.toursStudies.list.queryOptions({
      ...filters,
    })
  )

  if (data.docs.length === 0) {
    return <div>ไม่พบรายการทัวร์ที่คุณค้นหา!</div>
  }

  return (
    <div className="space-y-4">
      {data.docs.map((tour) => {
        return (
          <TourItem
            key={tour.id}
            tour={tour}
          />
        )
      })}
    </div>
  )
}

export { TourList }
