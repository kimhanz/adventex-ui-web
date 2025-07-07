import { blogRouter } from "@/modules/blog/server/procedures"
import { bookingRouter } from "@/modules/booking/server/procedures"
import { contactRouter } from "@/modules/contact/server/procedures"
import { galleriesRouter } from "@/modules/galleries/server/procedures"
import { tourStudiesRouter } from "@/modules/tour/studies/server/procedures"
import { tourTravelRouter } from "@/modules/tour/travels/server/procedures"
import { toursRouter } from "@/modules/tours/server/procedures"
import { toursStudiesRouter } from "@/modules/tours/studies/server/procedures"
import { toursTravelsRouter } from "@/modules/tours/travels/server/procedures"

import { createTRPCRouter } from "../init"

export const appRouter = createTRPCRouter({
  blog: blogRouter,
  booking: bookingRouter,
  contact: contactRouter,
  galleries: galleriesRouter,
  tours: toursRouter,
  tourStudies: tourStudiesRouter,
  toursStudies: toursStudiesRouter,
  tourTravels: tourTravelRouter,
  toursTravels: toursTravelsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
