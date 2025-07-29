import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { VenueApplication, Venue, VenueOpeningHour, VenueApprovalStatus, VenueCategoryType, FilterParams } from '@/types'

interface VenueFilters {
  search: string
  categoryType?: VenueCategoryType
  approvalStatus?: VenueApprovalStatus
  isDeleted?: boolean
}

interface VenueState {
  applications: VenueApplication[]
  venues: Venue[]
  selectedApplication: VenueApplication | null
  selectedVenue: Venue | null
  loading: boolean
  error: string | null
  filters: VenueFilters
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
  selectedVenue: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    categoryType: undefined,
    approvalStatus: undefined,
    isDeleted: false
  },
  pagination: {
    page: 1,
    limit: 20,
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

// New venue management thunks
export const fetchVenues = createAsyncThunk(
  'venue/fetchVenues',
  async (params: { page: number; limit: number; filters: VenueFilters }) => {
    // TODO: Replace with actual API call
    return {
      data: [] as Venue[],
      pagination: {
        page: params.page,
        limit: params.limit,
        total: 0,
        totalPages: 0
      }
    }
  }
)

export const updateVenue = createAsyncThunk(
  'venue/updateVenue',
  async ({ id, data }: { 
    id: string; 
    data: Partial<Venue> & { 
      openingHours?: Omit<VenueOpeningHour, 'id' | 'venueId' | 'createdAt' | 'updatedAt'>[] 
    }
  }) => {
    // TODO: Replace with actual API call
    return { id, data }
  }
)

export const deleteVenue = createAsyncThunk(
  'venue/deleteVenue',
  async (id: string) => {
    // TODO: Replace with actual API call - soft delete by setting isDeleted = true
    return { id }
  }
)

const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    setSelectedApplication: (state, action: PayloadAction<VenueApplication | null>) => {
      state.selectedApplication = action.payload
    },
    setSelectedVenue: (state, action: PayloadAction<Venue | null>) => {
      state.selectedVenue = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<VenueFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        categoryType: undefined,
        approvalStatus: undefined,
        isDeleted: false
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
      // Fetch venues
      .addCase(fetchVenues.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.loading = false
        state.venues = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch venues'
      })
      // Update venue
      .addCase(updateVenue.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateVenue.fulfilled, (state, action) => {
        state.loading = false
        const index = state.venues.findIndex(venue => venue.id === action.payload.id)
        if (index !== -1) {
          state.venues[index] = { ...state.venues[index], ...action.payload.data }
        }
      })
      .addCase(updateVenue.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to update venue'
      })
      // Delete venue
      .addCase(deleteVenue.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.loading = false
        const index = state.venues.findIndex(venue => venue.id === action.payload.id)
        if (index !== -1) {
          state.venues[index] = { ...state.venues[index], isDeleted: true }
        }
      })
      .addCase(deleteVenue.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete venue'
      })
  }
})

export const { 
  setSelectedApplication, 
  setSelectedVenue, 
  setFilters, 
  resetFilters, 
  setPagination, 
  clearError 
} = venueSlice.actions
export default venueSlice.reducer