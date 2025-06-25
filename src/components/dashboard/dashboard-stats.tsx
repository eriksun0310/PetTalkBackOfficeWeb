"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, MessageSquare, Store, Bell, TrendingUp, TrendingDown } from 'lucide-react'
import type { DashboardStats } from '@/types'

interface DashboardStatsProps {
  stats?: DashboardStats
}

const mockStats: DashboardStats = {
  totalUsers: 12543,
  activeUsers: 8932,
  totalComments: 34521,
  reportedComments: 89,
  totalShops: 1245,
  pendingShops: 23,
  totalNotifications: 156,
  sentNotifications: 132,
  userGrowth: 12.5,
  commentGrowth: -3.2,
}

export function DashboardStats({ stats = mockStats }: DashboardStatsProps) {
  const statsData = [
    {
      title: '總用戶數',
      value: stats.totalUsers.toLocaleString(),
      growth: `${stats.userGrowth}%`,
      isPositive: stats.userGrowth > 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: '活躍用戶',
      value: stats.activeUsers.toLocaleString(),
      subtitle: `佔總數 ${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%`,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: '總評論數',
      value: stats.totalComments.toLocaleString(),
      growth: `${Math.abs(stats.commentGrowth)}%`,
      isPositive: stats.commentGrowth > 0,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: '被檢舉評論',
      value: stats.reportedComments.toLocaleString(),
      subtitle: '需處理',
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      title: '總店家數',
      value: stats.totalShops.toLocaleString(),
      subtitle: '已審核通過',
      icon: Store,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
      title: '待審核店家',
      value: stats.pendingShops.toLocaleString(),
      subtitle: '需審核',
      icon: Store,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      title: '通知發送',
      value: stats.sentNotifications.toLocaleString(),
      subtitle: `總計 ${stats.totalNotifications} 則`,
      icon: Bell,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {stat.growth && (
                <div className={`flex items-center ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.growth}
                </div>
              )}
              {stat.subtitle && (
                <span>{stat.subtitle}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}