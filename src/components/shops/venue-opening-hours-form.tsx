"use client"

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { VenueOpeningHour } from '@/types'
import { DAY_OF_WEEK_LABELS } from '@/shared/constants/venue.constants'

interface VenueOpeningHoursFormProps {
  openingHours: Omit<VenueOpeningHour, 'id' | 'venueId' | 'createdAt' | 'updatedAt'>[]
  onChange: (hours: Omit<VenueOpeningHour, 'id' | 'venueId' | 'createdAt' | 'updatedAt'>[]) => void
}

export function VenueOpeningHoursForm({ openingHours, onChange }: VenueOpeningHoursFormProps) {
  const handleTimeChange = (dayIndex: number, field: 'openTime' | 'closeTime', value: string) => {
    const updated = [...openingHours]
    updated[dayIndex] = {
      ...updated[dayIndex],
      [field]: value,
    }
    onChange(updated)
  }

  const handleClosedChange = (dayIndex: number, isClosed: boolean) => {
    const updated = [...openingHours]
    updated[dayIndex] = {
      ...updated[dayIndex],
      isClosed,
    }
    onChange(updated)
  }

  const copyToWeekdays = () => {
    const mondayHours = openingHours[1]
    const updated = [...openingHours]
    
    // Copy Monday's hours to Tuesday through Friday (index 2-5)
    for (let i = 2; i <= 5; i++) {
      updated[i] = {
        ...updated[i],
        openTime: mondayHours.openTime,
        closeTime: mondayHours.closeTime,
        isClosed: mondayHours.isClosed,
      }
    }
    
    onChange(updated)
  }

  const copyToAllDays = () => {
    const firstDayHours = openingHours[0]
    const updated = openingHours.map((hours, index) => ({
      ...hours,
      openTime: firstDayHours.openTime,
      closeTime: firstDayHours.closeTime,
      isClosed: firstDayHours.isClosed,
    }))
    
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyToWeekdays}
          className="text-xs"
        >
          <Copy className="h-3 w-3 mr-1" />
          複製週一至週五
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyToAllDays}
          className="text-xs"
        >
          <Copy className="h-3 w-3 mr-1" />
          複製到所有天
        </Button>
      </div>

      <div className="space-y-3">
        {openingHours.map((hours, index) => (
          <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="w-16">
              <Label className="font-medium">{DAY_OF_WEEK_LABELS[index]}</Label>
            </div>
            
            <div className="flex items-center gap-2">
              <Checkbox
                id={`closed-${index}`}
                checked={hours.isClosed}
                onCheckedChange={(checked) => handleClosedChange(index, checked as boolean)}
              />
              <Label htmlFor={`closed-${index}`} className="text-sm">
                休息
              </Label>
            </div>

            {!hours.isClosed && (
              <>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={hours.openTime || ''}
                    onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                    className="w-32"
                  />
                  <span className="text-sm">至</span>
                  <Input
                    type="time"
                    value={hours.closeTime || ''}
                    onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                    className="w-32"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}