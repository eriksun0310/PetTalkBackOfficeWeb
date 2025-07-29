import { VenueCategoryType, VenueApprovalStatus } from '@/types'

// 店家類型標籤
export const VENUE_CATEGORY_LABELS: Record<VenueCategoryType, string> = {
  [VenueCategoryType.Restaurant]: '餐廳',
  [VenueCategoryType.Hospital]: '醫院',
  [VenueCategoryType.Beauty]: '美容',
  [VenueCategoryType.Hotel]: '旅館'
}

// 審核狀態標籤
export const VENUE_APPROVAL_STATUS_LABELS: Record<VenueApprovalStatus, string> = {
  [VenueApprovalStatus.Pending]: '審核中',
  [VenueApprovalStatus.Approved]: '已通過',
  [VenueApprovalStatus.Rejected]: '未通過'
}

// 審核狀態樣式
export const VENUE_APPROVAL_STATUS_STYLES: Record<VenueApprovalStatus, string> = {
  [VenueApprovalStatus.Pending]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [VenueApprovalStatus.Approved]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [VenueApprovalStatus.Rejected]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

// 星期標籤
export const DAY_OF_WEEK_LABELS: string[] = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']

// 營業時間格式化
export const formatOpeningHour = (time?: string): string => {
  return time || '--:--'
}

// 判斷是否為24小時營業
export const is24Hours = (openTime?: string, closeTime?: string): boolean => {
  return openTime === '00:00' && closeTime === '23:59'
}

// 取得審核狀態的顏色類別（用於 Badge 組件）
export const getApprovalStatusVariant = (status: VenueApprovalStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case VenueApprovalStatus.Pending:
      return 'secondary'
    case VenueApprovalStatus.Approved:
      return 'default'
    case VenueApprovalStatus.Rejected:
      return 'destructive'
    default:
      return 'outline'
  }
}