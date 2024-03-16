import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            state.push(action.payload)
        },
        likeBlog(state, action) {
            const id = action.payload
            const blogToChange = state.find(b => b.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }

            return state.map(blog =>
                blog.id !== id ? blog : changedBlog
            )
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        quitBlog(state,action){
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        },
        setBlogs(state, action) {
            return action.payload
        }
    },
})

export const { likeBlog, appendBlog, setBlogs, quitBlog } = blogSlice.actions
export default blogSlice.reducer