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
  createdAt: Date
  createdBy?: string
  updatedAt: Date
  updatedBy?: string
  // Additional fields for display
  loginMethod?: 'google' | 'line' | 'email'
  deviceInfo?: DeviceInfo
  registeredAt?: Date
  commentCount?: number
  reportCount?: number
  avatar?: string
  lastLoginAt?: Date
  thirdPartyAccounts?: ThirdPartyAccount[]
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

export interface Comment {
  id: string
  userId: string
  user: User
  content: string
  createdAt: Date
  updatedAt?: Date
  status: 'active' | 'removed' | 'pending'
  reportCount: number
  reports: Report[]
  shopId?: string
  shop?: Shop
  parentId?: string
  replies?: Comment[]
}

export interface Report {
  id: string
  reporterId: string
  reporter: User
  targetType: 'comment' | 'user' | 'shop'
  targetId: string
  reason: ReportReason
  description?: string
  status: 'pending' | 'reviewed' | 'dismissed'
  createdAt: Date
  reviewedAt?: Date
  reviewedBy?: string
}

export type ReportReason = 
  | 'spam'
  | 'harassment'
  | 'inappropriate_content'
  | 'false_information'
  | 'copyright_violation'
  | 'other'

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
  approvedAt?: Date
  approvedBy?: string
  createdAt: Date
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
  approvalStatus: VenueApprovalStatus
  approvedAt?: Date
  approvedBy?: string
  isDeleted: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
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
  createdAt: Date
  createdBy: string
  updatedAt: Date
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