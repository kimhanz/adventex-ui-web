import Link from "next/link"

function TourItemInfo({
  name,
  code,
  duration,
}: {
  name: string
  code: string
  duration: string
}) {
  return (
    <>
      <Link
        title={name}
        href={`/tours/travels/${code}`}
        className="text-xl font-bold"
      >
        <h2>{name}</h2>
      </Link>

      <div className="divide-border grid grid-cols-2 gap-3 divide-x py-4">
        <div className="rounded-md border-none bg-gray-100 p-2 text-center">
          <div className="text-muted-foreground text-xs">รหัสทัวร์</div>
          <div className="font-medium text-ellipsis text-[#DC2626]">{code}</div>
        </div>

        <div className="rounded-md border-none bg-gray-100 p-2 text-center">
          <div className="text-muted-foreground text-xs">จำนวนวัน</div>
          <div>{duration}</div>
        </div>
      </div>
    </>
  )
}

export { TourItemInfo }
