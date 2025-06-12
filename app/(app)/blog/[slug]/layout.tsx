import { Metadata } from "next"
import { createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/_app"

import { generateBlogSEO } from "@/modules/blog/utils/seo"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const caller = appRouter.createCaller(await createTRPCContext())
  const post = await caller.blog.get({ slug: params.slug })

  return generateBlogSEO(post)
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        {children}
      </main>
    </div>
  )
}
