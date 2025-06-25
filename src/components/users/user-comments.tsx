"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UserCommentsProps {
  userId: string
}

export function UserComments({ userId }: UserCommentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>用戶評論</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">💬</div>
          <p>用戶評論組件待實作</p>
          <p className="text-sm">用戶 ID: {userId}</p>
        </div>
      </CardContent>
    </Card>
  )
}