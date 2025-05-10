"use client"

import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourStudiesFilters } from "@/modules/tours/studies/hooks/use-tour-studies-filters"

import { FilterCheckboxItem } from "../ui/FilterCheckboxItem"
import { FilterSection } from "../ui/FilterSection"

function SeasonFilter({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const trpc = useTRPC()

  const { data: countSpring } = useQuery(
    trpc.toursStudies.countBySeason.queryOptions({ season: "spring" })
  )

  const { data: countSummer } = useQuery(
    trpc.toursStudies.countBySeason.queryOptions({ season: "summer" })
  )

  const { data: countAutumn } = useQuery(
    trpc.toursStudies.countBySeason.queryOptions({ season: "autumn" })
  )

  const { data: countWinter } = useQuery(
    trpc.toursStudies.countBySeason.queryOptions({ season: "winter" })
  )

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
      <FilterCheckboxItem
        id="spring"
        label="ฤดูใบไม้ผลิ"
        count={countSpring?.count || 0}
        checked={selectedSeasons.includes("spring")}
        onCheckedChange={() => toggleSeason("spring")}
      />
      <FilterCheckboxItem
        id="summer"
        label="ฤดูร้อน"
        count={countSummer?.count || 0}
        checked={selectedSeasons.includes("summer")}
        onCheckedChange={() => toggleSeason("summer")}
      />
      <FilterCheckboxItem
        id="autumn"
        label="ฤดูใบไม้ร่วง"
        count={countAutumn?.count || 0}
        checked={selectedSeasons.includes("autumn")}
        onCheckedChange={() => toggleSeason("autumn")}
      />
      <FilterCheckboxItem
        id="winter"
        label="ฤดูหนาว"
        count={countWinter?.count || 0}
        checked={selectedSeasons.includes("winter")}
        onCheckedChange={() => toggleSeason("winter")}
      />
    </FilterSection>
  )
}

export { SeasonFilter }
