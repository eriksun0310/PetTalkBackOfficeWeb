import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { DashboardCharts } from '@/components/dashboard/dashboard-charts'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          儀表板
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          PTalk 系統管理概覽
        </p>
      </div>
      
      <DashboardStats />
      <DashboardCharts />
      
    </div>
  )
}