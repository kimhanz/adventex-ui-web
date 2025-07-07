import { Media } from "@/payload-types"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

export const toursRouter = createTRPCRouter({
  search: baseProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { query } = input

      if (query.length < 2) {
        return {
          tourStudies: [],
          tourTravels: [],
        }
      }

      const [studies, travels] = await Promise.all([
        ctx.db.find({
          collection: "tour-studies",
          where: {
            name: { like: query },
          },
          limit: 5,
          depth: 1,
        }),
        ctx.db.find({
          collection: "tour-travel",
          where: {
            name: { like: query },
          },
          limit: 5,
          depth: 1,
        }),
      ])

      return {
        tourStudies: studies.docs.map((doc) => {
          return {
            ...doc,
            image: doc.image as Media,
          }
        }),
        tourTravels: travels.docs.map((doc) => {
          return {
            ...doc,
            image: doc.image as Media,
          }
        }),
      }
    }),
})
