"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { setCookieConsent } from "@/components/posthog"

export function CookieBanner() {
  const [showCookieBanner, setShowCookieBanner] = React.useState(false)

  // Check if cookie consent is already given
  React.useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent-accepted")
    setShowCookieBanner(cookieConsent !== "true")
  }, [])

  const handleAcceptCookies = () => {
    // Set cookie consent
    setCookieConsent(true)
    setShowCookieBanner(false)
  }

  if (!showCookieBanner) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-screen-sm">
      <div className="bg-background rounded-md border px-4 py-3 shadow-lg">
        <div className="flex flex-col gap-4">
          <p className="text-lg font-medium">ความยินยอมข้อมูลส่วนบุคคล</p>
          <p className="text-sm">
            เรามีการใช้คุกกี้ที่มีความจำเป็นอย่างยิ่ง
            หรือเพื่อการทำงานของเว็บไซต์ และเครื่องมืออื่นๆ
            เพื่อช่วยเพิ่มประสบการณ์การใช้งานให้แก่คุณ
            <Link
              href="/legal/cookies"
              className={cn(
                buttonVariants({ variant: "link" }),
                "inline-flex h-fit w-fit p-0"
              )}
            >
              เรียนรู้เพิ่มเติม.
            </Link>
          </p>
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleAcceptCookies}
              className="bg-[#DC2626] hover:bg-[#DC2626]/70 focus:bg-[#DC2626]/95"
            >
              ยอมรับ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
