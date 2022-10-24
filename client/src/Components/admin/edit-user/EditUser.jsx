import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'




function EditUser() {
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location, 'location');
    // const userid = location.state._id
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        id: location.state._id,
        name: location.state.name,
        email: location.state.email,
        mobile: location.state.mobile
    })

    const handleChange = (e) => {
        setError('')
        console.log(formData, 'llllllllllllllllllll');
        setFormData((prevt) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (formData.name === '' || formData.mobile === '') {
            setError('Fill complete Inputs')
        } else if (formData.mobile.length < 10 || formData.mobile.length > 10) {
            setError('Mobile 10 number required')
        } else {
            axios.post('http://localhost:5000/admin/edit-user', formData).then((result) => {
                navigate('/admin/user-list', {
                    replace: true,
                    state: null
                })
            }).catch((error) => {
                setError(error)
            })
        }
    }

    return (
        <div>
            <div className="container">
                <h3 className='text-center mt-2 text-primary'>Edit User</h3>
                <div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-6">
                            <Form onSubmit={handleOnSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" name='name' onChange={handleChange} defaultValue={location.state.name} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control disabled   type="email" placeholder="Enter email" readOnly  defaultValue={location.state.email} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="number" placeholder="Enter mobile number" name='mobile' onChange={handleChange} defaultValue={location.state.mobile} />
                                </Form.Group>

                                {error && <p className='error-form'>{error}</p>}

                                <button className='btn btn-primary w-100 fw-bold'>Submit</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser