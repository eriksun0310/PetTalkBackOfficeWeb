import { AdminManagement } from '@/components/settings/admin-management'

export default function AdminManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          管理員管理
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理系統管理員帳號和權限
        </p>
      </div>
      
      <AdminManagement />
    </div>
  )
}