import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

function FilterCheckboxItem({
  id,
  label,
  count,
  checked,
  onCheckedChange,
  value,
}: {
  id: string
  label: string
  count: number
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  value?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          value={value}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          htmlFor={id}
          className="text-muted-foreground text-sm"
        >
          {label}
        </Label>
      </div>
      <span className="text-muted-foreground text-sm">({count})</span>
    </div>
  )
}

export { FilterCheckboxItem }
