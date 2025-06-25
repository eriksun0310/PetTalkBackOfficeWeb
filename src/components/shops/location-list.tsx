"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function LocationList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>地點列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">📍</div>
          <p>地點列表組件待實作</p>
        </div>
      </CardContent>
    </Card>
  )
}