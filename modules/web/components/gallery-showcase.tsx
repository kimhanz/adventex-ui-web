"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const images = [
  {
    alt: "Gallery image 1",
    height: 800,
    span: "md:col-span-1 md:row-span-2",
    src: "/images/gallery/GALLERY_1.png",
    width: 600,
  },
  {
    alt: "Gallery image 2",
    height: 400,
    span: "md:col-span-1 md:row-span-1",
    src: "/images/gallery/GALLERY_2.png",
    width: 600,
  },
  {
    alt: "Gallery image 3",
    height: 400,
    span: "md:col-span-2 md:row-span-1",
    src: "/images/gallery/GALLERY_3.png",
    width: 600,
  },
  {
    alt: "Gallery image 4",
    height: 800,
    span: "md:col-span-2 md:row-span-2",
    src: "/images/gallery/GALLERY_4.png",
    width: 800,
  },
  {
    alt: "Gallery image 5",
    height: 400,
    span: "md:col-span-1 md:row-span-2",
    src: "/images/gallery/GALLERY_5.png",
    width: 600,
  },
  {
    alt: "Gallery image 6",
    height: 400,
    span: "md:col-span-1 md:row-span-1",
    src: "/images/gallery/GALLERY_6.png",
    width: 600,
  },
  {
    alt: "Gallery image 7",
    height: 400,
    span: "md:col-span-2 md:row-span-1",
    src: "/images/gallery/GALLERY_7.png",
    width: 1200,
  },
  {
    alt: "Gallery image 8",
    height: 400,
    span: "md:col-span-1 md:row-span-1",
    src: "/images/gallery/GALLERY_8.png",
    width: 600,
  },
  {
    alt: "Gallery image 9",
    height: 400,
    span: "md:col-span-1 md:row-span-1",
    src: "/images/gallery/GALLERY_9.png",
    width: 600,
  },
]

export function GalleryShowcase() {
  return (
    <section className="container-wrapper">
      <div className="container py-4 xl:py-6 2xl:py-4">
        <div className="space-y-4 xl:space-y-8 2xl:space-y-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center xl:gap-6 2xl:gap-4">
            <h2 className="text-4xl font-bold xl:text-6xl">แกลลอรี่</h2>
            <div className="flex flex-col gap-y-px">
              <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
                รวมภาพความประทับใจจากการเดินทางของลูกค้าที่ไว้วางใจให้เราดูแล
              </p>
              <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
                ทุกช่วงเวลาแห่งความสุขที่เราได้มีส่วนร่วมสร้างขึ้น
              </p>
            </div>
          </div>

          <div className="grid auto-rows-[200px] grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => {
              return (
                <motion.div
                  key={index}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-xl",
                    image.span
                  )}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              )
            })}
          </div>

          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              asChild
            >
              <Link href="/gallery">คลิกเพื่อดูแกลลอรี่ของเรา</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
