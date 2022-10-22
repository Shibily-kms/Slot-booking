import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeBody.css'
// import { useCookies } from "react-cookie";
import backgorundImage from './event-home.png'
// import { UserAuthContext } from '../../../Context/UserContext';
// import axios from 'axios'

function HomeBody() {
  // const { user, setUser } = useContext(UserAuthContext)
  // const [cookies, setCookie, removeCookies] = useCookies([])
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (!cookies.jwt) {
  //     setUser({
  //       ...user,
  //       status: false,
  //       id: null
  //     })
  //   }
  // }, [])
  return (
    <div>
      <div className='adminhomeDiv'>
        <div className="container">
          <div className="row ">
            <div className='col-12 col-md-6 section-one'>
              
                <>
                  <div>
                    <h2>Welcome</h2>
                   
                      <>
                        <h6>Register for startup meet</h6>
                        <button className='btn btn-warning fw-bold text-dark mt-2' onClick={() => navigate("/event-register")}>Register Now!</button>
                      </>
                    
                  </div>
                </>
               
            </div>
            <div className='col-12 col-md-6 section-two'>
              <img src={backgorundImage} alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomeBody
