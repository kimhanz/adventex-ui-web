import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/trpc/routers/_app"

export type ListTourStudies =
  inferRouterOutputs<AppRouter>["toursStudies"]["list"]
export type TourStudies = ListTourStudies["docs"][number]
