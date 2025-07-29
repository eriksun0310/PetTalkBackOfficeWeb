import { CommentList } from '@/components/comments/comment-list'
import { CommentFilters } from '@/components/comments/comment-filters'
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function CommentsPage() {
  return (
    <ProtectedRoute requiredPermission="comments.read">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              評論管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理所有用戶評論
            </p>
          </div>
        </div>
        
        <CommentFilters />
        <CommentList />
      </div>
    </ProtectedRoute>
  )
}