'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export interface DateRangeString {
  from?: string // 'yyyy-MM-dd'
  to?: string // 'yyyy-MM-dd'
}

interface DateRangePickerProps {
  value?: DateRangeString
  onChange?: (range?: DateRangeString) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DateRangePicker({ value, onChange, placeholder = '기간을 선택하세요', className, disabled = false }: DateRangePickerProps) {
  const dateRangeObj: DateRange | undefined = value?.from
    ? {
        from: new Date(value.from),
        to: value.to ? new Date(value.to) : undefined,
      }
    : undefined

  const handleSelect = (range?: DateRange) => {
    if (!onChange) return
    onChange({
      from: range?.from ? format(range.from, 'yyyy-MM-dd') : undefined,
      to: range?.to ? format(range.to, 'yyyy-MM-dd') : undefined,
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button id="date" variant="outline" className={cn('w-full justify-start text-left font-normal', !value?.from && 'text-muted-foreground', className)} disabled={disabled}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRangeObj?.from ? (
            dateRangeObj.to ? (
              <>
                {format(dateRangeObj.from, 'yy.MM.dd', { locale: ko })} - {format(dateRangeObj.to, 'yy.MM.dd', { locale: ko })}
              </>
            ) : (
              format(dateRangeObj.from, 'yy.MM.dd', { locale: ko })
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar initialFocus mode="range" defaultMonth={dateRangeObj?.from} selected={dateRangeObj} onSelect={handleSelect} numberOfMonths={2} locale={ko} />
      </PopoverContent>
    </Popover>
  )
}
