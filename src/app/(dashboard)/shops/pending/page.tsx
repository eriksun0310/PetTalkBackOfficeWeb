import { PendingShopList } from '@/components/shops/pending-shop-list'
import { PendingShopFilters } from '@/components/shops/pending-shop-filters'

export default function PendingShopsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            待審核店家
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            處理待審核的店家申請
          </p>
        </div>
      </div>
      
      <PendingShopFilters />
      <PendingShopList />
    </div>
  )
}