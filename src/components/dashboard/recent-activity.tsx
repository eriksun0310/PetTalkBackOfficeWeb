"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, MessageSquare, Store, Bell, Clock } from 'lucide-react'
import type { ActivityLog } from '@/types'

interface RecentActivityProps {
  activities?: ActivityLog[]
}

const mockActivities: ActivityLog[] = [
  {
    id: '1',
    userId: 'admin-1',
    user: {
      id: 'admin-1',
      name: '管理員',
      email: 'admin@pettalk.com',
      loginMethod: 'email',
      deviceInfo: { platform: 'web', version: '1.0', deviceId: '123' },
      registeredAt: new Date(),
      status: 'active',
      commentCount: 0,
      reportCount: 0,
    },
    action: 'blocked_user',
    targetType: 'user',
    targetId: 'user-123',
    details: { reason: 'inappropriate_behavior' },
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '2',
    userId: 'admin-1',
    user: {
      id: 'admin-1',
      name: '管理員',
      email: 'admin@pettalk.com',
      loginMethod: 'email',
      deviceInfo: { platform: 'web', version: '1.0', deviceId: '123' },
      registeredAt: new Date(),
      status: 'active',
      commentCount: 0,
      reportCount: 0,
    },
    action: 'removed_comment',
    targetType: 'comment',
    targetId: 'comment-456',
    details: { reason: 'spam' },
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: '3',
    userId: 'admin-1',
    user: {
      id: 'admin-1',
      name: '管理員',
      email: 'admin@pettalk.com',
      loginMethod: 'email',
      deviceInfo: { platform: 'web', version: '1.0', deviceId: '123' },
      registeredAt: new Date(),
      status: 'active',
      commentCount: 0,
      reportCount: 0,
    },
    action: 'approved_shop',
    targetType: 'shop',
    targetId: 'shop-789',
    details: { shopName: '寵物之家' },
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: '4',
    userId: 'admin-1',
    user: {
      id: 'admin-1',
      name: '管理員',
      email: 'admin@pettalk.com',
      loginMethod: 'email',
      deviceInfo: { platform: 'web', version: '1.0', deviceId: '123' },
      registeredAt: new Date(),
      status: 'active',
      commentCount: 0,
      reportCount: 0,
    },
    action: 'sent_notification',
    targetType: 'notification',
    targetId: 'notif-101',
    details: { title: '系統維護通知', recipients: 1500 },
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
  },
]

export function RecentActivity({ activities = mockActivities }: RecentActivityProps) {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'blocked_user':
      case 'suspended_user':
        return <User className="h-4 w-4" />
      case 'removed_comment':
      case 'approved_comment':
        return <MessageSquare className="h-4 w-4" />
      case 'approved_shop':
      case 'rejected_shop':
        return <Store className="h-4 w-4" />
      case 'sent_notification':
        return <Bell className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActivityBadgeColor = (action: string) => {
    switch (action) {
      case 'blocked_user':
      case 'removed_comment':
      case 'rejected_shop':
        return 'destructive'
      case 'approved_shop':
      case 'approved_comment':
        return 'default'
      case 'sent_notification':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getActivityDescription = (activity: ActivityLog) => {
    switch (activity.action) {
      case 'blocked_user':
        return '封鎖用戶'
      case 'removed_comment':
        return '移除評論'
      case 'approved_shop':
        return `審核通過店家: ${activity.details?.shopName}`
      case 'sent_notification':
        return `發送通知: ${activity.details?.title} (${activity.details?.recipients} 位收件人)`
      default:
        return activity.action
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return '剛剛'
    if (diffInMinutes < 60) return `${diffInMinutes} 分鐘前`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} 小時前`
    return `${Math.floor(diffInMinutes / 1440)} 天前`
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>最近活動</CardTitle>
        <Button variant="outline" size="sm">
          查看全部
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border bg-gray-50 dark:bg-gray-800/50">
              <div className="flex-shrink-0">
                {getActivityIcon(activity.action)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.user.name}
                  </p>
                  <Badge variant={getActivityBadgeColor(activity.action) as any}>
                    {getActivityDescription(activity)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatTimeAgo(activity.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}