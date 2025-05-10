"use client"

import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { useTourStudiesFilters } from "@/modules/tours/studies/hooks/use-tour-studies-filters"

import { FilterCheckboxItem } from "../ui/FilterCheckboxItem"
import { FilterSection } from "../ui/FilterSection"

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

function MonthFilter({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const trpc = useTRPC()
  const { data: countJan } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "jan" })
  )

  const { data: countFeb } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "feb" })
  )

  const { data: countMar } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "mar" })
  )

  const { data: countApr } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "apr" })
  )

  const { data: countMay } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "may" })
  )

  const { data: countJun } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "jun" })
  )

  const { data: countJul } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "jul" })
  )

  const { data: countAug } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "aug" })
  )

  const { data: countSep } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "sep" })
  )

  const { data: countOct } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "oct" })
  )

  const { data: countNov } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "nov" })
  )

  const { data: countDec } = useQuery(
    trpc.toursStudies.countByMonth.queryOptions({ monthCode: "dec" })
  )

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
        <FilterCheckboxItem
          id="jan"
          label="มกราคม"
          count={countJan?.count || 0}
          checked={selectedMonths.includes("jan")}
          onCheckedChange={() => toggleMonth("jan")}
        />

        <FilterCheckboxItem
          id="feb"
          label="กุมภาพันธ์"
          count={countFeb?.count || 0}
          checked={selectedMonths.includes("feb")}
          onCheckedChange={() => toggleMonth("feb")}
        />

        <FilterCheckboxItem
          id="mar"
          label="มีนาคม"
          count={countMar?.count || 0}
          checked={selectedMonths.includes("mar")}
          onCheckedChange={() => toggleMonth("mar")}
        />

        <FilterCheckboxItem
          id="apr"
          label="เมษายน"
          count={countApr?.count || 0}
          checked={selectedMonths.includes("apr")}
          onCheckedChange={() => toggleMonth("apr")}
        />

        <FilterCheckboxItem
          id="may"
          label="พฤษภาคม"
          count={countMay?.count || 0}
          checked={selectedMonths.includes("may")}
          onCheckedChange={() => toggleMonth("may")}
        />

        <FilterCheckboxItem
          id="jun"
          label="มิถุนายน"
          count={countJun?.count || 0}
          checked={selectedMonths.includes("jun")}
          onCheckedChange={() => toggleMonth("jun")}
        />

        <FilterCheckboxItem
          id="jul"
          label="กรกฎาคม"
          count={countJul?.count || 0}
          checked={selectedMonths.includes("jul")}
          onCheckedChange={() => toggleMonth("jul")}
        />

        <FilterCheckboxItem
          id="aug"
          label="สิงหาคม"
          count={countAug?.count || 0}
          checked={selectedMonths.includes("aug")}
          onCheckedChange={() => toggleMonth("aug")}
        />

        <FilterCheckboxItem
          id="sep"
          label="กันยายน"
          count={countSep?.count || 0}
          checked={selectedMonths.includes("sep")}
          onCheckedChange={() => toggleMonth("sep")}
        />

        <FilterCheckboxItem
          id="oct"
          label="ตุลาคม"
          count={countOct?.count || 0}
          checked={selectedMonths.includes("oct")}
          onCheckedChange={() => toggleMonth("oct")}
        />

        <FilterCheckboxItem
          id="nov"
          label="พฤศจิกายน"
          count={countNov?.count || 0}
          checked={selectedMonths.includes("nov")}
          onCheckedChange={() => toggleMonth("nov")}
        />

        <FilterCheckboxItem
          id="dec"
          label="ธันวาคม"
          count={countDec?.count || 0}
          checked={selectedMonths.includes("dec")}
          onCheckedChange={() => toggleMonth("dec")}
        />
      </div>
    </FilterSection>
  )
}

export { MonthFilter }
