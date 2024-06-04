import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './../../../../createSlice/src/types/blog.type'

export const blogApi = createApi({
    reducerPath: 'blogApi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints: (build) => ({
        //    <generic type><repsonse, argument> in this case repsonse type is Post[] and no argument (line 14) so void
        getPosts: build.query<Post[], void>({
            //            posts => http://localhost:3000/posts
            query: () => 'posts',
            // providesTags can be an array or a callback returning an array
            // if any invalidatesTag match this providesTags, getPosts will be called again
            providesTags: (result) => {
                //result here can be Post[] or undefined as defined at line 12
                if (result) {
                    const final = [
                        ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
                        { type: 'Posts' as const, id: 'LIST' }
                    ]
                    return final
                }
                const final = [{ type: 'Posts' as const, id: 'LIST' }]
                return final
            }
        }),
        //
        getPost: build.query<Post, string>({
            query: (id) => `posts/${id}`
        }),
        addPost: build.mutation<Post, Omit<Post, 'id'>>({
            query: (body) => {
                return {
                    url: 'posts',
                    method: 'POST',
                    body
                }
            },
            // invalidatesTags provides tags to signal other methods that has the matching providesTags
            // will also be called again, in this case getPosts will be called
            //                          same body in line 30
            invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
        }),
        // eslint-disable-next-line @typescript-eslint/ban-types
        deletePost: build.mutation<{}, string>({
            query: (id) => {
                return {
                    url: `posts/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Posts', id }]
        }),
        //                       <repsonse>, <argument> (data at line 49)
        updatePost: build.mutation<Post, { id: string; body: Post }>({
            query: (data) => {
                return {
                    url: `posts/${data.id}`,
                    method: 'PUT',
                    body: data.body
                }
            },
            invalidatesTags: (result, error, data) => [{ type: 'Posts', id: data.id }]
        })
    })
})

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } =
    blogApi
