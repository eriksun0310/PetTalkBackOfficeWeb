"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { fetchVenueApplications, rejectVenueApplication } from '@/stores/slices/venueSlice'
import { VenueApplication, VenueCategoryType, VenueApprovalStatus } from '@/types'
import { mockVenueApplications } from '@/shared/mocks/venue-applications.mock'
import { PendingShopTable } from './pending-shop-table'

interface PendingShopListProps {
  filters?: {
    search: string
    categoryType?: VenueCategoryType
  }
}

export function PendingShopList({ filters }: PendingShopListProps) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.venue)

  useEffect(() => {
    dispatch(fetchVenueApplications({ page: 1, limit: 10, status: VenueApprovalStatus.Pending }))
  }, [dispatch])

  const handleApprove = (application: VenueApplication) => {
    // 這個功能將由 PendingShopTable 內部處理
    console.log('Approve:', application)
  }

  const handleReject = async (applicationId: string) => {
    try {
      await dispatch(rejectVenueApplication(applicationId)).unwrap()
      // Refresh the list after rejection
      dispatch(fetchVenueApplications({ page: 1, limit: 10, status: VenueApprovalStatus.Pending }))
    } catch (error) {
      console.error('Failed to reject application:', error)
    }
  }

  // Filter applications based on filters
  const filteredApplications = mockVenueApplications.filter((app: VenueApplication) => {
    // 搜尋篩選
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      const nameMatch = app.name.toLowerCase().includes(searchLower)
      const addressMatch = app.address.toLowerCase().includes(searchLower)
      const userMatch = app.applicantUser?.name?.toLowerCase().includes(searchLower)
      
      if (!nameMatch && !addressMatch && !userMatch) {
        return false
      }
    }
    
    // 類型篩選
    if (filters?.categoryType !== undefined && app.categoryType !== filters.categoryType) {
      return false
    }
    
    return true
  })

  // Use filtered data
  const displayApplications = filteredApplications

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>待審核店家列表</span>
          <Badge variant="outline">
            共 {displayApplications.length} 筆資料
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">載入中...</div>
        ) : displayApplications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📋</div>
            <p>目前沒有待審核的店家申請</p>
          </div>
        ) : (
          <PendingShopTable 
            data={displayApplications}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </CardContent>
    </Card>
  )
}