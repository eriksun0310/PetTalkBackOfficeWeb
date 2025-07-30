import { NotificationType } from '@/types'

// 通知類型標籤
export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  [NotificationType.CommentNotification]: '評論通知',
  [NotificationType.AnnouncementNotification]: '公告通知'
}

// 通知類型樣式
export const NOTIFICATION_TYPE_STYLES: Record<NotificationType, string> = {
  [NotificationType.CommentNotification]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [NotificationType.AnnouncementNotification]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
}

// 已讀狀態標籤
export const READ_STATUS_LABELS = {
  true: '已讀',
  false: '未讀'
}

// 已讀狀態樣式
export const READ_STATUS_STYLES = {
  true: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  false: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
}