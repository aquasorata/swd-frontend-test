import personReducer from "./personSlice"
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    persons: personReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch