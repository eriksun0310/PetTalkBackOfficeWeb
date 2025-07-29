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
import { 
  Store, 
  MapPin,
  Phone,
  Globe,
  Calendar,
  Clock,
  Image as ImageIcon,
  Edit2,
  Trash2,
  Hash,
  MapPinned,
  Info
} from 'lucide-react'
import { Venue } from '@/types'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { 
  VENUE_CATEGORY_LABELS,
  VENUE_APPROVAL_STATUS_LABELS,
  VENUE_APPROVAL_STATUS_STYLES
} from '@/shared/constants/venue.constants'
import { VenueEditDialog } from './venue-edit-dialog'
import { VenueDeleteDialog } from './venue-delete-dialog'
import { useAuth } from '@/hooks/use-auth'

interface VenueDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  venue: Venue | null
  onEditSuccess?: () => void
  onDeleteSuccess?: () => void
}

const dayOfWeekLabels = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']

export function VenueDetailDialog({ 
  isOpen, 
  onClose, 
  venue,
  onEditSuccess,
  onDeleteSuccess
}: VenueDetailDialogProps) {
  const { checkPermission } = useAuth()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleEdit = () => {
    setIsEditDialogOpen(true)
  }

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false)
    onEditSuccess?.()
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteSuccess = () => {
    setIsDeleteDialogOpen(false)
    onDeleteSuccess?.()
    onClose()
  }

  if (!venue) return null

  return (
    <>
      <Dialog open={isOpen && !isEditDialogOpen && !isDeleteDialogOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              店家詳細資料
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-200px)]">
            <div className="space-y-6 pr-4">
              {/* 基本資訊 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  基本資訊
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">店家名稱：</span>
                    <span className="font-medium">{venue.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">類型：</span>
                    <Badge variant="outline">
                      {VENUE_CATEGORY_LABELS[venue.categoryType]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">狀態：</span>
                    <Badge className={VENUE_APPROVAL_STATUS_STYLES[venue.approvalStatus]}>
                      {VENUE_APPROVAL_STATUS_LABELS[venue.approvalStatus]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">店家 ID：</span>
                    <span className="font-mono text-xs flex items-center gap-1">
                      <Hash className="h-3 w-3" />
                      {venue.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* 聯絡資訊 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  聯絡資訊
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="flex-1">{venue.address}</span>
                  </div>
                  {venue.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{venue.phone}</span>
                    </div>
                  )}
                  {venue.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <a 
                        href={venue.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {venue.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPinned className="h-4 w-4 text-gray-400" />
                    <span>座標：{venue.latitude.toFixed(6)}, {venue.longitude.toFixed(6)}</span>
                  </div>
                </div>
              </div>

              {/* 描述 */}
              {venue.description && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">描述</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {venue.description}
                  </p>
                </div>
              )}

              {/* 營業時間 */}
              {venue.openingHours && venue.openingHours.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    營業時間
                  </h3>
                  <div className="space-y-1 text-sm">
                    {[...venue.openingHours]
                      .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                      .map((hour) => (
                        <div key={hour.id} className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            {dayOfWeekLabels[hour.dayOfWeek]}：
                          </span>
                          <span>
                            {hour.isClosed ? (
                              <span className="text-red-500">休息</span>
                            ) : (
                              `${hour.openTime} - ${hour.closeTime}`
                            )}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 圖片 */}
              {venue.images && venue.images.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    店家圖片 ({venue.images.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {venue.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={image}
                          alt={`${venue.name} - 圖片 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {venue.mainImage === image && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            主要圖片
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 時間資訊 */}
              <div className="pt-4 border-t space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    建立時間：
                  </span>
                  <span>{format(new Date(venue.createdAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    更新時間：
                  </span>
                  <span>{format(new Date(venue.updatedAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
                </div>
                {venue.approvedAt && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      審核時間：
                    </span>
                    <span>{format(new Date(venue.approvedAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
                  </div>
                )}
              </div>

              {/* 刪除狀態 */}
              {venue.isDeleted && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    此店家已被刪除
                  </p>
                </div>
              )}

              {/* 拒絕原因 */}
              {venue.approvalStatus === 3 && venue.rejectionReason && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                    拒絕原因
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {venue.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              關閉
            </Button>
            {!venue.isDeleted && (
              <>
                {checkPermission('shops.write') && (
                  <Button onClick={handleEdit}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    編輯
                  </Button>
                )}
                {checkPermission('shops.delete') && (
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    刪除
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <VenueEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        venue={venue}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Dialog */}
      <VenueDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        venue={venue}
        onSuccess={handleDeleteSuccess}
      />
    </>
  )
}