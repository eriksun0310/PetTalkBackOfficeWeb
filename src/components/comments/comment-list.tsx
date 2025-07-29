"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash2, ChevronLeft, ChevronRight, User, Store, Calendar, MessageCircle, Eye } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { fetchComments, setSelectedComment, deleteComment, setPagination } from '@/stores/slices/commentSlice'
import { Comment } from '@/types'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { CommentDeleteDialog } from './comment-delete-dialog'
import { CommentDetailDialog } from './comment-detail-dialog'
import { useAuth } from '@/hooks/use-auth'
import { 
  VENUE_CATEGORY_LABELS 
} from '@/shared/constants/venue.constants'
import { 
  FEEDBACK_TYPE_LABELS,
  FEEDBACK_TYPE_STYLES,
  PET_FRIENDLY_LEVEL_LABELS,
  PET_FRIENDLY_LEVEL_STYLES,
  RATING_LABELS
} from '@/shared/constants/comment.constants'

export function CommentList() {
  const dispatch = useAppDispatch()
  const { comments, loading, error, pagination, filters } = useAppSelector(state => state.comment)
  const { checkPermission } = useAuth()
  const [selectedCommentForDelete, setSelectedCommentForDelete] = useState<Comment | null>(null)
  const [selectedCommentForDetail, setSelectedCommentForDetail] = useState<Comment | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Load comments on component mount and when filters change
  useEffect(() => {
    dispatch(fetchComments({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters 
    }))
  }, [dispatch, pagination.page, pagination.limit, filters])

  const handleDelete = (comment: Comment) => {
    setSelectedCommentForDelete(comment)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false)
    setSelectedCommentForDelete(null)
  }

  const handleDeleteSuccess = () => {
    // Refresh comments list after successful deletion
    dispatch(fetchComments({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters 
    }))
  }

  const handleViewDetail = (comment: Comment) => {
    setSelectedCommentForDetail(comment)
    setIsDetailDialogOpen(true)
  }

  const handleDetailDialogClose = () => {
    setIsDetailDialogOpen(false)
    setSelectedCommentForDetail(null)
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }))
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  // Check if user has permission to view comments
  if (!checkPermission('comments.read')) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🔒</div>
            <p>您沒有權限查看評論資料</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>載入評論資料時發生錯誤：{error}</p>
            <Button 
              onClick={() => dispatch(fetchComments({ page: pagination.page, limit: pagination.limit, filters }))}
              className="mt-4"
            >
              重新載入
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>評論列表</span>
          <Badge variant="outline">
            共 {pagination.total} 筆資料
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">載入中...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">💬</div>
            <p>找不到符合條件的評論</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>使用者</TableHead>
                    <TableHead>店家</TableHead>
                    <TableHead>評論內容</TableHead>
                    <TableHead>評分</TableHead>
                    <TableHead>回饋</TableHead>
                    <TableHead>友善度</TableHead>
                    <TableHead>發表時間</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow 
                      key={comment.id} 
                      className={`${comment.isDeleted ? 'opacity-50' : ''} cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800`}
                      onClick={() => handleViewDetail(comment)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{comment.user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium">{comment.venue?.name}</div>
                            <Badge variant="outline" className="text-xs">
                              {comment.venue && VENUE_CATEGORY_LABELS[comment.venue.categoryType]}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px]">
                          <p className="text-sm" title={comment.content}>
                            {truncateText(comment.content, 50)}
                          </p>
                          {comment.isDeleted && comment.deletedReason && (
                            <p className="text-xs text-red-500 mt-1">
                              刪除原因: {comment.deletedReason}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {RATING_LABELS[comment.rating]}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={FEEDBACK_TYPE_STYLES[comment.feedbackType]}
                        >
                          {FEEDBACK_TYPE_LABELS[comment.feedbackType]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={PET_FRIENDLY_LEVEL_STYLES[comment.petFriendlyLevel]}
                        >
                          {PET_FRIENDLY_LEVEL_LABELS[comment.petFriendlyLevel]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(comment.createdAt), 'yyyy/MM/dd HH:mm', { locale: zhTW })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetail(comment)}
                            className="h-8 w-8 p-0"
                            title="查看詳情"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!comment.isDeleted && checkPermission('comments.moderate') && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(comment)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="刪除評論"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                          {comment.isDeleted && (
                            <Badge variant="destructive">已刪除</Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  顯示第 {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} 筆，
                  共 {pagination.total} 筆資料
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    上一頁
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let page: number
                      if (pagination.totalPages <= 5) {
                        page = i + 1
                      } else if (pagination.page <= 3) {
                        page = i + 1
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        page = pagination.totalPages - 4 + i
                      } else {
                        page = pagination.page - 2 + i
                      }
                      
                      return (
                        <Button
                          key={page}
                          variant={pagination.page === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="h-8 w-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    下一頁
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Delete Dialog */}
        <CommentDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleDeleteDialogClose}
          comment={selectedCommentForDelete}
          onSuccess={handleDeleteSuccess}
        />

        {/* Detail Dialog */}
        <CommentDetailDialog
          isOpen={isDetailDialogOpen}
          onClose={handleDetailDialogClose}
          comment={selectedCommentForDetail}
        />
      </CardContent>
    </Card>
  )
}