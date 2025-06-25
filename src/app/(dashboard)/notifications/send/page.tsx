import { SendNotificationForm } from '@/components/notifications/send-notification-form'

export default function SendNotificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          發送通知
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          發送系統通知或推播訊息
        </p>
      </div>
      
      <div className="max-w-2xl">
        <SendNotificationForm />
      </div>
    </div>
  )
}