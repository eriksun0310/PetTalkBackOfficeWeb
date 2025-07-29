export enum UserGenderType {
  Male = 1,
  Female = 2
}

export enum UserStatus {
  Deleted = -1,
  Registered = 1,
  Verified = 2,
  Disabled = 3
}

export enum PartnerType {
  Dog = 1,
  Cat = 2
}

export enum MapWarningIconType {
  AngryPoop = 1,
  SurprisedPoop = 2
}

export interface User {
  id: string
  email: string
  name: string
  genderType: UserGenderType
  partnerType: PartnerType
  mapWarningIconType: MapWarningIconType
  status: UserStatus
  isDeleted: boolean
  isSuspended?: boolean
  createdAt: Date | string
  createdBy?: string
  updatedAt: Date | string
  updatedBy?: string
  // Additional fields for display
  loginMethod?: 'google' | 'line' | 'email' | 'facebook'
  deviceInfo?: DeviceInfo
  registeredAt?: Date | string
  commentCount?: number
  reportCount?: number
  avatar?: string
  lastLoginAt?: Date | string
  thirdPartyAccounts?: ThirdPartyAccount[]
  bio?: string
}

export interface DeviceInfo {
  platform: string
  version: string
  deviceId: string
  ip?: string
  userAgent?: string
}

export interface ThirdPartyAccount {
  provider: 'google' | 'line'
  providerId: string
  email?: string
  name?: string
  connectedAt: Date
}

export enum PetFriendlyLevel {
  Low = 1,
  Medium = 2,
  High = 3
}

export enum FeedbackType {
  Paw = 1,     // 肉球 (正面評價)
  Poop = 2     // 大便 (負面評價)
}

export interface Comment {
  id: string
  userId: string
  user: User
  venueId: string
  venue?: Venue
  petId?: number
  content: string
  petFriendlyLevel: PetFriendlyLevel
  feedbackType: FeedbackType
  rating: number // 1-5
  isDeleted: boolean
  deletedReason?: string
  createdAt: Date | string
  createdBy: string
  updatedAt?: Date | string
  updatedBy?: string
  // 關聯的檔案（圖片/影片）
  files?: CommentFile[]
}

export interface CommentFile {
  id: number
  commentId: string
  fileId: string
  file?: File
  sortOrder: number
  isDeleted: boolean
  createdAt: Date | string
  createdBy: string
  updatedAt?: Date | string
  updatedBy?: string
}

export interface File {
  id: string
  name: string
  type?: string
  size?: number
  s3Bucket: string
  s3Key: string
  uploadDate: Date | string
  uploadedBy: string
  filePurpose: FilePurpose
  description?: string
  isDeleted: boolean
  lastAccessed?: Date | string
  createdAt: Date | string
  createdBy: string
  updatedAt?: Date | string
  updatedBy?: string
}

export enum FilePurpose {
  UserAvatar = 1,
  PetPhoto = 2,
  CommentImage = 3,
  CommentVideo = 4,
  VenuePhoto = 5,
  Other = 99
}

export interface Shop {
  id: string
  name: string
  address: string
  phone?: string
  email?: string
  website?: string
  description?: string
  category: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  submittedAt: Date
  approvedAt?: Date
  reviewedBy?: string
  location: Location
  images?: string[]
  rating?: number
  reviewCount: number
  ownerId?: string
}

export enum VenueCategoryType {
  Restaurant = 1,
  Hospital = 2,
  Beauty = 3,
  Hotel = 4
}

export enum VenueApprovalStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3
}

export interface VenueApplication {
  id: string
  name: string
  address: string
  cityCode: string
  districtCode: string
  petFriendlyLevel: number // 1-5
  categoryType: VenueCategoryType
  approvalStatus: VenueApprovalStatus
  approvedVenueId?: string
  approvedAt?: Date | string
  approvedBy?: string
  createdAt: Date | string
  createdBy: string
  applicantUser?: User
}

export interface Venue {
  id: string
  name: string
  categoryType: VenueCategoryType
  address: string
  latitude: number
  longitude: number
  phone?: string
  website?: string
  description?: string
  images?: string[] // 店家圖片 URLs
  mainImage?: string // 主要圖片 URL
  approvalStatus: VenueApprovalStatus
  approvedAt?: string | Date
  approvedBy?: string
  rejectionReason?: string
  isDeleted: boolean
  createdAt: string | Date
  createdBy: string
  updatedAt: string | Date
  updatedBy: string
  openingHours?: VenueOpeningHour[]
}

export interface VenueOpeningHour {
  id: number
  venueId: string
  dayOfWeek: number // 0=Sunday, 1=Monday, ..., 6=Saturday
  openTime?: string // HH:mm format
  closeTime?: string // HH:mm format
  isClosed: boolean
  isDeleted: boolean
  createdAt: string | Date
  createdBy: string
  updatedAt: string | Date
  updatedBy: string
}

export interface Location {
  latitude: number
  longitude: number
  address: string
  city: string
  district?: string
  zipCode?: string
}

export interface Notification {
  id: string
  title: string
  content: string
  type: NotificationType
  targetType: 'all' | 'users' | 'specific'
  targetUsers?: string[]
  targetUserCategories?: string[]
  status: 'draft' | 'scheduled' | 'sent' | 'failed'
  createdAt: Date
  scheduledAt?: Date
  sentAt?: Date
  sentBy: string
  recipients?: NotificationRecipient[]
  readCount: number
  deliveryStats?: DeliveryStats
}

export type NotificationType = 
  | 'system'
  | 'promotion'
  | 'announcement'
  | 'reminder'
  | 'warning'

export interface NotificationRecipient {
  userId: string
  status: 'pending' | 'delivered' | 'read' | 'failed'
  deliveredAt?: Date
  readAt?: Date
}

export interface DeliveryStats {
  total: number
  delivered: number
  read: number
  failed: number
}

export interface SystemSettings {
  id: string
  category: string
  key: string
  value: any
  description?: string
  updatedAt: Date
  updatedBy: string
}

export interface APIConfig {
  id: string
  name: string
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  authentication?: {
    type: 'bearer' | 'basic' | 'api_key'
    token?: string
    username?: string
    password?: string
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastUsedAt?: Date
  usageCount: number
}

export interface ThirdPartyLoginConfig {
  provider: 'google' | 'line'
  clientId: string
  clientSecret: string
  isEnabled: boolean
  scopes: string[]
  redirectUri?: string
  updatedAt: Date
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalComments: number
  reportedComments: number
  totalShops: number
  pendingShops: number
  totalNotifications: number
  sentNotifications: number
  userGrowth: number
  commentGrowth: number
}

export interface ChartData {
  date: string
  value: number
  label?: string
}

export interface ActivityLog {
  id: string
  userId: string
  user: User
  action: string
  targetType?: string
  targetId?: string
  details?: Record<string, any>
  ip?: string
  userAgent?: string
  createdAt: Date
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export interface FilterParams {
  search?: string
  status?: string
  dateFrom?: Date
  dateTo?: Date
  category?: string
  [key: string]: any
}