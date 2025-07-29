"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, MapPin, Phone, Calendar, User } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { fetchVenueApplications, setSelectedApplication, rejectVenueApplication } from '@/stores/slices/venueSlice'
import { VenueApplication, VenueCategoryType, VenueApprovalStatus } from '@/types'
import { VenueApprovalDialog } from './venue-approval-dialog'

const categoryTypeLabels: Record<VenueCategoryType, string> = {
  [VenueCategoryType.Restaurant]: '餐廳',
  [VenueCategoryType.Hospital]: '醫院',
  [VenueCategoryType.Beauty]: '美容',
  [VenueCategoryType.Hotel]: '旅館',
}

const approvalStatusLabels: Record<VenueApprovalStatus, string> = {
  [VenueApprovalStatus.Pending]: '審核中',
  [VenueApprovalStatus.Approved]: '已通過',
  [VenueApprovalStatus.Rejected]: '未通過',
}

const approvalStatusColors: Record<VenueApprovalStatus, string> = {
  [VenueApprovalStatus.Pending]: 'bg-yellow-100 text-yellow-800',
  [VenueApprovalStatus.Approved]: 'bg-green-100 text-green-800',
  [VenueApprovalStatus.Rejected]: 'bg-red-100 text-red-800',
}

// Mock data for demonstration
const mockApplications: VenueApplication[] = [
  {
    id: '1',
    name: '寵物友善餐廳 - 毛小孩樂園',
    address: '忠孝東路四段123號',
    cityCode: 'TPE',
    districtCode: 'DA',
    petFriendlyLevel: 5,
    categoryType: VenueCategoryType.Restaurant,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: new Date('2025-01-28'),
    createdBy: 'user123',
    applicantUser: {
      id: 'user123',
      name: '王小明',
      email: 'wang@example.com',
      loginMethod: 'google',
      deviceInfo: {
        platform: 'iOS',
        version: '17.0',
        deviceId: 'device123'
      },
      registeredAt: new Date('2024-12-01'),
      status: 'active',
      commentCount: 15,
      reportCount: 0
    }
  },
  {
    id: '2', 
    name: '愛心動物醫院',
    address: '松仁路88號',
    cityCode: 'TPE',
    districtCode: 'XY',
    petFriendlyLevel: 4,
    categoryType: VenueCategoryType.Hospital,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: new Date('2025-01-27'),
    createdBy: 'user456',
    applicantUser: {
      id: 'user456',
      name: '李美玲',
      email: 'lee@example.com',
      loginMethod: 'line',
      deviceInfo: {
        platform: 'Android',
        version: '14',
        deviceId: 'device456'
      },
      registeredAt: new Date('2024-11-15'),
      status: 'active',
      commentCount: 23,
      reportCount: 0
    }
  }
]

export function PendingShopList() {
  const dispatch = useAppDispatch()
  const { applications, loading } = useAppSelector(state => state.venue)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [selectedForApproval, setSelectedForApproval] = useState<VenueApplication | null>(null)

  useEffect(() => {
    dispatch(fetchVenueApplications({ page: 1, limit: 10, status: VenueApprovalStatus.Pending }))
  }, [dispatch])

  const handleApprove = (application: VenueApplication) => {
    setSelectedForApproval(application)
    setIsApprovalDialogOpen(true)
  }

  const handleReject = async (applicationId: string) => {
    if (confirm('確定要拒絕此申請嗎？')) {
      try {
        await dispatch(rejectVenueApplication(applicationId)).unwrap()
        // Refresh the list after rejection
        dispatch(fetchVenueApplications({ page: 1, limit: 10, status: VenueApprovalStatus.Pending }))
      } catch (error) {
        console.error('Failed to reject application:', error)
      }
    }
  }

  // Use mock data for now
  const displayApplications = mockApplications

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>待審核店家列表</CardTitle>
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
            <div className="space-y-4">
              {displayApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{application.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge variant="secondary">
                          {categoryTypeLabels[application.categoryType]}
                        </Badge>
                        <Badge className={approvalStatusColors[application.approvalStatus]}>
                          {approvalStatusLabels[application.approvalStatus]}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleApprove(application)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        通過
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(application.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        拒絕
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{application.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">{'★'.repeat(application.petFriendlyLevel)}</span>
                      <span className="text-gray-400">{'★'.repeat(5 - application.petFriendlyLevel)}</span>
                      <span className="text-sm">寵物友善度</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>申請人：{application.applicantUser?.name || '未知'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>申請時間：{new Date(application.createdAt).toLocaleDateString('zh-TW')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <VenueApprovalDialog
        isOpen={isApprovalDialogOpen}
        onClose={() => {
          setIsApprovalDialogOpen(false)
          setSelectedForApproval(null)
        }}
        application={selectedForApproval}
      />
    </>
  )
}