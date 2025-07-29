"use client"

import { useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, RotateCcw } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { setFilters, resetFilters, fetchComments } from '@/stores/slices/commentSlice'
import { VenueCategoryType, FeedbackType, PetFriendlyLevel } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useAuth } from '@/hooks/use-auth'
import { VENUE_CATEGORY_LABELS } from '@/shared/constants/venue.constants'
import { FEEDBACK_TYPE_LABELS, PET_FRIENDLY_LEVEL_LABELS } from '@/shared/constants/comment.constants'

export function CommentFilters() {
  const dispatch = useAppDispatch()
  const { filters, pagination } = useAppSelector(state => state.comment)
  const { checkPermission } = useAuth()
  
  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(filters.search, 300)

  // Trigger search when debounced value changes
  useEffect(() => {
    dispatch(fetchComments({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters: { ...filters, search: debouncedSearch } 
    }))
  }, [debouncedSearch, dispatch, pagination.page, pagination.limit, 
      filters.venueCategory, filters.rating, filters.feedbackType, 
      filters.petFriendlyLevel, filters.isDeleted])

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setFilters({ search: value }))
  }, [dispatch])

  const handleCategoryChange = useCallback((venueCategory: VenueCategoryType | undefined) => {
    dispatch(setFilters({ venueCategory }))
  }, [dispatch])

  const handleRatingChange = useCallback((rating: number | undefined) => {
    dispatch(setFilters({ rating }))
  }, [dispatch])

  const handleFeedbackTypeChange = useCallback((feedbackType: FeedbackType | undefined) => {
    dispatch(setFilters({ feedbackType }))
  }, [dispatch])

  const handlePetFriendlyLevelChange = useCallback((petFriendlyLevel: PetFriendlyLevel | undefined) => {
    dispatch(setFilters({ petFriendlyLevel }))
  }, [dispatch])

  const handleReset = useCallback(() => {
    dispatch(resetFilters())
  }, [dispatch])
  
  // Check if user has permission to view comments
  if (!checkPermission('comments.read')) {
    return null
  }

  const hasActiveFilters = !!(
    filters.search ||
    filters.venueCategory !== undefined ||
    filters.rating !== undefined ||
    filters.feedbackType !== undefined ||
    filters.petFriendlyLevel !== undefined
  )

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜尋使用者名稱或店家名稱..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Venue Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">店家類型：</span>
              <Select
                value={filters.venueCategory?.toString() || 'all'}
                onValueChange={(value) => {
                  const category = value === 'all' ? undefined : parseInt(value) as VenueCategoryType
                  handleCategoryChange(category)
                }}
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

            {/* Rating Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">評分：</span>
              <Select
                value={filters.rating?.toString() || 'all'}
                onValueChange={(value) => {
                  const rating = value === 'all' ? undefined : parseInt(value)
                  handleRatingChange(rating)
                }}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部評分</SelectItem>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {'⭐'.repeat(rating)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Feedback Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">回饋類型：</span>
              <Select
                value={filters.feedbackType?.toString() || 'all'}
                onValueChange={(value) => {
                  const feedbackType = value === 'all' ? undefined : parseInt(value) as FeedbackType
                  handleFeedbackTypeChange(feedbackType)
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部類型</SelectItem>
                  {Object.entries(FEEDBACK_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pet Friendly Level Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">友善程度：</span>
              <Select
                value={filters.petFriendlyLevel?.toString() || 'all'}
                onValueChange={(value) => {
                  const level = value === 'all' ? undefined : parseInt(value) as PetFriendlyLevel
                  handlePetFriendlyLevelChange(level)
                }}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  {Object.entries(PET_FRIENDLY_LEVEL_LABELS).map(([value, label]) => (
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
          {hasActiveFilters && (
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
              
              {filters.venueCategory !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  {VENUE_CATEGORY_LABELS[filters.venueCategory]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCategoryChange(undefined)}
                  />
                </Badge>
              )}
              
              {filters.rating !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  {'⭐'.repeat(filters.rating)}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRatingChange(undefined)}
                  />
                </Badge>
              )}
              
              {filters.feedbackType !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  {FEEDBACK_TYPE_LABELS[filters.feedbackType]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleFeedbackTypeChange(undefined)}
                  />
                </Badge>
              )}
              
              {filters.petFriendlyLevel !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  友善程度: {PET_FRIENDLY_LEVEL_LABELS[filters.petFriendlyLevel]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handlePetFriendlyLevelChange(undefined)}
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