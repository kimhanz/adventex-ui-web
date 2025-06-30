import { TRPCError } from "@trpc/server"
import { Resend } from "resend"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

import AutoReplyEmail from "@/modules/emails/auto-reply"
import ContactFormEmail from "@/modules/emails/contact-form"

const resendApiKey = process.env.RESEND_API_KEY
const resend = new Resend(resendApiKey)

export const contactRouter = createTRPCRouter({
  sendContact: baseProcedure
    .input(
      z.object({
        name: z.string(),
        subject: z.string(),
        email: z.string().email(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const fromEmail = process.env.RESEND_FROM_EMAIL!

      const submittedAt = new Date().toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
      })

      try {
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: "support@adventex.co.th",
          subject: `Contact: ${input.name} - #${input.subject}`,
          react: ContactFormEmail({
            email: input.email,
            name: input.name,
            message: input.message || "",
            subject: input.subject,
            submittedAt,
          }),
        })

        if (error) {
          console.error(`Error sending email to support@adventex.co.th:`, error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              error.message || "Failed to send contact request email.",
            cause: error,
          })
        }

        console.log(
          `Contact request email sent to support@adventex.co.th, ID: ${data?.id}`
        )

        await resend.emails.send({
          from: "Adventex Support <support@adventex.co.th>",
          react: AutoReplyEmail({ name: input.name }),
          subject: "Thank you for contacting Adventex",
          to: input.email,
        })

        return {
          success: true,
          message: "Contact request email sent successfully.",
          emailId: data?.id,
        }
      } catch (err) {
        console.error(
          `Exception when sending email to support@adventex.co.th:`,
          err
        )
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
