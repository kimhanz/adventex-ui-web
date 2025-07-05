"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { XIcon } from "lucide-react"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

function TourImageGallery({
  images,
}: {
  images: {
    url: string
    alt: string
  }[]
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [images.length])

  const openImageDialog = (index: number) => {
    setCurrentImageIndex(index)
    setIsDialogOpen(true)
  }

  const visibleImages = images.slice(0, 6)
  const hasMoreImages = images.length > 6
  const remainingCount = images.length - 6

  const goToImage = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index)
      }
    },
    [api]
  )

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentImageIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)

    if (isDialogOpen) {
      api.scrollTo(currentImageIndex)
    }

    return () => {
      api.off("select", onSelect)
    }
  }, [api, isDialogOpen, currentImageIndex])

  const [img0, img1, img2, img3, img4, img5] = visibleImages

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2">
          <div
            className="relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openImageDialog(0)}
          >
            <Image
              src={img0?.url || "/placeholder.svg"}
              width={800}
              height={525}
              alt={img0?.alt || ""}
              className="h-125 w-full object-cover transition-transform hover:scale-105"
              priority
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div
            className="relative isolate cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openImageDialog(1)}
          >
            <Image
              src={img1?.url || "/placeholder.svg"}
              width={800}
              height={246}
              alt={img1?.alt || ""}
              className="h-61.5 w-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div
            className="relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openImageDialog(2)}
          >
            <Image
              src={img2?.url || "/placeholder.svg"}
              width={800}
              height={246}
              alt={img2?.alt || ""}
              className="h-61.5 w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div
            className="relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openImageDialog(3)}
          >
            <Image
              src={img3?.url || "/placeholder.svg"}
              width={800}
              height={246}
              alt={img3?.alt || ""}
              className="h-61.5 w-full object-cover transition-transform hover:scale-105"
            />
          </div>
          {hasMoreImages ? (
            <div
              className="relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openImageDialog(0)}
            >
              <Image
                src={img5?.url || "/placeholder.svg"}
                width={800}
                height={246}
                alt={img5?.alt || ""}
                className="h-61.5 w-full object-cover transition-transform hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/60"
                onClick={(e) => {
                  e.stopPropagation()
                  openImageDialog(0)
                }}
              >
                <span className="text-background text-xl font-bold">
                  +{remainingCount}
                </span>
              </div>
            </div>
          ) : (
            <div
              className="relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openImageDialog(4)}
            >
              <Image
                src={img4?.url || "/placeholder.svg"}
                width={800}
                height={246}
                alt={img4?.alt || ""}
                className="h-61.5 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="w-[95vw] max-w-none border-none bg-black/90 p-0 sm:w-[90vw] 2xl:w-[80vw]">
          {/* Hidden but accessible title and description for screen readers */}
          <DialogTitle className="sr-only">Tour Image Gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Browse through images of the tour destination. Use arrow keys or
            buttons to navigate.
          </DialogDescription>

          <button
            className="text-background absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 hover:bg-black/70"
            onClick={() => setIsDialogOpen(false)}
            aria-label="Close gallery"
          >
            <XIcon className="h-5 w-5" />
          </button>

          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="h-[90vh]">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="flex h-full items-center justify-center"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="text-background absolute left-4 z-10 border-none bg-black/50 hover:bg-black/70"
              aria-label="Previous image"
            />
            <CarouselNext
              className="text-background absolute right-4 z-10 border-none bg-black/50 hover:bg-black/70"
              aria-label="Next image"
            />
          </Carousel>

          <div className="absolute right-0 bottom-4 left-0 z-10 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                role="tab"
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-background" : "bg-muted"
                }`}
                onClick={() => goToImage(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentImageIndex ? "true" : "false"}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { TourImageGallery }
