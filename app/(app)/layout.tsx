import * as React from "react"
import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans_Thai } from "next/font/google"

import { META_THEME_COLORS, siteConfig } from "@/config/site"
import { CookieBanner } from "@/components/cookie-banner"
import { Providers } from "@/components/providers"
import { SiteFooter } from "@/modules/web/components/ui/site-footer"
import { SiteHeader } from "@/modules/web/components/ui/site-header"

import "./globals.css"

const fontSans = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} bg-background min-h-svh font-sans antialiased`}
      >
        <Providers>
          <div className="bg-background relative flex min-h-svh flex-col">
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
            <CookieBanner />
          </div>
        </Providers>
      </body>
    </html>
  )
}
