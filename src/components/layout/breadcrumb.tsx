"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

const routeMap: Record<string, string> = {
  '/dashboard': '儀表板',
  '/users': '用戶管理',
  '/comments': '評論管理',
  '/shops': '店家管理',
  '/shops/pending': '待審核店家',
  '/notifications': '通知管理',
  '/notifications/send': '發送通知',
  '/notifications/history': '發送記錄',
  '/settings': '系統設定',
  '/settings/auth': '第三方登入',
  '/settings/api': 'API 管理',
  '/settings/admins': '管理員管理',
}

export function Breadcrumb() {
  const pathname = usePathname()
  
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/')
    return {
      name: routeMap[path] || segment,
      href: path,
      isLast: index === pathSegments.length - 1,
    }
  })

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link
        href="/dashboard"
        className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {breadcrumb.isLast ? (
            <span className="text-gray-900 dark:text-white font-medium">
              {breadcrumb.name}
            </span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {breadcrumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}