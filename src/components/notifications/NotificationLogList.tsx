'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NotificationLog, NotificationLogStatus, NotificationType } from '@/types'
import { Bell, MessageSquare, Search, Filter, Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { NotificationLogDetailModal } from './NotificationLogDetailModal'

interface NotificationLogListProps {
  logs: NotificationLog[]
  loading?: boolean
  onRefresh?: () => void
}

export function NotificationLogList({ logs, loading, onRefresh }: NotificationLogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [selectedLog, setSelectedLog] = useState<NotificationLog | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // 篩選日誌
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter
    const matchesType = typeFilter === 'all' || log.type.toString() === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: NotificationLogStatus) => {
    const statusConfig = {
      [NotificationLogStatus.Pending]: { label: '待發送', variant: 'secondary' as const, icon: Clock },
      [NotificationLogStatus.Sending]: { label: '發送中', variant: 'default' as const, icon: Loader2 },
      [NotificationLogStatus.Sent]: { label: '已發送', variant: 'default' as const, icon: CheckCircle },
      [NotificationLogStatus.Failed]: { label: '發送失敗', variant: 'destructive' as const, icon: XCircle },
      [NotificationLogStatus.Cancelled]: { label: '已取消', variant: 'outline' as const, icon: XCircle },
      [NotificationLogStatus.Scheduled]: { label: '已排程', variant: 'secondary' as const, icon: Calendar }
    }
    
    const config = statusConfig[status]
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const getTypeBadge = (type: NotificationType) => {
    return type === NotificationType.CommentNotification ? (
      <Badge variant="secondary" className="flex items-center gap-1">
        <MessageSquare className="h-3 w-3" />
        評論通知
      </Badge>
    ) : (
      <Badge className="flex items-center gap-1">
        <Bell className="h-3 w-3" />
        系統公告
      </Badge>
    )
  }

  const getRecipientBadge = (log: NotificationLog) => {
    const recipientConfig = {
      single: { label: '單一用戶', variant: 'outline' as const },
      multiple: { label: `${log.recipientCount} 位用戶`, variant: 'secondary' as const },
      all: { label: '全體用戶', variant: 'default' as const }
    }
    
    const config = recipientConfig[log.recipientType]
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Users className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const handleViewDetail = (log: NotificationLog) => {
    setSelectedLog(log)
    setShowDetailModal(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>發送歷史記錄</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  載入中
                </>
              ) : (
                '重新整理'
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 篩選區域 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋標題、內容或發送者..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有狀態</SelectItem>
                  <SelectItem value={NotificationLogStatus.Pending}>待發送</SelectItem>
                  <SelectItem value={NotificationLogStatus.Sending}>發送中</SelectItem>
                  <SelectItem value={NotificationLogStatus.Sent}>已發送</SelectItem>
                  <SelectItem value={NotificationLogStatus.Failed}>發送失敗</SelectItem>
                  <SelectItem value={NotificationLogStatus.Cancelled}>已取消</SelectItem>
                  <SelectItem value={NotificationLogStatus.Scheduled}>已排程</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有類型</SelectItem>
                  <SelectItem value={NotificationType.AnnouncementNotification.toString()}>系統公告</SelectItem>
                  <SelectItem value={NotificationType.CommentNotification.toString()}>評論通知</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 資料表格 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>標題</TableHead>
                  <TableHead>類型</TableHead>
                  <TableHead>接收者</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>發送時間</TableHead>
                  <TableHead>成功/失敗</TableHead>
                  <TableHead>發送者</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                      <p className="text-muted-foreground">載入中...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <p className="text-muted-foreground">沒有找到符合條件的記錄</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.title}</p>
                          {log.subtitle && (
                            <p className="text-sm text-muted-foreground truncate max-w-xs">
                              {log.subtitle}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(log.type)}</TableCell>
                      <TableCell>{getRecipientBadge(log)}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell>
                        {log.sentAt ? (
                          <span className="text-sm">
                            {format(new Date(log.sentAt), 'MM/dd HH:mm', { locale: zhTW })}
                          </span>
                        ) : log.scheduledAt ? (
                          <span className="text-sm text-muted-foreground">
                            排程: {format(new Date(log.scheduledAt), 'MM/dd HH:mm', { locale: zhTW })}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {log.status === NotificationLogStatus.Sent ? (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-600">{log.successCount}</span>
                            /
                            <span className="text-red-600">{log.failedCount}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{log.createdByUser?.name || log.createdBy}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(log)}
                        >
                          查看詳情
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 詳情對話框 */}
      {selectedLog && (
        <NotificationLogDetailModal
          log={selectedLog}
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
        />
      )}
    </>
  )
}