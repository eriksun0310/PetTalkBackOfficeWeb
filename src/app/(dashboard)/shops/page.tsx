import { ShopList } from '@/components/shops/shop-list'
import { ShopFilters } from '@/components/shops/shop-filters'
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function ShopsPage() {
  return (
    <ProtectedRoute requiredPermission="shops.read">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              店家管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理所有店家資訊
            </p>
          </div>
        </div>
        
        <ShopFilters />
        <ShopList />
      </div>
    </ProtectedRoute>
  )
}