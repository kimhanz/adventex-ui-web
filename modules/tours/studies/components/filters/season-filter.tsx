"use client"

import { useQueries } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourStudiesFilters } from "@/modules/tours/studies/hooks/use-tour-studies-filters"

import { FilterCheckboxItem } from "../ui/filter-checkbox-item"
import { FilterSection } from "../ui/filter-section"

// Array ของ season codes
const seasonCodes = ["spring", "summer", "autumn", "winter"] as const
type SeasonCode = (typeof seasonCodes)[number]
const seasonLabels: Record<SeasonCode, string> = {
  spring: "ฤดูใบไม้ผลิ",
  summer: "ฤดูร้อน",
  autumn: "ฤดูใบไม้ร่วง",
  winter: "ฤดูหนาว",
}

function SeasonFilter({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const trpc = useTRPC()

  // ใช้ useQueries สำหรับทุกฤดู
  const seasonCounts = useQueries({
    queries: seasonCodes.map((season) =>
      trpc.toursStudies.countBySeason.queryOptions({ season })
    ),
  })

  // Only use URL state if not in form mode (onChange not provided)
  const [filters, setFilters] = useTourStudiesFilters()

  const setFilter = (newValue: string) => {
    setFilters({
      ...filters,
      season: newValue,
    })
  }

  // Use provided value/onChange if in form mode, otherwise use URL state
  const currentValue = value !== undefined ? value : filters.season || ""
  const selectedSeasons = currentValue.split(",").filter(Boolean)
  const handleChange = onChange || setFilter

  // Toggle a season selection
  const toggleSeason = (seasonValue: string) => {
    // If already selected, remove it; otherwise add it
    const newSelection = selectedSeasons.includes(seasonValue)
      ? selectedSeasons.filter((s) => s !== seasonValue)
      : [...selectedSeasons, seasonValue]

    // Join back into comma-separated string
    const newValue = newSelection.join(",")
    handleChange(newValue)
  }

  return (
    <FilterSection title="ฤดูกาล">
      {seasonCodes.map((season, idx) => (
        <FilterCheckboxItem
          key={season}
          id={season}
          label={seasonLabels[season]}
          count={seasonCounts[idx]?.data?.count || 0}
          checked={selectedSeasons.includes(season)}
          onCheckedChange={() => toggleSeason(season)}
        />
      ))}
    </FilterSection>
  )
}

export { SeasonFilter }
