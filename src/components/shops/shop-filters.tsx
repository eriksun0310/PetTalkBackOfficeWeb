"use client"

import { useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, RotateCcw } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { setFilters, resetFilters, fetchVenues } from '@/stores/slices/venueSlice'
import { VenueCategoryType, VenueApprovalStatus } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useAuth } from '@/hooks/use-auth'

const categoryTypeLabels = {
  [VenueCategoryType.Restaurant]: '餐廳',
  [VenueCategoryType.Hospital]: '醫院',
  [VenueCategoryType.Beauty]: '美容',
  [VenueCategoryType.Hotel]: '旅館'
}

const approvalStatusLabels = {
  [VenueApprovalStatus.Pending]: '待審核',
  [VenueApprovalStatus.Approved]: '已核准',
  [VenueApprovalStatus.Rejected]: '已拒絕'
}

export function ShopFilters() {
  const dispatch = useAppDispatch()
  const { filters, pagination } = useAppSelector(state => state.venue)
  const { checkPermission } = useAuth()
  
  // Check if user has permission to view shops
  if (!checkPermission('shops.read')) {
    return null
  }
  
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

  const handleCategoryChange = useCallback((value: string) => {
    const categoryType = value === 'all' ? undefined : parseInt(value) as VenueCategoryType
    dispatch(setFilters({ categoryType }))
  }, [dispatch])

  const handleStatusChange = useCallback((value: string) => {
    const approvalStatus = value === 'all' ? undefined : parseInt(value) as VenueApprovalStatus
    dispatch(setFilters({ approvalStatus }))
  }, [dispatch])

  const handleReset = useCallback(() => {
    dispatch(resetFilters())
  }, [dispatch])

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.categoryType !== undefined) count++
    if (filters.approvalStatus !== undefined) count++
    return count
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜尋店家名稱..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">類型：</span>
              <Select
                value={filters.categoryType?.toString() || 'all'}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部類型</SelectItem>
                  {Object.entries(categoryTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">狀態：</span>
              <Select
                value={filters.approvalStatus?.toString() || 'all'}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部狀態</SelectItem>
                  {Object.entries(approvalStatusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="ml-auto"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重置篩選
            </Button>
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
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
                  {categoryTypeLabels[filters.categoryType]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCategoryChange('all')}
                  />
                </Badge>
              )}
              
              {filters.approvalStatus !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  {approvalStatusLabels[filters.approvalStatus]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleStatusChange('all')}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}