"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ArrowRight, Calendar, User } from "lucide-react"
import { useTRPC } from "@/trpc/client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturedBlogs() {
  const trpc = useTRPC()
  const { data: posts = [] } = useSuspenseQuery(
    trpc.blog.featured.queryOptions({ limit: 3 })
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group transition-shadow duration-300 hover:shadow-lg"
            >
              <Link href={`/blog/${post.slug}`}>
                {post.featuredImage &&
                  typeof post.featuredImage === "object" && (
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={post.featuredImage.url || ""}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.publishedDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {typeof post.author === "object"
                        ? post.author.email
                        : "Admin"}
                    </div>
                  </div>

                  <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-semibold text-gray-900 transition-colors">
                    {post.title}
                  </h3>

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
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button
              size="lg"
              className="group"
            >
              ดูบทความทั้งหมด
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
