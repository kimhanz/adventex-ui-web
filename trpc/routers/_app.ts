import { blogRouter } from "@/modules/blog/server/procedures"
import { bookingRouter } from "@/modules/booking/server/procedures"
import { contactRouter } from "@/modules/contact/server/procedures"
import { galleriesRouter } from "@/modules/galleries/server/procedures"
import { tourStudiesRouter } from "@/modules/tour/studies/server/procedures"
import { toursStudiesRouter } from "@/modules/tours/studies/server/procedures"

import { createTRPCRouter } from "../init"

export const appRouter = createTRPCRouter({
  blog: blogRouter,
  tourStudies: tourStudiesRouter,
  toursStudies: toursStudiesRouter,
  booking: bookingRouter,
  contact: contactRouter,
  galleries: galleriesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
