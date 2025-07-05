"use client"

import { use, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ArrowRight, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useTRPC } from "@/trpc/client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { BookingBreadcrumb } from "@/modules/booking/components/ui/BookingBreadcrumb"
import { BookingInformation } from "@/modules/booking/components/ui/BookingInformation"
import { PriceSummary } from "@/modules/booking/components/ui/PriceSummary"
import { StepIndicator } from "@/modules/booking/components/ui/StepIndicator"
import { useBooking } from "@/modules/booking/hooks/BookingContext"

const BookingFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  additionalInfo: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

type BookingFormData = z.infer<typeof BookingFormSchema>

export default function Step2(props: {
  params: Promise<{ tourCode: string }>
}) {
  const { tourCode } = use(props.params)
  const router = useRouter()
  const { bookingData, updateBookingData } = useBooking()
  const trpc = useTRPC()

  const tourQueryOptions = trpc.toursStudies.get.queryOptions({
    code: tourCode,
  })
  const {
    data: tourQueryData,
    isLoading: isTourDataLoading,
    error: tourDataError,
  } = useQuery(tourQueryOptions)

  const sendEmailMutationOptions =
    trpc.booking.sendBookingConfirmation.mutationOptions()

  const sendEmailMutation = useMutation({
    ...sendEmailMutationOptions,
    onSuccess: (data) => {
      if (data.success) {
        router.push(`/tours/studies/${tourCode}/booking/step-3`)
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

  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      firstName: bookingData.firstName || "",
      lastName: bookingData.lastName || "",
      phone: bookingData.phone || "",
      email: bookingData.email || "",
      additionalInfo: bookingData.additionalInfo || "",
      acceptTerms: bookingData.acceptTerms || false,
    },
    mode: "onTouched",
  })

  useEffect(() => {
    if (isTourDataLoading) return

    if (!tourQueryData || !bookingData.departureId) {
      router.push(`/tours/studies/${tourCode}/booking`)
      return
    }

    if (!bookingData.quantities?.length) {
      router.push(`/tours/studies/${tourCode}/booking`)
      return
    }
  }, [
    isTourDataLoading,
    tourQueryData,
    bookingData.departureId,
    bookingData.quantities,
    router,
    tourCode,
  ])

  const onSubmit: SubmitHandler<BookingFormData> = async (formData) => {
    updateBookingData(formData)

    if (!tourQueryData || !bookingData.departureId) {
      toast.error("Booking information is incomplete. Please try again.")
      console.error("onSubmit called with incomplete data despite checks.")
      return
    }

    const tourName = tourQueryData.name || "Your Selected Tour"
    let departureDateString = "Date to be confirmed"
    const selectedDeparture = tourQueryData.departureDates?.find(
      (dep) => dep.id === bookingData.departureId
    )
    if (selectedDeparture?.startDate) {
      try {
        departureDateString = new Date(
          selectedDeparture.startDate
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      } catch (e) {
        console.error("Error formatting date:", e)
        departureDateString = selectedDeparture.startDate
      }
    }
    const emailBookingId: string = bookingData.departureId
    const emailPayload = {
      to: "support@adventex.co.th",
      customerName: `${formData.firstName} ${formData.lastName}`,
      tourName: tourName,
      bookingId: emailBookingId,
      departureDate: departureDateString,
    }
    try {
      await sendEmailMutation.mutateAsync(emailPayload)
    } catch (error) {
      console.error("Error during mutateAsync call:", error)
    }
  }

  const handleBack = () => {
    router.push(`/tours/studies/${tourCode}/booking`)
  }

  if (isTourDataLoading) {
    return (
      <div className="container py-4 sm:py-8">
        <div className="mx-auto max-w-3xl">
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="mt-6 sm:mt-8">
          <Skeleton className="mb-6 h-8 w-64 sm:mb-8" />
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <div>
              <div className="w-full overflow-hidden rounded-md border border-gray-100 shadow-sm">
                <div className="space-y-4 p-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
                <Skeleton className="h-10 w-full sm:w-32" />
                <Skeleton className="h-10 w-full sm:w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (tourDataError) {
    return (
      <div className="py-4 text-center text-[#DC2626] sm:py-8">
        Error loading tour details: {tourDataError.message}
      </div>
    )
  }

  if (
    !tourQueryData ||
    !bookingData.departureId ||
    !bookingData.quantities?.length
  ) {
    return (
      <div className="py-4 text-center">Preparing booking information...</div>
    )
  }

  return (
    <>
      <header className="flex flex-col space-y-4 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
        <BookingBreadcrumb name={tourQueryData?.name || "N/A"} />
        <BookingInformation
          name={tourQueryData?.name || "N/A"}
          code={tourQueryData?.code || "N/A"}
          image={tourQueryData?.image}
        />
      </header>

      <div className="px-4 py-4 !pt-0 sm:px-6 sm:py-6">
        <StepIndicator currentStep={2} />

        <div className="mt-6 sm:mt-8">
          <h1 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl">
            ขั้นตอนที่ 2: ตรวจสอบและกรอกข้อมูล
          </h1>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <div>
              <PriceSummary />
            </div>

            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>นามสกุล</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="นามสกุล"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เบอร์โทรศัพท์</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="เบอร์โทรศัพท์"
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
                    name="additionalInfo"
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

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-3 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="acceptTerms"
                          />
                        </FormControl>
                        <div className="space-y-0.5 leading-none">
                          <FormLabel
                            htmlFor="acceptTerms"
                            className="cursor-pointer"
                          >
                            ฉันอ่านข้อตกลงเรียบร้อยแล้วและยอมรับในเงื่อนไขนี้
                            <Link
                              href="/legal/term-conditions"
                              className="text-[#1877f2]"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Terms & Agreements
                            </Link>
                          </FormLabel>
                        </div>
                        <FormMessage className="ml-auto" />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="w-full sm:w-auto"
                      disabled={
                        sendEmailMutation.isPending || isTourDataLoading
                      }
                    >
                      ย้อนกลับ
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        sendEmailMutation.isPending ||
                        isTourDataLoading ||
                        !form.formState.isDirty ||
                        !form.formState.isValid
                      }
                      className="group flex w-full items-center justify-center bg-red-500 text-white hover:bg-red-600 sm:w-auto"
                    >
                      {sendEmailMutation.isPending || isTourDataLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          กำลังดำเนินการ...
                        </>
                      ) : (
                        <>
                          ดำเนินการต่อ{" "}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
