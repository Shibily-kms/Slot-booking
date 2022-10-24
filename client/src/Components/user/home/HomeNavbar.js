import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../../../Context/UserContext';
import { useCookies } from "react-cookie";

function HomeNavbar() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([])
  const { user, setUser } = useContext(UserAuthContext)
  console.log(user,'hihihhhihihihih');
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>Dreams Art</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              {user.status ?
                <>
                  <Nav.Link eventKey={2} onClick={()=>{navigate('/details')}} >
                    {user.name}
                  </Nav.Link>
                  <Nav.Link eventKey={2} onClick={() => {
                    removeCookie('jwt',{path:'/'})
                    setUser({
                      ...user,
                      status:false,
                      id:null,
                      form:false,
                      name:null,
                      formStatus:null,
                      slotNo :null
                    })
                    navigate("/login")
                    console.log(user,'hihihhlogout');
                  }}>
                    LogOut
                  </Nav.Link>
                </>
                :
                <>
                  <Nav.Link eventKey={2} onClick={() => navigate("/login")}>
                    SignIn
                  </Nav.Link>
                  <Nav.Link eventKey={2} onClick={() => navigate("/signup")}>
                    SignUp
                  </Nav.Link>
                  
                </>

              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
}

export default HomeNavbar
