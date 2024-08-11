import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      return content
    },
    clearNotification(state, action) {
      return ''
    },
  },
})

export const { voteNotification, clearNotification, createNotification } =
  notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
