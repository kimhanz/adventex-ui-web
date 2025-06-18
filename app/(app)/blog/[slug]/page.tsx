import { Metadata } from "next"
import { Calendar, User } from "lucide-react"
import { createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/_app"

import { Badge } from "@/components/ui/badge"
import { BlogDetailContent } from "@/modules/blog/components/blog-detail/blog-detail-content"
import { BlogDetailGallery } from "@/modules/blog/components/blog-detail/blog-detail-gallery"
import { BlogDetailHeader } from "@/modules/blog/components/blog-detail/blog-detail-header"
import { BlogDetailImage } from "@/modules/blog/components/blog-detail/blog-detail-image"
import { BlogDetailTags } from "@/modules/blog/components/blog-detail/blog-detail-tags"
import { generateBlogSEO } from "@/modules/blog/utils/seo"

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const caller = appRouter.createCaller(await createTRPCContext())
  const post = await caller.blog.get({ slug: (await params).slug })

  return generateBlogSEO(post)
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const caller = appRouter.createCaller(await createTRPCContext())
  const post = await caller.blog.get({ slug: (await params).slug })

  const hasCategories =
    Array.isArray(post.categories) && post.categories.length > 0
  const categories = post.categories!

  const hasGallery = Array.isArray(post.gallery) && post.gallery.length > 0
  const gallery = post.gallery!

  const hasTags = Array.isArray(post.tags) && post.tags.length > 0
  const tags = post.tags!

  return (
    <>
      <BlogDetailHeader>
        {hasCategories ? (
          <BlogDetailHeader.Badge>
            {categories.map((cat, index) => (
              <Badge
                key={cat.id ?? index}
                variant="secondary"
              >
                {cat.category}
              </Badge>
            ))}
          </BlogDetailHeader.Badge>
        ) : null}

        <BlogDetailHeader.Title>{post.title}</BlogDetailHeader.Title>

        <BlogDetailHeader.Meta>
          <div className="flex items-center gap-2">
            <Calendar className="-mt-0.5 h-5 w-5" />
            <span>{formatDate(post.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="-mt-0.5 h-5 w-5" />
            <span>
              {typeof post.author === "object" ? post.author.email : "Admin"}
            </span>
          </div>
        </BlogDetailHeader.Meta>
      </BlogDetailHeader>

      {post.featuredImage ? (
        <BlogDetailImage>
          <BlogDetailImage.Container>
            <BlogDetailImage.Figure
              src={post.featuredImage.url || "/placeholder.svg"}
              alt={post.featuredImage.alt || post.title}
            />
            {post.featuredImage.alt && (
              <BlogDetailImage.Caption>
                {post.featuredImage.alt}
              </BlogDetailImage.Caption>
            )}
          </BlogDetailImage.Container>
        </BlogDetailImage>
      ) : null}

      {post.content ? (
        <BlogDetailContent>
          <BlogDetailContent.Container>
            <BlogDetailContent.RichText data={post.content} />
          </BlogDetailContent.Container>
        </BlogDetailContent>
      ) : null}

      {hasGallery ? (
        <BlogDetailGallery>
          <BlogDetailGallery.Header>รวมภาพที่น่าสนใจ</BlogDetailGallery.Header>
          <BlogDetailGallery.Container>
            {gallery.map((item, index) => (
              <BlogDetailGallery.Item key={item.id}>
                <BlogDetailGallery.Image
                  src={item.image.url || "/placeholder.svg"}
                  alt={item.image.alt || `Gallery image ${index + 1}`}
                />
              </BlogDetailGallery.Item>
            ))}
          </BlogDetailGallery.Container>
        </BlogDetailGallery>
      ) : null}

      {hasTags ? (
        <BlogDetailTags>
          <BlogDetailTags.Header>แท็ก</BlogDetailTags.Header>
          <BlogDetailTags.Container>
            {tags.map((tag, index) => (
              <BlogDetailTags.Item key={index}>
                <Badge variant="outline">#{tag.tag}</Badge>
              </BlogDetailTags.Item>
            ))}
          </BlogDetailTags.Container>
        </BlogDetailTags>
      ) : null}
    </>
  )
}
