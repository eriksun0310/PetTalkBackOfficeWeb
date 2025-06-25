"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SendNotificationForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>發送通知表單</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">📝</div>
          <p>發送通知表單組件待實作</p>
        </div>
      </CardContent>
    </Card>
  )
}