"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type PriceQuantity = {
  optionId: string
  quantity: number
}

type BookingData = {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  additionalInfo?: string
  acceptTerms?: boolean
  tourCode?: string
  departureId?: string
  quantities?: PriceQuantity[]
}

type BookingContextType = {
  bookingData: BookingData
  updateBookingData: (data: Partial<BookingData>) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>({})

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)

  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }

  return context
}
