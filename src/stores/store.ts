import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import venueReducer from './slices/venueSlice'
import userReducer from './slices/userSlice'
import commentReducer from './slices/commentSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    venue: venueReducer,
    user: userReducer,
    comment: commentReducer,
    notification: notificationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector