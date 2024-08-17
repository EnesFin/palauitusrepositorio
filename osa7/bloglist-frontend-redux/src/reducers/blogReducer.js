import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const votedBlog = action.payload
      const { id } = votedBlog
      return state.map((blog) => (blog.id !== id ? blog : votedBlog))
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      console.log(action.payload)
      return state.filter((element) => element.id !== action.payload.id)
    },
    setBlogs(state, action) {
      console.log(action.payload)
      return action.payload
    },
  },
})

export const { setBlogs, addBlog, addVote, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const voteBlog = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await blogServices.update(anecdote)
    dispatch(addVote(votedAnecdote))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(content)
    dispatch(addBlog(newBlog))
  }
}

export const deleteBlog = (content) => {
  return async (dispatch) => {
    const removedBlog = content
    await blogServices.remove(content.id)
    dispatch(removeBlog(removedBlog))
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogServices.addComment(id, comment)
    console.log(commentedBlog)
    dispatch(addVote(commentedBlog))
  }
}

export default blogSlice.reducer
