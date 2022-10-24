import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsBookmarkFill } from "react-icons/bs";
import './slot.css'
import { useEffect } from 'react';
import axios from 'axios'



function SlotList() {
  const navigate = useNavigate();
  let location = useLocation();
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/admin/slot-list', { withCredentials: true }).then((slots) => {
      setSlots(slots.data)
    })
  }, [])

  const bkdSlot = (slotId) => {
    const obj = {
      slotId: slotId,
      userId: location.state.id,
      company: location.state.company,
      status: true
    }
    axios.post('http://localhost:5000/admin/choose-slot', obj, { withCredentials: true }).then((result) => {

      let indexSlot = null
      slots.forEach((slot, index) => {
        if (slot.slotId === slotId) {
          indexSlot = index
        }
      })
      let newItems = slots
      let item = { ...newItems[indexSlot] }
      item.userId = obj.userId
      item.company = obj.company
      item.status = obj.status
      newItems[indexSlot] = item

      setSlots([...newItems])
      navigate('/admin/slot', {
        replace: true
      });

    })
  }

  return (
    <div>
      <div className="container">
        <h3 className='text-center mt-2 text-primary'>Slot List</h3>
        {location.state ?
          <p className='text-center fw-bold'>Choose Slot for Registerd Clients</p>
          :
          <p className='text-center fw-bold'></p>
        }
        <div className='slot-list'>
          {
            slots.map((slot) => {
              return (
                slot.status ?
                  <div>
                    <button className='btn btn-lg btn-secondary m-2'><BsBookmarkFill /> {slot.slotId}</button>
                    <p className='slot-company-name text-center'>{slot.company}</p>
                  </div>
                  :
                  <div>
                    {location.state ?
                      <button className='btn btn-lg btn-success  m-2 ' onClick={() => { bkdSlot(slot.slotId) }}><BsBookmarkFill /> {slot.slotId}</button>
                      :
                      <button className='btn btn-lg btn-success m-2 chnage-cursor' style={{ cursor: 'not-allowed' }} ><BsBookmarkFill /> {slot.slotId}</button>
                    }
                    <p className='slot-company-name'></p>
                  </div>
              )
            })
          }
          {/* <button className='btn btn-lg btn-secondary m-2'><BsBookmarkFill /> A001</button> */}

        </div>
      </div>
    </div >
  )
}

export default SlotList