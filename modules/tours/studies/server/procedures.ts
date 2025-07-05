import { Media, TourStudy } from "@/payload-types"
import { TRPCError } from "@trpc/server"
import { Where } from "payload"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

const sortValues = ["popular", "time", "price"] as const

const monthCodeToQueryNumber = (code: string): number => {
  const lowerCode = code.toLowerCase().substring(0, 3)
  const monthMap: Record<string, number> = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  }
  return monthMap[lowerCode] || -1
}

export const toursStudiesRouter = createTRPCRouter({
  get: baseProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ ctx, input }) => {
      const { code } = input
      const payloadData = await ctx.db.find({
        collection: "tour-studies",
        where: { code: { equals: code } },
        limit: 1,
        pagination: false,
        depth: 1,
      })

      if (payloadData.totalDocs === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Tour study with code ${code} not found`,
        })
      }

      return {
        ...payloadData.docs[0],
        image: payloadData.docs[0].image as Media,
        brochure: payloadData.docs[0].brochure as Media,
        university: {
          ...payloadData.docs[0].university,
          gallery: payloadData.docs[0].university.gallery?.map((item) => ({
            ...item,
            image: item.image as Media,
          })),
        },
      }
    }),

  list: baseProcedure
    .input(
      z.object({
        minPrice: z.coerce.number().nullable().optional(),
        maxPrice: z.coerce.number().nullable().optional(),
        type: z.string().nullable().optional(),
        university: z.string().nullable().optional(),
        season: z.string().nullable().optional(),
        month: z.string().nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        minPrice,
        maxPrice,
        type: typeStr,
        university: universityStr,
        season: seasonStr,
        month: monthStr,
        sort: sortKey,
      } = input

      const where: Where = {}

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

      if (typeStr) {
        const typeValues = typeStr.split(",").filter(Boolean)
        if (typeValues.length > 0) {
          where.type = { in: typeValues }
        }
      }

      if (universityStr) {
        const uniValues = universityStr.split(",").filter(Boolean)
        if (uniValues.length > 0) {
          where["university.code"] = { in: uniValues }
        }
      }

      if (seasonStr) {
        const seasonValues = seasonStr.split(",").filter(Boolean)
        if (seasonValues.length > 0) {
          where.season = { in: seasonValues }
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

      const payloadData = await ctx.db.find({
        collection: "tour-studies",
        where,
        sort: sortProperty,
        depth: 1,
        pagination: false,
      })

      let finalDocs = payloadData.docs as (TourStudy & {
        id: string
        image?: Media | string
      })[]

      if (monthStr) {
        const selectedMonths = monthStr.split(",").filter(Boolean)
        const monthNumbers = selectedMonths
          .map(monthCodeToQueryNumber)
          .filter((num) => num >= 1 && num <= 12)

        if (monthNumbers.length > 0) {
          finalDocs = finalDocs.filter((doc) => {
            if (!doc.departureDates || doc.departureDates.length === 0) {
              return false
            }
            return doc.departureDates.some((depDate) => {
              if (!depDate.startDate) return false
              const d = new Date(depDate.startDate)
              return monthNumbers.includes(d.getMonth() + 1)
            })
          })
        }
      }

      return {
        ...payloadData,
        docs: finalDocs.map((doc) => ({
          ...doc,
          image: doc.image as Media,
        })),
      }
    }),

  listReccommended: baseProcedure.query(async ({ ctx }) => {
    const payloadData = await ctx.db.find({
      collection: "tour-studies",
      where: { isFeatured: { equals: true } },
      limit: 3,
      pagination: false,
      depth: 1,
    })

    return {
      ...payloadData,
      docs: payloadData.docs.map((doc) => ({
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
        type: z.string().nullable().optional(),
        university: z.string().nullable().optional(),
        season: z.string().nullable().optional(),
        month: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        minPrice,
        maxPrice,
        type: typeStr,
        university: universityStr,
        season: seasonStr,
        month: monthStr,
      } = input

      const where: Where = {}

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

      if (typeStr) {
        const typeValues = typeStr.split(",").filter(Boolean)
        if (typeValues.length > 0) where.type = { in: typeValues }
      }
      if (universityStr) {
        const uniValues = universityStr.split(",").filter(Boolean)
        if (uniValues.length > 0) where["university.code"] = { in: uniValues }
      }
      if (seasonStr) {
        const seasonValues = seasonStr.split(",").filter(Boolean)
        if (seasonValues.length > 0) where.season = { in: seasonValues }
      }

      if (!monthStr) {
        const countResult = await ctx.db.count({
          collection: "tour-studies",
          where,
        })
        return { count: countResult.totalDocs }
      }

      const results = await ctx.db.find({
        collection: "tour-studies",
        where,
        limit: 0,
        depth: 0,
        pagination: false,
      })

      let filteredDocs = results.docs as TourStudy[]

      const selectedMonths = monthStr.split(",").filter(Boolean)
      const monthNumbers = selectedMonths
        .map(monthCodeToQueryNumber)
        .filter((num) => num >= 1 && num <= 12)

      if (monthNumbers.length > 0) {
        filteredDocs = filteredDocs.filter((doc) => {
          if (!doc.departureDates || doc.departureDates.length === 0)
            return false
          return doc.departureDates.some((depDate) => {
            if (!depDate.startDate) return false
            const d = new Date(depDate.startDate)
            return monthNumbers.includes(d.getMonth() + 1)
          })
        })
      }
      return { count: filteredDocs.length }
    }),

  countByType: baseProcedure
    .input(z.object({ type: z.string() }))
    .query(async ({ ctx, input }) => {
      const countResult = await ctx.db.count({
        collection: "tour-studies",
        where: { type: { equals: input.type } },
      })

      return { count: countResult.totalDocs }
    }),

  countByUniversity: baseProcedure
    .input(z.object({ universityCode: z.string() }))
    .query(async ({ ctx, input }) => {
      const countResult = await ctx.db.count({
        collection: "tour-studies",
        where: { "university.code": { equals: input.universityCode } },
      })

      return { count: countResult.totalDocs }
    }),

  countBySeason: baseProcedure
    .input(z.object({ season: z.string() }))
    .query(async ({ ctx, input }) => {
      const countResult = await ctx.db.count({
        collection: "tour-studies",
        where: { season: { equals: input.season } },
      })

      return { count: countResult.totalDocs }
    }),

  countByMonth: baseProcedure
    .input(z.object({ monthCode: z.string() }))
    .query(async ({ ctx, input }) => {
      const monthNumber = monthCodeToQueryNumber(input.monthCode)
      if (monthNumber === -1) return { count: 0 }

      const results = await ctx.db.find({
        collection: "tour-studies",
        limit: 0,
        depth: 0,
        pagination: false,
      })

      const filteredDocs = (results.docs as TourStudy[]).filter((doc) => {
        if (!doc.departureDates || doc.departureDates.length === 0) return false
        return doc.departureDates.some((depDate) => {
          if (!depDate.startDate) return false
          const d = new Date(depDate.startDate)
          return d.getMonth() + 1 === monthNumber
        })
      })

      return { count: filteredDocs.length }
    }),
})
