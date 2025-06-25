import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

function TourItemFooter({
  price,
  code,
  name,
}: {
  price: number
  code: string
  name: string
}) {
  return (
    <div className="bg-muted flex flex-col items-end justify-end px-2 py-4 md:flex-row">
      <div className="flex items-center gap-4 pt-4 md:pt-0">
        <div className="inline-flex items-end gap-x-2 text-right">
          <div className="text-muted-foreground text-sm">เริ่ม</div>
          <div className="bg-linear-to-b from-red-500 via-red-600 to-red-700 bg-clip-text text-3xl font-bold text-transparent">
            {price.toLocaleString()}
          </div>
        </div>

        <Button
          asChild
          className="text-background group bg-linear-to-b from-red-500 via-red-600 to-red-700 bg-[length:100%_100%] bg-[bottom] inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all hover:bg-[length:100%_150%]"
        >
          <Link
            title={name}
            href={`/tours/studies/${code}`}
          >
            <span>ดูรายละเอียด</span>
            <ArrowRight className="transform transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export { TourItemFooter }
