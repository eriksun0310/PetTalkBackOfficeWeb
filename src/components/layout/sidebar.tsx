"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Store, 
  Bell, 
  Settings
} from 'lucide-react'

const navigation = [
  {
    name: '儀表板',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: '用戶管理',
    href: '/users',
    icon: Users,
  },
  {
    name: '評論管理',
    href: '/comments',
    icon: MessageSquare,
  },
  {
    name: '店家管理',
    href: '/shops',
    icon: Store,
    children: [
      {
        name: '所有店家',
        href: '/shops',
      },
      {
        name: '待審核店家',
        href: '/shops/pending',
      },
    ],
  },
  {
    name: '通知管理',
    href: '/notifications',
    icon: Bell,
    children: [
      {
        name: '通知清單',
        href: '/notifications',
      },
      {
        name: '發送通知',
        href: '/notifications/send',
      },
      {
        name: '發送記錄',
        href: '/notifications/history',
      },
    ],
  },
  {
    name: '系統設定',
    href: '/settings',
    icon: Settings,
    children: [
      {
        name: '基本設定',
        href: '/settings',
      },
      {
        name: '第三方登入',
        href: '/settings/auth',
      },
      {
        name: 'API 管理',
        href: '/settings/api',
      },
      {
        name: '管理員管理',
        href: '/settings/admins',
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          PTalk 後台
        </h1>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {navigation.map((item) => (
            <div key={item.name} className="mb-2">
              <Link
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
              
              {item.children && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        'flex items-center px-3 py-1 rounded-md text-sm transition-colors',
                        pathname === child.href
                          ? 'text-blue-700 bg-blue-50 dark:text-blue-200 dark:bg-blue-900/50'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}