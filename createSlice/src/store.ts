import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blog.slice'

//  Get the root state and dispatch types from the store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        blog: blogReducer
    }
})
