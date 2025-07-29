"use client"

import { useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, CheckCircle, XCircle, Eye, MapPin, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from '@/components/ui/data-table'
import { VenueApplication, PetFriendlyLevel } from '@/types'
import { 
  VENUE_CATEGORY_LABELS, 
  VENUE_APPROVAL_STATUS_LABELS, 
  VENUE_APPROVAL_STATUS_STYLES 
} from '@/shared/constants/venue.constants'
import { 
  PET_FRIENDLY_LEVEL_LABELS, 
  PET_FRIENDLY_LEVEL_STYLES 
} from '@/shared/constants/comment.constants'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { VenueApprovalDialog } from './venue-approval-dialog'
import { VenueApplicationDetailDialog } from './venue-application-detail-dialog'

interface PendingShopTableProps {
  data: VenueApplication[]
  onApprove: (application: VenueApplication) => void
  onReject: (applicationId: string) => void
}

export function PendingShopTable({ data, onApprove, onReject }: PendingShopTableProps) {
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [selectedForApproval, setSelectedForApproval] = useState<VenueApplication | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedForDetail, setSelectedForDetail] = useState<VenueApplication | null>(null)

  const handleApprove = (application: VenueApplication) => {
    setSelectedForApproval(application)
    setIsApprovalDialogOpen(true)
  }

  const handleReject = (applicationId: string) => {
    if (confirm('確定要拒絕此申請嗎？')) {
      onReject(applicationId)
    }
  }

  const handleViewDetail = (application: VenueApplication) => {
    setSelectedForDetail(application)
    setIsDetailDialogOpen(true)
  }

  const columns: ColumnDef<VenueApplication>[] = [
    {
      accessorKey: "name",
      header: "店家名稱",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "categoryType",
      header: "類型",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {VENUE_CATEGORY_LABELS[row.getValue("categoryType") as keyof typeof VENUE_CATEGORY_LABELS]}
        </Badge>
      ),
    },
    {
      accessorKey: "address",
      header: "地址",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span className="text-sm">{row.getValue("address")}</span>
        </div>
      ),
    },
    {
      accessorKey: "petFriendlyLevel",
      header: "寵物友善度",
      cell: ({ row }) => {
        const level = row.getValue("petFriendlyLevel") as PetFriendlyLevel
        return (
          <Badge className={PET_FRIENDLY_LEVEL_STYLES[level]}>
            {PET_FRIENDLY_LEVEL_LABELS[level]}
          </Badge>
        )
      },
    },
    {
      accessorKey: "applicantUser.name",
      header: "申請人",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span className="text-sm">{row.original.applicantUser?.name || '未知'}</span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "申請時間",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span className="text-sm">
            {format(new Date(row.getValue("createdAt")), 'yyyy/MM/dd', { locale: zhTW })}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const application = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">開啟選單</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>操作</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleViewDetail(application)}>
                <Eye className="mr-2 h-4 w-4" />
                查看詳情
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleApprove(application)}
                className="text-green-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                通過申請
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleReject(application.id)}
                className="text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                拒絕申請
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <>
      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="name"
        searchPlaceholder="搜尋店家名稱..."
        pageSize={10}
        onRowClick={handleViewDetail}
      />

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
        onClose={() => {
          setIsDetailDialogOpen(false)
          setSelectedForDetail(null)
        }}
        application={selectedForDetail}
      />
    </>
  )
}