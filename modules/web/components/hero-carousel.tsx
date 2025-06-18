import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export const HeroCarousel = () => {
  return (
    <section className="container-wrapper">
      <div className="container py-4 xl:py-6 2xl:py-4">
        <div className="size-full rounded-lg border p-1">
          <div className="relative size-full rounded-lg">
            <div className="-ml-4 flex">
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4">
                <AspectRatio
                  ratio={3 / 1}
                  className="size-full overflow-hidden rounded-lg"
                >
                  <Image
                    src="/images/shared/adventex-hero-cover.png"
                    alt="Adventex hero cover"
                    width={1200}
                    height={400}
                    className="size-full object-fill"
                    priority
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
