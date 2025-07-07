"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { FavoriteButton } from "@/modules/favorites/components/favorite-button"
import { useFavorites } from "@/modules/favorites/hooks/favorites-context"

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Your Favorite Tours</h1>
        <p className="text-gray-600">
          {`You haven't added any tours to your favorites yet.`}
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Favorite Tours</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((tour) => (
          <div
            key={tour.id}
            className="group flex flex-col justify-between overflow-hidden rounded-lg border"
          >
            <div className="relative">
              <Link
                title={tour.name}
                href={`/tours/${tour.type}s/${tour.id}`}
              >
                <Image
                  src={tour.image || "/placeholder.svg"}
                  width={355}
                  height={355}
                  alt={tour.name}
                  className="h-auto w-full object-contain"
                />
              </Link>
              <div className="absolute top-2 right-2">
                <FavoriteButton
                  id={tour.id}
                  type={tour.type}
                  name={tour.name}
                  image={tour.image}
                />
              </div>
            </div>

            <div className="min-h-37 space-y-3 p-2">
              <Link
                title={tour.name}
                href={`/tours/${tour.type}s/${tour.id}`}
              >
                <h3 className="line-clamp-2 h-12 font-bold">{tour.name}</h3>
              </Link>
            </div>

            <div className="bg-muted mt-auto flex items-center justify-between px-2 py-2.5">
              <Button asChild>
                <Link
                  title={tour.name}
                  href={`/tours/${tour.type}s/${tour.id}`}
                >
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
