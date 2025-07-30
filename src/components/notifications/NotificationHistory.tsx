'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/stores'
import { fetchNotificationLogs, setLogsFilters, setLogsPagination } from '@/stores/slices/notificationSlice'
import { NotificationLogList } from './NotificationLogList'
import { NotificationLogStats } from './NotificationLogStats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Download, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export function NotificationHistory() {
  const dispatch = useDispatch<AppDispatch>()
  const { logs, logsLoading, logsError, logsFilters, logsPagination } = useSelector(
    (state: RootState) => state.notification
  )

  // 載入通知日誌
  useEffect(() => {
    dispatch(fetchNotificationLogs({ 
      page: logsPagination.page, 
      limit: logsPagination.limit,
      filters: logsFilters 
    }))
  }, [dispatch, logsPagination.page, logsPagination.limit, logsFilters])

  const handleRefresh = () => {
    dispatch(fetchNotificationLogs({ 
      page: logsPagination.page, 
      limit: logsPagination.limit,
      filters: logsFilters 
    }))
  }

  const handleExport = () => {
    // TODO: 實作匯出功能
    toast.info('匯出功能開發中')
  }

  if (logsError) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{logsError}</p>
            <Button onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              重試
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">發送歷史</h1>
          <p className="text-muted-foreground">查看和管理通知發送記錄</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          匯出報表
        </Button>
      </div>

      {/* 統計資訊 */}
      <NotificationLogStats logs={logs} />

      {/* 主要內容 */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">發送記錄</TabsTrigger>
          <TabsTrigger value="analytics">分析報表</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <NotificationLogList 
            logs={logs}
            loading={logsLoading}
            onRefresh={handleRefresh}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>發送分析</CardTitle>
              <CardDescription>
                詳細的通知發送數據分析和趨勢圖表
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>圖表分析功能開發中...</p>
                <p className="text-sm mt-2">即將推出發送趨勢、用戶互動率等分析圖表</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}