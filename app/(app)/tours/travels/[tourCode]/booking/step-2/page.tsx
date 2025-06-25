"use client"

import { use, useEffect } from "react"
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

// Define Zod schema for the form
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
        router.push(`/tours/travels/${tourCode}/booking/step-3`)
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

  // Centralized redirection logic
  useEffect(() => {
    // Don't perform redirects if tour data is still loading
    if (isTourDataLoading) return

    // If tour data has finished loading but is not present, or essential bookingData.departureId is missing, redirect.
    if (!tourQueryData || !bookingData.departureId) {
      // console.log("Redirecting: Missing tourQueryData or bookingData.departureId");
      router.push(`/tours/travels/${tourCode}/booking`)
      return
    }

    // If tour data and departureId are present, but quantities are missing (another essential for this step), redirect.
    if (!bookingData.quantities?.length) {
      // console.log("Redirecting: Missing bookingData.quantities");
      router.push(`/tours/travels/${tourCode}/booking`)
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

  // Form submission handler
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
      to: "support@adventex.co.th", // Hardcoded as per user's last change
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
    router.push(`/tours/travels/${tourCode}/booking`)
  }

  // Conditional Rendering Logic
  if (isTourDataLoading) {
    // Skeleton UI from user's last changes
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

  // If data is not yet sufficient for rendering the form (useEffect should handle redirection)
  if (
    !tourQueryData ||
    !bookingData.departureId ||
    !bookingData.quantities?.length
  ) {
    return (
      <div className="py-4 text-center">Preparing booking information...</div>
    )
  }

  // All checks passed, render the form
  // (User's existing JSX for the form structure is preserved here)
  return (
    <>
      <header>
        <BookingBreadcrumb name={tourQueryData?.name || "N/A"} />
        <BookingInformation
          name={tourQueryData?.name || "N/A"}
          code={tourQueryData?.code || "N/A"}
          image={tourQueryData?.image}
        />
      </header>

      <div className="py-4 sm:py-8">
        <StepIndicator currentStep={2} />

        <div className="mt-6 sm:mt-8">
          <h1 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl">
            ขั้นตอนที่ 2: ตรวจสอบและกรอกข้อมูล
          </h1>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <div>
              <PriceSummary />

              <div className="mt-6 rounded-md border bg-gray-50 p-4 sm:mt-8 sm:p-6">
                <div className="flex items-start sm:items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base font-semibold sm:text-lg">
                      ให้เราช่วยคุณนะ
                    </h3>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      ยินดีตอบทุกคำถาม จันทร์-ศุกร์ 9.00น.-19.00น. และ
                      เสาร์-อาทิตย์ 9.00น.-18.00น. โทรหาเลย
                    </p>
                  </div>
                </div>
              </div>
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
                            ยอมรับเงื่อนไขการจอง
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
