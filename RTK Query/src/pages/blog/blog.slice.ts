import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface blogState {
    postId: string
}

const initialState: blogState = {
    postId: ''
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        startEditPost: (state, action: PayloadAction<string>) => {
            state.postId = action.payload
        },
        cancelEditPost: (state) => {
            state.postId = ''
        }
    }
})

const blogReducer = blogSlice.reducer
export default blogReducer

export const { cancelEditPost, startEditPost } = blogSlice.actions
