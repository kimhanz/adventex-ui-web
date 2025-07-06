"use client"

import { useQueries } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourStudiesFilters } from "@/modules/tours/studies/hooks/use-tour-studies-filters"

import { FilterCheckboxItem } from "../ui/filter-checkbox-item"
import { FilterSection } from "../ui/filter-section"

// Define a type for month codes to ensure type safety
type MonthCode =
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec"

// Array ของ month codes
const monthCodes: MonthCode[] = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]
const monthLabels: Record<MonthCode, string> = {
  jan: "มกราคม",
  feb: "กุมภาพันธ์",
  mar: "มีนาคม",
  apr: "เมษายน",
  may: "พฤษภาคม",
  jun: "มิถุนายน",
  jul: "กรกฎาคม",
  aug: "สิงหาคม",
  sep: "กันยายน",
  oct: "ตุลาคม",
  nov: "พฤศจิกายน",
  dec: "ธันวาคม",
}

function MonthFilter({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const trpc = useTRPC()

  // ใช้ useQueries สำหรับทุกเดือน
  const monthCounts = useQueries({
    queries: monthCodes.map((monthCode) =>
      trpc.toursStudies.countByMonth.queryOptions({ monthCode })
    ),
  })

  // Only use URL state if not in form mode (onChange not provided)
  const [filters, setFilters] = useTourStudiesFilters()

  const setFilter = (newValue: string) => {
    setFilters({
      ...filters,
      month: newValue,
    })
  }

  // Use provided value/onChange if in form mode, otherwise use URL state
  const currentValue = value !== undefined ? value : filters.month || ""
  const selectedMonths = currentValue.split(",").filter(Boolean)
  const handleChange = onChange || setFilter

  // Toggle a month selection
  const toggleMonth = (monthCode: MonthCode) => {
    // If already selected, remove it; otherwise add it
    const newSelection = selectedMonths.includes(monthCode)
      ? selectedMonths.filter((m) => m !== monthCode)
      : [...selectedMonths, monthCode]

    // Join back into comma-separated string
    const newValue = newSelection.join(",")
    handleChange(newValue)
  }

  return (
    <FilterSection title="เดือน">
      <div className="grid gap-2">
        {monthCodes.map((monthCode, idx) => (
          <FilterCheckboxItem
            key={monthCode}
            id={monthCode}
            label={monthLabels[monthCode]}
            count={monthCounts[idx]?.data?.count || 0}
            checked={selectedMonths.includes(monthCode)}
            onCheckedChange={() => toggleMonth(monthCode)}
          />
        ))}
      </div>
    </FilterSection>
  )
}

export { MonthFilter }
