"use client"

import { useState } from 'react'
import { PendingShopList } from '@/components/shops/pending-shop-list'
import { PendingShopFilters } from '@/components/shops/pending-shop-filters'
import { VenueCategoryType } from '@/types'

interface PendingFilters {
  search: string
  categoryType?: VenueCategoryType
}

export default function PendingShopsPage() {
  const [filters, setFilters] = useState<PendingFilters>({
    search: '',
    categoryType: undefined
  })

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
      
      <PendingShopFilters onFiltersChange={setFilters} />
      <PendingShopList filters={filters} />
    </div>
  )
}