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

import { useTourStudiesFilters } from "../../hooks/use-tour-studies-filters"
import { MonthFilter } from "./MonthFilter"
import { PriceRange } from "./PriceRange"
import { SeasonFilter } from "./SeasonFilter"
import { TypeFilter } from "./TypeFilter"
import { UniversityFilter } from "./UniversityFilter"

type SortValue = "popular" | "time" | "price"

function FilterPanel() {
  const isMobile = useIsMobile()

  const [filters, setFilters] = useTourStudiesFilters()

  // Form state for mobile filters (mirrors URL state)
  const [formState, setFormState] = useState({
    minPrice: filters.minPrice || 0,
    maxPrice: filters.maxPrice || 200000,
    type: filters.type || "",
    university: filters.university || "",
    season: filters.season || "",
    month: filters.month || "",
  })

  // Update form state when URL params change
  // This ensures the form state is in sync when the drawer opens
  useEffect(() => {
    setFormState({
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || 200000,
      type: filters.type || "",
      university: filters.university || "",
      season: filters.season || "",
      month: filters.month || "",
    })
  }, [
    filters.minPrice,
    filters.maxPrice,
    filters.type,
    filters.university,
    filters.season,
    filters.month,
  ])

  // Handle form submission - update URL params all at once
  const handleSubmitFilters = (e: FormEvent) => {
    e.preventDefault()

    setFilters({
      minPrice: formState.minPrice,
      maxPrice: formState.maxPrice,
      type: formState.type,
      university: formState.university,
      season: formState.season,
      month: formState.month,
      sort: filters.sort,
    })
  }

  // Reset all filters
  const handleResetFilters = () => {
    // Reset form state
    setFormState({
      minPrice: 0,
      maxPrice: 200000,
      type: "",
      university: "",
      season: "",
      month: "",
    })

    // Also reset URL state immediately
    setFilters({
      minPrice: 0,
      maxPrice: 200000,
      type: "",
      university: "",
      season: "",
      month: "",
      sort: filters.sort,
    })
  }

  if (isMobile)
    return (
      <div className="relative p-4">
        <div className="bg-muted fixed inset-x-0 top-0 z-50 flex h-12 w-full items-center justify-between px-4 shadow-sm">
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
                          setFormState((prev) => ({ ...prev, minPrice: value }))
                        }
                        onValueMaxChange={(value) =>
                          setFormState((prev) => ({ ...prev, maxPrice: value }))
                        }
                      />

                      <TypeFilter
                        value={formState.type}
                        onChange={(value) =>
                          setFormState((prev) => ({ ...prev, type: value }))
                        }
                      />

                      <UniversityFilter
                        value={formState.university}
                        onChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            university: value,
                          }))
                        }
                      />

                      <SeasonFilter
                        value={formState.season}
                        onChange={(value) =>
                          setFormState((prev) => ({ ...prev, season: value }))
                        }
                      />

                      <MonthFilter
                        value={formState.month}
                        onChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            month: value,
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
                    className="bg-[#DC2626]"
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
      <TypeFilter />
      <UniversityFilter />
      <SeasonFilter />
      <MonthFilter />
    </aside>
  )
}

export { FilterPanel }
