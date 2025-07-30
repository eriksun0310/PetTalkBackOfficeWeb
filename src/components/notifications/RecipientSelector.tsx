'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Search, X, Users, User as UserIcon, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  status: 'active' | 'inactive' | 'suspended'
  registeredAt: string
}

interface RecipientSelectorProps {
  type: 'single' | 'multiple'
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export function RecipientSelector({
  type,
  selectedIds,
  onChange
}: RecipientSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)

  // 模擬用戶資料
  useEffect(() => {
    const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `用戶 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      status: i % 10 === 0 ? 'suspended' : i % 5 === 0 ? 'inactive' : 'active',
      registeredAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    }))
    setUsers(mockUsers)
    setFilteredUsers(mockUsers)
  }, [])

  // 搜尋和篩選邏輯
  useEffect(() => {
    let filtered = users

    // 搜尋篩選
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 狀態篩選
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    setFilteredUsers(filtered)
  }, [searchQuery, statusFilter, users])

  const handleToggleUser = (userId: string) => {
    if (type === 'single') {
      onChange([userId])
    } else {
      const newIds = selectedIds.includes(userId)
        ? selectedIds.filter(id => id !== userId)
        : [...selectedIds, userId]
      onChange(newIds)
    }
  }

  const handleSelectAll = () => {
    const activeUsers = filteredUsers.filter(user => user.status === 'active')
    onChange(activeUsers.map(user => user.id))
  }

  const handleClearAll = () => {
    onChange([])
  }

  const getSelectedUser = (userId: string) => {
    return users.find(user => user.id === userId)
  }

  const getStatusBadge = (status: User['status']) => {
    const statusConfig = {
      active: { label: '活躍', variant: 'default' as const },
      inactive: { label: '未活躍', variant: 'secondary' as const },
      suspended: { label: '已停用', variant: 'destructive' as const }
    }
    
    const config = statusConfig[status]
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>
  }

  return (
    <div className="space-y-4">
      {/* 搜尋和篩選 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜尋用戶名稱、信箱或 ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="space-y-2">
              <Label>用戶狀態</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="active">活躍</SelectItem>
                  <SelectItem value="inactive">未活躍</SelectItem>
                  <SelectItem value="suspended">已停用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* 快捷操作 */}
      {type === 'multiple' && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
          >
            <Users className="w-4 h-4 mr-2" />
            選擇所有活躍用戶
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            disabled={selectedIds.length === 0}
          >
            <X className="w-4 h-4 mr-2" />
            清除選擇
          </Button>
        </div>
      )}

      {/* 已選擇的用戶 */}
      {selectedIds.length > 0 && (
        <Card>
          <CardContent className="p-3">
            <div className="text-sm text-muted-foreground mb-2">
              已選擇 {selectedIds.length} 位用戶
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedIds.slice(0, 5).map(id => {
                const user = getSelectedUser(id)
                if (!user) return null
                
                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="pl-1 pr-2 py-1 flex items-center gap-1"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                    <button
                      onClick={() => handleToggleUser(id)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
              {selectedIds.length > 5 && (
                <Badge variant="outline">
                  +{selectedIds.length - 5} 更多
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 用戶列表 */}
      <Card>
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-2">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                沒有找到符合條件的用戶
              </div>
            ) : (
              filteredUsers.map(user => (
                <div
                  key={user.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors ${
                    selectedIds.includes(user.id) ? 'bg-muted' : ''
                  }`}
                  onClick={() => handleToggleUser(user.id)}
                >
                  {type === 'multiple' && (
                    <Checkbox
                      checked={selectedIds.includes(user.id)}
                      onCheckedChange={() => handleToggleUser(user.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      {getStatusBadge(user.status)}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    註冊於 {new Date(user.registeredAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}