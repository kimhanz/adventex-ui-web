"use client"

import * as React from "react"
import { toast } from "sonner"

interface FavoriteItem {
  id: string
  type: "study" | "travel"
  name: string
  image: string
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = React.createContext<FavoritesContextType | undefined>(
  undefined
)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<FavoriteItem[]>([])

  React.useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = React.useCallback((item: FavoriteItem) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === item.id)) {
        toast.success(`${item.name} added to favorites!`)
        return [...prevFavorites, item]
      }
      return prevFavorites
    })
  }, [])

  const removeFavorite = React.useCallback((id: string) => {
    setFavorites((prevFavorites) => {
      const removedItem = prevFavorites.find((fav) => fav.id === id)
      if (removedItem) {
        toast.info(`${removedItem.name} removed from favorites.`)
      }
      return prevFavorites.filter((fav) => fav.id !== id)
    })
  }, [])

  const isFavorite = React.useCallback(
    (id: string) => {
      return favorites.some((fav) => fav.id === id)
    },
    [favorites]
  )

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = React.use(FavoritesContext)

  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }

  return context
}
