import { CollectionConfig } from "payload"

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: {
    singular: "Blog Post",
    plural: "Blog Posts",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedDate", "status"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "ชื่อบทความ",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug (URL)",
      required: true,
      unique: true,
    },
    {
      name: "content",
      type: "richText",
      label: "เนื้อหา",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "คำอธิบายสั้น",
      maxLength: 300,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "รูปภาพหลัก",
    },
    {
      name: "gallery",
      type: "array",
      label: "แกลเลอรี่ภาพ",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "caption",
          type: "text",
          label: "คำบรรยายภาพ",
        },
      ],
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "ผู้เขียน",
      required: true,
    },
    {
      name: "categories",
      type: "array",
      label: "หมวดหมู่",
      fields: [
        {
          name: "category",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "tags",
      type: "array",
      label: "แท็ก",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "publishedDate",
      type: "date",
      label: "วันที่เผยแพร่",
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: "status",
      type: "select",
      label: "สถานะ",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
        {
          label: "Archived",
          value: "archived",
        },
      ],
      defaultValue: "draft",
      required: true,
    },
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Title",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Description",
          maxLength: 160,
        },
        {
          name: "keywords",
          type: "text",
          label: "Keywords",
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          if (data.title && !data.slug) {
            // Auto-generate slug from title
            data.slug = data.title
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .trim()
          }
        }
        return data
      },
    ],
  },
}
