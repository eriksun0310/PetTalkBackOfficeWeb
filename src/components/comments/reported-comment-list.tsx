"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ReportedCommentList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>被檢舉評論列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">🚩</div>
          <p>被檢舉評論列表組件待實作</p>
        </div>
      </CardContent>
    </Card>
  )
}