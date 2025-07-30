"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronLeft, ChevronRight, User, Bell, Calendar, Eye, Check, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { fetchNotifications, setSelectedNotification, markAsRead, setPagination } from '@/stores/slices/notificationSlice'
import { Notification } from '@/types'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { NotificationDetailDialog } from './notification-detail-dialog'
import { 
  NOTIFICATION_TYPE_LABELS,
  NOTIFICATION_TYPE_STYLES,
  READ_STATUS_LABELS,
  READ_STATUS_STYLES
} from '@/shared/constants/notification.constants'

export function NotificationList() {
  const dispatch = useAppDispatch()
  const { notifications, loading, error, pagination, filters } = useAppSelector(state => state.notification)
  const [selectedNotificationForDetail, setSelectedNotificationForDetail] = useState<Notification | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Load notifications on component mount and when filters change
  useEffect(() => {
    dispatch(fetchNotifications({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters 
    }))
  }, [dispatch, pagination.page, pagination.limit, filters])

  const handleViewDetail = (notification: Notification) => {
    setSelectedNotificationForDetail(notification)
    setIsDetailDialogOpen(true)
    
    // Mark as read if unread
    if (!notification.isRead) {
      dispatch(markAsRead(notification.id))
    }
  }

  const handleDetailDialogClose = () => {
    setIsDetailDialogOpen(false)
    setSelectedNotificationForDetail(null)
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }))
  }

  const handleMarkAsRead = (notification: Notification, event: React.MouseEvent) => {
    event.stopPropagation()
    if (!notification.isRead) {
      dispatch(markAsRead(notification.id))
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const formatPayload = (payload: any) => {
    if (!payload) return '-'
    
    // Show a summary of the payload
    const keys = Object.keys(payload)
    if (keys.length === 0) return '-'
    
    if (payload.venueName) return payload.venueName
    if (payload.commentId) return `評論 ${payload.commentId.substring(0, 8)}...`
    if (payload.featureName) return payload.featureName
    
    return `${keys.length} 個欄位`
  }

  // Removed permission check - allow all users to view notifications

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>載入通知資料時發生錯誤：{error}</p>
            <Button 
              onClick={() => dispatch(fetchNotifications({ page: pagination.page, limit: pagination.limit, filters }))}
              className="mt-4"
            >
              重新載入
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>通知列表</span>
          <Badge variant="outline">
            共 {pagination.total} 筆資料
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">載入中...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🔔</div>
            <p>找不到符合條件的通知</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>接收者</TableHead>
                    <TableHead>標題</TableHead>
                    <TableHead>類型</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>目標資訊</TableHead>
                    <TableHead>建立時間</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow 
                      key={notification.id} 
                      className={`${notification.isDeleted ? 'opacity-50' : ''} cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-950' : ''}`}
                      onClick={() => handleViewDetail(notification)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{notification.recipientUser?.name || '未知用戶'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[250px]">
                          <div className="font-medium" title={notification.title}>
                            {truncateText(notification.title, 30)}
                          </div>
                          {notification.subtitle && (
                            <div className="text-sm text-gray-500" title={notification.subtitle}>
                              {truncateText(notification.subtitle, 40)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={NOTIFICATION_TYPE_STYLES[notification.type]}
                        >
                          {NOTIFICATION_TYPE_LABELS[notification.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
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
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {formatPayload(notification.payload)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(notification.createdAt), 'yyyy/MM/dd HH:mm', { locale: zhTW })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetail(notification)}
                            className="h-8 w-8 p-0"
                            title="查看詳情"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!notification.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => handleMarkAsRead(notification, e)}
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              title="標記為已讀"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  顯示第 {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} 筆，
                  共 {pagination.total} 筆資料
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    上一頁
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let page: number
                      if (pagination.totalPages <= 5) {
                        page = i + 1
                      } else if (pagination.page <= 3) {
                        page = i + 1
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        page = pagination.totalPages - 4 + i
                      } else {
                        page = pagination.page - 2 + i
                      }
                      
                      return (
                        <Button
                          key={page}
                          variant={pagination.page === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="h-8 w-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    下一頁
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Detail Dialog */}
        <NotificationDetailDialog
          isOpen={isDetailDialogOpen}
          onClose={handleDetailDialogClose}
          notification={selectedNotificationForDetail}
        />
      </CardContent>
    </Card>
  )
}