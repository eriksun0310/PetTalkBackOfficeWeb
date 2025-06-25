"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SettingsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>系統設定概覽</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">⚙️</div>
          <p>系統設定概覽組件待實作</p>
        </div>
      </CardContent>
    </Card>
  )
}