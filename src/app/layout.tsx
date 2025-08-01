import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ReduxProvider } from '@/components/providers/redux-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PTalk 後台管理系統',
  description: 'PTalk App 後台管理系統',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Sonner />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}