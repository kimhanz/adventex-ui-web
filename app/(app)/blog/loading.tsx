import { BlogFiltersSkeleton } from "@/modules/blog/components/ui/skeleton/blog-filters-skeleton"
import { BlogListingSkeleton } from "@/modules/blog/components/ui/skeleton/blog-listing-skeleton"

export default function BlogLoading() {
  return (
    <>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          บทความทั้งหมด
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          ค้นพบเรื่องราวการเดินทาง สถานที่ท่องเที่ยวที่น่าสนใจ
          และทิปส์การเดินทางจากทีมงาน Adventex
        </p>
      </div>

      <BlogFiltersSkeleton />
      <BlogListingSkeleton />
    </>
  )
}
