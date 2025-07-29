"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // 模擬登入 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 預設管理員帳號驗證
      if (username === 'admin' && password === 'admin123') {
        const mockUser = {
          id: '1',
          email: 'admin@ptalk.com',
          name: '系統管理員',
          role: 'admin' as const,
        }
        
        login(mockUser)
        router.push('/dashboard')
      } else {
        alert('帳號或密碼錯誤')
      }
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
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">帳號</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="請輸入帳號"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">密碼</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            className="w-full" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? '登入中...' : '登入'}
          </Button>
        </form>
        
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            預設管理員帳號：
          </p>
          <p className="text-sm font-mono">
            帳號：admin<br/>
            密碼：admin123
          </p>
        </div>
      </CardContent>
    </Card>
  )
}