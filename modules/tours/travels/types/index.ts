import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/trpc/routers/app"

export type ListTourTravels =
  inferRouterOutputs<AppRouter>["toursTravels"]["list"]
export type TourTravels = ListTourTravels["docs"][number]
