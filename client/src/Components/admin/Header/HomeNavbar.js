import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom'
import { AdminAuthContext } from '../../../Context/AdminContext';
import { useCookies } from "react-cookie";





function HomeNavbar() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['jwtAdmin'])
  const { admin, setAdmin } = useContext(AdminAuthContext)

  useEffect(() => {
    if (!cookies.jwtAdmin) {
      navigate('/admin/login')
    }
  })
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate("/admin")}>Admin Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey={2}  onClick={() => navigate('/admin/user-list')}><span >UserList</span></Nav.Link>

              <NavDropdown title="Applications" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { navigate('/admin/application/new') }} >New application</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate('/admin/application/approved') }} >Approved application</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate('/admin/application/rejected') }}>Rejected application</NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Link eventKey={2}  onClick={() => navigate('/admin/slot')}><span >Slots</span></Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} onClick={() => {
                removeCookie('jwtAdmin', { path: '/' })
                setAdmin({
                  ...admin,
                  status: false,
                  id: null,
                  email: null,
                  name: null,

                })
                navigate("/admin/login")
              }}>
                LogOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
}

export default HomeNavbar
