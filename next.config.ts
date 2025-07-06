import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Transpile Payload (and its internal deps) so SWC can handle ESM in node_modules
  transpilePackages: ["payload"],

  // Opt‑in Turbopack for faster incremental rebuilds (can be fine‑tuned later)
  turbopack: {},

  // Strip out Node‑only built‑ins from the client bundle to shrink size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
      }
    }
    return config
  },
}

export default withPayload(nextConfig)
