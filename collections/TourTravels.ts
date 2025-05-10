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
      name: "destination",
      type: "text",
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
        },
        {
          name: "endDate",
          type: "date",
        },
        {
          name: "priceOptions",
          type: "array",
          fields: [
            {
              name: "type",
              type: "text",
            },
            {
              name: "price",
              type: "number",
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
        },
      ],
    },
  ],
}
