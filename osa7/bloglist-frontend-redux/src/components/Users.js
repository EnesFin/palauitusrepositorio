import Stack from 'react-bootstrap/esm/Stack'
import Table from 'react-bootstrap/esm/Table'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h4>Blogs created</h4>
      <Stack gap={3}>
        <Table bordered hover>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>
                  <p>{user.blogs.length}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </div>
  )
}

export default Users
