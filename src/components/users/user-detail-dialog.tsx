"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  User as UserIcon, 
  Mail,
  Calendar,
  Smartphone,
  Shield,
  Ban,
  Hash,
  MessageSquare,
  AlertTriangle,
  Info,
  Link2,
  Clock
} from 'lucide-react'
import { User, UserStatus, UserGenderType, PartnerType, MapWarningIconType } from '@/types'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { useAuth } from '@/hooks/use-auth'
import { useAppDispatch } from '@/stores/store'
import { toggleUserSuspension } from '@/stores/slices/userSlice'

interface UserDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSuspendSuccess?: () => void
}

const USER_STATUS_LABELS: Record<UserStatus, string> = {
  [UserStatus.Deleted]: '已刪除',
  [UserStatus.Registered]: '已註冊',
  [UserStatus.Verified]: '已驗證',
  [UserStatus.Disabled]: '已停用'
}

const USER_STATUS_STYLES: Record<UserStatus, string> = {
  [UserStatus.Deleted]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [UserStatus.Registered]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [UserStatus.Verified]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [UserStatus.Disabled]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const GENDER_LABELS: Record<UserGenderType, string> = {
  [UserGenderType.Male]: '男性',
  [UserGenderType.Female]: '女性'
}

const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  [PartnerType.Dog]: '🐕 狗',
  [PartnerType.Cat]: '🐈 貓'
}

const WARNING_ICON_LABELS: Record<MapWarningIconType, string> = {
  [MapWarningIconType.AngryPoop]: '💩 生氣大便',
  [MapWarningIconType.SurprisedPoop]: '💩 驚訝大便'
}

export function UserDetailDialog({ 
  isOpen, 
  onClose, 
  user,
  onSuspendSuccess
}: UserDetailDialogProps) {
  const dispatch = useAppDispatch()
  const { checkPermission } = useAuth()
  const [isSuspending, setIsSuspending] = useState(false)

  const handleToggleSuspend = async () => {
    if (!user) return

    setIsSuspending(true)
    try {
      await dispatch(toggleUserSuspension(user.id)).unwrap()
      onSuspendSuccess?.()
    } catch (error) {
      console.error('Failed to toggle user suspension:', error)
    } finally {
      setIsSuspending(false)
    }
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            用戶詳細資料
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)]">
          <div className="space-y-6 pr-4">
            {/* 基本資訊 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                基本資訊
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">用戶名稱：</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Email：</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">性別：</span>
                  <span>{GENDER_LABELS[user.genderType]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">用戶 ID：</span>
                  <span className="font-mono text-xs flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    {user.id}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">狀態：</span>
                  <Badge className={USER_STATUS_STYLES[user.status]}>
                    {USER_STATUS_LABELS[user.status]}
                  </Badge>
                </div>
                {user.isSuspended && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">帳號狀態：</span>
                    <Badge variant="destructive">已停權</Badge>
                  </div>
                )}
              </div>
            </div>

            {/* 個人偏好 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                個人偏好
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">寵物類型：</span>
                  <span>{PARTNER_TYPE_LABELS[user.partnerType]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">地圖警示圖示：</span>
                  <span>{WARNING_ICON_LABELS[user.mapWarningIconType]}</span>
                </div>
              </div>
            </div>

            {/* 第三方帳號 */}
            {user.thirdPartyAccounts && user.thirdPartyAccounts.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  第三方帳號綁定
                </h3>
                <div className="space-y-2">
                  {user.thirdPartyAccounts.map((account, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {account.provider === 'google' ? '🔵 Google' : '🟢 LINE'}
                      </span>
                      <div className="text-right">
                        <div>{account.email || account.name}</div>
                        <div className="text-xs text-gray-500">
                          綁定於 {format(new Date(account.connectedAt), 'yyyy/MM/dd', { locale: zhTW })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 裝置資訊 */}
            {user.deviceInfo && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  裝置資訊
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">平台：</span>
                    <span>{user.deviceInfo.platform}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">版本：</span>
                    <span>{user.deviceInfo.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">裝置 ID：</span>
                    <span className="font-mono text-xs">{user.deviceInfo.deviceId}</span>
                  </div>
                  {user.deviceInfo.ip && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">IP 位址：</span>
                      <span>{user.deviceInfo.ip}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 活動統計 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                活動統計
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">發表評論數：</span>
                  <span>{user.commentCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">被檢舉次數：</span>
                  <span className={user.reportCount && user.reportCount > 0 ? 'text-red-600' : ''}>
                    {user.reportCount || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* 個人簡介 */}
            {user.bio && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">個人簡介</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {user.bio}
                </p>
              </div>
            )}

            {/* 時間資訊 */}
            <div className="pt-4 border-t space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  註冊時間：
                </span>
                <span>{format(new Date(user.createdAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
              </div>
              {user.lastLoginAt && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    最後登入：
                  </span>
                  <span>{format(new Date(user.lastLoginAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  更新時間：
                </span>
                <span>{format(new Date(user.updatedAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
              </div>
            </div>

            {/* 刪除狀態 */}
            {user.isDeleted && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  此用戶已被刪除
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            關閉
          </Button>
          {!user.isDeleted && checkPermission('users.suspend') && (
            <Button
              variant={user.isSuspended ? "default" : "destructive"}
              onClick={handleToggleSuspend}
              disabled={isSuspending}
            >
              {isSuspending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  處理中...
                </>
              ) : (
                <>
                  <Ban className="h-4 w-4 mr-2" />
                  {user.isSuspended ? '解除停權' : '停權用戶'}
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}