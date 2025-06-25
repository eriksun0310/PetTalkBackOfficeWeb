"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (provider: string) => {
    setIsLoading(true)
    
    try {
      // 模擬登入 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模擬登入成功，設定用戶資料
      const mockUser = {
        id: '1',
        email: 'admin@pettalk.com',
        name: '系統管理員',
        role: 'admin' as const,
      }
      
      login(mockUser)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">管理員登入</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          className="w-full" 
          onClick={() => handleLogin('google')}
          disabled={isLoading}
        >
          {isLoading ? '登入中...' : '使用 Google 登入'}
        </Button>
        
        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => handleLogin('email')}
          disabled={isLoading}
        >
          {isLoading ? '登入中...' : '使用 Email 登入'}
        </Button>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          僅限管理員帳號可使用此系統
        </div>
      </CardContent>
    </Card>
  )
}