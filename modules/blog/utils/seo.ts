import { Metadata } from "next"
import { BlogPost, Media, User } from "@/payload-types"

export function generateBlogSEO(
  post: BlogPost,
  baseUrl: string = "https://adventex.co.th"
): Metadata {
  const title = post.seo?.metaTitle || post.title
  const description =
    post.seo?.metaDescription ||
    post.excerpt ||
    `อ่านบทความ "${post.title}" จาก Adventex - เรื่องราวการเดินทางและการศึกษาในประเทศจีน`
  const keywords =
    post.seo?.keywords || "Adventex, บล็อก, เดินทาง, จีน, การศึกษา, ท่องเที่ยว"
  const url = `${baseUrl}/blog/${post.slug}`

  // Handle featured image with proper type checking
  let imageUrl = `${baseUrl}/images/og-default.jpg`
  if (post.featuredImage && typeof post.featuredImage === "object") {
    const featuredImage = post.featuredImage as Media
    if (featuredImage.url) {
      imageUrl = `${baseUrl}${featuredImage.url}`
    }
  }

  // Handle author with proper type checking
  let authorName = "Adventex"
  if (typeof post.author === "object") {
    const author = post.author as User
    authorName = author.email || "Adventex"
  }

  return {
    title: `${title} - Adventex Blog`,
    description,
    keywords,
    authors: [{ name: authorName }],
    creator: authorName,
    publisher: "Adventex International Group Co., Ltd.",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Adventex",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "th_TH",
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedAt,
      authors: [
        typeof post.author === "object" ? post.author.email : "Adventex",
      ],
      section: "Blog",
      tags: post.tags?.map((tag) => tag.tag) || [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@adventexeducation",
      site: "@adventexeducation",
    },
    robots: {
      index: post.status === "published",
      follow: post.status === "published",
      googleBot: {
        index: post.status === "published",
        follow: post.status === "published",
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  }
}

export function generateBlogListingSEO(
  page: number = 1,
  category?: string,
  tag?: string,
  baseUrl: string = "https://adventex.co.th"
): Metadata {
  let title = "Blog & Stories - Adventex"
  let description =
    "อ่านบทความและเรื่องราวการเดินทางที่น่าสนใจจาก Adventex - ค้นพบประสบการณ์การศึกษาและท่องเที่ยวในประเทศจีน"
  let url = `${baseUrl}/blog`

  if (category) {
    title = `Blog หมวด ${category} - Adventex`
    description = `อ่านบทความในหมวด ${category} จาก Adventex`
    url += `?category=${encodeURIComponent(category)}`
  }

  if (tag) {
    title = `Blog แท็ก ${tag} - Adventex`
    description = `อ่านบทความที่มีแท็ก ${tag} จาก Adventex`
    url += `${category ? "&" : "?"}tag=${encodeURIComponent(tag)}`
  }

  if (page > 1) {
    title += ` - หน้า ${page}`
    url += `${category || tag ? "&" : "?"}page=${page}`
  }

  return {
    title,
    description,
    keywords: "Adventex, บล็อก, เดินทาง, จีน, การศึกษา, ท่องเที่ยว, เรื่องราว",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Adventex",
      images: [
        {
          url: `${baseUrl}/images/blog-og.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "th_TH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/blog-og.jpg`],
      creator: "@adventexeducation",
      site: "@adventexeducation",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
