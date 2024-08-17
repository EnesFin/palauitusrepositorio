import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import Table from 'react-bootstrap/Table'

const BlogList = ({ blogFormRef }) => {
  const blogs = useSelector((state) => state.blogs)
  const copy = [...blogs]
  console.log(blogs)

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Table striped bordered hover>
        <tbody>
          {copy
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td style={{ left: 50 }}>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
