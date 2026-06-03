// File Purpose: Redux store configuration for shared authentication state.
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice.js'

export const store = configureStore({
  reducer:{
    auth: authReducer,
  }
})