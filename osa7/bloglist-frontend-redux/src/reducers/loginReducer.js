import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userLogged = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

const loginSlice = createSlice({
  name: 'login',
  initialState: userLogged ? userLogged : null,
  reducers: {
    loginUser(state, action) {
      return action.payload
    },
    loggoutUser(state, action) {
      return action.payload
    },
  },
})

export const { loginUser, loggoutUser } = loginSlice.actions

export const userLogin = (username, password) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
    dispatch(loginUser(loggedUser))
    console.log(loggedUser)
  }
}
export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(loggoutUser(null))
  }
}

export default loginSlice.reducer
