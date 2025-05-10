import type { CollectionConfig } from "payload"

export const Galleries: CollectionConfig = {
  slug: "galleries",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
}
