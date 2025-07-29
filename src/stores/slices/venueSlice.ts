import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { VenueApplication, Venue, VenueOpeningHour, VenueApprovalStatus } from '@/types'

interface VenueState {
  applications: VenueApplication[]
  venues: Venue[]
  selectedApplication: VenueApplication | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: VenueState = {
  applications: [],
  venues: [],
  selectedApplication: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
}

export const fetchVenueApplications = createAsyncThunk(
  'venue/fetchApplications',
  async (params: { page: number; limit: number; status?: VenueApprovalStatus }) => {
    // TODO: Replace with actual API call
    return {
      data: [] as VenueApplication[],
      pagination: {
        page: params.page,
        limit: params.limit,
        total: 0,
        totalPages: 0
      }
    }
  }
)

export const approveVenueApplication = createAsyncThunk(
  'venue/approveApplication',
  async ({ applicationId, venueData }: { 
    applicationId: string; 
    venueData: Omit<Venue, 'id' | 'createdAt' | 'updatedAt' | 'approvalStatus'> & {
      openingHours: Omit<VenueOpeningHour, 'id' | 'venueId' | 'createdAt' | 'updatedAt'>[]
    }
  }) => {
    // TODO: Replace with actual API call
    return { applicationId, venueData }
  }
)

export const rejectVenueApplication = createAsyncThunk(
  'venue/rejectApplication',
  async (applicationId: string) => {
    // TODO: Replace with actual API call
    return { applicationId }
  }
)

const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    setSelectedApplication: (state, action: PayloadAction<VenueApplication | null>) => {
      state.selectedApplication = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(fetchVenueApplications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVenueApplications.fulfilled, (state, action) => {
        state.loading = false
        state.applications = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchVenueApplications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch applications'
      })
      // Approve application
      .addCase(approveVenueApplication.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(approveVenueApplication.fulfilled, (state, action) => {
        state.loading = false
        const index = state.applications.findIndex(app => app.id === action.payload.applicationId)
        if (index !== -1) {
          state.applications[index] = {
            ...state.applications[index],
            approvalStatus: VenueApprovalStatus.Approved,
            approvedAt: new Date()
          }
        }
      })
      .addCase(approveVenueApplication.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to approve application'
      })
      // Reject application
      .addCase(rejectVenueApplication.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(rejectVenueApplication.fulfilled, (state, action) => {
        state.loading = false
        const index = state.applications.findIndex(app => app.id === action.payload.applicationId)
        if (index !== -1) {
          state.applications[index] = {
            ...state.applications[index],
            approvalStatus: VenueApprovalStatus.Rejected,
            approvedAt: new Date()
          }
        }
      })
      .addCase(rejectVenueApplication.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to reject application'
      })
  }
})

export const { setSelectedApplication, clearError } = venueSlice.actions
export default venueSlice.reducer