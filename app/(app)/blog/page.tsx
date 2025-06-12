import * as React from "react"
import { Metadata } from "next"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient, trpc } from "@/trpc/server"

import { BlogFilters } from "@/modules/blog/components/blog-filters"
import { BlogFiltersSkeleton } from "@/modules/blog/components/blog-filters-skeleton"
import { BlogListing } from "@/modules/blog/components/blog-listing"
import { generateBlogListingSEO } from "@/modules/blog/utils/seo"

export const metadata: Metadata = generateBlogListingSEO()

export default async function BlogPage() {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.blog.categories.queryOptions())

  return (
    <>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Blog & Stories
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          ค้นพบเรื่องราวการเดินทาง สถานที่ท่องเที่ยวที่น่าสนใจ
          และเทิปส์การเดินทางจากทีมงาน Adventex
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Suspense fallback={<BlogFiltersSkeleton />}>
          <BlogFilters />
        </React.Suspense>
      </HydrationBoundary>
      <BlogListing />
    </>
  )
}
