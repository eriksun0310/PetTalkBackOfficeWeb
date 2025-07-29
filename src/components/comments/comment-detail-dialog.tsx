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
  User, 
  Store, 
  Calendar, 
  MessageCircle, 
  Star,
  MapPin,
  Phone,
  Globe,
  Image as ImageIcon,
  Trash2
} from 'lucide-react'
import { Comment } from '@/types'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { 
  VENUE_CATEGORY_LABELS 
} from '@/shared/constants/venue.constants'
import { 
  FEEDBACK_TYPE_LABELS,
  FEEDBACK_TYPE_STYLES,
  PET_FRIENDLY_LEVEL_LABELS,
  PET_FRIENDLY_LEVEL_STYLES,
  RATING_LABELS,
  RATING_TEXT_LABELS
} from '@/shared/constants/comment.constants'
import { CommentDeleteDialog } from './comment-delete-dialog'
import { useAuth } from '@/hooks/use-auth'
import { useAppDispatch } from '@/stores/store'
import { fetchComments } from '@/stores/slices/commentSlice'

interface CommentDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  comment: Comment | null
}

export function CommentDetailDialog({ 
  isOpen, 
  onClose, 
  comment
}: CommentDetailDialogProps) {
  const dispatch = useAppDispatch()
  const { checkPermission } = useAuth()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteSuccess = () => {
    // Refresh comments list after successful deletion
    dispatch(fetchComments({ 
      page: 1, 
      limit: 20, 
      filters: {
        search: '',
        venueCategory: undefined,
        rating: undefined,
        feedbackType: undefined,
        petFriendlyLevel: undefined,
        isDeleted: false
      } 
    }))
    onClose()
  }

  if (!comment) return null

  return (
    <>
      <Dialog open={isOpen && !isDeleteDialogOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              評論詳細資料
            </DialogTitle>
          </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 pr-4">
            {/* 使用者資訊 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                使用者資訊
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">名稱：</span>
                  <span className="font-medium">{comment.user.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Email：</span>
                  <span>{comment.user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">使用者 ID：</span>
                  <span className="font-mono text-xs">{comment.userId}</span>
                </div>
              </div>
            </div>

            {/* 店家資訊 */}
            {comment.venue && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  店家資訊
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">名稱：</span>
                    <span className="font-medium">{comment.venue.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">類型：</span>
                    <Badge variant="outline">
                      {VENUE_CATEGORY_LABELS[comment.venue.categoryType]}
                    </Badge>
                  </div>
                  {comment.venue.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span className="flex-1 text-right">{comment.venue.address}</span>
                    </div>
                  )}
                  {comment.venue.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="flex-1 text-right">{comment.venue.phone}</span>
                    </div>
                  )}
                  {comment.venue.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <a 
                        href={comment.venue.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-right text-blue-600 hover:underline"
                      >
                        {comment.venue.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 評論內容 */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                評論內容
              </h3>
              
              {/* 評分資訊 */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">評分：</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-medium">{comment.rating}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-500">({RATING_TEXT_LABELS[comment.rating]})</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">回饋類型：</span>
                  <Badge 
                    variant="secondary" 
                    className={FEEDBACK_TYPE_STYLES[comment.feedbackType]}
                  >
                    {FEEDBACK_TYPE_LABELS[comment.feedbackType]}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">寵物友善程度：</span>
                  <Badge 
                    variant="secondary" 
                    className={PET_FRIENDLY_LEVEL_STYLES[comment.petFriendlyLevel]}
                  >
                    {PET_FRIENDLY_LEVEL_LABELS[comment.petFriendlyLevel]}
                  </Badge>
                </div>
              </div>

              {/* 評論文字 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>

              {/* 評論圖片 */}
              {comment.files && comment.files.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    相關圖片 ({comment.files.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {comment.files.map((file, index) => (
                      <div key={file.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {file.file?.type?.startsWith('image/') ? (
                          <img
                            src={`https://picsum.photos/400/400?random=${file.id}`} // 模擬圖片 URL
                            alt={`評論圖片 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ImageIcon className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 時間資訊 */}
            <div className="pt-4 border-t space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  發表時間：
                </span>
                <span>{format(new Date(comment.createdAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
              </div>
              {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    更新時間：
                  </span>
                  <span>{format(new Date(comment.updatedAt), 'yyyy/MM/dd HH:mm:ss', { locale: zhTW })}</span>
                </div>
              )}
            </div>

            {/* 刪除狀態 */}
            {comment.isDeleted && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                  此評論已被刪除
                </p>
                {comment.deletedReason && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    刪除原因：{comment.deletedReason}
                  </p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            關閉
          </Button>
          {!comment.isDeleted && checkPermission('comments.moderate') && (
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              刪除評論
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Delete Dialog */}
    <CommentDeleteDialog
      isOpen={isDeleteDialogOpen}
      onClose={() => setIsDeleteDialogOpen(false)}
      comment={comment}
      onSuccess={handleDeleteSuccess}
    />
  </>
  )
}