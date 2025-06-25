"use client"

import { useQueries, useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourTravelsFilters } from "@/modules/tours/travels/hooks/use-tour-travels-filters"

import { FilterCheckboxItem } from "../ui/FilterCheckboxItem"
import { FilterSection } from "../ui/FilterSection"

function DestinationFilter({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const trpc = useTRPC()
  // ดึง destination ทั้งหมดแบบ dynamic
  const { data: destinations = [] } = useQuery(
    trpc.toursTravels.getAllDestinations.queryOptions()
  )

  // ดึง count ของแต่ละ destination
  const destinationCounts = useQueries({
    queries: (destinations as string[]).map((destination) =>
      trpc.toursTravels.countByDestination.queryOptions({ destination })
    ),
  })

  // Only use URL state if not in form mode (onChange not provided)
  const [filters, setFilters] = useTourTravelsFilters()

  const setFilter = (newValue: string) => {
    setFilters({
      ...filters,
      destination: newValue,
    })
  }

  // Use provided value/onChange if in form mode, otherwise use URL state
  const currentValue = value !== undefined ? value : filters.destination || ""
  const selectedDestinations = currentValue.split(",").filter(Boolean)
  const handleChange = onChange || setFilter

  // Toggle a destination selection
  const toggleDestination = (destValue: string) => {
    // If already selected, remove it; otherwise add it
    const newSelection = selectedDestinations.includes(destValue)
      ? selectedDestinations.filter((u) => u !== destValue)
      : [...selectedDestinations, destValue]

    // Join back into comma-separated string
    const newValue = newSelection.join(",")
    handleChange(newValue)
  }

  return (
    <FilterSection title="เมืองท่องเที่ยว">
      {(destinations as string[]).map((destination, idx) => (
        <FilterCheckboxItem
          key={destination}
          id={`destination-${destination}`}
          label={destination}
          count={destinationCounts[idx]?.data?.count || 0}
          checked={selectedDestinations.includes(destination)}
          onCheckedChange={() => toggleDestination(destination)}
        />
      ))}
    </FilterSection>
  )
}

export { DestinationFilter }
