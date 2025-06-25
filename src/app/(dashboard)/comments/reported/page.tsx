import { ReportedCommentList } from '@/components/comments/reported-comment-list'
import { ReportedCommentFilters } from '@/components/comments/reported-comment-filters'

export default function ReportedCommentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            被檢舉評論
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            處理被檢舉的評論內容
          </p>
        </div>
      </div>
      
      <ReportedCommentFilters />
      <ReportedCommentList />
    </div>
  )
}