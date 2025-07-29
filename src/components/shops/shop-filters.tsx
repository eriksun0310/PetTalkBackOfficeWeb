"use client"

import { useCallback, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { setFilters, resetFilters, fetchVenues } from '@/stores/slices/venueSlice'
import { VenueCategoryType, VenueApprovalStatus } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useAuth } from '@/hooks/use-auth'
import { VENUE_CATEGORY_LABELS, VENUE_APPROVAL_STATUS_LABELS } from '@/shared/constants/venue.constants'
import { VenueFilterBase } from './venue-filter-base'

export function ShopFilters() {
  const dispatch = useAppDispatch()
  const { filters, pagination } = useAppSelector(state => state.venue)
  const { checkPermission } = useAuth()
  
  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(filters.search, 300)

  // Trigger search when debounced value changes
  useEffect(() => {
    dispatch(fetchVenues({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters: { ...filters, search: debouncedSearch } 
    }))
  }, [debouncedSearch, dispatch, pagination.page, pagination.limit, filters.categoryType, filters.approvalStatus, filters.isDeleted])

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setFilters({ search: value }))
  }, [dispatch])

  const handleCategoryChange = useCallback((categoryType: VenueCategoryType | undefined) => {
    dispatch(setFilters({ categoryType }))
  }, [dispatch])

  const handleStatusChange = useCallback((approvalStatus: number | undefined) => {
    dispatch(setFilters({ approvalStatus: approvalStatus as VenueApprovalStatus | undefined }))
  }, [dispatch])

  const handleReset = useCallback(() => {
    dispatch(resetFilters())
  }, [dispatch])
  
  // Check if user has permission to view shops
  if (!checkPermission('shops.read')) {
    return null
  }

  const statusOptions = (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">狀態：</span>
      <Select
        value={filters.approvalStatus?.toString() || 'all'}
        onValueChange={(value) => {
          const status = value === 'all' ? undefined : parseInt(value)
          handleStatusChange(status)
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部狀態</SelectItem>
          {Object.entries(VENUE_APPROVAL_STATUS_LABELS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

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
      
      {filters.approvalStatus !== undefined && (
        <Badge variant="secondary" className="gap-1">
          {VENUE_APPROVAL_STATUS_LABELS[filters.approvalStatus]}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => handleStatusChange(undefined)}
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
        showStatus: true,
        searchPlaceholder: '搜尋店家名稱...'
      }}
      values={{
        search: filters.search,
        categoryType: filters.categoryType,
        approvalStatus: filters.approvalStatus
      }}
      onSearchChange={handleSearchChange}
      onCategoryChange={handleCategoryChange}
      onStatusChange={handleStatusChange}
      onReset={handleReset}
      statusOptions={statusOptions}
      activeFiltersDisplay={activeFiltersDisplay}
    />
  )
}