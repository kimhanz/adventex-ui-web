"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { BlogPost } from "@/payload-types"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { ArrowLeft, Calendar, Share2, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Dynamically import RichText with no SSR to avoid build issues
const RichText = dynamic(
  () =>
    import("@payloadcms/richtext-lexical/react").then((mod) => mod.RichText),
  {
    ssr: false,
    loading: () => <div className="text-gray-500">กำลังโหลดเนื้อหา...</div>,
  }
)

export function BlogDetail({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("ลิงก์ถูกคัดลอกแล้ว!")
    }
  }

  const renderRichText = (
    content: SerializedEditorState | string | null | undefined
  ) => {
    if (!content) return null

    // Use Payload's official Lexical RichText component
    try {
      // Check if content is already a Lexical SerializedEditorState
      if (typeof content === "object" && content !== null) {
        return (
          <div className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed max-w-none indent-8">
            <RichText data={content as SerializedEditorState} />
          </div>
        )
      }

      // Fallback for string content
      if (typeof content === "string") {
        return (
          <div
            className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed max-w-none indent-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )
      }

      return <p className="text-gray-500">เนื้อหาไม่สามารถแสดงได้</p>
    } catch (error) {
      console.error("Error rendering rich text:", error)
      return <p className="text-gray-500">เกิดข้อผิดพลาดในการแสดงเนื้อหา</p>
    }
  }

  return (
    <article>
      {/* Back button */}
      <div className="mb-6">
        <Link href="/blog">
          <Button
            variant="ghost"
            className="pl-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับไปหน้าบล็อก
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.categories?.map((cat, index) => (
            <Badge
              key={index}
              variant="secondary"
            >
              {cat.category}
            </Badge>
          ))}
        </div>

        <h1 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-gray-600">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="-mt-0.5 h-5 w-5" />
              <span>{formatDate(post.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="-mt-0.5 h-5 w-5" />
              <span>
                {typeof post.author === "object" ? post.author.email : "Admin"}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            แชร์
          </Button>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && typeof post.featuredImage === "object" && (
        <div className="mb-8">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <Image
              src={post.featuredImage.url || ""}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="mb-12">{renderRichText(post.content)}</div>

      {/* Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <div className="mb-12">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">
            แกลเลอรี่ภาพ
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {post.gallery.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none p-0 shadow-none"
              >
                {item.image && typeof item.image === "object" && (
                  <div className="relative aspect-square">
                    <Image
                      src={item.image.url || ""}
                      alt={item.image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-8">
          <h4 className="mb-3 text-lg font-semibold text-gray-900">แท็ก</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
              >
                #{tag.tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
