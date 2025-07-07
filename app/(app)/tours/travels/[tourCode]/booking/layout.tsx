import type React from "react"

import { BookingProvider } from "@/modules/booking/hooks/booking-context"

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BookingProvider>{children}</BookingProvider>
}
