import Logout from './Logout'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavigationBar = () => {
  return (
    <Navbar expand='lg' variant='light' bg='light'>
      <Nav className='me-auto'>
        <Nav.Link href='/'>blogs</Nav.Link>
        <Nav.Link href='/users'>users</Nav.Link>
      </Nav>
      <Nav>
        <Logout />
      </Nav>
    </Navbar>
  )
}
export default NavigationBar
