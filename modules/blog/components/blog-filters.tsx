"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { useBlogFilters } from "../hooks/use-blog-filters"

function BlogFilters() {
  const [filters, setFilters] = useBlogFilters()

  const trpc = useTRPC()
  const { data: categories = [] } = useSuspenseQuery(
    trpc.blog.categories.queryOptions()
  )

  const handleCategoryFilter = (category: string) => {
    setFilters({ category: category || null, page: 1 })
  }

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={!filters.category ? "default" : "outline"}
          className={cn("cursor-pointer", {
            "bg-[#DC2626] text-white [a&]:hover:bg-[#b91c1c]":
              !filters.category,
          })}
          onClick={() => handleCategoryFilter("")}
        >
          ทั้งหมด
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={filters.category === category ? "default" : "outline"}
            className={cn("cursor-pointer", {
              "bg-[#DC2626] text-white [a&]:hover:bg-[#b91c1c]":
                filters.category === category,
            })}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export { BlogFilters }
