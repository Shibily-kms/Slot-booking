import React from 'react'
import './HomeBody.css'
import backgorundImage from './event-home.png'

function HomeBody() {
 


  return (
    <div>
      <div className='adminhomeDiv'>
        <div className="container">
          <div className="row ">
            <div className='col-12 col-md-6 section-one'>
              <div>
                <h2>Admin Panel</h2>
                <h6>Manage Users and Applications</h6>
              </div>
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
