import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  return (
    <Container>
      {user.name} logged in{' '}
      <Button variant='outline-secondary' onClick={handleLogout} type='submit' size='sm'>
        logout
      </Button>
    </Container>
  )
}

export default Logout
