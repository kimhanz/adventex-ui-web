import * as React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/_app"

import { Button } from "@/components/ui/button"
import { generateBlogSEO } from "@/modules/blog/utils/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const caller = appRouter.createCaller(await createTRPCContext())
  const post = await caller.blog.get({ slug: (await params).slug })

  return generateBlogSEO(post)
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex flex-col gap-y-8">
      <Link href="/blog">
        <Button
          variant="ghost"
          className="pl-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>กลับไปยังหน้าบทความ</span>
        </Button>
      </Link>

      {children}
    </article>
  )
}
