import { BlogPost, Media } from "@/payload-types"
import { TRPCError } from "@trpc/server"
import { Where } from "payload"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

export const blogRouter = createTRPCRouter({
  list: baseProcedure
    .input(
      z.object({
        category: z.string().optional(),
        tag: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { category, tag } = input

      const where: Where = {
        status: { equals: "published" },
      }

      if (category) {
        where["categories.category"] = { contains: category }
      }

      if (tag) {
        where["tags.tag"] = { contains: tag }
      }

      const result = await ctx.db.find({
        collection: "blog-posts",
        where,
        sort: "-publishedDate",
        depth: 1,
      })

      return {
        posts: result.docs.map((doc) => ({
          ...doc,
          featuredImage: doc.featuredImage as Media,
          author: doc.author,
        })),
        totalPages: result.totalPages,
        currentPage: result.page || 1,
        totalPosts: result.totalDocs,
      }
    }),

  get: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { slug } = input

      const result = await ctx.db.find({
        collection: "blog-posts",
        where: {
          slug: { equals: slug },
          status: { equals: "published" },
        },
        limit: 1,
        depth: 2,
      })

      if (result.totalDocs === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Blog post with slug ${slug} not found`,
        })
      }

      return {
        ...result.docs[0],
        featuredImage: result.docs[0].featuredImage as Media,
        gallery: result.docs[0].gallery?.map((item) => ({
          ...item,
          image: item.image as Media,
        })),
        author: result.docs[0].author,
      }
    }),

  featured: baseProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(3) }))
    .query(async ({ ctx, input }) => {
      const { limit } = input

      const result = await ctx.db.find({
        collection: "blog-posts",
        where: {
          status: { equals: "published" },
        },
        sort: "-publishedDate",
        limit,
        depth: 1,
      })

      return result.docs.map((doc) => ({
        ...doc,
        featuredImage: doc.featuredImage as Media,
        author: doc.author,
      }))
    }),

  categories: baseProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.find({
      collection: "blog-posts",
      where: {
        status: { equals: "published" },
      },
      limit: 1000,
    })

    const categories = new Set<string>()

    result.docs.forEach((post) => {
      const blogPost = post as BlogPost
      if (blogPost.categories) {
        blogPost.categories.forEach((cat) => {
          if (cat.category) {
            categories.add(cat.category)
          }
        })
      }
    })

    return Array.from(categories)
  }),

  tags: baseProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.find({
      collection: "blog-posts",
      where: {
        status: { equals: "published" },
      },
      limit: 1000,
    })

    const tags = new Set<string>()

    result.docs.forEach((post) => {
      const blogPost = post as BlogPost
      if (blogPost.tags) {
        blogPost.tags.forEach((tag) => {
          if (tag.tag) {
            tags.add(tag.tag)
          }
        })
      }
    })

    return Array.from(tags)
  }),
})
