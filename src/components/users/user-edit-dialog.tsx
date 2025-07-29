"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppDispatch } from '@/stores/store'
import { updateUser } from '@/stores/slices/userSlice'
import { User, UserStatus, UserGenderType } from '@/types'

interface UserEditDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

const genderOptions = [
  { value: UserGenderType.Male, label: '男' },
  { value: UserGenderType.Female, label: '女' },
]

const statusOptions = [
  { value: UserStatus.Deleted, label: '已刪除' },
  { value: UserStatus.Registered, label: '已註冊' },
  { value: UserStatus.Verified, label: '已驗證' },
  { value: UserStatus.Disabled, label: '已停用' },
]

export function UserEditDialog({ isOpen, onClose, user }: UserEditDialogProps) {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    genderType: UserGenderType.Male,
    status: UserStatus.Registered,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        genderType: user.genderType,
        status: user.status,
      })
    }
  }, [user])

  const handleSubmit = async () => {
    if (!user) return

    setIsSubmitting(true)
    try {
      await dispatch(updateUser({
        userId: user.id,
        updates: formData
      })).unwrap()
      
      onClose()
    } catch (error) {
      console.error('Failed to update user:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>編輯用戶資料</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* User Info (Read-only) */}
          <div className="space-y-2">
            <div>
              <Label className="text-sm text-gray-500">姓名</Label>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Email</Label>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-4">
            {/* Gender Select */}
            <div className="space-y-2">
              <Label htmlFor="gender">性別</Label>
              <Select
                value={String(formData.genderType)}
                onValueChange={(value) => setFormData({ ...formData, genderType: Number(value) as UserGenderType })}
              >
                <SelectTrigger id="gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map(option => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Select */}
            <div className="space-y-2">
              <Label htmlFor="status">狀態</Label>
              <Select
                value={String(formData.status)}
                onValueChange={(value) => setFormData({ ...formData, status: Number(value) as UserStatus })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-4 space-y-2 text-sm text-gray-500">
            <p>註冊時間：{new Date(user.createdAt).toLocaleString('zh-TW')}</p>
            <p>最後更新：{new Date(user.updatedAt).toLocaleString('zh-TW')}</p>
            {user.loginMethod && <p>登入方式：{user.loginMethod}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '儲存中...' : '儲存變更'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}