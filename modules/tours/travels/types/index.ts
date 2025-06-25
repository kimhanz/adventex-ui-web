import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/trpc/routers/_app"

export type ListTourTravels =
  inferRouterOutputs<AppRouter>["toursTravels"]["list"]
export type TourTravels = ListTourTravels["docs"][number]
