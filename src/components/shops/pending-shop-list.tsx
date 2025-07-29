"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, MapPin, Phone, Calendar, User, Eye } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { fetchVenueApplications, setSelectedApplication, rejectVenueApplication } from '@/stores/slices/venueSlice'
import { VenueApplication, VenueCategoryType, VenueApprovalStatus } from '@/types'
import { VenueApprovalDialog } from './venue-approval-dialog'
import { VenueApplicationDetailDialog } from './venue-application-detail-dialog'
import { 
  VENUE_CATEGORY_LABELS, 
  VENUE_APPROVAL_STATUS_LABELS, 
  VENUE_APPROVAL_STATUS_STYLES 
} from '@/shared/constants/venue.constants'
import { 
  PET_FRIENDLY_LEVEL_LABELS, 
  PET_FRIENDLY_LEVEL_STYLES 
} from '@/shared/constants/comment.constants'
import { mockVenueApplications } from '@/shared/mocks/venue-applications.mock'

interface PendingShopListProps {
  filters?: {
    search: string
    categoryType?: VenueCategoryType
  }
}

export function PendingShopList({ filters }: PendingShopListProps) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.venue)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [selectedForApproval, setSelectedForApproval] = useState<VenueApplication | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedForDetail, setSelectedForDetail] = useState<VenueApplication | null>(null)

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

  const handleViewDetail = (application: VenueApplication) => {
    setSelectedForDetail(application)
    setIsDetailDialogOpen(true)
  }

  const handleDetailDialogClose = () => {
    setIsDetailDialogOpen(false)
    setSelectedForDetail(null)
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
    <>
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
            <div className="space-y-4">
              {displayApplications.map((application: VenueApplication) => (
                <div 
                  key={application.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewDetail(application)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{application.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge variant="secondary">
                          {VENUE_CATEGORY_LABELS[application.categoryType]}
                        </Badge>
                        <Badge className={VENUE_APPROVAL_STATUS_STYLES[application.approvalStatus]}>
                          {VENUE_APPROVAL_STATUS_LABELS[application.approvalStatus]}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetail(application)}
                        title="查看詳情"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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
                      <Badge className={PET_FRIENDLY_LEVEL_STYLES[application.petFriendlyLevel as keyof typeof PET_FRIENDLY_LEVEL_STYLES]}>
                        寵物友善度：{PET_FRIENDLY_LEVEL_LABELS[application.petFriendlyLevel as keyof typeof PET_FRIENDLY_LEVEL_LABELS]}
                      </Badge>
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

      <VenueApplicationDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleDetailDialogClose}
        application={selectedForDetail}
      />
    </>
  )
}