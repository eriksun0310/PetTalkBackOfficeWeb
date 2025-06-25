"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UserDetailProps {
  userId: string
}

export function UserDetail({ userId }: UserDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>用戶詳細資料</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">👤</div>
          <p>用戶詳細資料組件待實作</p>
          <p className="text-sm">用戶 ID: {userId}</p>
        </div>
      </CardContent>
    </Card>
  )
}