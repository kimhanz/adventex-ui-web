import "server-only" // <-- ensure this file cannot be imported from the client

import { cache } from "react"
import { createTRPCClient, httpLink } from "@trpc/client"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"

import { createTRPCContext } from "./init"
import { makeQueryClient } from "./query-client"
import { appRouter } from "./routers/_app"

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
})

// If your router is on a separate server, pass a client:
createTRPCOptionsProxy({
  client: createTRPCClient({
    links: [
      httpLink({
        url: process.env.TRPC_SERVER_URL || "http://localhost:3000/api/trpc",
      }),
    ],
  }),
  queryClient: getQueryClient,
})
