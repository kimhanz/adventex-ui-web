import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/trpc/routers/app"

export type ListGalleries = inferRouterOutputs<AppRouter>["galleries"]["list"]
