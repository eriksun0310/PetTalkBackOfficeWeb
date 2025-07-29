import { PetFriendlyLevel, FeedbackType } from '@/types'

// 寵物友善程度標籤
export const PET_FRIENDLY_LEVEL_LABELS: Record<PetFriendlyLevel, string> = {
  [PetFriendlyLevel.Low]: '低',
  [PetFriendlyLevel.Medium]: '中',
  [PetFriendlyLevel.High]: '高'
}

// 寵物友善程度顏色樣式
export const PET_FRIENDLY_LEVEL_STYLES: Record<PetFriendlyLevel, string> = {
  [PetFriendlyLevel.Low]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [PetFriendlyLevel.Medium]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [PetFriendlyLevel.High]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
}

// 回饋類型標籤
export const FEEDBACK_TYPE_LABELS: Record<FeedbackType, string> = {
  [FeedbackType.Paw]: '🐾 肉球',
  [FeedbackType.Poop]: '💩 大便'
}

// 回饋類型顏色樣式
export const FEEDBACK_TYPE_STYLES: Record<FeedbackType, string> = {
  [FeedbackType.Paw]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [FeedbackType.Poop]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
}

// 評分標籤
export const RATING_LABELS: Record<number, string> = {
  1: '⭐',
  2: '⭐⭐',
  3: '⭐⭐⭐',
  4: '⭐⭐⭐⭐',
  5: '⭐⭐⭐⭐⭐'
}

// 評分文字描述
export const RATING_TEXT_LABELS: Record<number, string> = {
  1: '非常差',
  2: '差',
  3: '普通',
  4: '好',
  5: '非常好'
}

// 評論狀態
export const COMMENT_STATUS_LABELS: Record<string, string> = {
  'active': '正常',
  'deleted': '已刪除',
  'hidden': '已隱藏'
}

// 評論狀態顏色樣式
export const COMMENT_STATUS_STYLES: Record<string, string> = {
  'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'deleted': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'hidden': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

// 刪除原因選項
export const DELETE_REASON_OPTIONS = [
  { value: 'inappropriate', label: '內容不當' },
  { value: 'spam', label: '垃圾內容' },
  { value: 'offensive', label: '冒犯性內容' },
  { value: 'false_info', label: '虛假資訊' },
  { value: 'copyright', label: '侵犯版權' },
  { value: 'other', label: '其他原因' }
]