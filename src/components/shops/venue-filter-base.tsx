"use client"

import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, RotateCcw } from 'lucide-react'
import { VenueCategoryType } from '@/types'
import { VENUE_CATEGORY_LABELS } from '@/shared/constants/venue.constants'

export interface VenueFilterConfig {
  showSearch?: boolean
  showCategory?: boolean
  showStatus?: boolean
  searchPlaceholder?: string
}

export interface VenueFilterValues {
  search: string
  categoryType?: VenueCategoryType
  approvalStatus?: number
}

export interface VenueFilterBaseProps {
  config?: VenueFilterConfig
  values: VenueFilterValues
  onSearchChange?: (value: string) => void
  onCategoryChange?: (value: VenueCategoryType | undefined) => void
  onStatusChange?: (value: number | undefined) => void
  onReset?: () => void
  statusOptions?: ReactNode
  activeFiltersDisplay?: ReactNode
}

const defaultConfig: VenueFilterConfig = {
  showSearch: true,
  showCategory: true,
  showStatus: false,
  searchPlaceholder: '搜尋店家名稱...'
}

export function VenueFilterBase({
  config = defaultConfig,
  values,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onReset,
  statusOptions,
  activeFiltersDisplay
}: VenueFilterBaseProps) {
  const mergedConfig = { ...defaultConfig, ...config }

  const handleCategoryChange = (value: string) => {
    const categoryType = value === 'all' ? undefined : parseInt(value) as VenueCategoryType
    onCategoryChange?.(categoryType)
  }

  const handleStatusChange = (value: string) => {
    const status = value === 'all' ? undefined : parseInt(value)
    onStatusChange?.(status)
  }

  const hasActiveFilters = !!(
    values.search ||
    values.categoryType !== undefined ||
    values.approvalStatus !== undefined
  )

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Input */}
          {mergedConfig.showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={mergedConfig.searchPlaceholder}
                value={values.search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            {mergedConfig.showCategory && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">類型：</span>
                <Select
                  value={values.categoryType?.toString() || 'all'}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部類型</SelectItem>
                    {Object.entries(VENUE_CATEGORY_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Status Filter - Custom Content */}
            {mergedConfig.showStatus && statusOptions}

            {/* Reset Button */}
            {onReset && (
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="ml-auto"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                重置篩選
              </Button>
            )}
          </div>

          {/* Active Filters Display - Custom Content */}
          {hasActiveFilters && activeFiltersDisplay}
        </div>
      </CardContent>
    </Card>
  )
}