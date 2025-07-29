import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Comment, PetFriendlyLevel, FeedbackType, VenueCategoryType } from '@/types'

interface CommentFilters {
  search: string // 搜尋使用者名稱或店家名稱
  venueCategory?: VenueCategoryType // 店家類型篩選
  rating?: number // 評分篩選
  feedbackType?: FeedbackType // 回饋類型篩選
  petFriendlyLevel?: PetFriendlyLevel // 寵物友善程度篩選
  isDeleted?: boolean // 是否已刪除
  dateFrom?: string // 開始日期
  dateTo?: string // 結束日期
}

interface CommentState {
  comments: Comment[]
  selectedComment: Comment | null
  loading: boolean
  error: string | null
  filters: CommentFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: CommentState = {
  comments: [],
  selectedComment: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    venueCategory: undefined,
    rating: undefined,
    feedbackType: undefined,
    petFriendlyLevel: undefined,
    isDeleted: false,
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

// 取得評論列表
export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (params: { page: number; limit: number; filters: CommentFilters }) => {
    // TODO: Replace with actual API call
    const { getComments } = await import('@/shared/mocks/comments.mock')
    
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return getComments({
      ...params.filters,
      page: params.page,
      limit: params.limit
    })
  }
)

// 刪除評論
export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async ({ id, reason }: { id: string; reason: string }) => {
    // TODO: Replace with actual API call
    const { deleteComment: deleteCommentMock } = await import('@/shared/mocks/comments.mock')
    
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const success = deleteCommentMock(id, reason)
    if (!success) {
      throw new Error('無法刪除評論')
    }
    
    return { id, reason }
  }
)

// 批量刪除評論
export const deleteCommentsBatch = createAsyncThunk(
  'comment/deleteCommentsBatch',
  async ({ ids, reason }: { ids: string[]; reason: string }) => {
    // TODO: Replace with actual API call
    
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return { ids, reason }
  }
)

// 恢復評論
export const restoreComment = createAsyncThunk(
  'comment/restoreComment',
  async (id: string) => {
    // TODO: Replace with actual API call
    
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return { id }
  }
)

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setSelectedComment: (state, action: PayloadAction<Comment | null>) => {
      state.selectedComment = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<CommentFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        venueCategory: undefined,
        rating: undefined,
        feedbackType: undefined,
        petFriendlyLevel: undefined,
        isDeleted: false,
        dateFrom: undefined,
        dateTo: undefined
      }
    },
    setPagination: (state, action: PayloadAction<{ page?: number; limit?: number }>) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '無法載入評論'
      })
      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false
        const index = state.comments.findIndex(comment => comment.id === action.payload.id)
        if (index !== -1) {
          state.comments[index] = { 
            ...state.comments[index], 
            isDeleted: true,
            deletedReason: action.payload.reason
          }
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '無法刪除評論'
      })
      // Delete comments batch
      .addCase(deleteCommentsBatch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCommentsBatch.fulfilled, (state, action) => {
        state.loading = false
        action.payload.ids.forEach(id => {
          const index = state.comments.findIndex(comment => comment.id === id)
          if (index !== -1) {
            state.comments[index] = { 
              ...state.comments[index], 
              isDeleted: true,
              deletedReason: action.payload.reason
            }
          }
        })
      })
      .addCase(deleteCommentsBatch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '無法批量刪除評論'
      })
      // Restore comment
      .addCase(restoreComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(restoreComment.fulfilled, (state, action) => {
        state.loading = false
        const index = state.comments.findIndex(comment => comment.id === action.payload.id)
        if (index !== -1) {
          state.comments[index] = { 
            ...state.comments[index], 
            isDeleted: false,
            deletedReason: undefined
          }
        }
      })
      .addCase(restoreComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '無法恢復評論'
      })
  }
})

export const { 
  setSelectedComment, 
  setFilters, 
  resetFilters, 
  setPagination, 
  clearError 
} = commentSlice.actions

export default commentSlice.reducer