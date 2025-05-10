import { Button } from "@/components/ui/button"

function TourDetails({
  highlights,
}: {
  highlights?:
    | {
        highlight: string
        id?: string | null
      }[]
    | null
    | undefined
}) {
  const content =
    highlights?.reduce((acc, prev) => acc + "-" + prev.highlight, "") || "N/A"

  return (
    <div className="space-y-6 py-4">
      <div className="text-3xl font-bold">ไฮไลก์โปรแกรมทัวร์</div>

      <div className="flex items-start gap-2">
        <div>
          <span className="font-bold">ไฮไลก์:</span>
          <span> </span>
          <span className="text-sm">{content}</span>
        </div>
      </div>

      <Button className="text-background bg-linear-to-b from-red-500 to-red-700 bg-[length:100%_100%] bg-[bottom] inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all hover:bg-[length:100%_150%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-5 w-5"
        >
          <path d="m21 15-9-9-9 9"></path>
          <path d="M21 21H3"></path>
        </svg>
        <span>ดาวน์โหลดโปรแกรมทัวร์</span>
      </Button>
    </div>
  )
}

export { TourDetails }
