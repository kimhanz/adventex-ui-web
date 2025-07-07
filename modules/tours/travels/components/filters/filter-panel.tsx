"use client"

import { FormEvent, useEffect, useState } from "react"
import { SlidersHorizontalIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTourTravelsFilters } from "@/modules/tours/travels/hooks/use-tour-travels-filters"

import { DestinationFilter } from "./destination-filter"
import { DurationFilter } from "./duration-filter"
import { PriceRange } from "./price-range"

type SortValue = "popular" | "time" | "price"

function FilterPanel() {
  const isMobile = useIsMobile()

  const [filters, setFilters] = useTourTravelsFilters()

  // Form state for mobile filters (mirrors URL state)
  const [formState, setFormState] = useState({
    minPrice: filters.minPrice || 0,
    maxPrice: filters.maxPrice || 200000,
    destination: filters.destination || "",
    duration: filters.duration || "",
  })

  // Update form state when URL params change
  // This ensures the form state is in sync when the drawer opens
  useEffect(() => {
    setFormState({
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || 200000,
      destination: filters.destination || "",
      duration: filters.duration || "",
    })
  }, [
    filters.minPrice,
    filters.maxPrice,
    filters.destination,
    filters.duration,
  ])

  // Handle form submission - update URL params all at once
  const handleSubmitFilters = (e: FormEvent) => {
    e.preventDefault()

    setFilters({
      minPrice: formState.minPrice,
      maxPrice: formState.maxPrice,
      destination: formState.destination,
      duration: formState.duration,
      sort: filters.sort,
    })
  }

  // Reset all filters
  const handleResetFilters = () => {
    // Reset form state
    setFormState({
      minPrice: 0,
      maxPrice: 200000,
      destination: "",
      duration: "",
    })

    // Also reset URL state immediately
    setFilters({
      minPrice: 0,
      maxPrice: 200000,
      destination: "",
      duration: "",
      sort: filters.sort,
    })
  }

  if (isMobile)
    return (
      <div className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-14 z-10 border-b px-4 shadow-sm backdrop-blur">
        <div className="flex h-12 w-full items-center justify-between">
          <Select
            defaultValue={filters.sort}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                sort: value as SortValue,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="เรียงตาม" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">ทัวร์แนะนำ</SelectItem>
              <SelectItem value="price">ช่วงราคา</SelectItem>
              <SelectItem value="time">เวลา</SelectItem>
            </SelectContent>
          </Select>

          <Drawer>
            <DrawerTrigger className="inline-flex items-center gap-2 [&>svg]:size-4">
              <SlidersHorizontalIcon />
              <span className="text-sm">ตัวกรอง</span>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] [&>button:last-child]:top-3.5">
              <DrawerHeader className="contents space-y-0 text-left">
                <DrawerTitle className="border-b px-6 py-4 text-base">
                  กรองการค้นหา
                </DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto">
                <DrawerDescription asChild>
                  <form
                    id="filter-form"
                    onSubmit={handleSubmitFilters}
                    className="space-y-2"
                  >
                    <div className="space-y-2">
                      <PriceRange
                        minValue={formState.minPrice}
                        maxValue={formState.maxPrice}
                        onValueMinChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            minPrice: value,
                          }))
                        }
                        onValueMaxChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            maxPrice: value,
                          }))
                        }
                      />

                      <DestinationFilter
                        value={formState.destination}
                        onChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            destination: value,
                          }))
                        }
                      />

                      <DurationFilter
                        value={formState.duration}
                        onChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            duration: value,
                          }))
                        }
                      />
                    </div>
                  </form>
                </DrawerDescription>
              </div>
              <DrawerFooter className="border-t px-6 py-4">
                <DrawerClose asChild>
                  <Button
                    type="submit"
                    form="filter-form"
                  >
                    แสดงผลการกรอง
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={handleResetFilters}
                  >
                    ล้างค่า
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    )

  // Desktop view
  return (
    <aside className="hidden w-full space-y-2 md:block md:w-72">
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold">กรองการค้นหา</div>
        <div
          className={buttonVariants({
            size: "sm",
            variant: "link",
            className: "cursor-pointer",
          })}
          onClick={handleResetFilters}
        >
          ล้างค่า
        </div>
      </div>
      <PriceRange />
      <DestinationFilter />
      <DurationFilter />
    </aside>
  )
}

export { FilterPanel }
