import * as React from "react"

import { cn } from "@/lib/utils"

const BlogDetailHeader = ({
  children,
  className,
  ...props
}: React.ComponentProps<"header">) => {
  return (
    <header
      className={cn("flex flex-col gap-y-6", className)}
      {...props}
    >
      {children}
    </header>
  )
}

const BlogDetailHeaderBadge = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const BlogDetailHeaderTitle = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

const BlogDetailHeaderMeta = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex items-center gap-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

BlogDetailHeader.displayName = "BlogDetailHeader"
BlogDetailHeaderBadge.displayName = "BlogDetailHeader.Badge"
BlogDetailHeaderTitle.displayName = "BlogDetailHeader.Title"
BlogDetailHeaderMeta.displayName = "BlogDetailHeader.Meta"

BlogDetailHeader.Badge = BlogDetailHeaderBadge
BlogDetailHeader.Title = BlogDetailHeaderTitle
BlogDetailHeader.Meta = BlogDetailHeaderMeta

export { BlogDetailHeader }
