"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useTRPC } from "@/trpc/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
})

type ContactFormData = z.infer<typeof ContactFormSchema>

export function ContactForm({ className }: React.ComponentProps<typeof Card>) {
  const trpc = useTRPC()

  const sendContactMutationOptions = trpc.contact.sendContact.mutationOptions()

  const sendContactMutation = useMutation({
    ...sendContactMutationOptions,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Successfully sending email")
      } else {
        toast.error(
          `Error sending confirmation email: ${data.message || "Unknown error"}`
        )
      }
    },
    onError: (error) => {
      toast.error(
        `An unexpected error occurred while sending email: ${error.message}`
      )
    },
  })

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
    },
    mode: "onTouched",
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (formData) => {
    const contactPayload = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }

    try {
      await sendContactMutation.mutateAsync(contactPayload)
    } catch (error) {
      console.error("Error during mutateAsync call:", error)
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>เราช่วยอะไรคุณได้บ้าง?</CardTitle>
        <CardDescription>
          ต้องการความช่วยเหลือเกี่ยวกับโครงการของคุณ? เรายินดีให้คำปรึกษา
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ชื่อ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อีเมล</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="อีเมล"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>หัวเรื่อง</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="เรื่องที่ต้องการติดต่อ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ข้อมูลเพิ่มเติม</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ข้อมูลเพิ่มเติม (ไม่จำเป็น)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="p-0">
              <Button
                type="submit"
                disabled={
                  sendContactMutation.isPending ||
                  !form.formState.isDirty ||
                  !form.formState.isValid
                }
                className="flex w-full items-center justify-center bg-red-500 text-white hover:bg-red-600 sm:w-auto"
              >
                {sendContactMutation.isPending ? (
                  <>
                    <Loader2 className="-mt-0.5 mr-2 h-4 w-4 animate-spin" />{" "}
                    <span>กำลังดำเนินการ...</span>
                  </>
                ) : (
                  <>
                    <span>ส่ง</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
