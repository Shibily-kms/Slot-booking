import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

function UserList() {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/admin/user-list', { withCredentials: true }).then((userList) => {
            setUserList(userList.data)
        })
    }, [])

    const editUser = (id, name, email, mobile) => {
        navigate('/admin/edit-user', { state: { _id: id, name, email, mobile } })
    }

    const deleteUser = (id) => {
        axios.post('http://localhost:5000/admin/delete-user', { id }, { withCredentials: true }).then((result) => {
            if (result.data.status) {
                const newUserList = userList.filter((element) => element._id !== id)
                setUserList(newUserList)
            }
        })
    }

    return (
        <div>
            <div className="container">
                <h3 className='text-center mt-2 text-primary'>User List</h3>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Registration</th>
                                <th>Slot</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userList.map((user, index) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.mobile}</td>
                                            <td>{user.status ? user.status : '-'}</td>
                                            <td>{user.status ? user.slotNo ? user.slotNo : 'Pending' : '-'}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => { editUser(user._id, user.name, user.email, user.mobile) }}>Edit</Button>{' '}
                                                <Button variant="danger" onClick={() => { if (window.confirm('Are you delete user ?')) { deleteUser(user._id) } }}>Delete</Button>{' '}
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

export default UserList