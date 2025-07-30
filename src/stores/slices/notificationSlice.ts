import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Notification, NotificationFilters, NotificationType, NotificationLog, NotificationLogFilters } from '@/types'
import { mockNotifications } from '@/shared/mocks/notifications.mock'
import { mockNotificationLogs } from '@/shared/mocks/notification-logs.mock'

interface SendNotificationData {
  title: string
  subtitle?: string
  type: NotificationType
  recipientUserIds: string[]
  targetId?: string
  payload?: Record<string, any>
  scheduledAt?: string
}

interface NotificationDraft {
  id: string
  data: Partial<SendNotificationData>
  createdAt: string
  updatedAt: string
}

interface NotificationState {
  notifications: Notification[]
  selectedNotification: Notification | null
  loading: boolean
  error: string | null
  filters: NotificationFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  sendingNotification: boolean
  drafts: NotificationDraft[]
  currentDraft: NotificationDraft | null
  // 通知日誌相關
  logs: NotificationLog[]
  selectedLog: NotificationLog | null
  logsLoading: boolean
  logsError: string | null
  logsFilters: NotificationLogFilters
  logsPagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: NotificationState = {
  notifications: [],
  selectedNotification: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    type: undefined,
    isRead: undefined,
    recipientUserId: undefined,
    dateFrom: undefined,
    dateTo: undefined
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },
  sendingNotification: false,
  drafts: [],
  currentDraft: null,
  // 通知日誌初始狀態
  logs: [],
  selectedLog: null,
  logsLoading: false,
  logsError: null,
  logsFilters: {
    search: '',
    type: undefined,
    status: undefined,
    recipientType: undefined,
    createdBy: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    scheduledOnly: false
  },
  logsPagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  }
}

// Async thunks
export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async ({ page = 1, limit = 20, filters = {} }: { page?: number; limit?: number; filters?: NotificationFilters }) => {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/notifications?page=${page}&limit=${limit}`)
    // const data = await response.json()
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Apply filters to mock data
    let filteredData = [...mockNotifications]
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredData = filteredData.filter(notification => 
        notification.title.toLowerCase().includes(searchLower) ||
        notification.subtitle?.toLowerCase().includes(searchLower) ||
        notification.recipientUser?.name.toLowerCase().includes(searchLower)
      )
    }
    
    // Type filter
    if (filters.type !== undefined) {
      filteredData = filteredData.filter(notification => notification.type === filters.type)
    }
    
    // Read status filter
    if (filters.isRead !== undefined) {
      filteredData = filteredData.filter(notification => notification.isRead === filters.isRead)
    }
    
    // Recipient filter
    if (filters.recipientUserId) {
      filteredData = filteredData.filter(notification => notification.recipientUserId === filters.recipientUserId)
    }
    
    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      filteredData = filteredData.filter(notification => {
        const createdAt = new Date(notification.createdAt).getTime()
        const fromTime = filters.dateFrom ? new Date(filters.dateFrom).getTime() : 0
        const toTime = filters.dateTo ? new Date(filters.dateTo).getTime() : Date.now()
        return createdAt >= fromTime && createdAt <= toTime
      })
    }
    
    // Calculate pagination
    const total = filteredData.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredData.slice(startIndex, endIndex)
    
    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    }
  }
)

export const markAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (notificationId: string) => {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/notifications/${notificationId}/read`, { method: 'PUT' })
    // const data = await response.json()
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 300))
    return { notificationId, readAt: new Date().toISOString() }
  }
)

export const sendNotification = createAsyncThunk(
  'notification/sendNotification',
  async (data: SendNotificationData) => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/notifications/send', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // const result = await response.json()
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock notification IDs
    const notificationIds = data.recipientUserIds.map((userId, index) => ({
      id: `notification-${Date.now()}-${index}`,
      recipientUserId: userId
    }))
    
    return {
      success: true,
      totalSent: data.recipientUserIds.length,
      notificationIds,
      scheduledAt: data.scheduledAt
    }
  }
)

export const saveDraft = createAsyncThunk(
  'notification/saveDraft',
  async (data: Partial<SendNotificationData>) => {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const draft: NotificationDraft = {
      id: `draft-${Date.now()}`,
      data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return draft
  }
)

export const loadDraft = createAsyncThunk(
  'notification/loadDraft',
  async (draftId: string) => {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Return mock draft for demo
    const draft: NotificationDraft = {
      id: draftId,
      data: {
        title: '草稿通知標題',
        subtitle: '這是一份儲存的草稿',
        type: NotificationType.AnnouncementNotification,
        recipientUserIds: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return draft
  }
)

export const validateRecipients = createAsyncThunk(
  'notification/validateRecipients',
  async (userIds: string[]) => {
    // TODO: Replace with actual API call to validate user IDs
    // const response = await fetch('/api/users/validate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userIds })
    // })
    // const data = await response.json()
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Simulate some invalid users
    const validUserIds = userIds.filter((_, index) => index % 5 !== 0)
    const invalidUserIds = userIds.filter((_, index) => index % 5 === 0)
    
    return {
      validUserIds,
      invalidUserIds,
      totalValid: validUserIds.length,
      totalInvalid: invalidUserIds.length
    }
  }
)

export const fetchNotificationLogs = createAsyncThunk(
  'notification/fetchNotificationLogs',
  async ({ page = 1, limit = 20, filters = {} }: { page?: number; limit?: number; filters?: NotificationLogFilters }) => {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/notifications/logs?page=${page}&limit=${limit}`)
    // const data = await response.json()
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Apply filters to mock data
    let filteredData = [...mockNotificationLogs]
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredData = filteredData.filter(log => 
        log.title.toLowerCase().includes(searchLower) ||
        log.subtitle?.toLowerCase().includes(searchLower) ||
        log.createdBy.toLowerCase().includes(searchLower)
      )
    }
    
    // Type filter
    if (filters.type !== undefined) {
      filteredData = filteredData.filter(log => log.type === filters.type)
    }
    
    // Status filter
    if (filters.status !== undefined) {
      filteredData = filteredData.filter(log => log.status === filters.status)
    }
    
    // Recipient type filter
    if (filters.recipientType !== undefined) {
      filteredData = filteredData.filter(log => log.recipientType === filters.recipientType)
    }
    
    // Created by filter
    if (filters.createdBy) {
      filteredData = filteredData.filter(log => log.createdBy === filters.createdBy)
    }
    
    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      filteredData = filteredData.filter(log => {
        const createdAt = new Date(log.createdAt).getTime()
        const fromTime = filters.dateFrom ? new Date(filters.dateFrom).getTime() : 0
        const toTime = filters.dateTo ? new Date(filters.dateTo).getTime() : Date.now()
        return createdAt >= fromTime && createdAt <= toTime
      })
    }
    
    // Scheduled only filter
    if (filters.scheduledOnly) {
      filteredData = filteredData.filter(log => log.scheduledAt)
    }
    
    // Sort by createdAt desc
    filteredData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    // Calculate pagination
    const total = filteredData.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredData.slice(startIndex, endIndex)
    
    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    }
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSelectedNotification: (state, action: PayloadAction<Notification | null>) => {
      state.selectedNotification = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<NotificationFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    setPagination: (state, action: PayloadAction<Partial<typeof initialState.pagination>>) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    setCurrentDraft: (state, action: PayloadAction<NotificationDraft | null>) => {
      state.currentDraft = action.payload
    },
    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter(draft => draft.id !== action.payload)
      if (state.currentDraft?.id === action.payload) {
        state.currentDraft = null
      }
    },
    // 通知日誌相關 reducers
    setSelectedLog: (state, action: PayloadAction<NotificationLog | null>) => {
      state.selectedLog = action.payload
    },
    setLogsFilters: (state, action: PayloadAction<Partial<NotificationLogFilters>>) => {
      state.logsFilters = { ...state.logsFilters, ...action.payload }
    },
    clearLogsFilters: (state) => {
      state.logsFilters = initialState.logsFilters
    },
    setLogsPagination: (state, action: PayloadAction<Partial<typeof initialState.logsPagination>>) => {
      state.logsPagination = { ...state.logsPagination, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.notifications = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch notifications'
      })
      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const { notificationId, readAt } = action.payload
        const notification = state.notifications.find(n => n.id === notificationId)
        if (notification) {
          notification.isRead = true
          notification.readAt = readAt
        }
        if (state.selectedNotification?.id === notificationId) {
          state.selectedNotification.isRead = true
          state.selectedNotification.readAt = readAt
        }
      })
      // Send notification
      .addCase(sendNotification.pending, (state) => {
        state.sendingNotification = true
        state.error = null
      })
      .addCase(sendNotification.fulfilled, (state) => {
        state.sendingNotification = false
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.sendingNotification = false
        state.error = action.error.message || 'Failed to send notification'
      })
      // Save draft
      .addCase(saveDraft.fulfilled, (state, action) => {
        const draft = action.payload
        const existingIndex = state.drafts.findIndex(d => d.id === draft.id)
        if (existingIndex >= 0) {
          state.drafts[existingIndex] = draft
        } else {
          state.drafts.push(draft)
        }
        state.currentDraft = draft
      })
      // Load draft
      .addCase(loadDraft.fulfilled, (state, action) => {
        state.currentDraft = action.payload
      })
      // Fetch notification logs
      .addCase(fetchNotificationLogs.pending, (state) => {
        state.logsLoading = true
        state.logsError = null
      })
      .addCase(fetchNotificationLogs.fulfilled, (state, action) => {
        state.logsLoading = false
        state.logs = action.payload.data
        state.logsPagination = action.payload.pagination
      })
      .addCase(fetchNotificationLogs.rejected, (state, action) => {
        state.logsLoading = false
        state.logsError = action.error.message || 'Failed to fetch notification logs'
      })
  }
})

export const { 
  setSelectedNotification, 
  setFilters, 
  clearFilters, 
  setPagination, 
  setCurrentDraft, 
  deleteDraft,
  setSelectedLog,
  setLogsFilters,
  clearLogsFilters,
  setLogsPagination
} = notificationSlice.actions
export default notificationSlice.reducer