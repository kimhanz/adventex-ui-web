import Link from "next/link"

function TourItemInfo({
  name,
  code,
  duration,
  university,
}: {
  name: string
  code: string
  duration: string
  university: {
    code: string
    name: string
  }
}) {
  return (
    <>
      <Link
        title={name}
        href={`/tours/studies/${code}`}
        className="text-xl font-bold"
      >
        <h2>{name}</h2>
      </Link>

      <div className="divide-border grid grid-cols-3 gap-px divide-x py-4">
        <div className="text-center">
          <div className="text-muted-foreground text-xs">รหัสทัวร์</div>
          <div className="font-medium text-[#DC2626]">{code}</div>
        </div>

        <div className="text-center">
          <div className="text-muted-foreground text-xs">มหาลัย</div>
          <div className="font-medium text-[#DC2626] uppercase">
            {university?.code}
          </div>
        </div>

        <div className="text-center">
          <div className="text-muted-foreground text-xs">จำนวนวัน</div>
          <div>{duration}</div>
        </div>
      </div>
    </>
  )
}

export { TourItemInfo }
