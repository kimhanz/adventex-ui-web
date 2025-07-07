import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/trpc/routers/app"

export type TourTravel = inferRouterOutputs<AppRouter>["tourTravels"]["get"]

export type ListTourTravelRecommended =
  inferRouterOutputs<AppRouter>["tourTravels"]["listReccommended"]
export type TourStudiesRecommended = ListTourTravelRecommended["docs"][number]
