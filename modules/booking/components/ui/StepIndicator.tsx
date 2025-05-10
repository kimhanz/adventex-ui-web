import { cn } from "@/lib/utils"

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, title: "วันที่ & ผู้เดินทาง" },
    { number: 2, title: "ข้อมูลผู้สั่งซื้อ" },
    { number: 3, title: "ส่งคำสั่งจอง" },
  ]

  return (
    <div className="relative flex items-center justify-between">
      {/* Mobile view - simplified step indicator */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 md:hidden">
        <div
          className="h-full bg-[#1877f2] transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      <div className="mt-2 flex w-full justify-between md:hidden">
        {steps.map((step) => (
          <div
            key={`mobile-${step.number}`}
            className={cn(
              "text-center text-xs font-medium",
              currentStep >= step.number ? "text-[#1877f2]" : "text-neutral-400"
            )}
          >
            {step.title}
          </div>
        ))}
      </div>

      {/* Desktop view - full step indicator */}
      <div className="absolute top-7 right-7 left-7 hidden md:flex">
        {steps.slice(0, -1).map((_, index) => (
          <div
            key={`line-${index}`}
            className={cn(
              "h-1 flex-1",
              currentStep > index + 1 ? "bg-[#1877f2]" : "bg-neutral-200"
            )}
          />
        ))}
      </div>

      {/* Step circles and labels */}
      <div className="hidden w-full items-center justify-between md:flex">
        {steps.map((step) => (
          <div
            key={step.number}
            className="z-10 flex flex-col items-center"
          >
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold",
                currentStep >= step.number
                  ? "bg-[#1877f2] text-white"
                  : "bg-neutral-200 text-neutral-400"
              )}
            >
              {step.number}
            </div>
            <div
              className={cn(
                "mt-2 text-center",
                currentStep >= step.number
                  ? "text-neutral-900"
                  : "text-neutral-400"
              )}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { StepIndicator }
