import { Metadata } from "next"
import { createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/_app"

import { BlogDetail } from "@/modules/blog/components/blog-detail"
import { generateBlogSEO } from "@/modules/blog/utils/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}): Promise<Metadata> {
  const { slug } = await params

  const caller = appRouter.createCaller(await createTRPCContext())
  const post = await caller.blog.get({ slug })

  return generateBlogSEO(post)
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const caller = appRouter.createCaller(await createTRPCContext())
  const post = await caller.blog.get({ slug: params.slug })

  return <BlogDetail post={post} />
}
