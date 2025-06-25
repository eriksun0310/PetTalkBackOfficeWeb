import { NotificationList } from '@/components/notifications/notification-list'
import { NotificationFilters } from '@/components/notifications/notification-filters'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            通知管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            管理系統通知和推播
          </p>
        </div>
        <Link href="/notifications/send">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            發送通知
          </Button>
        </Link>
      </div>
      
      <NotificationFilters />
      <NotificationList />
    </div>
  )
}