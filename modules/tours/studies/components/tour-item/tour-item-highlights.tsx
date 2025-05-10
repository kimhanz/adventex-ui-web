import { Sparkle } from "lucide-react"

function TourItemHighlight({
  icon,
  label,
  content,
}: {
  icon: React.ReactNode
  label: string
  content: string
}) {
  return (
    <div className="flex items-start gap-2">
      <div>{icon}</div>
      <div className="space-x-px text-sm">
        <span className="font-medium">{label}</span>
        <span>:</span>
        <span className="text-muted-foreground">{content}</span>
      </div>
    </div>
  )
}

function TourItemHighlights({ content }: { content: string }) {
  return (
    <div className="space-y-3">
      <TourItemHighlight
        icon={<Sparkle className="mt-0.5 size-4" />}
        label="ไฮไลท์"
        content={content}
      />
    </div>
  )
}

export { TourItemHighlights }
