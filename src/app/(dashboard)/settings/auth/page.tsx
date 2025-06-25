import { ThirdPartyAuthSettings } from '@/components/settings/third-party-auth-settings'

export default function AuthSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          第三方登入設定
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理 Google、LINE 等第三方登入服務配置
        </p>
      </div>
      
      <ThirdPartyAuthSettings />
    </div>
  )
}