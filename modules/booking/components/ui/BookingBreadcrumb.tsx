"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

function BookingBreadcrumb({
  name,
  isLoading = false,
}: {
  name: string
  isLoading?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  const isMobile = useIsMobile()

  // Loading state for mobile
  if (isLoading) {
    return (
      <>
        <div className="flex items-center md:hidden">
          <Skeleton className="mr-2 h-10 w-10" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="hidden md:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Skeleton className="h-6 w-24" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Skeleton className="h-6 w-24" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Skeleton className="h-6 w-40" />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </>
    )
  }

  // Mobile and Tablet Navigation
  if (isMobile) {
    return (
      <div className="flex items-center md:hidden">
        <Sheet
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] pt-10 sm:w-[350px]"
          >
            <nav className="mt-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm hover:bg-neutral-100"
                onClick={() => setIsOpen(false)}
              >
                <span>หน้าแรก</span>
              </Link>
              <Link
                href="/tours/studies"
                className="rounded-md px-3 py-2 text-sm hover:bg-neutral-100"
                onClick={() => setIsOpen(false)}
              >
                <span>ทัวร์เรียน</span>
              </Link>

              <div className="my-2 border-t pt-2">
                <div className="px-3 py-2 text-sm text-neutral-500">
                  ทัวร์ปัจจุบัน:
                </div>
                <div className="px-3 py-2 text-sm font-medium">{name}</div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/">
          <span className="text-sm">หน้าแรก</span>
        </Link>
      </div>
    )
  }

  // Normal render state
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden items-center justify-between md:flex md:flex-row">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <span>หน้าแรก</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/tours/studies">ทัวร์เรียน</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[300px] truncate lg:max-w-none">
                {name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  )
}

export { BookingBreadcrumb }
