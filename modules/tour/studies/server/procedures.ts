import { Media } from "@/payload-types"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

export const tourStudiesRouter = createTRPCRouter({
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
})
