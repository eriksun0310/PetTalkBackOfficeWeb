"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NotificationList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>通知列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">🔔</div>
          <p>通知列表組件待實作</p>
        </div>
      </CardContent>
    </Card>
  )
}