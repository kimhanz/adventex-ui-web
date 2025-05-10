import type React from "react"

import { BookingProvider } from "@/modules/booking/hooks/BookingContext"

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BookingProvider>{children}</BookingProvider>
}
