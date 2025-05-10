import { TRPCError } from "@trpc/server"
import { Resend } from "resend"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

import { BookingConfirmationEmail } from "@/modules/emails/BookingConfirmationEmail"

const resendApiKey = process.env.RESEND_API_KEY
const resend = new Resend(resendApiKey)

export const bookingRouter = createTRPCRouter({
  sendBookingConfirmation: baseProcedure
    .input(
      z.object({
        to: z.string().email(),
        customerName: z.string(),
        tourName: z.string(),
        bookingId: z.string(),
        departureDate: z.string(),
        bookingDetailsUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        to,
        customerName,
        tourName,
        bookingId,
        departureDate,
        bookingDetailsUrl,
      } = input

      const fromEmail = process.env.RESEND_FROM_EMAIL!

      try {
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: [to],
          subject: `Booking Confirmation: ${tourName} - #${bookingId}`,
          react: BookingConfirmationEmail({
            customerName,
            tourName,
            bookingId,
            departureDate,
            bookingDetailsUrl,
          }),
        })

        if (error) {
          console.error(`Error sending email to ${to}:`, error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              error.message || "Failed to send booking confirmation email.",
            cause: error,
          })
        }

        console.log(`Booking confirmation email sent to ${to}, ID: ${data?.id}`)
        return {
          success: true,
          message: "Booking confirmation email sent successfully.",
          emailId: data?.id,
        }
      } catch (err) {
        console.error(`Exception when sending email to ${to}:`, err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            err instanceof Error
              ? err.message
              : "An unexpected error occurred while sending the email.",
          cause: err,
        })
      }
    }),
})
