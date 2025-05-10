import { Media } from "@/payload-types"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

export const galleriesRouter = createTRPCRouter({
  list: baseProcedure
    .input(
      z.object({
        cursor: z.coerce.number().default(1),
        limit: z.coerce.number().default(9),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "galleries",
        depth: 1,
        page: input.cursor,
        limit: input.limit,
      })

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media,
        })),
      }
    }),
})
