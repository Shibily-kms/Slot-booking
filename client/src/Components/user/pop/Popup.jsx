import React, { useEffect } from 'react'
import { useState } from 'react'
import './popup.css'


function Popup(props) {
  const [formStatus,setFormStatus] = useState('pending')
  useEffect(()=>{
    if(props.action === 'Pending'){
      setFormStatus('text-secondary')
    }else if(props.action === 'Approved'){
      setFormStatus('text-success')
    }else if(props.action === 'Rejected'){
      setFormStatus('text-danger')
    }
  },[])
  return (
    
    <div>
        <div className="popup">
          <div className="border-pop bg-light col-md-6 col-sm-10 col-12">
              <div className="title">
                <h6>Your Registraion is</h6>
                <h4 className={formStatus}>{props.action}</h4>
                <h6 className='mt-3 text-secondary'>Your Solt Number : {props.slot ? props.slot : 'Pending'}</h6>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Popup