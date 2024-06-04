import { createSlice, current, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { initalPostList } from '../../constants/blog'
import { Post } from './../../types/blog.type'

interface BlogState {
    postList: Post[]
    editPost: Post | null
}

const initialState: BlogState = {
    postList: initalPostList,
    editPost: null
}

// // in this addPost action, we use a prepare callback to modify the payload before it's passed to the reducer

// // addPost action
// export const addPost = createAction('blog/addPost', (post: Omit<Post, 'id'>) => {
//     return {
//         payload: {
//             ...post,
//             id: nanoid()
//         }
//     }
// })

// // deletePost action          <type of payload>('action name')
// export const deletePost = createAction<string>('blog/deletePost')

// // editPost action            <type of payload>('action name')
// export const editPost = createAction<string>('blog/editPost')

// // editCancel action          no type here because we don't need to pass any payload
// export const editCancel = createAction('blog/editCancel')

// export const edited = createAction<Post>('blog/edited')

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        deletePost: (state, action: PayloadAction<string>) => {
            const postID = action.payload
            const postIndex = state.postList.findIndex((post) => post.id === postID)

            if (postIndex != -1) {
                state.postList.splice(postIndex, 1)
            }
        },
        editPost: (state, action: PayloadAction<string>) => {
            const postID = action.payload
            const post = state.postList.find((post) => post.id === postID) || null

            state.editPost = post
        },
        editCancel: (state) => {
            state.editPost = null
        },
        edited: (state, action: PayloadAction<Post>) => {
            const postID = action.payload.id
            state.postList.some((post, index) => {
                if (postID === post.id) {
                    state.postList[index] = action.payload
                    return true
                }
                return false
            })
            state.editPost = null
        },
        addPost: {
            reducer: (state, action: PayloadAction<Post>) => {
                const post = action.payload
                state.postList.push(post)
            },
            prepare: (post: Omit<Post, 'id'>) => ({
                payload: {
                    ...post,
                    id: nanoid()
                }
            })
        }
    },
    // to use addMatcher, we need to use extraReducers
    extraReducers(builder) {
        builder
            .addMatcher(
                (action) => action.type.includes('edit'),

                (state) => {
                    console.log(current(state))
                }
            )
            .addDefaultCase((state, action) => {
                console.log(`action type: ${action.type}`, current(state))
            })
    }
})

const blogReducer = blogSlice.reducer

export default blogReducer
export const { addPost, deletePost, editCancel, editPost, edited } = blogSlice.actions

// const blogReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(addPost, (state, action) => {
//             // usually we shouldn't mutate the state in react becuase react encourage immutability to avoid bugs
//             // between re-renders, but redux toolkit uses immer to help us mutate the state in a safe way
//             const post = action.payload
//             state.postList.push(post)
//         })
//         .addCase(deletePost, (state, action) => {
//             const postID = action.payload
//             const postIndex = state.postList.findIndex((post) => post.id === postID)

//             if (postIndex != -1) {
//                 state.postList.splice(postIndex, 1)
//             }
//         })
//         .addCase(editPost, (state, action) => {
//             const postID = action.payload
//             const post = state.postList.find((post) => post.id === postID) || null

//             state.editPost = post
//         })
//         .addCase(editCancel, (state) => {
//             state.editPost = null
//         })
//         .addCase(edited, (state, action) => {
//             const postID = action.payload.id
//             state.postList.some((post, index) => {
//                 if (postID === post.id) {
//                     state.postList[index] = action.payload
//                     return true
//                 }
//                 return false
//             })
//             state.editPost = null
//         })
//         // addMatcher takes in 2 functions as arguments,
//         // the first one is a predicate function that returns a boolean,
//         // the second one is a callback function that will be called if the predicate function returns true
//         .addMatcher(
//             (action) => action.type.includes('edit'),
//             (state) => {
//                 console.log(current(state))
//             }
//         )
// })

// export default blogReducer
