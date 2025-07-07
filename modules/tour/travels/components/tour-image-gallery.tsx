"use client"

import * as React from "react"
import Image from "next/image"
import { XIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
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

import { useTourImageGallery } from "../hooks/use-tour-image-gallery"

function TourImageGallery({
  images,
}: {
  images: {
    url: string
    alt: string
  }[]
}) {
  const isMobile = useIsMobile()

  const {
    isDialogOpen,
    setIsDialogOpen,
    currentImageIndex,
    openImageDialog,
    goToImage,
    setApi,
  } = useTourImageGallery(images)

  const visibleImages = images.slice(0, 6)
  const hasMoreImages = images.length > 6
  const remainingCount = images.length - 6

  if (isMobile) {
    return <TourImageGalleryMobile images={images} />
  }

  return (
    <>
      <div className="grid w-full grid-cols-4 gap-2">
        <div className="col-span-2">
          <div
            className="relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openImageDialog(0)}
          >
            <Image
              src={visibleImages[0]?.url || "/placeholder.svg"}
              width={800}
              height={525}
              alt={visibleImages[0]?.alt || ""}
              className="h-125 w-full object-cover transition-transform hover:scale-105"
              priority
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <ImageBox
            image={visibleImages.at(1)}
            onClick={() => openImageDialog(1)}
          />
          <ImageBox
            image={visibleImages.at(2)}
            onClick={() => openImageDialog(2)}
          />
        </div>
        <div className="space-y-2">
          <ImageBox
            image={visibleImages.at(3)}
            onClick={() => openImageDialog(3)}
          />
          {hasMoreImages ? (
            <div
              className="relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openImageDialog(0)}
            >
              <Image
                src={visibleImages[5]?.url || "/placeholder.svg"}
                width={800}
                height={246}
                alt={visibleImages[5]?.alt || ""}
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
            <ImageBox
              image={visibleImages.at(4)}
              onClick={() => openImageDialog(4)}
            />
          )}
        </div>
      </div>

      <TourImageDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        images={images}
        currentImageIndex={currentImageIndex}
        goToImage={goToImage}
        setApi={setApi}
      />
    </>
  )
}

export { TourImageGallery }

function TourImageGalleryMobile({
  images,
}: {
  images: {
    url: string
    alt: string
  }[]
}) {
  const {
    isDialogOpen,
    setIsDialogOpen,
    currentImageIndex,
    openImageDialog,
    goToImage,
    setApi,
  } = useTourImageGallery(images)

  const visibleImages = images.slice(0, 6)

  return (
    <>
      <Carousel
        opts={{ align: "center" }}
        className="cursor-grab"
      >
        <CarouselContent className="relative isolate">
          {visibleImages.map((img, index) => (
            <CarouselItem
              key={index}
              className="relative isolate cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openImageDialog(index)}
            >
              <Image
                src={img?.url || "/placeholder.svg"}
                width={540}
                height={540}
                alt={img?.alt || ""}
                className="h-135 w-full object-contain transition-transform hover:scale-105"
                placeholder="blur"
                blurDataURL="/placeholder.svg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <TourImageDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        images={images}
        currentImageIndex={currentImageIndex}
        goToImage={goToImage}
        setApi={setApi}
      />
    </>
  )
}

function TourImageDialog({
  isOpen,
  images,
  onClose,
  currentImageIndex,
  goToImage,
  setApi,
}: {
  isOpen: boolean
  images: { url: string; alt: string }[]
  onClose: () => void
  currentImageIndex: number
  goToImage: (index: number) => void
  setApi: (api: CarouselApi) => void
}) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="w-[95vw] max-w-none border-none bg-black/90 p-0 sm:w-[90vw] 2xl:w-[80vw]">
        <DialogTitle className="sr-only">Tour Image Gallery</DialogTitle>
        <DialogDescription className="sr-only">
          Browse through images of the tour destination. Use arrow keys or
          buttons to navigate.
        </DialogDescription>

        <button
          className="text-background absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 hover:bg-black/70"
          onClick={onClose}
          aria-label="Close gallery"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <Carousel
          opts={{ align: "center", loop: true }}
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
  )
}

function ImageBox({
  image,
  onClick,
}: {
  image: { url: string | undefined; alt: string | undefined } | undefined
  onClick: () => void
}) {
  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <Image
        src={image?.url || "/placeholder.svg"}
        width={800}
        height={246}
        alt={image?.alt || ""}
        className="h-61.5 w-full object-cover transition-transform hover:scale-105"
      />
    </div>
  )
}
