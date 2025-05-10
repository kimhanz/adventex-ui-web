import Image from "next/image"

function TourInformationHeader() {
  return (
    <div className="relative h-[300px] w-full">
      <div className="text-background absolute bottom-4 left-4 z-10 bg-red-500 px-3 py-1.5 text-sm font-medium">
        ทัวร์จีน
      </div>
      <Image
        src="/placeholder.svg?height=300&width=1200"
        alt="ทัวร์จีน"
        width={1200}
        height={300}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  )
}

export { TourInformationHeader }
