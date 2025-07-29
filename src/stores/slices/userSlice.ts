import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, UserStatus } from '@/types'
import { mockUsers } from '@/shared/mocks/users.mock'

interface UserState {
  users: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: {
    search: string
    status: UserStatus | null
  }
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },
  filters: {
    search: '',
    status: null
  }
}

// Mock users are now imported from shared/mocks/users.mock.ts

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (params: { page: number; limit: number; search?: string; status?: UserStatus }) => {
    // TODO: Replace with actual API call
    // For now, return mock data
    return {
      data: mockUsers,
      pagination: {
        page: params.page,
        limit: params.limit,
        total: mockUsers.length,
        totalPages: 1
      }
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, updates }: { 
    userId: string; 
    updates: Partial<Pick<User, 'genderType' | 'status'>>
  }) => {
    // TODO: Replace with actual API call
    return { userId, updates }
  }
)

export const toggleUserStatus = createAsyncThunk(
  'user/toggleStatus',
  async (userId: string) => {
    // TODO: Replace with actual API call
    return { userId }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<UserStatus | null>) => {
      state.filters.status = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const index = state.users.findIndex(user => user.id === action.payload.userId)
        if (index !== -1) {
          const updates = action.payload.updates
          state.users[index] = {
            ...state.users[index],
            ...updates,
            // If status is Deleted (-1), also set isDeleted to true
            isDeleted: updates.status === UserStatus.Deleted ? true : state.users[index].isDeleted,
            updatedAt: new Date().toISOString()
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to update user'
      })
      // Toggle user status
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.userId)
        if (index !== -1) {
          const currentStatus = state.users[index].status
          state.users[index].status = currentStatus === UserStatus.Disabled 
            ? UserStatus.Verified 
            : UserStatus.Disabled
          state.users[index].updatedAt = new Date().toISOString()
        }
      })
  }
})

export const { setSelectedUser, setSearchFilter, setStatusFilter, clearError } = userSlice.actions
export default userSlice.reducer