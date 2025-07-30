'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NotificationLog, NotificationLogStatus } from '@/types'
import { Send, CheckCircle, XCircle, Clock, Users, TrendingUp, AlertCircle } from 'lucide-react'
import { useMemo } from 'react'

interface NotificationLogStatsProps {
  logs: NotificationLog[]
}

export function NotificationLogStats({ logs }: NotificationLogStatsProps) {
  const stats = useMemo(() => {
    const totalLogs = logs.length
    const sentLogs = logs.filter(log => log.status === NotificationLogStatus.Sent)
    const failedLogs = logs.filter(log => log.status === NotificationLogStatus.Failed)
    const scheduledLogs = logs.filter(log => log.status === NotificationLogStatus.Scheduled)
    const pendingLogs = logs.filter(log => log.status === NotificationLogStatus.Pending)
    
    const totalRecipients = logs.reduce((sum, log) => sum + log.recipientCount, 0)
    const totalSuccess = sentLogs.reduce((sum, log) => sum + log.successCount, 0)
    const totalFailed = logs.reduce((sum, log) => sum + log.failedCount, 0)
    
    const successRate = totalRecipients > 0 
      ? ((totalSuccess / totalRecipients) * 100).toFixed(1) 
      : '0'
    
    // 計算最近 7 天的發送趨勢
    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)
    const recentLogs = logs.filter(log => new Date(log.createdAt) >= last7Days)
    const recentCount = recentLogs.length
    
    // 計算平均發送時長
    const completedLogs = sentLogs.filter(log => log.sentAt && log.completedAt)
    const avgDuration = completedLogs.length > 0
      ? completedLogs.reduce((sum, log) => {
          const duration = new Date(log.completedAt!).getTime() - new Date(log.sentAt!).getTime()
          return sum + duration
        }, 0) / completedLogs.length / 1000 // 轉換為秒
      : 0
    
    return {
      totalLogs,
      sentCount: sentLogs.length,
      failedCount: failedLogs.length,
      scheduledCount: scheduledLogs.length,
      pendingCount: pendingLogs.length,
      totalRecipients,
      totalSuccess,
      totalFailed,
      successRate,
      recentCount,
      avgDuration: avgDuration.toFixed(1)
    }
  }, [logs])

  const statCards = [
    {
      title: '總發送數',
      value: stats.totalLogs,
      icon: Send,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: `最近 7 天: ${stats.recentCount}`
    },
    {
      title: '成功率',
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: `${stats.totalSuccess} / ${stats.totalRecipients} 位用戶`
    },
    {
      title: '已發送',
      value: stats.sentCount,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: `平均耗時: ${stats.avgDuration} 秒`
    },
    {
      title: '發送失敗',
      value: stats.failedCount,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: `影響 ${stats.totalFailed} 位用戶`
    },
    {
      title: '排程中',
      value: stats.scheduledCount,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: '等待發送'
    },
    {
      title: '總接收者',
      value: stats.totalRecipients.toLocaleString(),
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      description: '累計通知人次'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}