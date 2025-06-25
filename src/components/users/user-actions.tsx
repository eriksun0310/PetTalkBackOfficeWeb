"use client"

import { Button } from '@/components/ui/button'

interface UserActionsProps {
  userId: string
}

export function UserActions({ userId }: UserActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button variant="outline">編輯</Button>
      <Button variant="destructive">停用</Button>
    </div>
  )
}