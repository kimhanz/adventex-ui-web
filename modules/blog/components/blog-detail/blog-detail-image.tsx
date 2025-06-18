import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

function BlogDetailImage({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("space-y-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function BlogDetailImageContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-lg shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function BlogDetailImageFigure({
  src,
  alt,
  priority = true,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      priority={priority}
    />
  )
}

function BlogDetailImageCaption({
  children,
  className,
  ...props
}: React.ComponentProps<"figcaption">) {
  return (
    <figcaption
      className={cn("text-sm text-gray-500", className)}
      {...props}
    >
      {children}
    </figcaption>
  )
}

BlogDetailImage.displayName = "BlogDetailImage"
BlogDetailImageContainer.displayName = "BlogDetailImage.Container"
BlogDetailImageFigure.displayName = "BlogDetailImage.Figure"
BlogDetailImageCaption.displayName = "BlogDetailImage.Caption"

BlogDetailImage.Container = BlogDetailImageContainer
BlogDetailImage.Figure = BlogDetailImageFigure
BlogDetailImage.Caption = BlogDetailImageCaption

export { BlogDetailImage }
