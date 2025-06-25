import { Media } from "@/payload-types"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

export const tourTravelRouter = createTRPCRouter({
  get: baseProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ ctx, input }) => {
      const results = await ctx.db.find({
        collection: "tour-travel",
        where: {
          code: {
            equals: input.code,
          },
          isPublished: {
            equals: true,
          },
        },
        limit: 1,
        pagination: false,
        depth: 1,
      })

      if (results.totalDocs === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Not found tour travel with code ${input.code}`,
        })
      }

      return {
        ...results.docs[0],
        image: results.docs[0].image as Media,
        brochure: results.docs[0].brochure as Media,
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
})
