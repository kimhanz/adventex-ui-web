"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { Luggage } from "lucide-react"
import { useTRPC } from "@/trpc/client"

import { TourCard } from "./ui/tour-card"

function ToursRecommended() {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.tourTravels.listReccommended.queryOptions()
  )

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center gap-3">
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
          <Luggage className="size-6" />
        </div>
        <h2 className="text-2xl font-bold">โปรแกรมทัวร์ใกล้เคียง</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.docs.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
          />
        ))}
      </div>
    </div>
  )
}

export { ToursRecommended }
