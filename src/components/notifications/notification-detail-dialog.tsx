"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Bell,
  Calendar, 
  Target,
  Info,
  Check,
  X,
  Eye
} from 'lucide-react'
import { Notification } from '@/types'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { 
  NOTIFICATION_TYPE_LABELS,
  NOTIFICATION_TYPE_STYLES,
  READ_STATUS_LABELS,
  READ_STATUS_STYLES
} from '@/shared/constants/notification.constants'
import { useAppDispatch } from '@/stores/store'
import { markAsRead } from '@/stores/slices/notificationSlice'

interface NotificationDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  notification: Notification | null
}

export function NotificationDetailDialog({ 
  isOpen, 
  onClose, 
  notification
}: NotificationDetailDialogProps) {
  const dispatch = useAppDispatch()

  if (!notification) {
    return null
  }

  const handleMarkAsRead = () => {
    if (!notification.isRead) {
      dispatch(markAsRead(notification.id))
    }
  }

  const formatPayloadContent = (payload: any) => {
    if (!payload) return null
    
    try {
      return JSON.stringify(payload, null, 2)
    } catch (error) {
      return '無法解析 Payload 資料'
    }
  }

  const getPayloadSummary = (payload: any) => {
    if (!payload) return []
    
    const items = []
    
    if (payload.venueName) {
      items.push({ label: '店家名稱', value: payload.venueName })
    }
    if (payload.commentId) {
      items.push({ label: '評論 ID', value: payload.commentId })
    }
    if (payload.featureName) {
      items.push({ label: '功能名稱', value: payload.featureName })
    }
    if (payload.reportReason) {
      items.push({ label: '檢舉原因', value: payload.reportReason })
    }
    if (payload.maintenanceTime) {
      items.push({ 
        label: '維護時間', 
        value: format(new Date(payload.maintenanceTime), 'yyyy/MM/dd HH:mm', { locale: zhTW })
      })
    }
    if (payload.duration) {
      items.push({ label: '持續時間', value: payload.duration })
    }
    if (payload.deadline) {
      items.push({ 
        label: '截止時間', 
        value: format(new Date(payload.deadline), 'yyyy/MM/dd HH:mm', { locale: zhTW })
      })
    }
    if (payload.reason) {
      items.push({ label: '原因', value: payload.reason })
    }
    if (payload.violationType) {
      items.push({ label: '違規類型', value: payload.violationType })
    }
    if (payload.warningLevel) {
      items.push({ label: '警告級別', value: `第 ${payload.warningLevel} 級` })
    }
    if (payload.likes) {
      items.push({ label: '按讚數', value: payload.likes })
    }
    if (payload.views) {
      items.push({ label: '查看數', value: payload.views })
    }
    if (payload.rating) {
      items.push({ label: '評分', value: `${payload.rating} 顆星` })
    }
    if (payload.distance) {
      items.push({ label: '距離', value: payload.distance })
    }
    
    // Handle arrays
    if (payload.affectedServices && Array.isArray(payload.affectedServices)) {
      items.push({ label: '影響服務', value: payload.affectedServices.join(', ') })
    }
    if (payload.features && Array.isArray(payload.features)) {
      items.push({ label: '功能特色', value: payload.features.join(', ') })
    }
    if (payload.prizes && Array.isArray(payload.prizes)) {
      items.push({ label: '獎品', value: payload.prizes.join(', ') })
    }
    
    return items
  }

  const payloadSummary = getPayloadSummary(notification.payload)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              通知詳細資訊
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6">
              {/* 基本資訊 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  基本資訊
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">通知 ID</label>
                      <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        {notification.id}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">標題</label>
                      <p className="text-lg font-semibold">{notification.title}</p>
                    </div>
                    
                    {notification.subtitle && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">副標題</label>
                        <p className="text-gray-700 dark:text-gray-300">{notification.subtitle}</p>
                      </div>
                    )}
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">通知類型</label>
                      <div className="mt-1">
                        <Badge 
                          variant="secondary" 
                          className={NOTIFICATION_TYPE_STYLES[notification.type]}
                        >
                          {NOTIFICATION_TYPE_LABELS[notification.type]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">讀取狀態</label>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={READ_STATUS_STYLES[notification.isRead.toString() as 'true' | 'false']}
                        >
                          {READ_STATUS_LABELS[notification.isRead.toString() as 'true' | 'false']}
                        </Badge>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    {notification.readAt && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">已讀時間</label>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Eye className="h-4 w-4" />
                          {format(new Date(notification.readAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}
                        </div>
                      </div>
                    )}
                    
                    {notification.targetId && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">目標 ID</label>
                        <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                          {notification.targetId}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* 接收者資訊 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  接收者資訊
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">用戶 ID</label>
                      <p className="font-mono text-sm">{notification.recipientUserId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">用戶名稱</label>
                      <p className="font-medium">{notification.recipientUser?.name || '未知用戶'}</p>
                    </div>
                    {notification.recipientUser?.email && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">用戶信箱</label>
                        <p>{notification.recipientUser.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Payload 資料 */}
              {notification.payload && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    載荷資料
                  </h3>
                  
                  {payloadSummary.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">重要資訊</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {payloadSummary.map((item, index) => (
                          <div key={index} className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                            <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              {item.label}
                            </label>
                            <p className="text-blue-900 dark:text-blue-100">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">完整 JSON 資料</h4>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-auto">
                      {formatPayloadContent(notification.payload)}
                    </pre>
                  </div>
                </div>
              )}
              
              <Separator />
              
              {/* 時間資訊 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  時間資訊
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">建立時間</label>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(notification.createdAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">更新時間</label>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(notification.updatedAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">建立者</label>
                    <p>{notification.createdBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">更新者</label>
                    <p>{notification.updatedBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <div className="flex justify-between pt-4">
            <div>
              {!notification.isRead && (
                <Button 
                  variant="outline" 
                  onClick={handleMarkAsRead}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Check className="h-4 w-4 mr-2" />
                  標記為已讀
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={onClose}>
              關閉
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}