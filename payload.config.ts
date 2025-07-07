import path from "path"
import { fileURLToPath } from "url"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { resendAdapter } from "@payloadcms/email-resend"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import { uploadthingStorage } from "@payloadcms/storage-uploadthing"
import { buildConfig } from "payload"
import sharp from "sharp"

import { BlogPosts } from "./collections/blog-posts"
import { Documents } from "./collections/Documents"
import { Galleries } from "./collections/Galleries"
import { Media } from "./collections/Media"
import { TourStudies } from "./collections/tour-studies"
import { TourTravels } from "./collections/tour-travels"
import { Users } from "./collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL!],
  csrf: ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL!],
  collections: [
    Users,
    Media,
    Documents,
    TourStudies,
    TourTravels,
    Galleries,
    BlogPosts,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: true,
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET!,
        },
        endpoint: process.env.S3_ENDPOINT!,
        region: "auto",
      },
    }),
    uploadthingStorage({
      enabled: true,
      collections: {
        documents: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN!,
        acl: "public-read",
      },
    }),
  ],
  email: resendAdapter({
    defaultFromName: "Adventex",
    defaultFromAddress: "support@adventex.co.th",
    apiKey: process.env.RESEND_API_KEY!,
  }),
})
