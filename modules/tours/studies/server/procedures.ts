import { Media, TourStudy } from "@/payload-types"
import { TRPCError } from "@trpc/server"
import { Where } from "payload"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

const sortValues = ["popular", "time", "price"] as const

// Helper function to convert month codes (e.g., "jan", "january") to month numbers (1-12)
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
  return monthMap[lowerCode] || -1 // Return -1 for invalid codes
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
        depth: 1, // Populates relationships like 'image'
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

      // 1. Price filter
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

      // 2. Type filter
      if (typeStr) {
        const typeValues = typeStr.split(",").filter(Boolean)
        if (typeValues.length > 0) {
          where.type = { in: typeValues }
        }
      }

      // 3. University filter
      if (universityStr) {
        const uniValues = universityStr.split(",").filter(Boolean)
        if (uniValues.length > 0) {
          // Assuming 'university' is a group field and 'code' is a sub-field.
          where["university.code"] = { in: uniValues }
        }
      }

      // 4. Season filter
      if (seasonStr) {
        const seasonValues = seasonStr.split(",").filter(Boolean)
        if (seasonValues.length > 0) {
          where.season = { in: seasonValues }
        }
      }

      // 5. Sorting
      // Default sort: most recently created
      let sortProperty: string = "-createdAt"
      if (sortKey) {
        switch (sortKey) {
          case "popular":
            sortProperty = "-isFeatured"
            break
          case "time":
            // Sorts by the 'startDate' field within the 'departureDates' array.
            // Payload's handling of sorting on nested array fields can be DB-dependent.
            // This attempts to sort by the earliest departure date in ascending order.
            // If this doesn't work as expected, in-memory sorting or a dedicated top-level field
            // for the earliest departure date would be more reliable.
            sortProperty = "departureDates.startDate" // Ascending for earliest
            break
          case "price":
            sortProperty = "basePrice" // Ascending for cheapest
            break
        }
      }

      // Fetch data from Payload
      const payloadData = await ctx.db.find({
        collection: "tour-studies",
        where,
        sort: sortProperty,
        depth: 1, // Populates relationships like 'image'
      })

      // Type assertion for docs after fetch
      let finalDocs = payloadData.docs as (TourStudy & {
        id: string
        image?: Media | string
      })[]

      // 6. In-memory Month filter (applied to the current page's results)
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
              // Ensure depDate.startDate is treated as a Date object
              const d = new Date(depDate.startDate)
              // JavaScript's getMonth() is 0-indexed (0 for January, 11 for December)
              return monthNumbers.includes(d.getMonth() + 1)
            })
          })
        }
      }

      // Note on pagination:
      // The pagination fields (totalDocs, totalPages, hasNextPage, etc.) from `payloadData`
      // are based on the query *before* the in-memory month filtering.
      // If month filtering reduces the number of documents on the current page,
      // these counts will not reflect the size of `finalDocs` for this specific page.
      // For fully accurate pagination with such client-side filtering,
      // one would typically fetch all matching documents, filter, then paginate the resulting array in memory,
      // which can be inefficient for large datasets.

      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay

      return {
        ...payloadData, // Spreads all pagination fields from Payload's response
        docs: finalDocs.map((doc) => ({
          ...doc,
          // The 'image' field is populated by depth:1.
          // If 'image' was an ID, it becomes an object.
          // Ensure the type cast is appropriate for your Media structure.
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
      depth: 1, // Populates relationships like 'image'
    })

    return {
      ...payloadData,
      docs: payloadData.docs.map((doc) => ({
        ...doc,
        // The 'image' field is populated by depth:1.
        // If 'image' was an ID, it becomes an object.
        // Ensure the type cast is appropriate for your Media structure.
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
        month: z.string().nullable().optional(), // Month codes like "jan", "feb"
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

      // If month is not specified, use efficient payload.count
      if (!monthStr) {
        const countResult = await ctx.db.count({
          collection: "tour-studies",
          where,
        })
        return { count: countResult.totalDocs }
      }

      // If month IS specified, we need to fetch and filter in memory
      // This can be inefficient for very large datasets.
      const results = await ctx.db.find({
        collection: "tour-studies",
        where,
        limit: 0, // Fetch all matching other criteria
        depth: 0, // No need to populate relationships for counting
        pagination: false, // Ensure we get all documents
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
    .input(z.object({ monthCode: z.string() })) // e.g., "jan", "feb"
    .query(async ({ ctx, input }) => {
      const monthNumber = monthCodeToQueryNumber(input.monthCode)
      if (monthNumber === -1) return { count: 0 }

      // Fetch all documents and filter in memory.
      // Potentially inefficient for very large datasets.
      const results = await ctx.db.find({
        collection: "tour-studies",
        limit: 0, // Fetch all
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
