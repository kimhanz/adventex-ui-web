import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

function BlogDetailGallery({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("space-y-6", className)}
      {...props}
    >
      {children}
    </section>
  )
}

function BlogDetailGalleryHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-2xl font-bold text-gray-900", className)}
      {...props}
    >
      {children}
    </h3>
  )
}

function BlogDetailGalleryContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function BlogDetailGalleryItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn("overflow-hidden border-none p-0 shadow-none", className)}
      {...props}
    >
      {children}
    </Card>
  )
}

function BlogDetailGalleryImage({
  src,
  alt,
  className,
  ...props
}: { src: string; alt: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative aspect-square", className)}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  )
}

BlogDetailGallery.displayName = "BlogDetailGallery"
BlogDetailGalleryHeader.displayName = "BlogDetailGallery.Header"
BlogDetailGalleryContainer.displayName = "BlogDetailGallery.Container"
BlogDetailGalleryItem.displayName = "BlogDetailGallery.Item"
BlogDetailGalleryImage.displayName = "BlogDetailGallery.Image"

BlogDetailGallery.Header = BlogDetailGalleryHeader
BlogDetailGallery.Container = BlogDetailGalleryContainer
BlogDetailGallery.Item = BlogDetailGalleryItem
BlogDetailGallery.Image = BlogDetailGalleryImage

export { BlogDetailGallery }
