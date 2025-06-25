"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function APIManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>API 配置列表</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            新增 API
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🔧</div>
            <p>API 管理組件待實作</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API 金鑰管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🗝️</div>
            <p>API 金鑰管理組件待實作</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}