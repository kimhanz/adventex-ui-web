import * as React from "react"
import { Metadata } from "next"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient, trpc } from "@/trpc/server"

import { BlogFilters } from "@/modules/blog/components/blog-filters"
import { BlogListing } from "@/modules/blog/components/blog-listing"
import { BlogFiltersSkeleton } from "@/modules/blog/components/ui/skeleton/blog-filters-skeleton"
import { BlogListingSkeleton } from "@/modules/blog/components/ui/skeleton/blog-listing-skeleton"
import { generateBlogListingSEO } from "@/modules/blog/utils/seo"

export const metadata: Metadata = generateBlogListingSEO()

export default async function BlogPage() {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.blog.categories.queryOptions())

  return (
    <>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-4xl">
          บทความทั้งหมด
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          ค้นพบเรื่องราวการเดินทาง สถานที่ท่องเที่ยวที่น่าสนใจ
          และทิปส์การเดินทางจากทีมงาน Adventex
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Suspense fallback={<BlogFiltersSkeleton />}>
          <BlogFilters />
        </React.Suspense>
      </HydrationBoundary>

      <React.Suspense fallback={<BlogListingSkeleton />}>
        <BlogListing />
      </React.Suspense>
    </>
  )
}
