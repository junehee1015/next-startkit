'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerProps {
  value?: string
  onChange?: (dateString?: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({ value, onChange, placeholder = '날짜를 선택하세요', className, disabled = false }: DatePickerProps) {
  const dateObj = value ? new Date(value) : undefined

  const handleSelect = (selectedDate?: Date) => {
    if (!onChange) return
    onChange(selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground', className)} disabled={disabled}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {/* 화면에 보여줄 때는 한국어 포맷으로 예쁘게 */}
          {dateObj ? format(dateObj, 'PPP', { locale: ko }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={dateObj} onSelect={handleSelect} initialFocus locale={ko} />
      </PopoverContent>
    </Popover>
  )
}
