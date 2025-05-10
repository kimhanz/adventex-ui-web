import type { CollectionConfig } from "payload"

export const TourStudies: CollectionConfig = {
  slug: "tour-studies",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "code",
      type: "text",
      required: true,
    },
    {
      name: "basePrice",
      type: "number",
    },
    {
      name: "type",
      type: "text",
    },
    {
      name: "duration",
      type: "text",
    },
    {
      name: "season",
      type: "text",
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "brochure",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "departureDates",
      type: "array",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "startDate",
          type: "date",
          required: true,
        },
        {
          name: "endDate",
          type: "date",
          required: true,
        },
        {
          name: "priceOptions",
          type: "array",
          fields: [
            {
              name: "type",
              type: "text",
              required: true,
            },
            {
              name: "price",
              type: "number",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "highlights",
      type: "array",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "highlight",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "university",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "code",
          type: "text",
          required: true,
        },
      ],
    },
  ],
}
