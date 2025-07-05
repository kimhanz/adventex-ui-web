"use client"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { useBlogFilters } from "../hooks/use-blog-filters"
import { BlogListingSkeleton } from "./ui/skeleton/blog-listing-skeleton"

function BlogListing() {
  const [filters] = useBlogFilters()

  const trpc = useTRPC()
  const { data, isLoading } = useQuery(
    trpc.blog.list.queryOptions({
      category: filters.category || undefined,
      tag: filters.tag || undefined,
    })
  )

  if (isLoading) {
    return <BlogListingSkeleton />
  }

  if (!data) {
    return (
      <div className="col-span-full py-12 text-center">
        <p className="text-lg text-gray-500">ไม่พบบทความในหมวดหมู่นี้</p>
      </div>
    )
  }

  if (data.posts.length === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <p className="text-lg text-gray-500">ไม่พบบทความในหมวดหมู่นี้</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.posts.map((post) => (
        <Card
          key={post.id}
          className="group relative isolate border-solid p-0 pb-2 shadow-md transition-shadow duration-300"
        >
          <Link
            title={post.title}
            href={`/blog/${post.slug}`}
            className="relative aspect-video overflow-hidden rounded-t-lg"
          >
            <Image
              src={post.featuredImage?.url || "/placeholder.svg"}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <CardContent className="p-0 px-2">
            <h3 className="group-hover:text-primary mb-3 text-xl font-semibold text-gray-900 transition-colors">
              <Link
                title={post.title}
                href={`/blog/${post.slug}`}
              >
                <span className="absolute inset-0 z-10"></span>
                {post.title}
              </Link>
            </h3>

            {post.excerpt && (
              <p className="mb-4 line-clamp-3 text-gray-600">{post.excerpt}</p>
            )}

            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs"
                  >
                    {cat.category}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export { BlogListing }
