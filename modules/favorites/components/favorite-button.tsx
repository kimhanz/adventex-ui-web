"use client"

import { HeartIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { useFavorites } from "../hooks/favorites-context"

function FavoriteButton({
  id,
  type,
  name,
  image,
}: {
  id: string
  type: "study" | "travel"
  name: string
  image: string
}) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorited = isFavorite(id)

  function handleToggleFavorite() {
    if (favorited) {
      removeFavorite(id)
    } else {
      addFavorite({ id, type, name, image })
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className="bg-background absolute top-2 right-2 z-10 h-8 w-8 rounded-full p-0"
    >
      <HeartIcon
        className={cn(
          "h-5 w-5",
          favorited ? "fill-[#DC2626] text-[#DC2626]" : "text-neutral-500"
        )}
      />
    </Button>
  )
}

export { FavoriteButton }
