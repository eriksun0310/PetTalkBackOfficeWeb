import { APIManagement } from '@/components/settings/api-management'

export default function APISettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          API 管理
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理對外 API 配置和金鑰
        </p>
      </div>
      
      <APIManagement />
    </div>
  )
}