"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { BlogPost } from "@/payload-types"
import { Calendar, Edit, Eye, Plus, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getBlogPosts } from "@/modules/blog/actions"

export function BlogAdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const loadPosts = useCallback(async () => {
    setLoading(true)
    try {
      // Note: You might need to create an admin version of getBlogPosts that includes draft posts
      const result = await getBlogPosts(currentPage, 10)
      setPosts(result.posts)
      setTotalPages(result.totalPages)
    } catch (error) {
      console.error("Error loading posts:", error)
    }
    setLoading(false)
  }, [currentPage])

  useEffect(() => {
    loadPosts()
  }, [loadPosts, statusFilter])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "เผยแพร่แล้ว"
      case "draft":
        return "แบบร่าง"
      case "archived":
        return "เก็บถาวร"
      default:
        return status
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-gray-900">จัดการบล็อก</h1>
          <Button asChild>
            <Link href="/admin/collections/blog-posts/create">
              <Plus className="mr-2 h-4 w-4" />
              สร้างบทความใหม่
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="ค้นหาบทความ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="published">เผยแพร่แล้ว</SelectItem>
              <SelectItem value="draft">แบบร่าง</SelectItem>
              <SelectItem value="archived">เก็บถาวร</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card
              key={i}
              className="animate-pulse"
            >
              <CardContent className="p-6">
                <div className="mb-2 h-4 rounded bg-gray-200" />
                <div className="mb-4 h-4 w-2/3 rounded bg-gray-200" />
                <div className="mb-2 h-3 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Blog Posts List */}
          <div className="mb-8 space-y-4">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <Badge className={getStatusColor(post.status)}>
                          {getStatusText(post.status)}
                        </Badge>
                      </div>

                      {post.excerpt && (
                        <p className="mb-3 line-clamp-2 text-gray-600">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {typeof post.author === "object"
                            ? post.author.email
                            : "Admin"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.publishedDate)}
                        </div>
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex gap-1">
                            {post.categories.slice(0, 2).map((cat, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {cat.category}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {post.status === "published" && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href={`/admin/collections/blog-posts/${post.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ก่อนหน้า
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-10"
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ถัดไป
              </Button>
            </div>
          )}

          {filteredPosts.length === 0 && !loading && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="mb-4 text-gray-500">
                  ไม่พบบทความที่ตรงกับการค้นหา
                </p>
                <Button asChild>
                  <Link href="/admin/collections/blog-posts/create">
                    <Plus className="mr-2 h-4 w-4" />
                    สร้างบทความแรก
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
