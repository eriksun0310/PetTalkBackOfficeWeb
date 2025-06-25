import { UserDetail } from '@/components/users/user-detail'
import { UserComments } from '@/components/users/user-comments'
import { UserActions } from '@/components/users/user-actions'

interface UserDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            用戶詳細資料
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            查看和管理用戶資訊
          </p>
        </div>
        <UserActions userId={id} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserDetail userId={id} />
        </div>
        <div>
          <UserComments userId={id} />
        </div>
      </div>
    </div>
  )
}