"use client"

import { useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { Search, X, RotateCcw, Filter } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { setFilters, clearFilters, fetchNotifications } from '@/stores/slices/notificationSlice'
import { NotificationType } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { NOTIFICATION_TYPE_LABELS } from '@/shared/constants/notification.constants'

export function NotificationFilters() {
  const dispatch = useAppDispatch()
  const { filters, pagination } = useAppSelector(state => state.notification)
  
  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(filters.search || '', 300)

  // Trigger search when debounced value changes
  useEffect(() => {
    dispatch(fetchNotifications({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters: { ...filters, search: debouncedSearch } 
    }))
  }, [debouncedSearch, dispatch, pagination.page, pagination.limit, 
      filters.type, filters.isRead, filters.recipientUserId, 
      filters.dateFrom, filters.dateTo])

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setFilters({ search: value }))
  }, [dispatch])

  const handleTypeChange = useCallback((type: NotificationType | undefined) => {
    dispatch(setFilters({ type }))
  }, [dispatch])

  const handleReadStatusChange = useCallback((isRead: boolean | undefined) => {
    dispatch(setFilters({ isRead }))
  }, [dispatch])

  const handleRecipientChange = useCallback((recipientUserId: string | undefined) => {
    dispatch(setFilters({ recipientUserId: recipientUserId || undefined }))
  }, [dispatch])

  const handleDateFromChange = useCallback((dateFrom: Date | undefined) => {
    dispatch(setFilters({ dateFrom: dateFrom?.toISOString() }))
  }, [dispatch])

  const handleDateToChange = useCallback((dateTo: Date | undefined) => {
    dispatch(setFilters({ dateTo: dateTo?.toISOString() }))
  }, [dispatch])

  const handleReset = useCallback(() => {
    dispatch(clearFilters())
  }, [dispatch])

  // Count active filters
  const activeFiltersCount = [
    filters.search,
    filters.type !== undefined,
    filters.isRead !== undefined,
    filters.recipientUserId,
    filters.dateFrom,
    filters.dateTo
  ].filter(Boolean).length

  // Removed permission check - allow all users to use filters

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4" />
          <span className="font-medium">篩選條件</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount} 個篩選條件
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* 搜尋 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜尋標題、接收者..."
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
            {filters.search && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => handleSearchChange('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* 通知類型 */}
          <Select
            value={filters.type?.toString() || 'all'}
            onValueChange={(value) => handleTypeChange(value === 'all' ? undefined : parseInt(value) as NotificationType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇通知類型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部類型</SelectItem>
              {Object.entries(NOTIFICATION_TYPE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 已讀狀態 */}
          <Select
            value={filters.isRead?.toString() || 'all'}
            onValueChange={(value) => handleReadStatusChange(value === 'all' ? undefined : value === 'true')}
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇讀取狀態" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部狀態</SelectItem>
              <SelectItem value="false">未讀</SelectItem>
              <SelectItem value="true">已讀</SelectItem>
            </SelectContent>
          </Select>

          {/* 接收者 ID */}
          <Input
            placeholder="接收者用戶 ID"
            value={filters.recipientUserId || ''}
            onChange={(e) => handleRecipientChange(e.target.value)}
          />

          {/* 開始日期 */}
          <DatePicker
            placeholder="選擇開始日期"
            date={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
            onSelect={handleDateFromChange}
          />

          {/* 結束日期 */}
          <DatePicker
            placeholder="選擇結束日期"
            date={filters.dateTo ? new Date(filters.dateTo) : undefined}
            onSelect={handleDateToChange}
          />

          {/* 重置按鈕 */}
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={activeFiltersCount === 0}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重置篩選
            </Button>
          </div>
        </div>

        {/* 快速篩選標籤 */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-3 border-t">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500">啟用的篩選條件：</span>
              
              {filters.search && (
                <Badge variant="secondary" className="gap-1">
                  搜尋: {filters.search}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleSearchChange('')}
                  />
                </Badge>
              )}
              
              {filters.type !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  類型: {NOTIFICATION_TYPE_LABELS[filters.type]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleTypeChange(undefined)}
                  />
                </Badge>
              )}
              
              {filters.isRead !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  狀態: {filters.isRead ? '已讀' : '未讀'}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleReadStatusChange(undefined)}
                  />
                </Badge>
              )}
              
              {filters.recipientUserId && (
                <Badge variant="secondary" className="gap-1">
                  接收者: {filters.recipientUserId}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRecipientChange(undefined)}
                  />
                </Badge>
              )}
              
              {filters.dateFrom && (
                <Badge variant="secondary" className="gap-1">
                  開始: {new Date(filters.dateFrom).toLocaleDateString()}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleDateFromChange(undefined)}
                  />
                </Badge>
              )}
              
              {filters.dateTo && (
                <Badge variant="secondary" className="gap-1">
                  結束: {new Date(filters.dateTo).toLocaleDateString()}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleDateToChange(undefined)}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}