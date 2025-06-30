import Image from "next/image"

function TourHeader({ name, code }: { name: string; code: string }) {
  return (
    <div className="space-y-4 py-2">
      <div className="flex items-end justify-between border-b pb-2">
        <div className="flex items-center"></div>
        <div className="flex items-end gap-2">
          <span className="text-muted-foreground">รหัสทัวร์</span>
          <span className="text-2xl font-bold text-[#DC2626]">{code}</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold">{name}</h1>
    </div>
  )
}

export { TourHeader }
