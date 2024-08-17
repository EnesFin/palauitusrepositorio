import { createSlice } from '@reduxjs/toolkit'

const blogFormSlice = createSlice({
  name: 'form',
  initialState: {
    title: '',
    author: '',
    url: '',
  },
  reducers: {
    titleChange(state, action) {
      state.title = action.payload
    },
    authorChange(state, action) {
      state.author = action.payload
    },
    urlChange(state, action) {
      state.url = action.payload
    },
  },
})

export const { titleChange, authorChange, urlChange } = blogFormSlice.actions
export default blogFormSlice.reducer
