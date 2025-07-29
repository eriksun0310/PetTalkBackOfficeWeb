"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Image } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { fetchVenues, setSelectedVenue, deleteVenue, setPagination } from '@/stores/slices/venueSlice'
import { Venue } from '@/types'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { VenueEditDialog } from './venue-edit-dialog'
import { VenueDeleteDialog } from './venue-delete-dialog'
import { VenueDetailDialog } from './venue-detail-dialog'
import { useAuth } from '@/hooks/use-auth'
import { 
  VENUE_CATEGORY_LABELS, 
  VENUE_APPROVAL_STATUS_LABELS, 
  VENUE_APPROVAL_STATUS_STYLES 
} from '@/shared/constants/venue.constants'

export function ShopList() {
  const dispatch = useAppDispatch()
  const { venues, loading, error, pagination, filters } = useAppSelector(state => state.venue)
  const { checkPermission } = useAuth()
  const [selectedVenueForEdit, setSelectedVenueForEdit] = useState<Venue | null>(null)
  const [selectedVenueForDelete, setSelectedVenueForDelete] = useState<Venue | null>(null)
  const [selectedVenueForDetail, setSelectedVenueForDetail] = useState<Venue | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Load venues on component mount and when filters change
  useEffect(() => {
    dispatch(fetchVenues({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters 
    }))
  }, [dispatch, pagination.page, pagination.limit, filters])

  const handleEdit = (venue: Venue) => {
    setSelectedVenueForEdit(venue)
    setIsEditDialogOpen(true)
    dispatch(setSelectedVenue(venue))
  }

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false)
    setSelectedVenueForEdit(null)
    // Refresh venues list after edit
    dispatch(fetchVenues({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters 
    }))
  }

  const handleDelete = (venue: Venue) => {
    setSelectedVenueForDelete(venue)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false)
    setSelectedVenueForDelete(null)
  }

  const handleDeleteSuccess = () => {
    // Refresh venues list after successful deletion
    dispatch(fetchVenues({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters 
    }))
  }

  const handleViewDetail = (venue: Venue) => {
    setSelectedVenueForDetail(venue)
    setIsDetailDialogOpen(true)
  }

  const handleDetailDialogClose = () => {
    setIsDetailDialogOpen(false)
    setSelectedVenueForDetail(null)
  }

  const handleDetailEditSuccess = () => {
    // Refresh venues list after edit
    dispatch(fetchVenues({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters 
    }))
  }

  const handleDetailDeleteSuccess = () => {
    // Refresh venues list after delete
    dispatch(fetchVenues({ 
      page: pagination.page, 
      limit: pagination.limit, 
      filters 
    }))
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }))
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  // Check if user has permission to view shops
  if (!checkPermission('shops.read')) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🔒</div>
            <p>您沒有權限查看店家資料</p>
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
            <p>載入店家資料時發生錯誤：{error}</p>
            <Button 
              onClick={() => dispatch(fetchVenues({ page: pagination.page, limit: pagination.limit, filters }))}
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
          <span>店家列表</span>
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
        ) : venues.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🏪</div>
            <p>找不到符合條件的店家</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">圖片</TableHead>
                    <TableHead>店家名稱</TableHead>
                    <TableHead>類型</TableHead>
                    <TableHead>地址</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>建立時間</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {venues.map((venue) => (
                    <TableRow 
                      key={venue.id}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => handleViewDetail(venue)}
                    >
                      <TableCell>
                        {venue.mainImage ? (
                          <img
                            src={venue.mainImage}
                            alt={venue.name}
                            className="w-16 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                            <Image className="h-6 w-6 text-gray-400" aria-hidden="true" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="max-w-[200px]">
                          <div className="font-semibold">{venue.name}</div>
                          {venue.phone && (
                            <div className="text-sm text-gray-500">{venue.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {VENUE_CATEGORY_LABELS[venue.categoryType]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[250px]" title={venue.address}>
                          {truncateText(venue.address, 50)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={VENUE_APPROVAL_STATUS_STYLES[venue.approvalStatus]}
                        >
                          {VENUE_APPROVAL_STATUS_LABELS[venue.approvalStatus]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(venue.createdAt), 'yyyy/MM/dd HH:mm', { locale: zhTW })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetail(venue)}
                            className="h-8 w-8 p-0"
                            title="查看詳情"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {checkPermission('shops.write') && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(venue)}
                              className="h-8 w-8 p-0"
                              title="編輯店家"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          {checkPermission('shops.delete') && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(venue)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="刪除店家"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
        <VenueDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleDeleteDialogClose}
          venue={selectedVenueForDelete}
          onSuccess={handleDeleteSuccess}
        />

        {/* Edit Dialog */}
        <VenueEditDialog
          isOpen={isEditDialogOpen}
          onClose={handleEditDialogClose}
          venue={selectedVenueForEdit}
          onSuccess={() => {
            // Refresh venues list after edit
            dispatch(fetchVenues({ 
              page: pagination.page, 
              limit: pagination.limit, 
              filters 
            }))
          }}
        />

        {/* Detail Dialog */}
        <VenueDetailDialog
          isOpen={isDetailDialogOpen}
          onClose={handleDetailDialogClose}
          venue={selectedVenueForDetail}
          onEditSuccess={handleDetailEditSuccess}
          onDeleteSuccess={handleDetailDeleteSuccess}
        />
      </CardContent>
    </Card>
  )
}