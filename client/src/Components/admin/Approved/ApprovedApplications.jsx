import React from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { BsDiagram3Fill } from "react-icons/bs";
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ApprovedApplications() {
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/applications/approved', { withCredentials: true }).then((application) => {
      setApplication(application.data)
    })
  }, [])

  const chooseSlot = (details) => {
    navigate('/admin/slot', { state: { id: details.id, company: details.company }})
  }

  return (
    <div>
      <div className="container">
        <h3 className='text-center mt-2 text-primary'>Approved Applications</h3>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full name</th>
                <th>Address</th>
                <th>Company</th>
                <th>Email</th>
                <th>Slot</th>
              </tr>
            </thead>
            <tbody>
              {
                application.map((application, index) => {
                  return (
                    <tr key={application._id}>
                      <td>{index + 1}</td>
                      <td>{application.application.fullName}</td>
                      <td>{application.application.address}</td>
                      <td>{application.application.company}</td>
                      <td>{application.application.email}</td>
                      <td>
                        <div className='d-flex'>
                          {application.slotNo ?
                            <>
                              <p>{application.slotNo}</p>
                            </> :
                            <>
                              <button title='Choose Slot' className='btn btn-secondary' onClick={() => { chooseSlot({ id: application._id, company: application.application.company }) }}><BsDiagram3Fill /></button>
                            </>
                          }
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>

      </div>
    </div>
  )
}

export default ApprovedApplications