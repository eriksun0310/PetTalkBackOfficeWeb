import { UserList } from '@/components/users/user-list'
import { UserFilters } from '@/components/users/user-filters'

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            用戶管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            管理所有註冊用戶
          </p>
        </div>
      </div>
      
      <UserFilters />
      <UserList />
    </div>
  )
}