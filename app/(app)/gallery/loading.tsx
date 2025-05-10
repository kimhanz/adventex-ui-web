import { Skeleton } from "@/components/ui/skeleton"
import { SparklesText } from "@/components/magicui/sparkles-text"

export default function Loading() {
  return (
    <div className="px-4 py-8">
      <div className="flex flex-col items-center justify-center gap-4 text-center xl:gap-6 2xl:gap-4">
        <SparklesText className="text-4xl leading-none font-normal xl:text-6xl">
          แกลลอรี่
        </SparklesText>
        <div className="flex flex-col gap-y-px">
          <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
            รวมภาพความประทับใจจากการเดินทางของลูกค้าที่ไว้วางใจให้เราดูแล
          </p>
          <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
            ทุกช่วงเวลาแห่งความสุขที่เราได้มีส่วนร่วมสร้างขึ้น
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(9)].map((_, index) => {
            return (
              <Skeleton
                key={index}
                className="aspect-square w-full rounded-xl"
              />
            )
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>
    </div>
  )
}
