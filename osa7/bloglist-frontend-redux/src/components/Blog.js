import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from './Comment'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/esm/Button'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id))
  const user = useSelector((state) => state.login)

  if (!blog) {
    return null
  }

  const upvote = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    console.log(updatedBlog)
    try {
      dispatch(voteBlog(updatedBlog))
      dispatch(createNotification(`Blog ${updatedBlog.title} was successfully updated`, 5))
    } catch (exception) {
      dispatch(createNotification(`Cannot update blog ${updatedBlog.title}`, 5))
    }
  }

  const remove = () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(deleteBlog(blog))
        dispatch(createNotification(`Blog ${blog.title} was successfully deleted`, 5))
        navigate('/')
      }
    } catch (exception) {
      dispatch(createNotification(`Cannot delete blog ${blog.title}`, 5))
    }
  }
  return (
    <div>
      <Stack gap={0}>
        <h3>
          {blog.title} {blog.author}
        </h3>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <Button onClick={upvote} variant='contained'>
            👍
          </Button>
        </p>
        {blog.user && <p>added by {blog.user.username}</p>}
      </Stack>
      {blog.user.name === user.name && (
        <button id='delete-btn' onClick={remove}>
          delete
        </button>
      )}
      <Comment blog={blog} />
    </div>
  )
}

export default Blog
