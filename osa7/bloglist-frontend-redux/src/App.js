import { createRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import NavigationBar from './components/NavigationBar'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import blogService from './services/blogs'
import Stack from 'react-bootstrap/esm/Stack'

const App = () => {
  const user = useSelector((state) => state.login)
  const blogFormRef = createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [])

  return (
    <div className='container'>
      {user && <NavigationBar />}
      <h1>blog app</h1>
      <Notification />
      {!user && (
        <Stack gap={2} className='col-md-5 mx-auto'>
          <Togglable buttonLabel='log in' id='ToggleButton'>
            <LoginForm />
          </Togglable>
        </Stack>
      )}
      {user && (
        <div>
          <Routes>
            <Route path='/' element={<BlogList blogFormRef={blogFormRef} />} />
            <Route path='/blogs/:id' element={<Blog />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
