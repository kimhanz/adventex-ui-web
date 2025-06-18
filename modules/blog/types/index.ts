import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/trpc/routers/_app"

export type ListBlog = inferRouterOutputs<AppRouter>["blog"]["list"]
export type BlogDetail = inferRouterOutputs<AppRouter>["blog"]["get"]
