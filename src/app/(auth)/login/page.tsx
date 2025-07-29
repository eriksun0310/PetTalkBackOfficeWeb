import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          PTalk 後台管理
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          請登入以存取管理系統
        </p>
      </div>
      <LoginForm />
    </div>
  )
}