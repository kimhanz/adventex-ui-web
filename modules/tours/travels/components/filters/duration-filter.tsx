"use client"

import { useQueries, useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourTravelsFilters } from "@/modules/tours/travels/hooks/use-tour-travels-filters"

import { FilterCheckboxItem } from "../ui/FilterCheckboxItem"
import { FilterSection } from "../ui/FilterSection"

function DurationFilter({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const trpc = useTRPC()
  // ดึง duration ทั้งหมดแบบ dynamic
  const { data: durations = [] } = useQuery(
    trpc.toursTravels.getAllDurations.queryOptions()
  )

  // ดึง count ของแต่ละ duration
  const durationCounts = useQueries({
    queries: durations.map((duration) =>
      trpc.toursTravels.countByDuration.queryOptions({
        duration,
      })
    ),
  })

  // Only use URL state if not in form mode (onChange not provided)
  const [filters, setFilters] = useTourTravelsFilters()

  const setFilter = (newValue: string) => {
    setFilters({
      ...filters,
      duration: newValue,
    })
  }

  // Use provided value/onChange if in form mode, otherwise use URL state
  const currentValue = value !== undefined ? value : filters.duration || ""
  const selectedDurations = currentValue.split(",").filter(Boolean)
  const handleChange = onChange || setFilter

  // Toggle a destination selection
  const toggleDuration = (duValue: string) => {
    // If already selected, remove it; otherwise add it
    const newSelection = selectedDurations.includes(duValue)
      ? selectedDurations.filter((u) => u !== duValue)
      : [...selectedDurations, duValue]

    // Join back into comma-separated string
    const newValue = newSelection.join(",")
    handleChange(newValue)
  }

  return (
    <FilterSection title="จำนวนวัน">
      {durations.map((duration, idx) => (
        <FilterCheckboxItem
          key={duration}
          id={`duration-${duration}`}
          label={duration}
          count={durationCounts[idx]?.data?.count || 0}
          checked={selectedDurations.includes(duration)}
          onCheckedChange={() => toggleDuration(duration)}
        />
      ))}
    </FilterSection>
  )
}

export { DurationFilter }
