import { ComponentPropsWithoutRef } from "react"
import { Select } from "@/components/ui/select"

type ShadcnSelectProps = ComponentPropsWithoutRef<typeof Select>

interface NumberSelectProps
  extends Omit<ShadcnSelectProps, "value" | "onValueChange"> {
  value: number | null | undefined
  onValueChange: (value: number) => void
}

export function NumberSelect({
  value,
  onValueChange,
  ...props
}: NumberSelectProps) {
  return (
    <Select
      {...props}
      value={value != null ? String(value) : ""} 
      onValueChange={(val) => onValueChange(Number(val))}
    />
  )
}
