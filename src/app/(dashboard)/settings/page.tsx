import { SettingsOverview } from '@/components/settings/settings-overview'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          系統設定
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理系統配置和設定
        </p>
      </div>
      
      <SettingsOverview />
    </div>
  )
}