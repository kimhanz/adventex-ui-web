import * as React from "react"

import { CarouselApi } from "@/components/ui/carousel"

function useTourImageGallery(images: { url: string; alt: string }[]) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  // reset index when images change length
  React.useEffect(() => {
    setCurrentImageIndex(0)
  }, [images.length])

  // open dialog at specific image
  const openImageDialog = React.useCallback((index: number) => {
    setCurrentImageIndex(index)
    setIsDialogOpen(true)
  }, [])

  // scroll Embla when needed
  const goToImage = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  // keep currentImageIndex in sync with Embla’s selected snap
  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrentImageIndex(api.selectedScrollSnap())
    api.on("select", onSelect)
    if (isDialogOpen) api.scrollTo(currentImageIndex)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, isDialogOpen, currentImageIndex])

  return {
    isDialogOpen,
    setIsDialogOpen,
    currentImageIndex,
    openImageDialog,
    goToImage,
    setApi,
  }
}

export { useTourImageGallery }
