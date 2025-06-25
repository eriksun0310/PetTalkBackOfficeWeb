import { LocationList } from '@/components/shops/location-list'
import { LocationFilters } from '@/components/shops/location-filters'

export default function LocationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            地點管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            管理所有店家地點資訊
          </p>
        </div>
      </div>
      
      <LocationFilters />
      <LocationList />
    </div>
  )
}