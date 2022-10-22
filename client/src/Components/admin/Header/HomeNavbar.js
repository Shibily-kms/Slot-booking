import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom'
import { AdminAuthContext } from '../../../Context/AdminContext';
import { useCookies } from "react-cookie";





function HomeNavbar() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['jwtAdmin'])
  const { admin, setAdmin } = useContext(AdminAuthContext)

  useEffect(() => {
    console.log(cookies, 'cookie');
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
              <Nav.Link eventKey={2} className='pt-3'><span >UserList</span></Nav.Link>
              <Nav.Link eventKey={2} >
                <NavDropdown title="Applications" id="basic-nav-dropdown">
                  <NavDropdown.Item >New application</NavDropdown.Item>
                  <NavDropdown.Item >Approved application</NavDropdown.Item>
                  <NavDropdown.Item >Rejected application</NavDropdown.Item>
                </NavDropdown>
              </Nav.Link>
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
                console.log(admin, 'hihihhlogout');
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