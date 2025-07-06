import type { CollectionConfig } from "payload"

export const TourTravels: CollectionConfig = {
  slug: "tour-travel",
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
      name: "duration",
      type: "text",
    },
    {
      name: "durationFiltered",
      type: "number",
    },
    {
      name: "destination",
      type: "text",
    },
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
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
      relationTo: "documents",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "departureDates",
      type: "array",
      admin: {
        position: "sidebar",
        initCollapsed: true,
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
        initCollapsed: true,
      },
      fields: [
        {
          name: "highlight",
          type: "text",
          required: true,
        },
      ],
    },
  ],
}
