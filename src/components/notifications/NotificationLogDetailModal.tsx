'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { NotificationLog, NotificationLogStatus, NotificationType } from '@/types'
import { Bell, MessageSquare, Users, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Loader2, Copy } from 'lucide-react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { toast } from 'sonner'

interface NotificationLogDetailModalProps {
  log: NotificationLog
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationLogDetailModal({
  log,
  open,
  onOpenChange
}: NotificationLogDetailModalProps) {
  const getStatusInfo = (status: NotificationLogStatus) => {
    const statusConfig = {
      [NotificationLogStatus.Pending]: { 
        label: '待發送', 
        variant: 'secondary' as const, 
        icon: Clock,
        color: 'text-muted-foreground'
      },
      [NotificationLogStatus.Sending]: { 
        label: '發送中', 
        variant: 'default' as const, 
        icon: Loader2,
        color: 'text-blue-600'
      },
      [NotificationLogStatus.Sent]: { 
        label: '已發送', 
        variant: 'default' as const, 
        icon: CheckCircle,
        color: 'text-green-600'
      },
      [NotificationLogStatus.Failed]: { 
        label: '發送失敗', 
        variant: 'destructive' as const, 
        icon: XCircle,
        color: 'text-red-600'
      },
      [NotificationLogStatus.Cancelled]: { 
        label: '已取消', 
        variant: 'outline' as const, 
        icon: XCircle,
        color: 'text-gray-600'
      },
      [NotificationLogStatus.Scheduled]: { 
        label: '已排程', 
        variant: 'secondary' as const, 
        icon: Calendar,
        color: 'text-purple-600'
      }
    }
    
    return statusConfig[status]
  }

  const statusInfo = getStatusInfo(log.status)
  const StatusIcon = statusInfo.icon

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`已複製${label}`)
  }

  const formatDateTime = (date: string | Date | undefined) => {
    if (!date) return '-'
    return format(new Date(date), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })
  }

  const calculateDuration = () => {
    if (!log.sentAt || !log.completedAt) return '-'
    const start = new Date(log.sentAt).getTime()
    const end = new Date(log.completedAt).getTime()
    const duration = end - start
    
    if (duration < 1000) return `${duration} 毫秒`
    if (duration < 60000) return `${Math.floor(duration / 1000)} 秒`
    return `${Math.floor(duration / 60000)} 分鐘`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            通知發送詳情
            <Badge variant={statusInfo.variant}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本資訊 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">基本資訊</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">通知 ID</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{log.id}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(log.id, 'ID')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">通知類型</p>
                <div className="flex items-center gap-2">
                  {log.type === NotificationType.CommentNotification ? (
                    <>
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">評論通知</span>
                    </>
                  ) : (
                    <>
                      <Bell className="h-4 w-4" />
                      <span className="text-sm">系統公告</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 通知內容 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">通知內容</h3>
            <div className="space-y-2">
              <p className="font-medium">{log.title}</p>
              {log.subtitle && (
                <p className="text-sm text-muted-foreground">{log.subtitle}</p>
              )}
              {log.targetId && (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">目標 ID:</p>
                  <p className="text-sm font-mono">{log.targetId}</p>
                </div>
              )}
              {log.payload && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">額外資料:</p>
                  <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                    {JSON.stringify(log.payload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* 接收者資訊 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">接收者資訊</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">接收者類型</p>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">
                    {log.recipientType === 'single' ? '單一用戶' :
                     log.recipientType === 'multiple' ? '多個用戶' : '全體用戶'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">接收者數量</p>
                <p className="text-sm font-medium">{log.recipientCount} 位用戶</p>
              </div>
            </div>
            
            {log.recipientUserIds && log.recipientUserIds.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">接收者 ID 列表</p>
                <div className="flex flex-wrap gap-2">
                  {log.recipientUserIds.slice(0, 10).map((userId) => (
                    <Badge key={userId} variant="outline" className="text-xs">
                      {userId}
                    </Badge>
                  ))}
                  {log.recipientUserIds.length > 10 && (
                    <Badge variant="outline" className="text-xs">
                      +{log.recipientUserIds.length - 10} 更多
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* 發送狀態 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">發送狀態</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">當前狀態</p>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                  <span className={`text-sm font-medium ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
              </div>
              
              {log.status === NotificationLogStatus.Sent && (
                <>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">發送時長</p>
                    <p className="text-sm">{calculateDuration()}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">成功數量</p>
                    <p className="text-sm font-medium text-green-600">{log.successCount}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">失敗數量</p>
                    <p className="text-sm font-medium text-red-600">{log.failedCount}</p>
                  </div>
                </>
              )}
              
              {log.failedReason && (
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm text-muted-foreground">失敗原因</p>
                  <p className="text-sm text-red-600">{log.failedReason}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* 時間資訊 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">時間資訊</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">建立時間</p>
                <p className="text-sm">{formatDateTime(log.createdAt)}</p>
              </div>
              
              {log.scheduledAt && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">排程時間</p>
                  <p className="text-sm">{formatDateTime(log.scheduledAt)}</p>
                </div>
              )}
              
              {log.sentAt && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">發送時間</p>
                  <p className="text-sm">{formatDateTime(log.sentAt)}</p>
                </div>
              )}
              
              {log.completedAt && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">完成時間</p>
                  <p className="text-sm">{formatDateTime(log.completedAt)}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* 發送者資訊 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">發送者資訊</h3>
            <div className="flex items-center gap-3">
              {log.createdByUser ? (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={log.createdByUser.avatar} />
                    <AvatarFallback>{log.createdByUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{log.createdByUser.name}</p>
                    <p className="text-xs text-muted-foreground">{log.createdByUser.email}</p>
                  </div>
                </>
              ) : (
                <p className="text-sm">{log.createdBy}</p>
              )}
            </div>
          </div>

          {/* 生成的通知 ID */}
          {log.notificationIds && log.notificationIds.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  生成的通知 ID ({log.notificationIds.length})
                </h3>
                <div className="max-h-32 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {log.notificationIds.map((id) => (
                      <Badge key={id} variant="outline" className="text-xs font-mono">
                        {id}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}