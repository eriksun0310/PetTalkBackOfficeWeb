"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NotificationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>通知發送記錄</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">📋</div>
          <p>通知發送記錄組件待實作</p>
        </div>
      </CardContent>
    </Card>
  )
}