"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import { useAppDispatch } from '@/stores/store'
import { setSearchFilter, setStatusFilter } from '@/stores/slices/userSlice'
import { UserStatus } from '@/types'

const statusOptions = [
  { value: 'all', label: '全部狀態' },
  { value: String(UserStatus.Registered), label: '已註冊' },
  { value: String(UserStatus.Verified), label: '已驗證' },
  { value: String(UserStatus.Disabled), label: '已停用' },
  { value: String(UserStatus.Deleted), label: '已刪除' },
]

export function UserFilters() {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [statusValue, setStatusValue] = useState('all')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchFilter(searchValue))
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue, dispatch])

  const handleStatusChange = (value: string) => {
    setStatusValue(value)
    dispatch(setStatusFilter(value === 'all' ? null : Number(value) as UserStatus))
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="搜尋姓名或 Email..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-48">
            <Select value={statusValue} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="選擇狀態" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}