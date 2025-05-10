"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { TourCard } from "@/modules/tour/studies/components/ui/tour-card"

export const FeaturedTour = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.tourStudies.listReccommended.queryOptions()
  )

  return (
    <section className="container-wrapper">
      <div className="container py-4 xl:py-6 2xl:py-4">
        <div className="space-y-4">
          <div className="grid items-center justify-center gap-4 text-center xl:gap-6 2xl:gap-4">
            <h2 className="text-4xl font-bold xl:text-6xl">
              แพ็คเกจเรียนต่อจีน
            </h2>
            <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
              สำหรับนักเรียนที่ต้องการพัฒนาทักษะภาษาจีนและสัมผัสวัฒนธรรมจีนแท้ๆ
              ประเทศจีนเป็นจุดหมายปลายทางที่เต็มไปด้วยโอกาสในการเรียนรู้ทั้งในด้านภาษาวัฒนธรรมและชีวิตความเป็นอยู่ในต่างแดน
            </p>
          </div>

          <Carousel
            opts={{ align: "center" }}
            className="cursor-grab"
          >
            <CarouselContent>
              {data.docs.map((tour) => {
                return (
                  <CarouselItem
                    key={tour.id}
                    className="max-sm:flex max-sm:items-center max-sm:justify-center md:basis-1/2 lg:basis-1/3"
                  >
                    <TourCard tour={tour} />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
