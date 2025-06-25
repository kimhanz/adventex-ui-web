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
    <div className="mt-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <div className="flex w-full items-start sm:w-auto">
        <div className="relative mr-3 h-16 w-20 shrink-0 sm:mr-4 sm:h-20 sm:w-24">
          <Image
            src={image?.url || "/placeholder.svg"}
            alt={image?.alt || "Tour Image"}
            width={96}
            height={80}
            className="rounded object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center sm:mb-2">
            <Image
              src="/thai-airline-thumbnail.png"
              alt="VietJetAir.com"
              width={100}
              height={20}
              className="h-5 object-contain sm:h-auto"
            />
          </div>
          <h1 className="line-clamp-2 text-base font-bold sm:line-clamp-none sm:text-lg md:text-xl">
            {name}
          </h1>
        </div>
      </div>
      <div className="mt-3 flex w-full items-center justify-between text-right sm:mt-0 sm:block sm:w-auto">
        <div className="text-xs text-neutral-600 sm:text-sm">รหัสทัวร์</div>
        <div className="text-lg font-bold text-[#DC2626] sm:text-xl md:text-2xl">
          {code}
        </div>
      </div>
    </div>
  )
}

export { BookingInformation }
