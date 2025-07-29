"use client"

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useAppDispatch } from '@/stores/store'
import { deleteVenue, fetchVenues } from '@/stores/slices/venueSlice'
import { Venue } from '@/types'
import { useToast } from '@/hooks/use-toast'

interface VenueDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  venue: Venue | null
  onSuccess?: () => void
}

export function VenueDeleteDialog({ isOpen, onClose, venue, onSuccess }: VenueDeleteDialogProps) {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirmDelete = async () => {
    if (!venue) return

    setIsDeleting(true)
    try {
      await dispatch(deleteVenue(venue.id)).unwrap()
      toast({
        title: "刪除成功",
        description: `店家「${venue.name}」已成功刪除`,
      })
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Failed to delete venue:', error)
      toast({
        title: "刪除失敗",
        description: "無法刪除店家，請稍後再試",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    if (!isDeleting) {
      onClose()
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <AlertDialogTitle>確認刪除店家</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left">
            您即將刪除店家「<span className="font-semibold">{venue?.name}</span>」。
            <br />
            <br />
            <span className="text-red-600 dark:text-red-400">
              此操作無法復原，該店家的所有資料將被標記為已刪除。
            </span>
            <br />
            <br />
            確定要繼續嗎？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? '刪除中...' : '確認刪除'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}