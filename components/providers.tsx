"use client"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import { TRPCReactProvider } from "@/trpc/client"

import { Toaster } from "@/components/ui/sonner"
import { PostHogProvider as PHProvider } from "@/components/posthog"
import { SuspendedPostHogPageView as PostHogPageView } from "@/components/posthog-page-view"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider>
      <PostHogPageView />
      <NuqsAdapter>
        <TRPCReactProvider>
          {children}
          <Toaster richColors />
        </TRPCReactProvider>
      </NuqsAdapter>
    </PHProvider>
  )
}
