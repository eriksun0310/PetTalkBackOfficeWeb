"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { zhTW } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface DatePickerProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  date,
  onSelect,
  placeholder = "選擇日期 (YYYY-MM-DD)",
  className,
  disabled = false,
}: DatePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      const newDate = new Date(value)
      if (!isNaN(newDate.getTime())) {
        onSelect?.(newDate)
      }
    } else {
      onSelect?.(undefined)
    }
  }

  return (
    <div className={cn("relative", className)}>
      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="date"
        value={date ? format(date, "yyyy-MM-dd") : ""}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="pl-10"
      />
    </div>
  )
}