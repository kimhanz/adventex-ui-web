"use client"

import Image from "next/image"
import Link from "next/link"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

function FeaturedBlogs() {
  const trpc = useTRPC()
  const { data: posts = [] } = useSuspenseQuery(
    trpc.blog.featured.queryOptions({ limit: 3 })
  )

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            บทความล่าสุด
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            อ่านเรื่องราวการเดินทางและสถานที่ท่องเที่ยวที่น่าสนใจ
          </p>
        </div>

        <Carousel
          opts={{ align: "center" }}
          className="cursor-grab"
        >
          <CarouselContent>
            {posts.map((post) => (
              <CarouselItem
                key={post.id}
                className="max-sm:flex max-sm:items-center max-sm:justify-center md:basis-1/2 lg:basis-1/3"
              >
                <Card className="group border-none p-0 shadow-none transition-shadow duration-300">
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

                  <CardContent className="p-0 px-2 py-2">
                    <Link
                      title={post.title}
                      href={`/blog/${post.slug}`}
                    >
                      <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-semibold text-gray-900 transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    {post.excerpt && (
                      <p className="mb-4 line-clamp-3 text-gray-600">
                        {post.excerpt}
                      </p>
                    )}

                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((cat, index) => (
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export { FeaturedBlogs }
