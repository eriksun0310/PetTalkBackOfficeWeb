"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Store, 
  MapPin,
  Phone,
  Globe,
  User,
  Calendar,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building,
  Hash
} from 'lucide-react'
import { VenueApplication } from '@/types'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { 
  VENUE_CATEGORY_LABELS,
  VENUE_APPROVAL_STATUS_LABELS,
  VENUE_APPROVAL_STATUS_STYLES
} from '@/shared/constants/venue.constants'
import {
  PET_FRIENDLY_LEVEL_LABELS,
  PET_FRIENDLY_LEVEL_STYLES
} from '@/shared/constants/comment.constants'
import { useAppDispatch } from '@/stores/store'
import { approveVenueApplication, rejectVenueApplication, fetchVenueApplications } from '@/stores/slices/venueSlice'
import { VenueApprovalDialog } from './venue-approval-dialog'

interface VenueApplicationDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  application: VenueApplication | null
}

export function VenueApplicationDetailDialog({ 
  isOpen, 
  onClose, 
  application
}: VenueApplicationDetailDialogProps) {
  const dispatch = useAppDispatch()
  const [isProcessing, setIsProcessing] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!application) return null

  const handleApprove = () => {
    setShowApprovalDialog(true)
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setError('請輸入拒絕原因')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      await dispatch(rejectVenueApplication(application.id)).unwrap()
      // Refresh the list
      dispatch(fetchVenueApplications({ page: 1, limit: 10, status: 1 }))
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '拒絕申請時發生錯誤')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleApprovalDialogClose = () => {
    setShowApprovalDialog(false)
    // If approval was successful, close the detail dialog too
    if (!showApprovalDialog) {
      onClose()
    }
  }

  const handleClose = () => {
    setRejectReason('')
    setShowRejectForm(false)
    setError(null)
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen && !showApprovalDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              店家申請詳細資料
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-200px)]">
            <div className="space-y-6 pr-4">
              {/* 基本資訊 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  店家基本資訊
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">店家名稱：</span>
                    <span className="font-medium">{application.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">類型：</span>
                    <Badge variant="outline">
                      {VENUE_CATEGORY_LABELS[application.categoryType]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">申請狀態：</span>
                    <Badge className={VENUE_APPROVAL_STATUS_STYLES[application.approvalStatus]}>
                      {VENUE_APPROVAL_STATUS_LABELS[application.approvalStatus]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">申請編號：</span>
                    <span className="font-mono text-xs flex items-center gap-1">
                      <Hash className="h-3 w-3" />
                      {application.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* 地址資訊 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  地址資訊
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 dark:text-gray-400">完整地址：</span>
                    <span className="flex-1 text-right">{application.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">城市代碼：</span>
                    <span>{application.cityCode}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">區域代碼：</span>
                    <span>{application.districtCode}</span>
                  </div>
                </div>
              </div>

              {/* 寵物友善度 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  寵物友善度評級
                </h3>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={PET_FRIENDLY_LEVEL_STYLES[application.petFriendlyLevel as keyof typeof PET_FRIENDLY_LEVEL_STYLES]}
                    variant="outline"
                  >
                    {PET_FRIENDLY_LEVEL_LABELS[application.petFriendlyLevel as keyof typeof PET_FRIENDLY_LEVEL_LABELS]}
                  </Badge>
                </div>
              </div>

              {/* 申請人資訊 */}
              {application.applicantUser && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    申請人資訊
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">姓名：</span>
                      <span>{application.applicantUser.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Email：</span>
                      <span>{application.applicantUser.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">使用者 ID：</span>
                      <span className="font-mono text-xs">{application.createdBy}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 時間資訊 */}
              <div className="pt-4 border-t space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    申請時間：
                  </span>
                  <span>{format(new Date(application.createdAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
                </div>
                {application.approvedAt && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      審核時間：
                    </span>
                    <span>{format(new Date(application.approvedAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
                  </div>
                )}
              </div>

              {/* 拒絕原因表單 */}
              {showRejectForm && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                  <Label htmlFor="rejectReason" className="text-red-600 dark:text-red-400 mb-2 block">
                    拒絕原因 *
                  </Label>
                  <Textarea
                    id="rejectReason"
                    placeholder="請說明拒絕此申請的原因..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={3}
                    className="mb-3"
                  />
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mb-3">
                      <AlertCircle className="h-4 w-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter>
            {!showRejectForm ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleClose}
                >
                  關閉
                </Button>
                {application.approvalStatus === 1 && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => setShowRejectForm(true)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      拒絕
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleApprove}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      通過
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRejectForm(false)
                    setRejectReason('')
                    setError(null)
                  }}
                  disabled={isProcessing}
                >
                  取消
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isProcessing || !rejectReason.trim()}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      處理中...
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      確認拒絕
                    </>
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <VenueApprovalDialog
        isOpen={showApprovalDialog}
        onClose={() => {
          setShowApprovalDialog(false)
          onClose() // Close the detail dialog after approval
        }}
        application={application}
      />
    </>
  )
}