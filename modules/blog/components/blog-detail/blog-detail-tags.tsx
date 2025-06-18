import * as React from "react"

import { cn } from "@/lib/utils"

function BlogDetailTags({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("space-y-3", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function BlogDetailTagsHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    >
      {children}
    </h4>
  )
}

function BlogDetailTagsContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function BlogDetailTagsItem({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

BlogDetailTags.displayName = "BlogDetailTags"
BlogDetailTagsHeader.displayName = "BlogDetailTags.Header"
BlogDetailTagsContainer.displayName = "BlogDetailTags.Container"
BlogDetailTagsItem.displayName = "BlogDetailTags.Item"

BlogDetailTags.Header = BlogDetailTagsHeader
BlogDetailTags.Container = BlogDetailTagsContainer
BlogDetailTags.Item = BlogDetailTagsItem

export { BlogDetailTags }
