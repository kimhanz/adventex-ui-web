"use client"

import { useQueries } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourStudiesFilters } from "@/modules/tours/studies/hooks/use-tour-studies-filters"

import { FilterCheckboxItem } from "../ui/filter-checkbox-item"
import { FilterSection } from "../ui/filter-section"

// Array ของ university codes
const universityCodes = ["hit", "hrbnu"] as const
type UniversityCode = (typeof universityCodes)[number]
const universityLabels: Record<UniversityCode, string> = {
  hit: "HIT",
  hrbnu: "HRBNU",
}

function UniversityFilter({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const trpc = useTRPC()

  // ใช้ useQueries สำหรับทุกมหาวิทยาลัย
  const universityCounts = useQueries({
    queries: universityCodes.map((universityCode) =>
      trpc.toursStudies.countByUniversity.queryOptions({ universityCode })
    ),
  })

  // Only use URL state if not in form mode (onChange not provided)
  const [filters, setFilters] = useTourStudiesFilters()

  const setFilter = (newValue: string) => {
    setFilters({
      ...filters,
      university: newValue,
    })
  }

  // Use provided value/onChange if in form mode, otherwise use URL state
  const currentValue = value !== undefined ? value : filters.university || ""
  const selectedUniversities = currentValue.split(",").filter(Boolean)
  const handleChange = onChange || setFilter

  // Toggle a university selection
  const toggleUniversity = (uniValue: string) => {
    // If already selected, remove it; otherwise add it
    const newSelection = selectedUniversities.includes(uniValue)
      ? selectedUniversities.filter((u) => u !== uniValue)
      : [...selectedUniversities, uniValue]

    // Join back into comma-separated string
    const newValue = newSelection.join(",")
    handleChange(newValue)
  }

  return (
    <FilterSection title="มหาวิทยาลัย">
      {universityCodes.map((universityCode, idx) => (
        <FilterCheckboxItem
          key={universityCode}
          id={universityCode}
          label={universityLabels[universityCode]}
          count={universityCounts[idx]?.data?.count || 0}
          checked={selectedUniversities.includes(universityCode)}
          onCheckedChange={() => toggleUniversity(universityCode)}
        />
      ))}
    </FilterSection>
  )
}

export { UniversityFilter }
