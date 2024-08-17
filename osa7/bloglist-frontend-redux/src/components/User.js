import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <div>
        <h4>added blogs</h4>
        <Row className='justify-content-md-center'>
          {user.blogs.map((blog) => (
            <Col key={blog.id} Col xs lg='4'>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default User
