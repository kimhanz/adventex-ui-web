import Image from "next/image"
import { Media } from "@/payload-types"

function BookingInformation({
  name,
  code,
  image,
}: {
  name: string
  code: string
  image?: Media
}) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-between sm:flex-row sm:items-center">
      <div className="flex h-full w-full items-start sm:w-auto">
        <div className="relative mr-3 h-16 w-16 shrink-0 sm:mr-4 sm:h-20 sm:w-20">
          <Image
            src={image?.url || "/placeholder.svg"}
            alt={image?.alt || "Tour Image"}
            width={80}
            height={80}
            className="rounded object-contain"
          />
        </div>
        <div className="h-full w-full min-w-0 flex-1 text-start">
          <div className="py-2 text-lg font-bold text-[#DC2626] sm:text-xl md:text-2xl">
            <span className="py-2 text-xs text-neutral-400 sm:text-lg">
              รหัสทัวร์
            </span>{" "}
            {code}
          </div>
          <h1 className="line-clamp-2 text-base font-semibold sm:line-clamp-none sm:text-lg md:text-xl">
            {name}
          </h1>
        </div>
      </div>
    </div>
  )
}

export { BookingInformation }
