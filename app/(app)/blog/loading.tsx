import { BlogFiltersSkeleton } from "@/modules/blog/components/blog-filters-skeleton"
import { BlogListingSkeleton } from "@/modules/blog/components/blog-listing-skeleton"

export default function BlogLoading() {
  return (
    <div className="container py-4">
      <BlogFiltersSkeleton />
      <BlogListingSkeleton />
    </div>
  )
}
