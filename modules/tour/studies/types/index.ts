import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/trpc/routers/_app"

export type TourStudy = inferRouterOutputs<AppRouter>["toursStudies"]["get"]

export type ListTourStudiesRecommended =
  inferRouterOutputs<AppRouter>["toursStudies"]["listReccommended"]
export type TourStudiesRecommended = ListTourStudiesRecommended["docs"][number]
