import { NotificationLog, NotificationLogStatus, NotificationType, UserRole, UserStatus } from '@/types'

export const mockNotificationLogs: NotificationLog[] = [
  {
    id: 'log-1',
    title: '系統維護通知',
    subtitle: '系統將於今晚 10:00 進行例行維護，預計維護時間 2 小時',
    type: NotificationType.AnnouncementNotification,
    recipientType: 'all',
    recipientCount: 1523,
    status: NotificationLogStatus.Sent,
    sentAt: '2024-11-15T14:30:00Z',
    completedAt: '2024-11-15T14:32:15Z',
    successCount: 1520,
    failedCount: 3,
    createdAt: '2024-11-15T14:28:00Z',
    createdBy: 'admin-1',
    createdByUser: {
      id: 'admin-1',
      name: '系統管理員',
      email: 'admin@pettalk.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin1',
      role: 'super_admin' as UserRole,
      status: 'active' as UserStatus,
      permissions: [],
      createdAt: '2024-01-01T00:00:00Z',
      lastLoginAt: '2024-11-20T08:00:00Z'
    }
  },
  {
    id: 'log-2',
    title: '新功能上線通知',
    subtitle: 'PTalk 新增寵物健康紀錄功能，快來體驗吧！',
    type: NotificationType.AnnouncementNotification,
    recipientType: 'all',
    recipientCount: 1530,
    status: NotificationLogStatus.Scheduled,
    scheduledAt: '2024-11-22T09:00:00Z',
    successCount: 0,
    failedCount: 0,
    createdAt: '2024-11-20T10:00:00Z',
    createdBy: 'admin-2',
    createdByUser: {
      id: 'admin-2',
      name: '產品經理',
      email: 'pm@pettalk.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin2',
      role: 'admin' as UserRole,
      status: 'active' as UserStatus,
      permissions: [],
      createdAt: '2024-01-15T00:00:00Z',
      lastLoginAt: '2024-11-20T09:30:00Z'
    }
  },
  {
    id: 'log-3',
    title: '評論違規通知',
    subtitle: '您的評論因違反社群規範已被移除',
    type: NotificationType.CommentNotification,
    recipientType: 'single',
    recipientCount: 1,
    recipientUserIds: ['user-42'],
    targetId: 'comment-123',
    status: NotificationLogStatus.Sent,
    sentAt: '2024-11-19T16:45:00Z',
    completedAt: '2024-11-19T16:45:01Z',
    successCount: 1,
    failedCount: 0,
    createdAt: '2024-11-19T16:44:00Z',
    createdBy: 'moderator-1'
  },
  {
    id: 'log-4',
    title: '週年慶活動通知',
    subtitle: 'PTalk 週年慶開始！多重好禮等你拿',
    type: NotificationType.AnnouncementNotification,
    recipientType: 'multiple',
    recipientCount: 850,
    recipientUserIds: [], // 實際有 850 個 ID，這裡省略
    status: NotificationLogStatus.Failed,
    sentAt: '2024-11-18T10:00:00Z',
    failedReason: '推播服務暫時無法使用',
    successCount: 0,
    failedCount: 850,
    createdAt: '2024-11-18T09:55:00Z',
    createdBy: 'marketing-1'
  },
  {
    id: 'log-5',
    title: '店家審核通過通知',
    subtitle: '恭喜！您申請的店家已通過審核',
    type: NotificationType.AnnouncementNotification,
    recipientType: 'single',
    recipientCount: 1,
    recipientUserIds: ['shop-owner-15'],
    status: NotificationLogStatus.Sent,
    sentAt: '2024-11-17T11:20:00Z',
    completedAt: '2024-11-17T11:20:02Z',
    successCount: 1,
    failedCount: 0,
    createdAt: '2024-11-17T11:19:00Z',
    createdBy: 'admin-1'
  },
  {
    id: 'log-6',
    title: '安全提醒',
    subtitle: '您的帳號在新裝置登入，請確認是否為本人操作',
    type: NotificationType.AnnouncementNotification,
    recipientType: 'single',
    recipientCount: 1,
    recipientUserIds: ['user-88'],
    status: NotificationLogStatus.Sending,
    sentAt: '2024-11-20T15:30:00Z',
    successCount: 0,
    failedCount: 0,
    createdAt: '2024-11-20T15:29:45Z',
    createdBy: 'system'
  },
  {
    id: 'log-7',
    title: '評論獲得點讚通知',
    subtitle: '您的評論獲得了 10 個讚！',
    type: NotificationType.CommentNotification,
    recipientType: 'single',
    recipientCount: 1,
    recipientUserIds: ['user-15'],
    targetId: 'comment-456',
    status: NotificationLogStatus.Cancelled,
    scheduledAt: '2024-11-21T08:00:00Z',
    failedReason: '用戶已取消接收此類通知',
    successCount: 0,
    failedCount: 0,
    createdAt: '2024-11-16T14:00:00Z',
    createdBy: 'system'
  },
  {
    id: 'log-8',
    title: '寵物友善店家推薦',
    subtitle: '發現您附近的新寵物友善餐廳！',
    type: NotificationType.AnnouncementNotification,
    recipientType: 'multiple',
    recipientCount: 320,
    status: NotificationLogStatus.Sent,
    sentAt: '2024-11-14T12:00:00Z',
    completedAt: '2024-11-14T12:05:30Z',
    successCount: 318,
    failedCount: 2,
    createdAt: '2024-11-14T11:50:00Z',
    createdBy: 'marketing-2'
  },
  {
    id: 'log-9',
    title: '帳號安全更新',
    subtitle: '請更新您的密碼以確保帳號安全',
    type: NotificationType.AnnouncementNotification,
    recipientType: 'all',
    recipientCount: 1540,
    status: NotificationLogStatus.Pending,
    scheduledAt: '2024-11-25T10:00:00Z',
    successCount: 0,
    failedCount: 0,
    createdAt: '2024-11-20T16:00:00Z',
    createdBy: 'security-admin'
  },
  {
    id: 'log-10',
    title: '每週精選店家',
    subtitle: '本週精選 5 家優質寵物友善店家',
    type: NotificationType.AnnouncementNotification,
    recipientType: 'all',
    recipientCount: 1545,
    status: NotificationLogStatus.Sent,
    sentAt: '2024-11-13T09:00:00Z',
    completedAt: '2024-11-13T09:08:45Z',
    successCount: 1542,
    failedCount: 3,
    createdAt: '2024-11-13T08:30:00Z',
    createdBy: 'content-editor'
  }
]

// 生成更多模擬資料的輔助函數
export function generateMockNotificationLogs(count: number): NotificationLog[] {
  const statuses = Object.values(NotificationLogStatus)
  const types = [NotificationType.AnnouncementNotification, NotificationType.CommentNotification]
  const recipientTypes = ['single', 'multiple', 'all'] as const
  
  const logs: NotificationLog[] = []
  
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const recipientType = recipientTypes[Math.floor(Math.random() * recipientTypes.length)]
    
    const recipientCount = recipientType === 'single' ? 1 : 
                          recipientType === 'multiple' ? Math.floor(Math.random() * 500) + 10 :
                          Math.floor(Math.random() * 500) + 1000
    
    const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    const sentAt = status !== NotificationLogStatus.Pending && status !== NotificationLogStatus.Scheduled ?
                   new Date(createdAt.getTime() + Math.random() * 60 * 60 * 1000) : undefined
    
    const log: NotificationLog = {
      id: `log-generated-${i}`,
      title: `通知標題 ${i + 1}`,
      subtitle: `這是第 ${i + 1} 則通知的內容描述`,
      type,
      recipientType,
      recipientCount,
      status,
      successCount: status === NotificationLogStatus.Sent ? Math.floor(recipientCount * 0.95) : 0,
      failedCount: status === NotificationLogStatus.Sent ? Math.floor(recipientCount * 0.05) : 
                   status === NotificationLogStatus.Failed ? recipientCount : 0,
      createdAt: createdAt.toISOString(),
      createdBy: `admin-${Math.floor(Math.random() * 5) + 1}`,
      ...(sentAt && { sentAt: sentAt.toISOString() }),
      ...(status === NotificationLogStatus.Sent && { 
        completedAt: new Date(sentAt!.getTime() + Math.random() * 5 * 60 * 1000).toISOString() 
      }),
      ...(status === NotificationLogStatus.Failed && { 
        failedReason: '發送失敗的原因說明' 
      }),
      ...(status === NotificationLogStatus.Scheduled && { 
        scheduledAt: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() 
      })
    }
    
    logs.push(log)
  }
  
  return logs
}