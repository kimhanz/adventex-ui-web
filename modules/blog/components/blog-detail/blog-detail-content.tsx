import * as React from "react"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react"

import { cn } from "@/lib/utils"

function BlogDetailContent({
  children,
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      className={cn("space-y-6", className)}
      {...props}
    >
      {children}
    </article>
  )
}

function BlogDetailContentContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed max-w-none indent-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function BlogDetailContentRichText({
  data,
}: {
  data: SerializedEditorState | null | undefined
}) {
  if (!data) return null

  return <RichTextConverter data={data} />
}

BlogDetailContent.displayName = "BlogDetailContent"
BlogDetailContentContainer.displayName = "BlogDetailContent.Container"
BlogDetailContentRichText.displayName = "BlogDetailContent.RichText"

BlogDetailContent.Container = BlogDetailContentContainer
BlogDetailContent.RichText = BlogDetailContentRichText

export { BlogDetailContent }
