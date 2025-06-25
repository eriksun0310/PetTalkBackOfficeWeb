"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ThirdPartyAuthSettings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Google 登入設定</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🔑</div>
            <p>Google 登入設定組件待實作</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>LINE 登入設定</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">💬</div>
            <p>LINE 登入設定組件待實作</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}