import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'


function UserDetails() {
    const [user, setUser] = useState();
    const [cookies, setCookie] = useCookies(['jwt']);
    const navigate = useNavigate()
    useEffect(() => {
        if (!cookies.jwt) {
            navigate('/login')
        } else {
            axios.get('http://localhost:5000/user-auth-data', { withCredentials: true }).then((userData) => {
                setUser(userData.data)
            })
        }
    })

    return (
        <div>
            <div className="container">
                <h3 className='text-center mt-2 text-primary'>User Details</h3>
                <div>
                    {user ?
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Full name</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Mobile</td>
                                    <td>{user.mobile}</td>
                                </tr>
                                <tr>
                                    <td>Registration</td>
                                    <td>{user.status ? user.status : '-'}</td>
                                </tr>
                                <tr>
                                    <td>Slot No</td>
                                    <td>{user.slotNo ? user.slotNo : '-'}</td>
                                </tr>


                              
                            </tbody>
                        </Table>
                        : ''}
                </div>
            </div>
        </div>
    )
}

export default UserDetails