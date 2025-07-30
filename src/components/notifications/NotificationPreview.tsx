'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Smartphone, Users, Clock, Bell, MessageSquare } from 'lucide-react'

import { NotificationType } from '@/types'

interface NotificationPreviewProps {
  title: string
  subtitle: string
  type: NotificationType
  recipientCount: number | string
  scheduledTime?: string
}

export function NotificationPreview({
  title,
  subtitle,
  type,
  recipientCount,
  scheduledTime
}: NotificationPreviewProps) {
  const getTypeIcon = () => {
    return type === NotificationType.CommentNotification ? (
      <MessageSquare className="h-4 w-4" />
    ) : (
      <Bell className="h-4 w-4" />
    )
  }

  const getTypeBadge = () => {
    return type === NotificationType.CommentNotification ? (
      <Badge variant="secondary" className="flex items-center gap-1">
        <MessageSquare className="h-3 w-3" />
        評論通知
      </Badge>
    ) : (
      <Badge className="flex items-center gap-1">
        <Bell className="h-3 w-3" />
        系統公告
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            通知預覽
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 手機預覽框 */}
            <div className="mx-auto max-w-xs">
              <div className="bg-black rounded-[2.5rem] p-2">
                <div className="bg-white rounded-[2rem] p-4 min-h-[200px]">
                  {/* 狀態列 */}
                  <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                    <span>9:41 AM</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-3 bg-gray-400 rounded-sm"></div>
                      <div className="w-4 h-3 bg-gray-400 rounded-sm"></div>
                      <div className="w-4 h-3 bg-gray-400 rounded-sm"></div>
                    </div>
                  </div>

                  {/* 通知內容 */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        {getTypeIcon()}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">
                          {title || 'PTalk'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {subtitle || '請輸入通知內容...'}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">現在</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 通知資訊 */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">通知類型</span>
                {getTypeBadge()}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  接收者
                </span>
                <span className="font-medium">
                  {typeof recipientCount === 'string' 
                    ? recipientCount 
                    : `${recipientCount} 位用戶`
                  }
                </span>
              </div>

              {scheduledTime && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    排程時間
                  </span>
                  <span className="font-medium">
                    {new Date(scheduledTime).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 提示訊息 */}
      <Card className="bg-muted/50">
        <CardContent className="pt-4">
          <h4 className="text-sm font-medium mb-2">發送提示</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 通知標題建議不超過 20 個字</li>
            <li>• 副標題建議不超過 50 個字</li>
            <li>• 系統公告會推送給所有活躍用戶</li>
            <li>• 評論通知僅推送給相關用戶</li>
            <li>• 排程通知會在指定時間自動發送</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}