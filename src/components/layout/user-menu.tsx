"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export function UserMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.name || '管理員'}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {user?.email || 'admin@pettalk.com'}
          </p>
        </div>
      </div>
      
      <Button variant="ghost" size="icon" onClick={handleLogout}>
        <LogOut className="w-4 h-4" />
        <span className="sr-only">登出</span>
      </Button>
    </div>
  )
}