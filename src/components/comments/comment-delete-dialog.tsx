"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, Trash2 } from 'lucide-react'
import { Comment } from '@/types'
import { useAppDispatch } from '@/stores/store'
import { deleteComment } from '@/stores/slices/commentSlice'
import { DELETE_REASON_OPTIONS } from '@/shared/constants/comment.constants'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

interface CommentDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  comment: Comment | null
  onSuccess?: () => void
}

export function CommentDeleteDialog({ 
  isOpen, 
  onClose, 
  comment,
  onSuccess 
}: CommentDeleteDialogProps) {
  const dispatch = useAppDispatch()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteReason, setDeleteReason] = useState('')
  const [deleteReasonDetail, setDeleteReasonDetail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!comment || !deleteReason) {
      setError('請選擇刪除原因')
      return
    }

    setIsDeleting(true)
    setError(null)

    try {
      const fullReason = deleteReason === 'other' && deleteReasonDetail
        ? `其他原因: ${deleteReasonDetail}`
        : DELETE_REASON_OPTIONS.find(opt => opt.value === deleteReason)?.label || deleteReason

      await dispatch(deleteComment({ 
        id: comment.id, 
        reason: fullReason 
      })).unwrap()

      onSuccess?.()
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '刪除評論時發生錯誤')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    setDeleteReason('')
    setDeleteReasonDetail('')
    setError(null)
    onClose()
  }

  if (!comment) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            刪除評論
          </DialogTitle>
          <DialogDescription>
            您確定要刪除這則評論嗎？此操作無法復原。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Comment Preview */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                使用者：{comment.user.name}
              </span>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.createdAt), 'yyyy/MM/dd HH:mm', { locale: zhTW })}
              </span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">店家：</span>
              {comment.venue?.name}
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">評論內容：</span>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{comment.content}</p>
            </div>
          </div>

          {/* Delete Reason */}
          <div className="space-y-2">
            <Label htmlFor="deleteReason" className="text-red-600">
              刪除原因 *
            </Label>
            <Select value={deleteReason} onValueChange={setDeleteReason}>
              <SelectTrigger id="deleteReason">
                <SelectValue placeholder="請選擇刪除原因" />
              </SelectTrigger>
              <SelectContent>
                {DELETE_REASON_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Details for Other Reason */}
          {deleteReason === 'other' && (
            <div className="space-y-2">
              <Label htmlFor="deleteReasonDetail">
                詳細說明
              </Label>
              <Textarea
                id="deleteReasonDetail"
                placeholder="請說明刪除原因..."
                value={deleteReasonDetail}
                onChange={(e) => setDeleteReasonDetail(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Warning Message */}
          <div className="flex items-center gap-2 p-3 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span>刪除評論後，該評論將標記為已刪除狀態，使用者將無法看到此評論。</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isDeleting}
          >
            取消
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || !deleteReason || (deleteReason === 'other' && !deleteReasonDetail)}
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                刪除中...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                確認刪除
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}