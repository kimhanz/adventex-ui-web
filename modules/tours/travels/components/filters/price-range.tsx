"use client"

import { Slider } from "@/components/ui/slider"
import { useTourStudiesFilters } from "@/modules/tours/studies/hooks/use-tour-studies-filters"

import { FilterSection } from "../ui/FilterSection"

function PriceRange({
  minValue,
  maxValue,
  onValueMinChange,
  onValueMaxChange,
}: {
  minValue?: number
  maxValue?: number
  onValueMinChange?: (value: number) => void
  onValueMaxChange?: (value: number) => void
}) {
  // Only use URL state if not in form mode (onChange not provided)
  const [filters, setFilters] = useTourStudiesFilters()

  // Use provided values if in form mode, otherwise use URL state
  const currentMinValue =
    minValue !== undefined ? minValue : filters.minPrice || 0
  const currentMaxValue =
    maxValue !== undefined ? maxValue : filters.maxPrice || 200000

  // Handle slider value change
  const handleSliderChange = ([min, max]: number[]) => {
    if (onValueMinChange && onValueMaxChange) {
      // Form mode - update via callbacks
      onValueMinChange(min)
      onValueMaxChange(max)
    } else {
      // Direct mode - update URL
      setFilters((prev) => ({
        ...prev,
        minPrice: min,
        maxPrice: max,
      }))
    }
  }

  return (
    <FilterSection title="ราคา">
      <div className="space-y-4">
        <Slider
          value={[currentMinValue, currentMaxValue]}
          onValueChange={handleSliderChange}
          min={0}
          max={200000}
          step={1000}
        />
        <div className="flex justify-between">
          <div>
            <div className="text-muted-foreground">ต่ำสุด</div>
            <div>{currentMinValue.toLocaleString()} บาท</div>
          </div>
          <div>
            <div className="text-muted-foreground">สูงสุด</div>
            <div>{currentMaxValue.toLocaleString()} บาท</div>
          </div>
        </div>
      </div>
    </FilterSection>
  )
}

export { PriceRange }
