import { BlogPost } from "@/payload-types"
import config from "@payload-config"
import { getPayload, Where } from "payload"

export async function getBlogPosts(
  page: number = 1,
  limit: number = 10,
  category?: string,
  tag?: string
): Promise<{
  posts: BlogPost[]
  totalPages: number
  currentPage: number
  totalPosts: number
}> {
  const payload = await getPayload({ config })

  const where: Where = {
    status: { equals: "published" },
  }

  if (category) {
    where["categories.category"] = { contains: category }
  }

  if (tag) {
    where["tags.tag"] = { contains: tag }
  }

  const result = await payload.find({
    collection: "blog-posts",
    where,
    sort: "-publishedDate",
    limit,
    page,
    depth: 1,
  })

  return {
    posts: result.docs as BlogPost[],
    totalPages: result.totalPages,
    currentPage: result.page || 1,
    totalPosts: result.totalDocs,
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: "blog-posts",
    where: {
      slug: { equals: slug },
      status: { equals: "published" },
    },
    limit: 1,
    depth: 2,
  })

  return (result.docs[0] as BlogPost) || null
}

export async function getFeaturedBlogPosts(
  limit: number = 3
): Promise<BlogPost[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: "blog-posts",
    where: {
      status: { equals: "published" },
    },
    sort: "-publishedDate",
    limit,
    depth: 1,
  })

  return result.docs as BlogPost[]
}

export async function getBlogCategories(): Promise<string[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: "blog-posts",
    where: {
      status: { equals: "published" },
    },
    limit: 1000,
  })

  const categories = new Set<string>()

  result.docs.forEach((post: BlogPost) => {
    if (post.categories) {
      post.categories.forEach((cat) => {
        if (cat.category) {
          categories.add(cat.category)
        }
      })
    }
  })

  return Array.from(categories)
}

export async function getBlogTags(): Promise<string[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: "blog-posts",
    where: {
      status: { equals: "published" },
    },
    limit: 1000,
  })

  const tags = new Set<string>()

  result.docs.forEach((post: BlogPost) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (tag.tag) {
          tags.add(tag.tag)
        }
      })
    }
  })

  return Array.from(tags)
}
