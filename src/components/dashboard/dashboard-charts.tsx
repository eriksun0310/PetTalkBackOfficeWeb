"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ChartData } from '@/types'

interface DashboardChartsProps {
  userGrowthData?: ChartData[]
  commentTrendsData?: ChartData[]
}

const mockUserGrowthData: ChartData[] = [
  { date: '2024-01-01', value: 1000 },
  { date: '2024-01-02', value: 1050 },
  { date: '2024-01-03', value: 1120 },
  { date: '2024-01-04', value: 1200 },
  { date: '2024-01-05', value: 1280 },
  { date: '2024-01-06', value: 1350 },
  { date: '2024-01-07', value: 1420 },
]

const mockCommentTrendsData: ChartData[] = [
  { date: '2024-01-01', value: 450 },
  { date: '2024-01-02', value: 520 },
  { date: '2024-01-03', value: 480 },
  { date: '2024-01-04', value: 600 },
  { date: '2024-01-05', value: 580 },
  { date: '2024-01-06', value: 650 },
  { date: '2024-01-07', value: 720 },
]

export function DashboardCharts({ 
  userGrowthData = mockUserGrowthData,
  commentTrendsData = mockCommentTrendsData 
}: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>用戶增長趨勢</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p>圖表組件待整合</p>
              <p className="text-sm">最新數據: {userGrowthData[userGrowthData.length - 1]?.value.toLocaleString()} 用戶</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>評論活躍度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <p>圖表組件待整合</p>
              <p className="text-sm">最新數據: {commentTrendsData[commentTrendsData.length - 1]?.value.toLocaleString()} 條評論</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}