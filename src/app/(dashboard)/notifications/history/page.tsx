import { NotificationHistory } from '@/components/notifications/notification-history'
import { NotificationHistoryFilters } from '@/components/notifications/notification-history-filters'

export default function NotificationHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            發送記錄
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            查看所有通知發送歷史記錄
          </p>
        </div>
      </div>
      
      <NotificationHistoryFilters />
      <NotificationHistory />
    </div>
  )
}