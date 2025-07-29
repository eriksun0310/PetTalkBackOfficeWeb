"use client"

import { useCallback, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { VenueCategoryType } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useAuth } from '@/hooks/use-auth'
import { VENUE_CATEGORY_LABELS } from '@/shared/constants/venue.constants'
import { VenueFilterBase } from './venue-filter-base'

interface PendingFilters {
  search: string
  categoryType?: VenueCategoryType
}

interface PendingShopFiltersProps {
  onFiltersChange?: (filters: PendingFilters) => void
}

export function PendingShopFilters({ onFiltersChange }: PendingShopFiltersProps) {
  const { checkPermission } = useAuth()
  const [filters, setFilters] = useState<PendingFilters>({
    search: '',
    categoryType: undefined
  })
  
  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(filters.search, 300)

  // Notify parent component when filters change
  useEffect(() => {
    onFiltersChange?.({
      search: debouncedSearch,
      categoryType: filters.categoryType
    })
  }, [debouncedSearch, filters.categoryType, onFiltersChange])

  const handleSearchChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
  }, [])

  const handleCategoryChange = useCallback((categoryType: VenueCategoryType | undefined) => {
    setFilters(prev => ({ ...prev, categoryType }))
  }, [])

  const handleReset = useCallback(() => {
    setFilters({
      search: '',
      categoryType: undefined
    })
  }, [])
  
  // Check if user has permission to view shops
  if (!checkPermission('shops.read')) {
    return null
  }

  const activeFiltersDisplay = (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-600 dark:text-gray-400">已套用篩選：</span>
      
      {filters.search && (
        <Badge variant="secondary" className="gap-1">
          搜尋: {filters.search}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => handleSearchChange('')}
          />
        </Badge>
      )}
      
      {filters.categoryType !== undefined && (
        <Badge variant="secondary" className="gap-1">
          {VENUE_CATEGORY_LABELS[filters.categoryType]}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => handleCategoryChange(undefined)}
          />
        </Badge>
      )}
    </div>
  )

  return (
    <VenueFilterBase
      config={{
        showSearch: true,
        showCategory: true,
        showStatus: false,  // 待審核店家不需要狀態篩選
        searchPlaceholder: '搜尋申請店家名稱...'
      }}
      values={{
        search: filters.search,
        categoryType: filters.categoryType
      }}
      onSearchChange={handleSearchChange}
      onCategoryChange={handleCategoryChange}
      onReset={handleReset}
      activeFiltersDisplay={activeFiltersDisplay}
    />
  )
}