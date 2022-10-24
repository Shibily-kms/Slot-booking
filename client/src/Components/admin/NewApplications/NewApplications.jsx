import React from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import { BsFillEyeFill, BsCheckLg, BsXLg } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function NewApplications() {
    const navigate = useNavigate();
    const [application, setApplication] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/admin/applications/new', { withCredentials: true }).then((application) => {
            setApplication(application.data)
        })
    }, [])

    const changeStatusApplication = (id, status) => {
        axios.post('http://localhost:5000/admin/applications/new/change-status', { id, status }, { withCredentials: true }).then((result) => {
            const newList = application.filter((element) => element._id !== id)
            setApplication(newList)
        })
    }
    const viewApplications = (obj) =>{
        navigate('/admin/application/new/view', { state: obj })
    }




    return (
        <div>
            <div className="container">
                <h3 className='text-center mt-2 text-primary'>New Applications</h3>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full name</th>
                                <th>Address</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Action</th>
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
                                                    <Button title='View' className='mx-1' variant="dark" onClick={() => {
                                                        viewApplications( application )
                                                    }}><BsFillEyeFill /></Button>{' '}
                                                    <Button title='Approve' className='mx-1' variant="success" onClick={() => { if (window.confirm('Are you approve this application  ?')) { changeStatusApplication(application._id, 'Approved') } }}><BsCheckLg /></Button>{' '}
                                                    <Button title='Reject' className='mx-1' variant="danger" onClick={() => { if (window.confirm('Are you reject this application  ?')) { changeStatusApplication(application._id, 'Rejected') } }}><BsXLg /></Button>{' '}
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

export default NewApplications