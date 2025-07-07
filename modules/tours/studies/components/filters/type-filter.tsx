"use client"

import { useQueries } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourStudiesFilters } from "@/modules/tours/studies/hooks/use-tour-studies-filters"

import { FilterCheckboxItem } from "../ui/filter-checkbox-item"
import { FilterSection } from "../ui/filter-section"

// Array ของ type codes
const typeCodes = ["short", "long"] as const
type TypeCode = (typeof typeCodes)[number]
const typeLabels: Record<TypeCode, string> = {
  short: "ทัวร์ระยะสั้น",
  long: "ทัวร์ระยะยาว",
}

function TypeFilter({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const trpc = useTRPC()

  // ใช้ useQueries สำหรับทุกประเภท
  const typeCounts = useQueries({
    queries: typeCodes.map((type) =>
      trpc.toursStudies.countByType.queryOptions({ type })
    ),
  })

  // Only use URL state if not in form mode (onChange not provided)
  const [filters, setFilters] = useTourStudiesFilters()

  const setFilter = (newValue: string) => {
    setFilters({
      ...filters,
      type: newValue,
    })
  }

  // Use provided value/onChange if in form mode, otherwise use URL state
  const currentValue = value !== undefined ? value : filters.type || ""
  const selectedTypes = currentValue.split(",").filter(Boolean)
  const handleChange = onChange || setFilter

  // Toggle a type selection
  const toggleType = (typeValue: string) => {
    // If already selected, remove it; otherwise add it
    const newSelection = selectedTypes.includes(typeValue)
      ? selectedTypes.filter((t) => t !== typeValue)
      : [...selectedTypes, typeValue]

    // Join back into comma-separated string
    const newValue = newSelection.join(",")
    handleChange(newValue)
  }

  return (
    <FilterSection title="ประเภททัวร์">
      {typeCodes.map((type, idx) => (
        <FilterCheckboxItem
          key={type}
          id={type}
          label={typeLabels[type]}
          count={typeCounts[idx]?.data?.count || 0}
          checked={selectedTypes.includes(type)}
          onCheckedChange={() => toggleType(type)}
        />
      ))}
    </FilterSection>
  )
}

export { TypeFilter }
