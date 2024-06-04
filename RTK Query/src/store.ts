import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blog.slice'
import { blogApi } from './pages/blog/blog.service'
import { setupListeners } from '@reduxjs/toolkit/query'
// ...

export const store = configureStore({
    reducer: {
        blog: blogReducer,
        [blogApi.reducerPath]: blogApi.reducer // add reducer created from api slice
    },
    // api middleware for caching, invalidate, polling of RTK query
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

// optional, required if you want to use refetchOnFocus / refetchOnConnect
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
