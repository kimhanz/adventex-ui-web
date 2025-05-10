"use client"

import Image from "next/image"
import { useInfiniteQuery } from "@tanstack/react-query"
import { motion } from "motion/react"
import { useTRPC } from "@/trpc/client"

import { Skeleton } from "@/components/ui/skeleton"

const DEFAULT_LIMIT = 9

const GalleryImage = ({
  url,
  alt,
  index,
}: {
  url: string
  alt: string
  index: number
}) => {
  return (
    <motion.div
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  )
}

export const GalleryImages = () => {
  const trpc = useTRPC()
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.galleries.list.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
          },
        }
      )
    )

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[...Array(9)].map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="aspect-square w-full rounded-xl"
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4 text-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data?.pages.map((page) => {
          return page.docs.map((doc, index) => (
            <GalleryImage
              key={doc.id}
              url={doc.image.url || "placeholder.svg"}
              alt={doc.image.alt || "N/A"}
              index={index}
            />
          ))
        })}
      </div>

      {hasNextPage ? (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="cursor-pointer justify-start text-start font-medium underline disabled:*:opacity-50"
        >
          Loadmore...
        </button>
      ) : null}
    </div>
  )
}
