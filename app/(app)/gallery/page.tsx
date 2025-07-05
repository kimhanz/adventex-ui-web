import type { Metadata } from "next"

import { GalleryImages } from "@/modules/galleries/components/gallery-images"

export const metadata: Metadata = {
  title: "แกลลอรี่",
  description:
    "รวมภาพความประทับใจจากการเดินทางของลูกค้าที่ไว้วางใจให้เราดูแล ทุกช่วงเวลาแห่งความสุขที่เราได้มีส่วนร่วมสร้างขึ้น",
}

export default function GalleryPage() {
  return (
    <>
      <div>
        <div>
          <div className="mx-auto max-w-screen-lg">
            <div className="flex flex-col items-center justify-center">
              <h2 className="p-4 text-4xl font-bold xl:text-6xl">แกลลอรี่</h2>
            </div>
          </div>

          <div>
            <div className="mx-auto max-w-screen-lg">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex flex-col gap-y-px p-8">
                  <p className="text-muted-foreground max-w-prose">
                    รวมภาพความประทับใจจากการเดินทางของลูกค้าที่ไว้วางใจให้เราดูแล
                  </p>
                  <p className="text-muted-foreground max-w-prose">
                    ทุกช่วงเวลาแห่งความสุขที่เราได้มีส่วนร่วมสร้างขึ้น
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="container mx-auto py-4 md:py-8">
            <GalleryImages />
          </div>
        </div>
      </div>
    </>
  )
}
