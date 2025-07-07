"use client"

import * as React from "react"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function TourItemFavoriteButton() {
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    <Button
      variant="ghost"
      className="bg-background absolute top-2 right-2 z-10 h-8 w-8 rounded-full p-0"
      aria-label="Add to favorites"
      onClick={() => setIsFavorite((prev) => !prev)}
    >
      <Heart
        className={cn(
          "h-5 w-5",
          isFavorite ? "fill-[#DC2626] text-[#DC2626]" : "text-muted-foreground"
        )}
      />
    </Button>
  )
}

export { TourItemFavoriteButton }
