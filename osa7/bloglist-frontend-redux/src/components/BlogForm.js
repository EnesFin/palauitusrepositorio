import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { authorChange, titleChange, urlChange } from '../reducers/blogFormReducer'
import { createNotification } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const title = useSelector((state) => state.form.title)
  const author = useSelector((state) => state.form.author)
  const url = useSelector((state) => state.form.url)

  const handleTitleChange = (event) => {
    dispatch(titleChange(event.target.value))
  }
  const handleAuthorChange = (event) => {
    dispatch(authorChange(event.target.value))
  }
  const handleUrlChange = (event) => {
    dispatch(urlChange(event.target.value))
  }

  const addBlog = (event) => {
    event.preventDefault()
    try {
      const createNewBlog = {
        title: title,
        author: author,
        url: url,
      }
      dispatch(createBlog(createNewBlog))
      dispatch(createNotification(`a new ${createNewBlog.title} by ${createNewBlog.author}`, 5))
    } catch (exception) {
      dispatch(createNotification(`Cannot add blog ${event.title}`, 5))
    }
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Label htmlFor='title'>title</Form.Label>
      <Form.Control type='title' id='title' onChange={handleTitleChange} />
      <Form.Label htmlFor='author'>author</Form.Label>
      <Form.Control type='author' id='author' onChange={handleAuthorChange} />
      <Form.Label htmlFor='url'>url</Form.Label>
      <Form.Control type='' id='url' onChange={handleUrlChange} />
      <div className='d-grid gap-2'>
        <Button variant='secondary' type='submit'>
          add
        </Button>
      </div>
    </Form>
  )
}

export default BlogForm
