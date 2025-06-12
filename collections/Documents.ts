import type { CollectionConfig } from "payload"

export const Documents: CollectionConfig = {
  slug: "documents",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
}
