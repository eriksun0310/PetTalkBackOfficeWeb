import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Notification, NotificationFilters, NotificationType } from '@/types'
import { mockNotifications } from '@/shared/mocks/notifications.mock'

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
  }
})

export const { setSelectedNotification, setFilters, clearFilters, setPagination } = notificationSlice.actions
export default notificationSlice.reducer