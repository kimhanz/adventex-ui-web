"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { CalendarIcon, Search } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getMonthName } from "../lib/utils"

export const SearchDestination = () => {
  const id = React.useId()

  const router = useRouter()

  const [date, setDate] = React.useState<DateRange | undefined>()

  const [university, setUniversity] = React.useState<string | undefined>()

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
  }

  const handleSubmit = () => {
    const newSearchParams = new URLSearchParams()

    if (date !== undefined)
      newSearchParams.set("month", getMonthName(date?.from?.getMonth()))
    if (university !== undefined)
      newSearchParams.set("university", String(university))

    router.push(`/tours/studies?${newSearchParams}`)
  }

  const formatThaiDate = (date: Date) => {
    return format(date, "dd MMMM", { locale: th })
  }

  const RenderDate = () => {
    if (!date?.from) {
      return <span>เลือกวันที่คาดว่าจะเดินทาง</span>
    }

    if (!date.to) {
      return <span>{formatThaiDate(date.from)}</span>
    }

    return (
      <span>
        {formatThaiDate(date.from)} - {formatThaiDate(date.to)}
      </span>
    )
  }

  return (
    <section className="container-wrapper">
      <div className="container py-4 xl:py-6 2xl:py-4">
        <div className="bg-background relative z-10 size-full overflow-hidden rounded-lg border p-4 sm:p-6 md:p-8">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label
                htmlFor={`destination-${id}`}
                className="block text-sm font-medium"
              >
                ปลายทาง
              </Label>
              <Select
                onValueChange={(value) => {
                  setUniversity(value)
                }}
              >
                <SelectTrigger
                  id={`destination-${id}`}
                  className="bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full shadow-none"
                >
                  <SelectValue placeholder="เลือกปลายทาง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hit">
                    Harbin Institute of Technology
                  </SelectItem>
                  <SelectItem value="hnu">Harbin Normal University</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor={`package-${id}`}
                className="block text-sm font-medium"
              >
                แพ็คเกจ
              </Label>
              <Select>
                <SelectTrigger
                  id={`package-${id}`}
                  className="bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full shadow-none"
                >
                  <SelectValue placeholder="เลือกแพ็คเกจที่ต้องการ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">แพ็คเกจเรียน</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor={`date-${id}`}
                className="block text-sm font-medium"
              >
                วันเดินทาง
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={`date-${id}`}
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-none",
                      !date ? "text-muted-foreground" : ""
                    )}
                  >
                    <CalendarIcon />
                    <RenderDate />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 shadow-none"
                  align="start"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleDateSelect}
                    numberOfMonths={2}
                    locale={th}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                className="text-background w-full bg-linear-to-b from-red-500 to-red-700 bg-[length:100%_100%] bg-[bottom] inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all hover:bg-[length:100%_150%]"
                onClick={handleSubmit}
              >
                <Search className="size-4" />
                <span>ค้นหา</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
