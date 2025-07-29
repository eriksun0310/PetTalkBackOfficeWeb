"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Mail } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { fetchUsers, setSelectedUser } from '@/stores/slices/userSlice'
import { User, UserStatus, UserGenderType } from '@/types'
import { UserEditDialog } from './user-edit-dialog'

const genderLabels: Record<UserGenderType, string> = {
  [UserGenderType.Male]: '男',
  [UserGenderType.Female]: '女',
}

const statusLabels: Record<UserStatus, string> = {
  [UserStatus.Deleted]: '已刪除',
  [UserStatus.Registered]: '已註冊',
  [UserStatus.Verified]: '已驗證',
  [UserStatus.Disabled]: '已停用',
}

const statusColors: Record<UserStatus, string> = {
  [UserStatus.Deleted]: 'bg-gray-100 text-gray-800',
  [UserStatus.Registered]: 'bg-yellow-100 text-yellow-800',
  [UserStatus.Verified]: 'bg-green-100 text-green-800',
  [UserStatus.Disabled]: 'bg-red-100 text-red-800',
}


export function UserList() {
  const dispatch = useAppDispatch()
  const { users, loading, filters } = useAppSelector(state => state.user)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUserLocal] = useState<User | null>(null)

  useEffect(() => {
    dispatch(fetchUsers({ 
      page: 1, 
      limit: 10,
      search: filters.search,
      status: filters.status || undefined
    }))
  }, [dispatch, filters])

  const handleEdit = (user: User) => {
    setSelectedUserLocal(user)
    dispatch(setSelectedUser(user))
    setIsEditDialogOpen(true)
  }

  // Apply filters
  const displayUsers = users.filter(user => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (!user.name.toLowerCase().includes(searchLower) && 
          !user.email.toLowerCase().includes(searchLower)) {
        return false
      }
    }
    if (filters.status && user.status !== filters.status) {
      return false
    }
    return true
  })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>用戶列表</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">載入中...</div>
          ) : displayUsers.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">👥</div>
              <p>沒有找到符合條件的用戶</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>姓名</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>性別</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>登入方式</TableHead>
                    <TableHead>註冊時間</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{genderLabels[user.genderType]}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[user.status]}>
                          {statusLabels[user.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.loginMethod || '-'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString('zh-TW')}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <UserEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setSelectedUserLocal(null)
          dispatch(setSelectedUser(null))
        }}
        user={selectedUser}
      />
    </>
  )
}