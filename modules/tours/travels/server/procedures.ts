import { Media } from "@/payload-types"
import { Where } from "payload"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

const sortValues = ["popular", "time", "price"] as const

export const toursTravelsRouter = createTRPCRouter({
  list: baseProcedure
    .input(
      z.object({
        minPrice: z.coerce.number().nullable().optional(),
        maxPrice: z.coerce.number().nullable().optional(),
        destination: z.string().nullable().optional(),
        duration: z.string().nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        minPrice,
        maxPrice,
        destination: destinationStr,
        duration: durationStr,
        sort: sortKey,
      } = input

      const where: Where = {
        isPublished: { equals: true },
      }

      if (minPrice !== undefined && maxPrice !== undefined) {
        where.basePrice = {
          greater_than_equal: minPrice,
          less_than_equal: maxPrice,
        }
      } else if (minPrice !== undefined) {
        where.basePrice = { greater_than_equal: minPrice }
      } else if (maxPrice !== undefined) {
        where.basePrice = { less_than_equal: maxPrice }
      }

      if (destinationStr) {
        const destValues = destinationStr.split(",").filter(Boolean)
        if (destValues.length > 0) {
          where.destination = { in: destValues }
        }
      }

      if (durationStr) {
        const duValues = durationStr.split(",").filter(Boolean)
        if (duValues.length > 0) {
          where.durationFiltered = { in: duValues }
        }
      }

      let sortProperty: string = "-createdAt"
      if (sortKey) {
        switch (sortKey) {
          case "popular":
            sortProperty = "-isFeatured"
            break
          case "time":
            sortProperty = "departureDates.startDate"
            break
          case "price":
            sortProperty = "basePrice"
            break
        }
      }

      const results = await ctx.db.find({
        collection: "tour-travel",
        depth: 1,
        where: where,
        sort: sortProperty,
        pagination: false,
      })

      return {
        ...results,
        docs: results.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media,
        })),
      }
    }),

  count: baseProcedure
    .input(
      z.object({
        minPrice: z.coerce.number().nullable().optional(),
        maxPrice: z.coerce.number().nullable().optional(),
        destination: z.string().nullable().optional(),
        duration: z.string().nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        minPrice,
        maxPrice,
        destination: destinationStr,
        duration: durationStr,
      } = input

      const where: Where = {
        isPublished: { equals: true },
      }

      if (minPrice !== undefined && maxPrice !== undefined) {
        where.basePrice = {
          greater_than_equal: minPrice,
          less_than_equal: maxPrice,
        }
      } else if (minPrice !== undefined) {
        where.basePrice = { greater_than_equal: minPrice }
      } else if (maxPrice !== undefined) {
        where.basePrice = { less_than_equal: maxPrice }
      }

      if (destinationStr) {
        const destValues = destinationStr.split(",").filter(Boolean)
        if (destValues.length > 0) {
          where.destination = { in: destValues }
        }
      }

      if (durationStr) {
        const duValues = durationStr.split(",").filter(Boolean)
        if (duValues.length > 0) {
          where.durationFiltered = { in: duValues }
        }
      }

      const results = await ctx.db.find({
        collection: "tour-travel",
        depth: 0,
        where: where,
        pagination: false,
      })

      return { count: results.docs.length }
    }),

  getAllDestinations: baseProcedure.query(async ({ ctx }) => {
    const results = await ctx.db.find({
      collection: "tour-travel",
      depth: 0,
      pagination: false,
    })

    const destinations = new Set(
      results.docs.map((doc) => doc.destination).filter((d) => !!d)
    )

    return Array.from(destinations)
  }),

  getAllDurations: baseProcedure.query(async ({ ctx }) => {
    const results = await ctx.db.find({
      collection: "tour-travel",
      depth: 0,
      where: { isPublished: { equals: true } },
      pagination: false,
    })

    const durations = new Set(
      results.docs.map((doc) => String(doc.durationFiltered)).filter((d) => !!d)
    )

    return Array.from(durations)
  }),

  countByDestination: baseProcedure
    .input(z.object({ destination: z.string() }))
    .query(async ({ ctx, input }) => {
      const countResult = await ctx.db.count({
        collection: "tour-travel",
        where: {
          destination: { equals: input.destination },
          isPublished: { equals: true },
        },
      })

      return { count: countResult.totalDocs }
    }),

  countByDuration: baseProcedure
    .input(z.object({ duration: z.string() }))
    .query(async ({ ctx, input }) => {
      const countResult = await ctx.db.count({
        collection: "tour-travel",
        where: {
          durationFiltered: { equals: input.duration },
          isPublished: { equals: true },
        },
      })

      return { count: countResult.totalDocs }
    }),
})
